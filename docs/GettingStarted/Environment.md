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

### GITHUB_GRAPHQL_JOB\_...

This set of environment variables is used to configure and finetune the behavior of the GitHub GraphQL Job Runs collection process.

| Environment Variable                    | Description                                                                           | Default Value |
| --------------------------------------- | ------------------------------------------------------------------------------------- | ------------- |
| GITHUB_GRAPHQL_JOB_COLLECTION_MODE      | Specifies the mode of job collection. Possible values are `BATCHING` and `PAGINATING` | `BATCHING`    |
| GITHUB_GRAPHQL_JOB_BATCHING_INPUT_STEP  | Defines the step size for batching mode.                                              | `10`          |
| GITHUB_GRAPHQL_JOB_BATCHING_PAGE_SIZE   | Defines the limit of jobs to collect in a batch for each run.                         | `20`          |
| GITHUB_GRAPHQL_JOB_PAGINATING_PAGE_SIZE | Defines the page size for paginating mode.                                            | `50`          |

#### When to Use

These environment variables are particularly useful when dealing with large repositories that have a significant number of job runs. By adjusting these settings, you can optimize the data collection process to better suit your specific needs and infrastructure capabilities. Also this can help to avoid timeouts on the github GraphQL API with too large requests.

- Use `BATCHING` for `GITHUB_GRAPHQL_JOB_COLLECTION_MODE` when your workflow runs typically have less than 20 jobs and you want to minimize the number of API calls to GitHub.
  - Adjust `GITHUB_GRAPHQL_JOB_BATCHING_INPUT_STEP` and `GITHUB_GRAPHQL_JOB_BATCHING_PAGE_SIZE` to control how many jobs are collected in each batch. **NOTE:** Increasing these values can lead to timeouts if the requests become too large.
- Use `PAGINATING` for `GITHUB_GRAPHQL_JOB_COLLECTION_MODE` when your workflow runs have a large number of jobs (e.g., more than 50). This mode will only query 1 Workflow run at a time and paginate through the jobs, reducing the risk of timeouts.
  - Adjust `GITHUB_GRAPHQL_JOB_PAGINATING_PAGE_SIZE` to control how many jobs are fetched per page. A smaller page size can help avoid timeouts but may increase the total number of API calls.

TLDR: `BATCHING` is more efficient for smaller workflows, while `PAGINATING` will guarantee complete collection of jobs for larger workflows.

## How to take effect

After setting the environment variable, restart the DevLake service to take effect.

- For Docker Compose, run `docker-compose down` and `docker-compose up -d`.
- For Helm, run `helm upgrade devlake devlake/devlake --recreate-pods`.
