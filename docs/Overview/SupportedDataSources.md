---
title: "Supported Data Sources"
description: >
  Data sources that DevLake supports
sidebar_position: 5
---


## Data Sources and Data Plugins
Apache DevLake(incubating) supports the following data sources. The data from each data source is collected with one or more plugins.

| Data Source                    | Domain(s)                                                  | Supported Versions                   | Config UI Availability | Triggered Plugins           | Collection Mode                                              |
| ------------------------------ | ---------------------------------------------------------- | ------------------------------------ | ---------------------- | --------------------------- | ------------------------------------------------------------ |
| GitHub (include GitHub Action) | Source Code Management, Code Review, Issue Tracking, CI/CD | Cloud                                | Available              | `github`, `gitextractor`    | Full Refresh                                                 |
| GitLab (include GitLabCI)      | Source Code Management, Code Review, Issue Tracking, CI/CD | Cloud, Community Edition 13.x+       | Available              | `gitlab`, `gitextractor`    | Full Refresh, Incremental Sync(for `issues`,`MRs`)           |
| Gitee                          | Source Code Management, Code Review, Issue Tracking        | Cloud                                | Not Available          | `gitee`, `gitextractor`     | Full Refresh, Incremental Sync(for `issues`,`MRs`)           |
| BitBucket                      | Source Code Management, Code Review                        | Cloud                                | Not Available          | `bitbucket`, `gitextractor` | Full Refresh                                                 |
| Jira                           | Issue Tracking                                             | Cloud, Server 7.x+, Data Center 7.x+ | Available              | `jira`                      | Full Refresh, Incremental Sync(for `issues` and related)     |
| TAPD                           | Issue Tracking                                             | Cloud                                | Not Available          | `tapd`                      | Full Refresh, Incremental Sync(for `stories`, `bugs`, `tasks`) |
| Jenkins                        | CI/CD                                                      | 2.263.x+                             | Available              | `jenkins`                   | Full Refresh                                                 |
| Feishu                         | Calendar                                                   | Cloud                                | Not Available          | `feishu`                    | Full Refresh                                                 |
| AE                             | Source Code Management                                     |                                      | Not Available          | `ae`                        | Full Refresh                                                 |



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




## Data Sync Policy

**bold:** means it may collect slowly.

**\*bold\*:** means it may collect very slowly.

### Jira

| Subtask Name               | Estimated Max Number of Request | Does It support Incremental Collection? | Does It Support Time Filter? |
| -------------------------- | ------------------------------- | --------------------------------------- | ---------------------------- |
| CollectStatusMeta          | 1                               | -                                       | -                            |
| CollectProjectsMeta        | <10                             | ❌                                       | -                            |
| CollectIssueTypesMeta      | <10                             | ❌                                       | -                            |
| CollectIssuesMeta          | <10^4                           | ✅                                       | ✅                            |
| CollectIssueChangelogsMeta | 1000~10^5                       | ✅                                       | ✅                            |
| CollectAccountsMeta        | <10^3                           | ❌                                       | ❌                            |
| CollectWorklogsMeta        | 1000~10^5                       | ✅                                       | ✅                            |
| CollectRemotelinksMeta     | 1000~10^5                       | ✅                                       | ✅                            |
| CollectSprintsMeta         | <100                            | ❌                                       | ❌                            |
| CollectEpicsMeta           | <100                            | ❌                                       | ✅                            |



### Jenkins

| Subtask Name         | Estimated Max Number of Request | Does It support Incremental Collection? | Does It Support Time Filter? |
| -------------------- | ------------------------------- | --------------------------------------- | ---------------------------- |
| CollectApiBuildsMeta | ≈100                            | ❌                                       | ❌                            |
| CollectApiStagesMeta | ≈10^4                           | ❌                                       | ✅                            |



### Gitlab

| Subtask Name                | Estimated Max Number of Request | Does It support Incremental Collection? | Does It Support Time Filter? |
| --------------------------- | ------------------------------- | --------------------------------------- | ---------------------------- |
| CollectApiIssuesMeta        | <10^4                           | ✅                                       | ✅                            |
| CollectApiMergeRequestsMeta | <10^3                           | ✅                                       | ✅                            |
| CollectApiMrNotesMeta       | <10^5                           | ❌                                       | ✅                            |
| CollectApiMrCommitsMeta     | <10^5                           | ❌                                       | ✅                            |
| **CollectApiPipelinesMeta** | <10^4                           | ✅                                       | ❌                            |
| CollectApiJobsMeta          | <10^5                           | ❌                                       | ✅                            |



### Github

| Subtask Name                       | Estimated Max Number of Request | Does It support Incremental Collection? | Does It Support Time Filter? |
| ---------------------------------- | ------------------------------- | --------------------------------------- | ---------------------------- |
| ---------------------------------  | Common                          | -----------------------                 |                              |
| CollectMilestonesMeta              | ≈10                             | ✅                                       | ❌                            |
| CollectRunsMeta                    | <10^4                           | ❌                                       | ✅                            |
| CollectApiCommentsMeta             | 400 (max page github supported) | ✅                                       | ❌                            |
| **CollectApiEventsMeta**           | 400 (max page github supported) | ❌                                       | ❌                            |
| CollectApiPullRequestReviewsMeta   | <10^5                           | ✅                                       | ✅                            |
| ---------------------------------  | Graphql Only (Default)          | -----------------------                 |                              |
| CollectIssueMeta                   | ≈10^4                           | ❌                                       | ✅                            |
| CollectPrMeta                      | ≈10^3                           | ❌                                       | ✅                            |
| CollectCheckRunMeta                | <10^4                           | ❌                                       | ✅                            |
| CollectAccountMeta                 | ≈10^2                           | ❌                                       | -                            |
| ---------------------------------  | Restful Only (Not Default)      | -----------------------                 |                              |
| CollectApiIssuesMeta               | ≈10^4                           | ✅                                       | ❌                            |
| CollectApiPullRequestsMeta         | ≈10^2                           | ✅                                       | ❌                            |
| CollectApiPullRequestCommitsMeta   | ≈10^4                           | ✅                                       | ✅                            |
| **CollectApiPrReviewCommentsMeta** | ≈10^4                           | ✅                                       | ❌                            |
| **CollectAccountsMeta**            | ≈10^4                           | ❌                                       | ❌                            |
| **CollectAccountOrgMeta**          | ≈10^4                           | ❌                                       | ❌                            |
| CollectJobsMeta                    | <10^6                           | ❌                                       | ✅                            |
| CollectApiCommitsMeta              | Not enabled                     | -                                       | -                            |
| CollectApiCommitStatsMeta          | Not enabled                     | -                                       | -                            |



### Feishu

| Subtask Name                  | Estimated Max Number of Request | Does It support Incremental Collection? | Does It Support Time Filter? |
| ----------------------------- | ------------------------------- | --------------------------------------- | ---------------------------- |
| CollectMeetingTopUserItemMeta | ≈10^3                           | ❌                                       | ✅                            |



### Bitbucket

| Subtask Name                        | Estimated Max Number of Request | Does It support Incremental Collection? | Does It Support Time Filter? |
| ----------------------------------- | ------------------------------- | --------------------------------------- | ---------------------------- |
| ~~CollectApiRepoMeta~~              | 1                               | ❌                                       | ❌                            |
| CollectApiPullRequestsMeta          | ≈10^3                           | ❌                                       | ❌                            |
| **CollectApiIssuesMeta**            | ≈10^4                           | ❌                                       | ❌                            |
| **CollectApiPrCommentsMeta**        | ≈10^5                           | ❌                                       | ❌                            |
| **\*CollectApiIssueCommentsMeta\*** | ≈10^6                           | ❌                                       | ❌                            |
| **CollectApiPipelinesMeta**         | <10^4                           | ❌                                       | ❌                            |
| CollectApiDeploymentsMeta           | <10^2                           | ❌                                       | ❌                            |



### Gitee

| Subtask Name                         | Estimated Max Number of Request | Does It support Incremental Collection? | Does It Support Time Filter? |
| ------------------------------------ | ------------------------------- | --------------------------------------- | ---------------------------- |
| ~~CollectApiRepoMeta~~               | 1                               | ❌                                       | ❌                            |
| CollectApiPullRequestsMeta           | ≈10^3                           | ✅                                       | ❌                            |
| **CollectApiIssuesMeta**             | ≈10^4                           | ✅                                       | ❌                            |
| **CollectCommitsMeta?**              | ≈10^4                           | ✅                                       | ❌                            |
| **CollectApiPrCommentsMeta**         | ≈10^5                           | ❌                                       | ❌                            |
| **\*CollectApiIssueCommentsMeta\***  | ≈10^6                           | ✅                                       | ❌                            |
| **CollectApiPullRequestCommitsMeta** | ≈10^5                           | ❌                                       | ❌                            |
| **CollectApiPullRequestReviewsMeta** | ≈10^5                           | ❌                                       | ❌                            |
| **\*CollectApiCommitStatsMeta\***    | ≈10^6 (Not enable)              | ❌                                       | ❌                            |
