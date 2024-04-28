---
title: "Environment Variables"
sidebar_position: 6
description: How to set up environment variables for DevLake
---

This document explains how to set environment variables for Apache DevLake and what environment variables can be set.

## Environment Variables
### ENABLE_SUBTASKS_BY_DEFAULT
This environment variable is used to enable or disable the execution of subtasks.

#### How to set
The format is as follows: plugin_name1:subtask_name1:enabled_value,plugin_name2:subtask_name2:enabled_value,plugin_name3:subtask_name3:enabled_value
  
Guidance on locating the [plugin_name and subtask_name](https://github.com/apache/incubator-devlake/blob/release-v1.0/backend/plugins/jira/tasks/issue_changelog_collector.go#L41):

- plugin_name: Represents the plugin's name, such as 'jira' for the Jira plugin.
- subtask_name: Denotes the subtask's name, like 'collectIssueChangelogs' for the Jira plugin."  

Example 1: Enable some subtasks that are closed by default

```shell
ENABLE_SUBTASKS_BY_DEFAULT="jira:collectIssueChangelogs:true,jira:extractIssueChangelogs:true,jira:convertIssueChangelogs:true,tapd:collectBugChangelogs:true,tapd:extractBugChangelogs:true,tapd:convertBugChangelogs:true,zentao:collectBugRepoCommits:true,zentao:extractBugRepoCommits:true,zentao:convertBugRepoCommits:true,zentao:collectStoryRepoCommits:true,zentao:extractStoryRepoCommits:true,zentao:convertStoryRepoCommits:true,zentao:collectTaskRepoCommits:true,zentao:extractTaskRepoCommits:true,zentao:convertTaskRepoCommits:true"
```

Example 2: Close some subtasks that are executed by default
```shell
ENABLE_SUBTASKS_BY_DEFAULT="github_graphql:Collect Job Runs:false,github_graphql:Extract Job Runs:false,github_graphql:Convert Job Runs:false"
```

#### How to take effect
After setting the environment variable, restart the DevLake service to take effect.
- For Docker Compose, run `docker-compose down` and `docker-compose up -d`.
- For Helm, run `helm upgrade devlake devlake/devlake --recreate-pods`.







