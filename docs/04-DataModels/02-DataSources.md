---
title: "Data Sources"
linkTitle: "Data Sources"
tags: []
categories: []
weight: 30000
description: >
  Data Sources that DevLake supports.
---


## Summary
DevLake supports following data sources. The data from each data source is collected with one or more plugins. There're 7 data source plugins in total: `ae`, `gitextractor`, `github`, `gitlab`, `jenkins`, `jira`, and `refdiff`.


| Data Sources  | Plugins   |
| ------------- | --------- |
| AE            | `feishu`  |
| Feishu        | `ae`      |
| Git           | `gitextractor`, `refdiff` |
| GitHub (cloud)  | `github`, `gitextractor`, `refdiff` |
| Gitlab (cloud)  | `ae`      |
| GitLab (Server with API v4)  | `gitlab`, `gitextractor`, `refdiff` |
| Jenkins       | `jenkins`   |
| Jira (cloud)  | `jira`      |
| Jira (server v8+) | `jira`  |


## Data Collection Scope By Each Plugin
This table shows the entities collected by each plugin. Domain layer entities in this table are consistent with the entities [here](./01-DevLakeDomainLayerSchema.md).

| Domain Layer Entity  | ae   | gitextractor | github   | gitlab | jenkins | jira | refdiff |
| -------------------- | ---- | ------ | -------- | ------ | ------- | ---- | ------- |
| commits               | update commits|     default   | optional |   default     |         |      |         |
| commit_parents        |      |   default     |    |        |         |      |         |
| commit_files        |      |    default    | |        |         |      |         |
| pull_requests         |      |        | default  | default |         |      |         |
| pull_request_commits  |      |        | default  | default |         |      |         |
| pull_request_comments |      |        | default  | default |         |      |         |
| pull_request_labels   |      |        | default  |        |         |      |         |
| refs                  |      |   default     |          |        |         |      |         |
| refs_commits_diffs    |      |        |          |        |         |      |    default     |
| refs_issues_diffs    |      |        |          |        |         |      |    default     |
| ref_pr_cherry_picks   |      |        |          |        |         |      |   default      |
| repos                 |      |        | default  | default |         |      |         |
| repo_commits          |      |    default    | default  |        |         |      |         |
| board_repos           |      |        |          |        |         |      |         |
| issue_commits         |      |        |          |        |         |      |         |
| issue_repo_commits    |      |        |          |        |         |      |         |
| pull_request_issues   |      |        |          |        |         |      |         |
| refs_issues_diffs     |      |        |          |        |         |      |         |
| builds                |      |        |          |        |         |      |         |
| jobs                  |      |        |          |        |         |      |         |
| boards                |      |        | default  |        |         |      |         |
| board_issues          |      |        | default  |        |         |      |         |
| issue_changelogs            |      |        |          |        |         |      |         |
| issues               |      |        | default  |        |         |      |         |
| issue_comments        |      |        |          |        |         |      |         |
| issue_labels          |      |        | default  |        |         |      |         |
| sprints               |      |        |          |        |         |      |         |
| issue_worklogs              |      |        |          |        |         |      |         |
| users               |      |        |   default       |        |         |      |         |
