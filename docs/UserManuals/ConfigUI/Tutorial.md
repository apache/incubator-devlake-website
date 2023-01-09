---
title: "Tutorial"
sidebar_position: 1
description: Config UI instruction
---

## Overview
The Apache DevLake Config UI allows you to configure the data you wish to collect through a graphical user interface. Visit config-ui at `http://localhost:4000`.

## Creating a Blueprint

### Introduction
A Blueprint is a plan that covers all the work to get your raw data ready for query and metric computation in the dashboards. We have designed the Blueprint to help you with data collection within only one workflow. Creating a Blueprint consists of four steps:

1. Adding Data Connections: Add new or select from existing data connections for the data you wish to collect
2. Setting Data Scope: Select the scope of data (e.g. GitHub projects or Jira boards) for your data connections
3. Adding Transformation (Optional): Add transformation rules for the data scope you have selected in order to view corresponding metrics
4. Setting Sync Frequency: Set up a schedule for how often you wish your data to be synced

### Step 1 - Adding Data Connections
There are two ways to add data connections to your Blueprint: adding them during the creation of a Blueprint and adding them separately on the Data Integrations page. There is no difference between these two ways.

When adding data connections from the Blueprint, you can either create a new or select from existing data connections. 

![img](/img/ConfigUI/BlueprintCreation/step1.png)

### Step 2 - Setting Data Scope
After adding data connections, click on "Next Step" and you will be prompted to select the data scope of each data connection. For instance, for a GitHub connection, you will need to enter the projects you wish to sync and for Jira, you will need to select the boards.

![img](/img/ConfigUI/BlueprintCreation/step2.png)

### Step 3 - Adding Transformation (Optional)
This step is only required for viewing certain metrics in the pre-built dashboards that require data transformation. Without adding transformation rules, you can still view the basic metrics. 

Currently, DevLake only supports transformation for GitHub and Jira connections.

![img](/img/ConfigUI/BlueprintCreation/step3.png)

### Step 4 - Setting Sync Frequency
You can choose how often you would like to sync your data in this step by selecting a sync frequency option or entering a cron code to specify your preferred schedule. 

Besides, you can click `Skip failed tasks` if you are going to collect a large volume of data, eg. 10+ GitHub repositories, Jira boards, etc. This will help you avoid losing all data when encountering a few bugs during data collection. For clarity, a task is a unit of a pipeline, an execution of a blueprint. By default, when a task is failed, the whole pipeline will fail and all the data that has been collected will be discarded. By skipping failed tasks, the pipeline will continue to run, and the data collected by successful tasks will not be affected. After the pipeline is finished, you can rerun these failed tasks on the blueprint's detail page.

After setting up the Blueprint, you will be prompted to the Blueprint's activity detail page, where you can track the progress of the current run and wait for it to finish before the dashboards become available. You can also view all historical runs of previously created Blueprints from the list on the Blueprint page.

![img](/img/ConfigUI/BlueprintCreation/step4.png)

## Editing a Blueprint (Normal Mode)
On the Blueprint list page, clicking on any Blueprint will lead you to the detail page of the blueprint. If you switch to the Settings tab on the detail page, you can see the settings of your Blueprint and edit parts of it separately.

In the current version, the Blueprint editing feature **allows** editing:
- The Blueprint's name
- The sync frequency
- The data scope of a connection
- The data entities of the data scope
- The transformation rules of any data scope

## Blueprint execution runs' logs can be found here:

![img](/img/ConfigUI/BlueprintEditing/blueprint-edit3.png)

and does **NOT allow**:
- Adding or deleting connections to an existing blueprint (will be available in the future)
- Editing any connections

Please note: 
1. The connections of some data sources, such as Jenkins, do not have an editing button, because their configuration do not contain data scope, data entities and/or transformation.
2. If you have created the Blueprint in the Normal mode, you will only be able to edit it in the Normal Mode; if you have created it in the Advanced Mode, please refer to [this guide](AdvancedMode.md#editing-a-blueprint-advanced-mode) for editing.

The Settings page for editing Blueprints:
![img](/img/ConfigUI/BlueprintEditing/blueprint-edit1.png)

## Creating and Managing Data Connections
The Data Connections page allows you to view, create and manage all your data connections in one place. 


## Troubleshooting

If you run into any problem, please check the [Troubleshooting](/Troubleshooting/Configuration.md) or [create an issue](https://github.com/apache/incubator-devlake/issues)
