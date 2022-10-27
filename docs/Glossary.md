---
sidebar_position: 7
title: "Glossary"
linkTitle: "Glossary"
description: >
  DevLake Glossary
---

*Last updated: May 16 2022*


## In Configuration UI (Regular Mode)

The following terms are arranged in the order of their appearance in the actual user workflow.

### Projects
**A project is a set of related [Data Scopes](#data-scope), the Data Scopes may contains different [Data Entities](#data-entities) from arbitrary [Data Sources](#data-sources) for Metric Computation**

Project was introduced in v0.15 to solve some complex metric computation problems. For example, There was a **Change Failure Rate** in [DORA Metric](../UserManuals/DORA) which requires connecting Incident(issue.type = 'INCIDENT') to its related Deployment(cicd_task.type = 'DEPLOYMENT') to determine whether a Deployment failed or not. Unfortunately, most data sources do not offer this relationship, the only reasonable approach so far is to connect Incident to its Closest Deployment, without Project, 

A project consists of the following elements:
A set of Metrics(currently, only DORA)
A [Blueprint](#blueprints) for active data collection
A set of Incoming Webhooks for passive data collection

### Blueprints
**A blueprint is the plan that covers all the work to get your raw data ready for query and metric computation in the dashboards.** Creating a blueprint consists of four steps:
1. **Adding [Data Connections](Glossary.md#data-connections)**: For each [data source](Glossary.md#data-sources), one or more data connections can be added to a single blueprint, depending on the data you want to sync to DevLake.
2. **Setting the [Data Scope](Glossary.md#data-scope)**: For each data connection, you need to configure the scope of data, such as GitHub projects, Jira boards, and their corresponding [data entities](Glossary.md#data-entities).
3. **Adding [Transformation Rules](Glossary.md#transformation-rules) (optional)**: You can optionally apply transformation for the data scope you have just selected, in order to view more advanced metrics.
3. **Setting the Sync Frequency**: You can specify the sync frequency for your blueprint to achieve recurring data syncs and transformation. Alternatively, you can set the frequency to manual if you wish to run the tasks in the blueprint manually.

The relationship among Blueprint, Data Connections, Data Scope and Transformation Rules is explained as follows:

![Blueprint ERD](/img/Glossary/blueprint-erd.svg)
- Each blueprint can have multiple data connections.
- Each data connection can have multiple sets of data scope.
- Each set of data scope only consists of one GitHub/GitLab project or Jira board, along with their corresponding data entities.
- Each set of data scope can only have one set of transformation rules.

### Data Sources
**A data source is a specific DevOps tool from which you wish to sync your data, such as GitHub, GitLab, Jira and Jenkins.**

DevLake normally uses one [data plugin](Glossary.md#data-plugins) to pull data for a single data source. However, in some cases, DevLake uses multiple data plugins for one data source for the purpose of improved sync speed, among many other advantages. For instance, when you pull data from GitHub or GitLab, aside from the GitHub or GitLab plugin, Git Extractor is also used to pull data from the repositories. In this case, DevLake still refers GitHub or GitLab as a single data source.

### Data Connections
**A data connection is a specific instance of a data source that stores information such as `endpoint` and `auth`.** A single data source can have one or more data connections (e.g. two Jira instances). Currently, DevLake supports one data connection for GitHub, GitLab and Jenkins, and multiple connections for Jira.

You can set up a new data connection either during the first step of creating a blueprint, or in the Connections page that can be accessed from the navigation bar. Because one single data connection can be reused in multiple blueprints, you can update the information of a particular data connection in Connections, to ensure all its associated blueprints will run properly. For example, you may want to update your GitHub token in a data connection if it goes expired.

### Data Scope
**In a blueprint, each data connection can have multiple sets of data scope configurations, including GitHub or GitLab projects, Jira boards and their corresponding [data entities](Glossary.md#data-entities).** The fields for data scope configuration vary according to different data sources.

Each set of data scope refers to one GitHub or GitLab project, or one Jira board and the data entities you would like to sync for them, for the convenience of applying transformation in the next step. For instance, if you wish to sync 5 GitHub projects, you will have 5 sets of data scope for GitHub.

To learn more about the default data scope of all data sources and data plugins, please refer to [Supported Data Sources](./SupportedDataSources.md).

### Data Entities
**Data entities refer to the data fields from one of the five data domains: Issue Tracking, Source Code Management, Code Review, CI/CD and Cross-Domain.**

For instance, if you wish to pull Source Code Management data from GitHub and Issue Tracking data from Jira, you can check the corresponding data entities during setting the data scope of these two data connections.

To learn more details, please refer to [Domain Layer Schema](./DataModels/DevLakeDomainLayerSchema.md).

### Transformation Rules
**Transformation rules are a collection of methods that allow you to customize how DevLake normalizes raw data for query and metric computation.** Each set of data scope is strictly accompanied with one set of transformation rules. However, for your convenience, transformation rules can also be duplicated across different sets of data scope.

DevLake uses these normalized values in the transformation to design more advanced dashboards, such as the Weekly Bug Retro dashboard. Although configuring transformation rules is not mandatory, if you leave the rules blank or have not configured correctly, only the basic dashboards (e.g. GitHub Basic Metrics) will be displayed as expected, while the advanced dashboards will not.

### Historical Runs
**A historical run of a blueprint is an actual execution of the data collection and transformation [tasks](Glossary.md#tasks) defined in the blueprint at its creation.** A list of historical runs of a blueprint is the entire running history of that blueprint, whether executed automatically or manually. Historical runs can be triggered in three ways:
- By the blueprint automatically according to its schedule in the Regular Mode of the Configuration UI
- By running the JSON in the Advanced Mode of the Configuration UI
- By calling the API `/pipelines` endpoint manually

However, the name Historical Runs is only used in the Configuration UI. In DevLake API, they are called [pipelines](Glossary.md#pipelines).

## In Configuration UI (Advanced Mode) and API

The following terms have not appeared in the Regular Mode of Configuration UI for simplification, but can be very useful if you want to learn about the underlying framework of Devalke or use Advanced Mode and the DevLake API.

### Data Plugins
**A data plugin is a specific module that syncs or transforms data.** There are two types of data plugins: Data Collection Plugins and Data Transformation Plugins.

Data Collection Plugins pull data from one or more data sources. DevLake supports 8 data plugins in this category: `ae`, `feishu`, `gitextractor`, `github`, `gitlab`, `jenkins`, `jira` and `tapd`.

Data Transformation Plugins transform the data pulled by other Data Collection Plugins. `refdiff` is currently the only plugin in this category.

Although the names of the data plugins are not displayed in the regular mode of DevLake Configuration UI, they can be used directly in JSON in the Advanced Mode.

For detailed information about the relationship between data sources and data plugins, please refer to [Supported Data Sources](./SupportedDataSources.md).


### Pipelines
**A pipeline is an orchestration of [tasks](Glossary.md#tasks) of data `collection`, `extraction`, `conversion` and `enrichment`, defined in the DevLake API.** A pipeline is composed of one or multiple [stages](Glossary.md#stages) that are executed in a sequential order. Any error occurring during the execution of any stage, task or subtask will cause the immediate fail of the pipeline.

The composition of a pipeline is explained as follows:
![Blueprint ERD](/img/Glossary/pipeline-erd.svg)
Notice: **You can manually orchestrate the pipeline in Configuration UI Advanced Mode and the DevLake API; whereas in Configuration UI regular mode, an optimized pipeline orchestration will be automatically generated for you.**


### Stages
**A stages is a collection of tasks performed by data plugins.** Stages are executed in a sequential order in a pipeline.

### Tasks
**A task is a collection of [subtasks](Glossary.md#subtasks) that perform any of the `collection`, `extraction`, `conversion` and `enrichment` jobs of a particular data plugin.** Tasks are executed in a parallel order in any stages.

### Subtasks
**A subtask is the minimal work unit in a pipeline that performs in any of the four roles: `Collectors`, `Extractors`, `Converters` and `Enrichers`.** Subtasks are executed in sequential orders.
- `Collectors`: Collect raw data from data sources, normally via DevLake API and stored into `raw data table`
- `Extractors`: Extract data from `raw data table` to `domain layer tables`
- `Converters`: Convert data from `tool layer tables` into `domain layer tables`
- `Enrichers`: Enrich data from one domain to other domains. For instance, the Fourier Transformation can examine `issue_changelog` to show time distribution of an issue on every assignee.
