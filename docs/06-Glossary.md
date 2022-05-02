---
sidebar_position: 06
title: "Glossary"
linkTitle: "Glossary"
tags: []
categories: []
weight: 6
description: >
  DevLake Glossary
---

*Last updated: May 2 2022*


## In Configuration UI (Regular Mode)

The following terms are arranged in the order of their appearance in the actual user workflow.

### Blueprints
**A blueprint is the plan that covers all the work to get your raw data ready for query and metric computaion in the dashboards.** Creating a blueprint consists of three steps:
1. **Adding [Data Connections](06-Glossary.md#data-connections)**: For each [data source](06-Glossary.md#data-sources), one or more data connections can be added to a single blueprint, depending on the data you want to sync to DevLake.
2. **Setting [Data Scope](06-Glossary.md#data-scope) and [Transformation Rules](06-Glossary.md#transformation-rules)**: For each data connection, you need to configure the scope of data and their corresponding transformation rules for the optimized display of metrics in the dashboards. 
3. **Setting up a Schedule**: You can set up a schedule for your blueprint to achieve recurring data syncs and transformation at a certain frequency. Alternatively, you can set the schedule to Manual if you wish to run the tasks in the blueprint manually.

The relationship among Blueprint, Data Connection, Data Scope and Transformation Rules is explained as follows:

### Data Sources
**A data source is a specific DevOps tool from which you wish to sync your data, such as GitHub, GitLab, Jira and Jenkins.** 

DevLake normally uses one [data plugin](06-Glossary.md#data-plugins) to pull data for a single data source. However, in some cases, DevLake uses multiple data plugins for one data source for the purpose of improved sync speed, among many other advantages. For instance, when you pull data from GitHub or GitLab, aside from the GitHub or GitLab plugin, Git Extractor is also used to pull data from the repositories. In this case, DevLake still refers GitHub or GitLab as a single data source.

### Data Connections
**A data connection is a specific instance of a data source that stores information such as `endpoint` and `auth`.** A single data source can have one or more data connections (e.g. two Jira instances). Currently, DevLake supports one data connection for GitHub, GitLab and Jenkins, and multiple connections for Jira. 

You can set up a new data connection either during the first step of creating a blueprint, or in Connections in the navigation menu. Because one single data connection can be resued in multiple blueprints, you can update the information of a particular data connection in Connections, to ensure all its associated blueprints will run properly. For example, you may want to update your GitHub token in a data connection if it goes expired.

### Data Scope
**In a blueprint, each data connection has its own set of data scope configurations.** For instance, the data scope settings of a GitHub connection consists of two parts: repository names ({user_name/repo_name}) and [data entities](06-Glossary.md#data-entities) (e.g. Issue Tracking, Source Code Management).

The data scope for any data connection is defined in the second step of creating a blueprint.

To learn more about the default data scope of each data source or data plugin, please refer to [Data Support](04-DataModels/02-DataSources.md).

### Data Entities
**Data entities refer to the domain entities of the five domains(Issue Tracking, Source Code Management, Code Review, CI/CD and Cross-Domain).** Data entities are selected during defining the data scope. For instance, if you wish to pull Source Code Management data from GitHub and Issue Tracking data from Jira, you can check the corresponding data entities during setting the data scope of these two data connections.

Although data entities and domain entities technically can be used interchangeably, data entities are typically used in the DevLake Configuration UI to reduce the learning curves of the DevLake data models. For detailed definition of all data entities/domain entities, please refer to [Domain Layer Schema](04-DataModels/01-DevLakeDomainLayerSchema.md).

### Transformation Rules
**Transformation rules are a collection of configurations that allow you to customize the methods in which DevLake normalizes raw data for query and metric computation.** 


For instance, you can map different values (e.g. your GitHub issue labels) to the DevLake preset values (e.g. Requirement, Bug and Incident). DevLake uses these normalized values to design specialized dashboards, such as the Weekly Bug Retro dashboard. Although configuring transformation rules is not mandatory, if you leave the rules blank or have not configured correctly, only the basic dashboards (e.g. GitHub Basic Metrics) will be displayed as expected, while the specialized dashboards will not.

In a blueprint, the data scope for each data connetion can have one or multiple sets of transformation rules. For instance, you can configure a unified set of transformation rules for a particular GitHub connection with multiple repositories at once; or if you wish to configure a distinct set of rules for each repository (e.g. different labels used in multiple repositories), you can also do so by adding each repository separately to the data connection and configure their individual transformation rules.

### Historical Runs
**A historical run of a blueprint is an actual excecution of the data collection and transformation [tasks](06-Glossary.md#tasks) defined in the blueprint at its creation.** A list of historical runs of a blueprint is the entire running history of that blueprint, whether excecuted automatically or manually. Historical runs can be triggered in three ways: 
- By the blueprint automatically according to its schedule in the Regular Mode of the Configuration UI
- By running the JSON in the Advanced Mode of the Configuration UI
- By calling the API `/pipelines` endpoint manually

However, the name Historical Runs is only used in the Configuration UI for user-friendly purposes. In DevLake API, they are called [pipelines](06-Glossary.md#pipelines).

## In Configuration UI (Advanced Mode) and API

The following terms have not appeared in the Regular Mode of Configuration UI for simplification, but can be very useful if you want to learn about the underlying framework of Devalke or use Advanced Mode and the DevLake API.

### Data Plugins
**A data plugin is a specific module that syncs or transforms data.** There are two types of data plugins: Data Collection Plugins and Data Transformation Plugins.

Data Collection Plugins pull data from one or more data sources. DevLake supports 8 data plugins in this category: `ae`, `feishu`, `gitextractor`, `github`, `gitlab`, `jenkins` and `jira`.

Data Transformation Plugins transform the data pulled by other Data Collection Plugins. `refdiff` is currently the only plugin in this category.

The names of data plugins are not displayed in the regular mode of DevLake Configuration UI for user-friendly purposes, but they can be addressed in JSON in the Advanced Mode.

For detailed information about the relationship between data sources and data plugins, please refer to [Data Support](04-DataModels/02-DataSources.md).


### Pipelines
**A pipeline is an orchestration of [tasks](06-Glossary.md#tasks) of data `collection`, `extraction`, `conversion` and `enrichment`, defined in the DevLake API.** A pipeline is composed of one or multiple [stages](06-Glossary.md#stages) that are executed in a sequential order. Any error occured during the execution of any stage, task or substask will cause the immediate fail of the pipeline.

The composition of a pipeline can be exapline as follows:

### Stages
**A stages is a collection of tasks performed by data plugins.** Stages are executed in a sequential order in a pipeline.

### Tasks
**A task is a collection of [subtasks](06-Glossary.md#subtasks) that perform any of the `collection`, `extraction`, `conversion` and `enrichment` jobs of a particular data plugin.** Tasks are executed in a parralel order in any stages.

### Subtasks
**A subtasks is the minimal work unit in a pipeline that performs any of the four jobs: `collection`, `extraction`, `conversion` and `enrichment`.**
- Collection: the collection of raw data from data sources, normally via DevLake API and stored into `raw data table`
- Extraction: the extraction of data from `raw data table` to `domain layer tables`
- Conversion: the conversion of data from `tool layer tables` into `domain layer tables`
- Enrichment: the enrichment of data from one domain to other domains. For instance, the Fourier Transformation can examine `issue_changelog` to show time distribution of an issue on every assignee.
