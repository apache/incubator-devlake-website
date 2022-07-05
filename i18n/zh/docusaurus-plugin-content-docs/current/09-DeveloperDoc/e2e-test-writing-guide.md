# 如何为插件编写E2E测试

## 为什么要写 E2E 测试

E2E 测试，作为自动化测试的一环，一般是指文件与模块级别的黑盒测试，或者允许使用一些数据库等外部服务的单元测试。书写E2E测试的目的是屏蔽一些内部实现逻辑，仅从数据正确性的角度来看同样的外部输入，是否可以得到同样的输出。另外，相较于黑盒的集成测试来说，可以避免一些网络等因素带来的偶然问题。更多关于插件的介绍，可以在这里获取更多信息： 为什么要编写 E2E 测试（未完成）
在 DevLake 中，E2E 测试包含接口测试和插件 Extract/Convert 子任务的输入输出结果验证，本篇仅介绍后者的编写流程。

## 准备数据

我们这里以一个简单的插件——飞书会议时长收集举例，他的目录结构目前是这样的。
![image](https://user-images.githubusercontent.com/3294100/175061114-53404aac-16ca-45d1-a0ab-3f61d84922ca.png)
接下来我们将进行次插件的 E2E 测试的编写。

编写测试的第一步，就是运行一下对应插件的 Collect 任务，完成数据的收集，也就是让数据库的`_raw_feishu_`开头的表中，保存有对应的数据。
以下是采用 DirectRun (cmd) 运行方式的运行日志和数据库结果。

```
$ go run plugins/feishu/main.go --numOfDaysToCollect 2 --connectionId 1 （注意：随着版本的升级，命令可能产生变化）
[2022-06-22 23:03:29]  INFO failed to create dir logs: mkdir logs: file exists
press `c` to send cancel signal
[2022-06-22 23:03:29]  INFO  [feishu] start plugin
[2022-06-22 23:03:33]  INFO  [feishu] scheduler for api https://open.feishu.cn/open-apis/vc/v1 worker: 13, request: 10000, duration: 1h0m0s
[2022-06-22 23:03:33]  INFO  [feishu] total step: 2
[2022-06-22 23:03:33]  INFO  [feishu] executing subtask collectMeetingTopUserItem
[2022-06-22 23:03:33]  INFO  [feishu] [collectMeetingTopUserItem] start api collection
[2022-06-22 23:03:34]  INFO  [feishu] [collectMeetingTopUserItem] finished records: 1
[2022-06-22 23:03:34]  INFO  [feishu] [collectMeetingTopUserItem] end api collection error: %!w(<nil>)
[2022-06-22 23:03:34]  INFO  [feishu] finished step: 1 / 2
[2022-06-22 23:03:34]  INFO  [feishu] executing subtask extractMeetingTopUserItem
[2022-06-22 23:03:34]  INFO  [feishu] [extractMeetingTopUserItem] get data from _raw_feishu_meeting_top_user_item where params={"connectionId":1} and got 148
[2022-06-22 23:03:34]  INFO  [feishu] [extractMeetingTopUserItem] finished records: 1
[2022-06-22 23:03:34]  INFO  [feishu] finished step: 2 / 2
```

<img width="993" alt="image" src="https://user-images.githubusercontent.com/3294100/175064505-bc2f98d6-3f2e-4ccf-be68-a1cab1e46401.png"/>
好的，目前数据已经被保存到了`_raw_feishu_*`表中，`data`列就是插件运行的返回信息。这里我们只收集了最近2天的数据，数据信息并不多，但也覆盖了各种情况，即同一个人不同天都有数据。

另外值得一提的是，插件跑了两个任务，`collectMeetingTopUserItem`和`extractMeetingTopUserItem`，前者是收集数据的任务，是本次需要跑的，后者是解析数据的任务，是本次需要测试的。在准备数据环节是否运行无关紧要。

接下来我们需要将数据导出为.csv格式，这一步很多种方案，大家可以八仙过海各显神通，我这里仅仅介绍几种常见的方案。

### DevLake Code Generator 导出

直接运行`go run generator/main.go create-e2e-raw`，根据指引来完成导出。此方案最简单，但也有一定的局限性，比如导出的字段是固定的，如果需要更多的自定义选项，可以参考接下来的方案。

![usage](https://user-images.githubusercontent.com/3294100/175849225-12af5251-6181-4cd9-ba72-26087b05ee73.gif)

### GoLand Database 导出

![image](https://user-images.githubusercontent.com/3294100/175067303-7e5e1c4d-2430-4eb5-ad00-e38d86bbd108.png)

这种方案很简单，无论使用Postgres或者MySQL，都不会出现什么问题。
![image](https://user-images.githubusercontent.com/3294100/175068178-f1c1c290-e043-4672-b43e-54c4b954c685.png)
csv导出的成功标准就是go程序可以无误的读取，因此有以下几点值得注意：

1. csv文件中的值，可以用双引号包裹，避免值中的逗号等特殊符号破坏了csv格式
2. csv文件中双引号转义，一般是`""`代表一个双引号
3. 注意观察data是否是真实值，而不是base64后的值

导出后，将.csv文件放到`plugins/feishu/e2e/raw_tables/_raw_feishu_meeting_top_user_item.csv`。

### MySQL Select Into Outfile

这是 MySQL 将查询结果导出为文件的方案。目前docker-compose.yml中启动的MySQL，是带有--security参数的，因此不允许`select ... into outfile`，首先需要关闭安全参数，关闭方法大致如下图：
![origin_img_v2_c809c901-01bc-4ec9-b52a-ab4df24c376g](https://user-images.githubusercontent.com/3294100/175070770-9b7d5b75-574b-49ed-9bca-e9f611f60795.jpg)
关闭后，使用`select ... into outfile`导出csv文件，导出结果大致如下图：
![origin_img_v2_ccfdb260-668f-42b4-b249-6c2dd45816ag](https://user-images.githubusercontent.com/3294100/175070866-2204ae13-c058-4a16-bc20-93ab7c95f832.jpg)
可以注意到，data字段多了hexsha字段，需要人工将其转化为字面量。

### Vscode Database

这是 Vscode 将查询结果导出为文件的方案，但使用起来并不容易。以下是不修改任何配置的导出结果
![origin_img_v2_c9eaadaa-afbc-4c06-85bc-e78235f7eb3g](https://user-images.githubusercontent.com/3294100/175071987-760c2537-240c-4314-bbd6-1a0cd85ddc0f.jpg)
但可以明显发现，转义符号并不符合csv规范，并且data并没有成功导出，调整配置且手工替换`\"`为`""`后，得到如下结果。
![image](https://user-images.githubusercontent.com/3294100/175072314-954c6794-3ebd-45bb-98e7-60ddbb5a7da9.png)
此文件data字段被base64编码，因此需要人工将其解码为字面量。解码成功后即可使用

### MySQL workerbench

此工具必须要自己书写SQL完成数据的导出，可以模仿以下SQL改写：
```sql
SELECT id, params, CAST(`data` as char) as data, url, input,created_at FROM _raw_feishu_meeting_top_user_item;
```
![image](https://user-images.githubusercontent.com/3294100/175080866-1631a601-cbe6-40c0-9d3a-d23ca3322a50.png)
保存格式选择csv，导出后即可直接使用。

### Postgres Copy with csv header;

`Copy(SQL语句) to '/var/lib/postgresql/data/raw.csv' with csv header;`是PG常用的导出csv方法，这里也可以使用。
```sql
COPY (
SELECT id, params, convert_from(data, 'utf-8') as data, url, input,created_at FROM _raw_feishu_meeting_top_user_item
) to '/var/lib/postgresql/data/raw.csv' with csv header;
```
使用以上语句，完成文件的导出。如果你的pg运行在docker中，那么还需要使用 `docker cp`命令将文件导出到宿主机上以便使用。

## 编写E2E测试

首先需要创建测试环境，比如这里创建了`meeting_test.go`
![image](https://user-images.githubusercontent.com/3294100/175091380-424974b9-15f3-457b-af5c-03d3b5d17e73.png)
接着在其中输入测试准备代码，如下。其大意为创建了一个`feishu`插件的实例，然后调用`ImportCsvIntoRawTable`将csv文件的数据导入`_raw_feishu_meeting_top_user_item`表中。
```go
func TestMeetingDataFlow(t *testing.T) {
	var plugin impl.Feishu
	dataflowTester := e2ehelper.NewDataFlowTester(t, "feishu", plugin)

	// import raw data table
	dataflowTester.ImportCsvIntoRawTable("./raw_tables/_raw_feishu_meeting_top_user_item.csv", "_raw_feishu_meeting_top_user_item")
}
```
导入函数的签名如下：
```func (t *DataFlowTester) ImportCsvIntoRawTable(csvRelPath string, rawTableName string)```
他有一个孪生兄弟，仅仅是参数略有区别。
```func (t *DataFlowTester) ImportCsvIntoTabler(csvRelPath string, dst schema.Tabler)```
前者用于导入raw layer层的表，后者用于导入任意表。
**注意：** 另外这两个函数会在导入数据前，先删除数据表并使用`gorm.AutoMigrate`重新表以达到清除表数据的目的。

导入数据完成后，可以尝试运行，目前没有任何测试逻辑，因此一定是PASS的。接着在`TestMeetingDataFlow`继续编写调用调用`extract`任务的逻辑。

```go
func TestMeetingDataFlow(t *testing.T) {
	var plugin impl.Feishu
	dataflowTester := e2ehelper.NewDataFlowTester(t, "feishu", plugin)

	taskData := &tasks.FeishuTaskData{
		Options: &tasks.FeishuOptions{
			ConnectionId: 1,
		},
	}

	// import raw data table
	dataflowTester.ImportCsvIntoRawTable("./raw_tables/_raw_feishu_meeting_top_user_item.csv", "_raw_feishu_meeting_top_user_item")

	// verify extraction
	dataflowTester.FlushTabler(&models.FeishuMeetingTopUserItem{})
	dataflowTester.Subtask(tasks.ExtractMeetingTopUserItemMeta, taskData)

}
```
新增的代码包括调用`dataflowTester.FlushTabler`清空`FeishuMeetingTopUserItem`对应的表，调用`dataflowTester.Subtask`模拟子任务`ExtractMeetingTopUserItemMeta`的运行。

现在在运行试试吧，看看子任务`ExtractMeetingTopUserItemMeta`是否能没有错误的完成运行。`extract`运行的数据结果一般来自raw表，因此，插件子任务编写如果没有差错的话，会正确运行，并且可以在 toolLayer 层的数据表中观察到数据成功解析，在本案例中，即`_tool_feishu_meeting_top_user_items`表中有正确的数据。

如果运行不正确，那么需要先排查插件本身编写的问题，然后才能进入下一步。

## 验证运行结果是否正确

我们继续编写测试，在测试函数的最后，继续加上如下代码
```go

func TestMeetingDataFlow(t *testing.T) {
    ……
    
    dataflowTester.VerifyTable(
      models.FeishuMeetingTopUserItem{},
      "./snapshot_tables/_tool_feishu_meeting_top_user_items.csv",
      []string{"connection_id", "start_time", "name"},
      []string{
        "meeting_count",
        "meeting_duration",
        "user_type",
        "_raw_data_params",
        "_raw_data_table",
        "_raw_data_id",
        "_raw_data_remark",
      },
    )
}
```
它的功能是调用`dataflowTester.VerifyTable`完成数据结果的验证。第三个参数是表的主键，第四个参数是表所有需要验证的字段。用于验证的数据存在`./snapshot_tables/_tool_feishu_meeting_top_user_items.csv`中，当然，目前此文件还不存在。

为了方便生成前述文件，DevLake采取了一种称为`Snapshot`的测试技术，在调用`VerifyTable`文件且csv不存在时，将会根据运行结果自动生成文件。

但注意！自动生成后并不是高枕无忧，还需要做两件事：1. 检查文件生成是否正确 2. 再次运行，以便于确定生成结果和再次运行的结果没有差错。
这两项操作非常重要，直接关系到测试编写的质量，我们应该像对待代码文件一样对待`.csv`格式的 snapshot 文件。

如果这一步出现了问题，一般会是2种问题，
1. 验证的字段中含有类似create_at运行时间或者自增id的字段，这些无法重复验证的字段应该排除。
2. 运行的结果中存在`\n`或`\r\n`等转义不匹配的字段，一般是解析`httpResponse`时出现的错误，可以参考如下方案解决：
    1. 修改api模型中，内容的字段类型为`json.RawMessage`
    2. 在解析时再将其转化为string
    3. 如此操作，即可原封不动的保存`\n`符号，避免数据库或操作系统对换行符的解析


比如在`github`插件中，是这么处理的：
![image](https://user-images.githubusercontent.com/3294100/175098219-c04b810a-deaf-4958-9295-d5ad4ec152e6.png)
![image](https://user-images.githubusercontent.com/3294100/175098273-e4a18f9a-51c8-4637-a80c-3901a3c2934e.png)

好了，到这一步，E2E的编写就完成了。我们本次修改一共新增了3个文件，就完成了对会议时长收集任务的测试，是不是还挺简单的~
![image](https://user-images.githubusercontent.com/3294100/175098574-ae6c7fb7-7123-4d80-aa85-790b492290ca.png)

## 像 CI 一样运行所有插件的 E2E 测试

非常简单，只需要运行`make e2e-plugins`，因为DevLake已经将其固化为一个脚本了~

  
