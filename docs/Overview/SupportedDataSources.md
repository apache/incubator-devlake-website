---
title: "Supported Data Sources"
description: >
  Data sources that DevLake supports
sidebar_position: 5
---


## Data Sources and Data Plugins
Apache DevLake(incubating) supports the following data sources. The data from each data source is collected with one or more plugins.

| Data Source                   | Domain(s)                                                  | Supported Versions                   | Config UI Availability | Triggered Plugins           | Collection Mode       |
|-------------------------------|------------------------------------------------------------|--------------------------------------|------------------------|---------------------------- | --------------------- |
| GitHub (include GitHub Action)| Source Code Management, Code Review, Issue Tracking, CI/CD | Cloud                                |Available               |`github`, `gitextractor`     | Full Refresh, Incremental Sync(for `issues`, `PRs`) |
| GitLab (include GitLabCI)     | Source Code Management, Code Review, Issue Tracking, CI/CD | Cloud, Community Edition 13.x+       |Available               |`gitlab`, `gitextractor`     | Full Refresh, Incremental Sync(for `issues`)|
| Gitee                         | Source Code Management, Code Review, Issue Tracking        | Cloud                                |Not Available           |`gitee`, `gitextractor`      | Incremental Sync      |
| BitBucket                     | Source Code Management, Code Review                        | Cloud                                |Not Available           |`bitbucket`, `gitextractor`  | Full Refresh          |
| Jira                          | Issue Tracking                                             | Cloud, Server 7.x+, Data Center 7.x+ |Available               |`jira`                       | Full Refresh, Incremental Sync(for `issues`, `changelogs`, `worklogs`) |
| TAPD                          | Issue Tracking                                             | Cloud                                |Not Available           |`tapd`                       | Full Refresh, Incremental Sync(for `stories`, `bugs`, `tasks`)          |
| Jenkins                       | CI/CD                                                      | 2.263.x+                             |Available               |`jenkins`                    | Full Refresh          |
| Feishu                        | Calendar                                                   | Cloud                                |Not Available           |`feishu`                     | Full Refresh          |
| AE                            | Source Code Management                                     |                                      |Not Available           | `ae`                        | Full Refresh          |



## Data Collection Scope By Each Plugin
This table shows the entities collected by each plugin. Domain layer entities in this table are consistent with the entities [here](/DataModels/DevLakeDomainLayerSchema.md).

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

