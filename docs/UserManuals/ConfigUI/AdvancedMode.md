---
title: "Using Advanced Mode"
sidebar_position: 6
description: >
  Using the advanced mode of Config-UI
---


## Why advanced mode?

Advanced mode allows users to create any pipeline by writing JSON. This is useful for users who want to:

1. Collect multiple GitHub/GitLab repos or Jira projects within a single pipeline
2. Have fine-grained control over what entities to collect or what subtasks to run for each plugin
3. Orchestrate a complex pipeline that consists of multiple stages of plugins.

Advanced mode gives utmost flexibility to users by exposing the JSON API.

## How to use advanced mode to create pipelines?

1. Click on "+ New Blueprint" on the Blueprint page.

![image](/img/AdvancedMode/AdvancedMode1.png)

2. In step 1, click on the "Advanced Mode" link.

![image](/img/AdvancedMode/AdvancedMode2.png)

3. The pipeline editor expects a 2D array of plugins. The first dimension represents different stages of the pipeline and the second dimension describes the plugins in each stage. Stages run in sequential order and plugins within the same stage runs in parallel. We provide some templates for users to get started. Please also see the next section for some examples.

![image](/img/AdvancedMode/AdvancedMode3.png)

4. You can choose how often you would like to sync your data in this step by selecting a sync frequency option or enter a cron code to specify your prefered schedule. After setting up the Blueprint, you will be prompted to the Blueprint's activity detail page, where you can track the progress of the current run and wait for it to finish before the dashboards become available. You can also view all historical runs of previously created Blueprints from the list on the Blueprint page.

## Examples

1. Collect multiple GitLab repos sequentially.

>When there're multiple collection tasks against a single data source, we recommend running these tasks sequentially since the collection speed is mostly limited by the API rate limit of the data source.
>Running multiple tasks against the same data source is unlikely to speed up the process and may overwhelm the data source.


Below is an example for collecting 2 GitLab repos sequentially. It has 2 stages, each contains a GitLab task.


```
[
  [
    {
      "Plugin": "gitlab",
      "Options": {
        "projectId": 15238074
      }
    }
  ],
  [
    {
      "Plugin": "gitlab",
      "Options": {
        "projectId": 11624398
      }
    }
  ]
]
```


2. Collect a GitHub repo and a Jira board in parallel

Below is an example for collecting a GitHub repo and a Jira board in parallel. It has a single stage with a GitHub task and a Jira task. Since users can configure multiple Jira connection, it's required to pass in a `connectionId` for Jira task to specify which connection to use.

```
[
  [
    {
      "Plugin": "github",
      "Options": {
        "repo": "lake",
        "owner": "merico-dev"
      }
    },
    {
      "Plugin": "jira",
      "Options": {
        "connectionId": 1,
        "boardId": 76
      }
    }
  ]
]
```
