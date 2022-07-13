---
title: "Data Support"
description: >
  Data sources that DevLake supports
sidebar_position: 1
---


## Data Sources and Data Plugins
DevLake supports the following data sources. The data from each data source is collected with one or more plugins. There are 9 data plugins in total: `ae`, `feishu`, `gitextractor`, `github`, `gitlab`, `jenkins`, `jira`, `refdiff` and `tapd`.


| Data Source | Versions                             | Plugins |
|-------------|--------------------------------------|-------- |
| AE          |                                      | `ae`    |
| Feishu      | Cloud                                |`feishu` |
| GitHub      | Cloud                                |`github`, `gitextractor`, `refdiff` |
| Gitlab      | Cloud, Community Edition 13.x+       |`gitlab`, `gitextractor`, `refdiff` |
| Jenkins     | 2.263.x+                             |`jenkins` |
| Jira        | Cloud, Server 8.x+, Data Center 8.x+ |`jira` |
| TAPD        | Cloud                                | `tapd` |



## Data Collection Scope By Each Plugin
This table shows the entities collected by each plugin. Domain layer entities in this table are consistent with the entities [here](./DevLakeDomainLayerSchema.md).

| Domain Layer Entities | ae             | gitextractor | github         | gitlab  | jenkins | jira    | refdiff | tapd    |
| --------------------- | -------------- | ------------ | -------------- | ------- | ------- | ------- | ------- | ------- |
| commits               | update commits | default      | not-by-default | default |         |         |         |         |
| commit_parents        |                | default      |                |         |         |         |         |         |
| commit_files          |                | default      |                |         |         |         |         |         |
| pull_requests         |                |              | default        | default |         |         |         |         |
| pull_request_commits  |                |              | default        | default |         |         |         |         |
| pull_request_comments |                |              | default        | default |         |         |         |         |
| pull_request_labels   |                |              | default        |         |         |         |         |         |
| refs                  |                | default      |                |         |         |         |         |         |
| refs_commits_diffs    |                |              |                |         |         |         | default |         |
| refs_issues_diffs     |                |              |                |         |         |         | default |         |
| ref_pr_cherry_picks   |                |              |                |         |         |         | default |         |
| repos                 |                |              | default        | default |         |         |         |         |
| repo_commits          |                | default      | default        |         |         |         |         |         |
| board_repos           |                |              |                |         |         |         |         |         |
| issue_commits         |                |              |                |         |         |         |         |         |
| issue_repo_commits    |                |              |                |         |         |         |         |         |
| pull_request_issues   |                |              |                |         |         |         |         |         |
| refs_issues_diffs     |                |              |                |         |         |         |         |         |
| boards                |                |              | default        |         |         | default |         | default |
| board_issues          |                |              | default        |         |         | default |         | default |
| issue_changelogs      |                |              |                |         |         | default |         | default |
| issues                |                |              | default        |         |         | default |         | default |
| issue_comments        |                |              |                |         |         | default |         | default |
| issue_labels          |                |              | default        |         |         |         |         |         |
| sprints               |                |              |                |         |         | default |         | default |
| issue_worklogs        |                |              |                |         |         | default |         | default |
| users o               |                |              | default        |         |         | default |         | default |
| builds                |                |              |                |         | default |         |         |         |
| jobs                  |                |              |                |         | default |         |         |         |

