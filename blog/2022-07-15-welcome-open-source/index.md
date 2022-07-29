---
title: "拥抱开源指南"
authors: likyh
description: >
  拥抱开源指南

---

# 拥抱开源指南

近年来，开源正在变得越来越火，在很多开发者眼中，「开源」也是非常极客的体现。同时参与开源项目也能给职业发展带来巨大的好处。可一些小伙伴却因为不知道参与的方法和途径没能参与，这里就向大家介绍一下作为开发者，可以怎么拥抱开源软件，以及怎么成为大家认可的开源贡献者。

当然，本文会更多的从大的背景知识上进行叙述，关于代码提交的详细步骤，可以看看这一篇文章：https://mp.weixin.qq.com/s/b1mKPgOm1mnwsBbEBDRvKw 。

## 什么是开源软件

开源是源代码可以任意获取的计算机软件，任何人都能查看、修改和分发他们认为合适的代码，但这并不意味着可以使用源代码而没有任何著作权或发行权的约束，我们接触到的开源软件一般都有对应的开源许可证（Open Source License）对软件的使用、复制、修改和再发布等进行限制。许可证即授权条款，开源许可证就是说明这些限制的文件，常见的开源许可证主要有 Apache、MIT、BSD、GPL、LGPL、MPL、SSPL 等。

下面，我们通过一张表来简单了解一下常见**宽松**开源许可证之间的区别：

![常见开源许可证之间的区别](http://www.ruanyifeng.com/blogimg/asset/201105/bg2011050101.png)

（图片来自: https://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html）

其中，Apache 许可证（Apache License）是目前全球最大的开源软件基金会之一ASF (Apache Software Foundation) 发布的License。这是一个最初为 Apache http 服务器而撰写。此许可证最新版本于 2004 年 1 月发布，并要求所有ASF的项目均采用此项License。

## 寻找运行良好的开源项目

目前，开源项目主要是两类，一类由团队自行维护，一类由特定的基金会运行。现在大部分项目均托管在 GitHub 上，因此在GitHub上直接搜索点赞较高较活跃的项目，往往就是一个不错的选择。比如想参与数据分析相关的项目，可以在GitHub搜索 data analyzes，注意观察项目最近的提交时间和issue数量，更新快说明项目成员活跃，有issue说明是一个正在快速发展的项目，更适合参与。

![image](https://user-images.githubusercontent.com/3294100/177321877-e1b295a9-2e33-499d-98d8-0a789f96c375.png)

第二种寻找方式，由开源基金会维护的运行良好的项目，还可以在对应的开源基金会官网找到。

比如Linux基金会的项目地址：https://www.linuxfoundation.org/projects/

![Linux基金会的项目地址](https://user-images.githubusercontent.com/3294100/177315987-75429570-d357-4170-aa81-755cf93690b6.png)

比如CNCF的项目页：https://landscape.cncf.io/

![CNCF的项目页](https://user-images.githubusercontent.com/3294100/177316817-2818565d-ae07-4f1a-9c9d-a3b334276714.png)

比如ASF的项目页：https://projects.apache.org/projects.html

![ASF的项目页](https://user-images.githubusercontent.com/3294100/177317430-35c08429-9d18-44f9-9e4b-b3172527572d.png)

最后，还有一些第三方的评估面板，从一些独特的视角了解现存的开源项目。
比如ossinsight：https://ossinsight.io/collections/open-source-database ，可以了解本月点赞最多的项目有些什么，
![ossinsight](https://user-images.githubusercontent.com/3294100/179458318-bc6d753c-01da-41e5-b059-ea1a8d888e80.png)
再比如从 DevLake 的 [OSS 项目面板](https://grafana-oss.demo.devlake.io/d/KXWvOFQnz/github_basic_metrics?orgId=1&var-repo_id=github:GithubRepo:482676524&from=1642498327554&to=1658136727554) 更加深入的了解项目，这都是了解开源项目运行状况的有效途径。
![devlake oss](https://user-images.githubusercontent.com/3294100/179483669-cc954d0c-68ed-4af3-8170-9cf4f0f16abd.png)


## Apache开源软件基金会

因为笔者更了解 ASF ，所以这里就对它做一些更详细的介绍。

Apache 开源基金会目前维护着380余个开源项目，但一年的开销仅一百多万美元左右。这是一个非常低的数（而其他基金会比如Linux基金会，每年开销在上亿美元），平均每个项目仅2000余美元，这就决定了Apache的开源项目更依赖社区和开源贡献者，在Apache社区中，「Community over Code」即社区先于编码体现得淋漓尽致。Apache 基金会每年的支出其中80%用在**基础设施**，其余会用在**营销、宣传和品牌管理服务，研讨会和发展社区，法律咨询等方面**，而其他诸如日常维护、编码等工作均由各个项目的成员维护。

Apache开源项目中，一般有如下几个基本的角色：

* Contributor
    普通贡献者，这种就是很容易获得，只需要提交一个PR并被官方合并到主分支即可获得，例如提交一个文档，修改几行代码就行。

* Committer 
    核心开发，对贡献特别大的 Contributor，官方社区会考虑将其吸收，提升到commiter，成为核心开发，此时就有项目的写入权限，**并可以申请@apache.com结尾的邮箱**。

* PMC
    开源项目决策成员。



## 参与项目讨论

一旦选择好一个开源项目后，我们又该如何找到组织呢？

首先是阅读官方文档，全面了解该项目的架构设计文档和解决的问题，之后可以尝试参与项目日常的讨论。尽管在微信群中提问很方便，但 Apache 项目的大部分讨论需要公开地在邮件列表中进行，方便所有人查看及查询，因此我们也需要了解如何参与 Apache 的邮件讨论。

Apache下面的每一个项目都有自己的邮件列表，同时分不同的邮件组，以Apache DevLake为例，有如下订阅列表：

| 邮箱                                                         | 用途                                       |
| :----------------------------------------------------------- | :----------------------------------------- |
| [user-subscribe@devlake.apache.org](mailto:user-subscribe@devlake.apache.org) | 订阅该邮件可以参与讨论普通用户遇到的问题   |
| [dev-subscribe@devlake.apache.org](mailto:dev-subscribe@devlake.apache.org) | 订阅该邮件可以参与讨论**开发者**遇到的问题 |
| commits-subscribe@devlake.apache.org                         | 所有的代码的提交变动信息都会发到该邮件     |

具体操作是首先给dev-subscribe@devlake.apache.org发一封邮件，等收到确认邮件后再次确认即可。

添加后就可以收到所有开发讨论的信息了，另外也可以关注官网的 maillist(https://lists.apache.org/list.html?dev@devlake.apache.org) 查看全部历史邮件。

另外，大部分项目会有一些线上的聚会，往往可以在Readme页面找到，参与线上聚会可以更直接的获取所需的信息，也能有机会和项目PMC直接交流。

## 向开源项目反馈问题

如果在项目的使用中，遇到了 bug，或者希望撸起袖子修改某个功能点，但这个功能点需要进一步讨论。可以在前面的邮件中发起讨论，当然也可以在 GitHub 的 issue 中做一个较正式的记录。

一般的项目都会针对不同的目的，提供一些 issue 创建的模板。

![create issue](https://user-images.githubusercontent.com/3294100/178148411-fc570ab5-91e8-4c13-984a-99dc19604d35.png)

常见的类型有：

* Bug 提出一个功能实现的错误
* Document Issue 提出一项文档改进的建议
* Feature Request 请求增加或表示你将增加一个产品特性
* Refactor 发起一项不影响功能的重构
* Security Vulnerability 报告一个安全问题，在问题修复以前，该问题不会公布。

提出一个清晰明了的 issue 往往会让社区的其他成员更愿意响应你的号召，相信我，这会是一个非常享受的过程~

## 成为项目的贡献者

在参与讨论的基础上，只要能在 GitHub 社区中帮助验证一些发布的新功能或者提一些建议或者缺陷，或者修改源码，就能成为该项目的贡献者(Contributor)。

刚参与项目时，可以考虑编写文档，或完善一些模块的单元测试，或者进行一些简单编码工作。比如可以在 GitHub Issues 列表中寻找带有`good first issue`标记且暂未被认领的事情，这往往是社区维护者为了引导贡献者专门创建的issue，很适合作为第一个提交。完成第一个提交后，可以再去看看其他open的issue并解决。

目前开源项目一般采用 Git 来管理源代码，如果你从未使用过代码管理工具的话，可以现在网上寻找教程了解，比如：https://www.liaoxuefeng.com/wiki/896043488029600 。一般的提交流程是：先 fork 对应的项目，在 fork 项目提交代码后，向开源项目发起代码合并请求等待合并。

需要注意的是，任何代码提交后，都不会立刻合并，需要寻找社区维护者 Review 后才会进入主干。

### 编写好代码的注意事项

![img](http://p0.itc.cn/images01/20200714/7a66a58fb11448198086e1976887bfe3.png)

（图片来自网络）

代码不是写完就好，还需要其他人阅读的。因此，写出赏心悦目的代码很值得点赞，当然，水平的提升总是有一个过程，因此任何开源项目都是鼓励尝试与提升的过程。这里就只说几点更容易得到社区成员帮助的注意事项：

1. 写完代码提交 PR 后，注意在 PR 描述中补充完善的编码思路和背景知识，这会让其他成员更容易了解修改目标；
2. 注意控制 PR 的大小，一个小的 PR 更容易让其他人了解全部修改项，如果有一个大的功能，可以按照模块拆成几个能分别运行的 PR；
3. 注意补充适当的单元测试，因为 Reviewer 并不负责确定代码能跑，只负责看代码设计思路是否正确。因此增加合适的测试，能让 Reviewer 确定这段代码是可以运行的。有时 Reviewer 也会针对容易出错的地方提出补充测试的建议。

![img](http://p2.itc.cn/images01/20200714/29be57703b6c408588a9efec2e5fcb76.png)

（图片来自网络，超大的提交会让 Reviewer 欲仙欲死的 😹）

### Code Review 常见术语

在提交代码与Code Review的过程中，有时会遇到下面这些缩写，了解后参与开源社区更轻松。

| 缩写      | 全称                      | 使用场景                                                     |
| --------- | ------------------------- | ------------------------------------------------------------ |
| -         | I'll take it.             | 表示会尝试做这个任务                                         |
| PR/MR/CR  | Pull/Merge/Change Request | 如果要提交代码给开源项目，就会发起一个合并请求，在不同平台有不同的名字，但都是同一个东西 |
| WIP       | Work In Progress          | 表示PR尚未完成，暂时还不需要review                           |
| PTAL      | Please Take A Look        | 请求项目维护人员进行 code review                             |
| TBD       | To Be Done                | 提示有一个事情需要完成                                       |
| TL;DR     | Too Long; Didn't Read     | 太长了，懒得看。也有时在文档中用作概览信息的标题             |
| LGTM/SGTM | Looks/Sounds Good To Me   | 表示review完并觉得可以合并了，即Approve的意思                |
| CC to     | Carbon Copy to            | 抄送给                                                       |

顺便再说几个 GitHub 中实用的小技巧：

1. 如果你的 PR 解决了某个 issue，可以在描述中加上 close #1234，1234需要改成对应的issue号，在 PR 合并时该issue也会同时关闭（[更多信息](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword#linking-a-pull-request-to-an-issue-using-a-keyword)）
    ![image-20220710215354120](https://user-images.githubusercontent.com/3294100/178149926-f4f647e4-3765-47be-8b3a-9b19381294dd.png)
2. GitHub 的 Markdown 编辑器可以将默认字体设置为等宽字体，便于代码的书写，具体设置为： **Settings** -  **Appearance** - **Use a fixed-width (monospace) font when editing Markdown**. （[更多信息](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/about-writing-and-formatting-on-github)）
    ![Screenshot showing the GitHub comment field with fixed width fonts enabled](https://docs.github.com/assets/cb-14573/images/help/writing/enable-fixed-width.png)
3. 当发现一个 issue 和其他 issue 重复时，可以设置在评论区留下 Duplicate of #1234 来标记与某个issue重复（[更多信息](https://docs.github.com/en/issues/tracking-your-work-with-issues/marking-issues-or-pull-requests-as-a-duplicate)）
    ![Duplicate issue syntax](https://docs.github.com/assets/cb-29676/images/help/issues/duplicate-issue-syntax.png)

## 结语

好啦，大体的情况应该介绍的差不多了，其实参与开源项目并没有想象中的难，成为一个开源项目的Commiter，给职场和技术实力带来的助力将不可估量。另外，如果你还是较为初级的开发者，迫切的想要知道具体的参与步骤，可以看看开头提到的这篇文章：https://mp.weixin.qq.com/s/b1mKPgOm1mnwsBbEBDRvKw 。

我们的 DevLake (https://github.com/apache/incubator-devlake)  和 DevStream (https://github.com/devstream-io/devstream) 也是优秀的开源项目，欢迎你的参与哦~ 
