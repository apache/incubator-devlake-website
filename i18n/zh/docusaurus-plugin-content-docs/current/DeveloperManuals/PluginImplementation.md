---
title: "如何制作一个DevLake插件？"
sidebar_position: 2
description: >
  如何制作一个DevLake插件？
---


如果你喜欢的DevOps工具还没有被DevLake支持，不要担心。实现一个DevLake插件并不困难。在这篇文章中，我们将了解DevLake插件的基础知识，并一起从头开始建立一个插件的例子。

## 什么是插件？

DevLake插件是用Go的`plugin`包构建的共享库，在运行时与DevLake核心挂钩。

一个插件可以通过三种方式扩展DevLake的能力。

1. 与新的数据源集成
2. 转化/丰富现有数据
3. 将DevLake数据导出到其他数据系统


## 插件是如何工作的？

一个插件主要包括可以由DevLake核心执行的子任务的集合。对于数据源插件，一个子任务可能是从数据源中收集一个实体（例如，来自Jira的问题）。除了子任务，还有一些钩子，插件可以实现自定义其初始化、迁移等。最重要的接口列表见下文。

1. [PluginMeta](https://github.com/apache/incubator-devlake/blob/main/plugins/core/plugin_meta.go) 包含一个插件最少应该实现的接口，只有两个函数；
   - Description() 返回插件的描述
   - RootPkgPath() 返回插件的包路径。
2. [PluginInit](https://github.com/apache/incubator-devlake/blob/main/plugins/core/plugin_init.go) 实现自定义的初始化方法；
3. [PluginTask](https://github.com/apache/incubator-devlake/blob/main/plugins/core/plugin_task.go) 实现自定义准备数据，其在子任务之前执行；
4. [PluginApi](https://github.com/apache/incubator-devlake/blob/main/plugins/core/plugin_api.go) 实现插件自定义的API；
5. [Migratable](https://github.com/apache/incubator-devlake/blob/main/plugins/core/plugin_db_migration.go) 返回插件自定义的数据库迁移的脚本。
6. [PluginModel](https://github.com/apache/incubator-devlake/blob/main/plugins/core/plugin_model.go) 实现允许其他插件通过 GetTablesInfo() 的方法来获取当前插件的全部数据库表的 model 信息。

下图是一个插件执行的流程：

```mermaid
flowchart TD
    subgraph S4[Step4 Extractor 运行流程]
    direction LR
    D4[DevLake]
    D4 -- "Step4.1 创建\n ApiExtractor 并执行" --> E["ExtractXXXMeta.\nEntryPoint"];
    E <-- "Step4.2 读取raw table" --> E2["RawDataSubTaskArgs\n.Table"];
    E -- "Step4.3 解析 RawData" --> ApiExtractor.Extract
    ApiExtractor.Extract -- "返回 gorm 模型" --> E
    end
    subgraph S3[Step3 Collector 运行流程]
    direction LR
    D3[DevLake]
    D3 -- "Step3.1 创建\n ApiCollector 并执行" --> C["CollectXXXMeta.\nEntryPoint"];
    C <-- "Step3.2 创建raw table" --> C2["RawDataSubTaskArgs\n.RAW_BBB_TABLE"];
    C <-- "Step3.3 构造请求query" --> ApiCollectorArgs.\nQuery/UrlTemplate;
    C <-. "Step3.4 通过 ApiClient \n请求并返回HTTP" --> A1["HTTP APIs"];
    C <-- "Step3.5 解析\n并返回请求结果" --> ResponseParser;
    end
    subgraph S2[Step2 DevLake 的自定义插件]
    direction LR
    D2[DevLake]
    D2 <-- "Step2.1 在\`Init\` \n初始化插件" --> plugin.Init;
    D2 <-- "Step2.2 (Optional) 调用\n与返回 migration 脚本" --> plugin.MigrationScripts;
    D2 <-- "Step2.3 (Optional) \n初始化并返回taskCtx" --> plugin.PrepareTaskData;
    D2 <-- "Step2.4 返回\n 需要执行的子函数" --> plugin.SubTaskContext;
    end
    subgraph S1[Step1 DevLake 的运行]
    direction LR
    main -- "通过 \`runner.DirectRun\`\n 移交控制权" --> D1[DevLake];
    end
    S1-->S2-->S3-->S4
```
图中信息非常多，当然并不期望马上就能消化完，仅仅作为阅读后文的参考即可。

## 一起来实现一个最简单的插件

在本节中，我们将介绍如何从头创建一个数据收集插件。要收集的数据是 Apache 项目的所有 Committers 和 Contributors 信息，目的是检查其是否签署了 CLA。我们将通过:

* 请求 `https://people.apache.org/public/icla-info.json` 获取 Committers 信息
* 请求`邮件列表` 获取 Contributors 信息
  我们将演示如何通过 Apache API 请求并缓存所有 Committers 的信息，并提取出结构化的数据。Contributors 的收集仅做一些思路的介绍。


### 一、 创建新的插件

**注意：**在开始之前，请确保DevLake已经能正确启动了。

> 关于插件的其他信息:
> 一般来说, 我们需要这几个目录: `api`, `models` 和 `tasks`
> `api` 实现 `config-ui` 等其他服务所需的api
>
> - connection [example](https://github.com/apache/incubator-devlake/blob/main/plugins/gitlab/api/connection.go)
>      connection model [example](https://github.com/apache/incubator-devlake/blob/main/plugins/gitlab/models/connection.go)
>      `models` 保存数据库模型和Migration脚本. 
>      - entity 
>           data migrations [template](https://github.com/apache/incubator-devlake/tree/main/generator/template/migrationscripts)
>           `tasks` 包含所有子任务
>                 - task data [template](https://github.com/apache/incubator-devlake/blob/main/generator/template/plugin/tasks/task_data.go-template)
>                       - api client [template](https://github.com/apache/incubator-devlake/blob/main/generator/template/plugin/tasks/task_data_with_api_client.go-template)
>
> 注：如果这些概念让你感到迷惑，不要担心，我们稍后会逐一解释。

DevLake 提供了专门的工具 Generator 来创建插件，可以通过运行`go run generator/main.go creat-plugin icla`来构建新插件，创建的时候会需要输入「是否需要默认的apiClient `with_api_client`」和「要收集的网站`endpoint`」。

* `with_api_client`用于选择是否需要通过api_client发送HTTP APIs。
* `endpoint`用于确认插件将请求哪个网站，在本案例中是`https://people.apache.org/`。

![](https://i.imgur.com/itzlFg7.png)

现在我们的插件里有三个文件，其中`api_client.go`和`task_data.go`在子文件夹`tasks/`中。
![1](https://i.imgur.com/zon5waf.png)

接下来让我们试着运行`plugin_main.go`中的`main`函数来启动插件，运行结果应该如下：
```
$go run plugins/icla/plugin_main.go
[2022-06-02 18:07:30]  INFO failed to create dir logs: mkdir logs: file exists
press `c` to send cancel signal
[2022-06-02 18:07:30]  INFO  [icla] start plugin
invalid ICLA_TOKEN, but ignore this error now
[2022-06-02 18:07:30]  INFO  [icla] scheduler for api https://people.apache.org/ worker: 25, request: 18000, duration: 1h0m0s
[2022-06-02 18:07:30]  INFO  [icla] total step: 0
```
😋 没有报错，那就是成功啦~ `plugin_main.go`这里定义了插件，有一些配置是保存在`task_data.go`中。这两个文件就构成了最简单的插件，而文件`api_client.go`后面会用来发送HTTP APIs。

### 二、 创建数据收集子任务
在开始创建之前，我们需要先了解一下子任务的执行过程。

1. Apache DevLake会调用`plugin_main.PrepareTaskData()`，准备一些子任务所需要的环境数据，本项任务中需要创建一个apiClient。
2. Apache DevLake接着会调用定义在`plugin_main.SubTaskMetas()`的子任务，子任务都是互相独立的函数，可以用于完成注入发送API请求，处理数据等任务。

> 每个子任务必须在`SubTaskMeta`中定义，并实现其中的SubTaskEntryPoint函数，其结构为 
> ```去
> type SubTaskEntryPoint func(c SubTaskContext) error
> ```
> 更多信息见：https://devlake.apache.org/blog/how-apache-devlake-runs/
>
> 注：如果这些概念让你感到迷惑，跳过跟着一步步做就好。

#### 2.1 创建 Collector 来请求数据

同样的，运行`go run generator/main.go create-collector icla committer`来创建子任务。Generator运行完成后，会自动创建新的文件，并在`plugin_main.go/SubTaskMetas`中激活。

![](https://i.imgur.com/tkDuofi.png)

> - Collector将从HTTP或其他数据源收集数据，并将数据保存到rawLayer中。
> - `httpCollector`的`SubTaskEntryPoint`中，默认会使用`helper.NewApiCollector`来创建新的[ApiCollector](https://github.com/apache/incubator-devlake/blob/main/generator/template/plugin/tasks/api_collector.go-template)对象，并调用其`execute()`来并行收集。
>
> 注：如果这些概念让你感到迷惑，跳过就好。

现在你可以注意到在`plugin_main.go/PrepareTaskData.ApiClient`中有引用`data.ApiClient`，它是Apache DevLake推荐用于从HTTP APIs请求数据的工具。这个工具支持一些很有用的功能，比如请求限制、代理和重试。当然，如果你喜欢，也可以使用`http`库来代替，只示会显得更加繁琐而已。

回到正题，现在的目标是从`https://people.apache.org/public/icla-info.json`收集数据，因此需要完成以下步骤：

1. 
我们已经在之前中把`https://people.apache.org/`填入`tasks/api_client.go/ENDPOINT`了，现在在看一眼确认下。

![](https://i.imgur.com/q8Zltnl.png)

2. 将`public/icla-info.json`填入`UrlTemplate`，删除不必要的迭代器，并在`ResponseParser`中添加`println("receive data:", res)`以查看收集是否成功。

![](https://i.imgur.com/ToLMclH.png)

好了，现在Collector已经创建好了，再次运行`main`来启动插件，如果一切顺利的话，输出应该是这样的：
```bash
[2022-06-06 12:24:52]  INFO  [icla] start plugin
invalid ICLA_TOKEN, but ignore this error now
[2022-06-06 12:24:52]  INFO  [icla] scheduler for api https://people.apache.org/ worker: 25, request: 18000, duration: 1h0m0s
[2022-06-06 12:24:52]  INFO  [icla] total step: 1
[2022-06-06 12:24:52]  INFO  [icla] executing subtask CollectCommitter
[2022-06-06 12:24:52]  INFO  [icla] [CollectCommitter] start api collection
receive data: 0x140005763f0
[2022-06-06 12:24:55]  INFO  [icla] [CollectCommitter] finished records: 1
[2022-06-06 12:24:55]  INFO  [icla] [CollectCommitter] end api collection
[2022-06-06 12:24:55]  INFO  [icla] finished step: 1 / 1
```

从以上日志中，可以看到已经能打印出收到数据的日志了，最后一步是在`ResponseParser`中对响应体进行解码，并将其返回给DevLake，以便将其存储在数据库中。
```go
ResponseParser: func(res *http.Response) ([]json.RawMessage, error) {
    body := &struct {
        LastUpdated string          `json:"last_updated"`
        Committers  json.RawMessage `json:"committers"`
    }{}
    err := helper.UnmarshalResponse(res, body)
    if err != nil {
        return nil, err
    }
    println("receive data:", len(body.Committers))
    return []json.RawMessage{body.Committers}, nil
},
```
再次运行函数`main`，结果如下，此时可以在数据库表`_raw_icla_committer`中看到一条新的数据。
```bash
……
receive data: 272956 /* <- 这个数字表示收到了272956个Committer */
[2022-06-06 13:46:57]  INFO  [icla] [CollectCommitter] finished records: 1
[2022-06-06 13:46:57]  INFO  [icla] [CollectCommitter] end api collection
[2022-06-06 13:46:57]  INFO  [icla] finished step: 1 / 1
```

![](https://i.imgur.com/aVYNMRr.png)

#### 2.2 创建 Extractor，从 rawLayer 中提取数据

> - Extractor将从rawLayer中提取数据并保存到工具db表中。
> - 除了一些具体的处理内容，主流程与采集器类似。

从HTTP API收集的数据目前仅仅保存在表`_raw_XXXX`中，但其使用起来却很不容易。因此我们将继续从其中提取Committer的名字。目前Apache DevLake建议用[gorm](https://gorm.io/docs/index.html)来保存数据，所以我们将用gorm创建一个模型，并将其添加到`plugin_main.go/AutoMigrate()`中。

plugins/icla/models/committer.go
```go
package models

import (
	"github.com/apache/incubator-devlake/models/common"
)

type IclaCommitter struct {
	UserName     string `gorm:"primaryKey;type:varchar(255)"`
	Name         string `gorm:"primaryKey;type:varchar(255)"`
	common.NoPKModel
}

func (IclaCommitter) TableName() string {
	return "_tool_icla_committer"
}
```

plugins/icla/plugin_main.go
![](https://i.imgur.com/4f0zJty.png)

在做完以上步骤以后，就可以再次运行插件，刚定义的数据表`_tool_icla_committer`会自动创建，就像下面的截图。
![](https://i.imgur.com/7Z324IX.png)

接下来，让我们运行`go run generator/main.go create-extractor icla committer`并输入命令行提示的内容，来创建新的子任务。

![](https://i.imgur.com/UyDP9Um.png)

运行完成后，来看看刚才创建的`committer_extractor.go`中的函数`extract`，很明显参数中的`resData.data`是原始数据，我们需要用json解码，并创建`IclaCommitter`模型来保存它们。
```go
Extract: func(resData *helper.RawData) ([]interface{}, error) {
    names := &map[string]string{}
    err := json.Unmarshal(resData.Data, names)
    if err != nil {
        return nil, err
    }
    extractedModels := make([]interface{}, 0)
    for userName, name := range *names {
        extractedModels = append(extractedModels, &models.IclaCommitter{
            UserName: userName,
            Name:     name,
        })fco
    }
    return extractedModels, nil
},
```

再次运行插件，结果如下：
```
[2022-06-06 15:39:40]  INFO  [icla] start plugin
invalid ICLA_TOKEN, but ignore this error now
[2022-06-06 15:39:40]  INFO  [icla] scheduler for api https://people.apache.org/ worker: 25, request: 18000, duration: 1h0m0s
[2022-06-06 15:39:40]  INFO  [icla] total step: 2
[2022-06-06 15:39:40]  INFO  [icla] executing subtask CollectCommitter
[2022-06-06 15:39:40]  INFO  [icla] [CollectCommitter] start api collection
receive data: 272956
[2022-06-06 15:39:44]  INFO  [icla] [CollectCommitter] finished records: 1
[2022-06-06 15:39:44]  INFO  [icla] [CollectCommitter] end api collection
[2022-06-06 15:39:44]  INFO  [icla] finished step: 1 / 2
[2022-06-06 15:39:44]  INFO  [icla] executing subtask ExtractCommitter
[2022-06-06 15:39:46]  INFO  [icla] [ExtractCommitter] finished records: 1
[2022-06-06 15:39:46]  INFO  [icla] finished step: 2 / 2
```
可以看到有两个任务运行完成，同时观察数据库发现，提交者的数据已经保存在_tool_icla_committer中了~
![](https://i.imgur.com/6svX0N2.png)

#### 2.3 子任务 - Converter

注意。这里有两种方式（开源或自己使用）。因此 Converter 不是必须的，但我们鼓励使用它，因为 Converter 和 DomainLayer 非常有助于建立通用的仪表盘。关于 DomainLayer 的更多信息请见：https://devlake.apache.org/docs/DataModels/DevLakeDomainLayerSchema/

> - Converter 将处理 DomainLayer 的数据，并将其保存到 DomainLayer 层中。
> - 使用`helper.NewDataConverter`来创建一个 DataConvertor 的对象，然后调用`execute()`来运行。

#### 2.4 动手试试更多类型的请求吧~
有时 OpenApi 会受到 token 或其他保护，只有获得 token 才来能访问。例如在本案例中，我们只有在登录`private@apahce.com`后，才能收集到关于普通 Contributor 签署ICLA的数据。但这里受限于篇幅，仅仅简单介绍一下如何收集需要授权的数据。

让我们注意`api_client.go`文件，其中`NewIclaApiClient`通过`.env`加载配置了`ICLA_TOKEN`，它让我们可以在`.env`中添加`ICLA_TOKEN=XXXX`，并在`apiClient.SetHeaders()`中使用它来模拟登录状态。代码如下。
![](https://i.imgur.com/dPxooAx.png)

当然，我们可以使用`username/password`来获取模拟登录后的token，试着根据实际情况进行调整即可。

更多相关细节请看https://github.com/apache/incubator-devlake

#### Step 2.5 实现 PluginModel 接口的 GetTablesInfo() 方法

如下gitlab插件示例所示
将所有需要被外部插件访问到的 model 均添加到返回值中。

```golang
var _ core.PluginModel = (*Gitlab)(nil)

func (plugin Gitlab) GetTablesInfo() []core.Tabler {
	return []core.Tabler{
		&models.GitlabConnection{},
		&models.GitlabAccount{},
		&models.GitlabCommit{},
		&models.GitlabIssue{},
		&models.GitlabIssueLabel{},
		&models.GitlabJob{},
		&models.GitlabMergeRequest{},
		&models.GitlabMrComment{},
		&models.GitlabMrCommit{},
		&models.GitlabMrLabel{},
		&models.GitlabMrNote{},
		&models.GitlabPipeline{},
		&models.GitlabProject{},
		&models.GitlabProjectCommit{},
		&models.GitlabReviewer{},
		&models.GitlabTag{},
	}
}
```

#### 2.6 将插件提交给开源社区
恭喜你! 第一个插件已经创建完毕! 🎖 我们鼓励开源贡献~ 接下来还需要学习 migrationScripts 和 domainLayers 来编写规范的、平台无关的代码。更多信息请访问https://devlake.apache.org/docs/DataModels/DevLakeDomainLayerSchema，或联系我们以获得热情洋溢的帮助。

![come on](https://user-images.githubusercontent.com/3294100/178882323-7bae0331-c458-4f34-a63d-af3975b9dd85.jpg)

