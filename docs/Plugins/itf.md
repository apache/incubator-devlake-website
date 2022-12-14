// TODO this document will split to each plugin

**bold:** means it may collect slowly.

**\*bold\*:** means it may collect very slowly.

## Jira's Incremental and Time Filter

| Subtask Name               | Estimated Max Number of Request | Does Support Incremental Collecting | Does Support Time Filter |
| -------------------------- | ------------------------------- | ----------------------------------- | ------------------------ |
| CollectStatusMeta          | 1                               | -                                   | -                        |
| CollectProjectsMeta        | <10                             | ❌                                   | -                        |
| CollectIssueTypesMeta      | <10                             | ❌                                   | -                        |
| CollectIssuesMeta          | <10^4                           | ✅                                   | ✅                        |
| CollectIssueChangelogsMeta | 1000~10^5                       | ✅                                   | ✅                        |
| CollectAccountsMeta        | <10^3                           | ❌                                   | ❌                        |
| CollectWorklogsMeta        | 1000~10^5                       | ✅                                   | ✅                        |
| CollectRemotelinksMeta     | 1000~10^5                       | ✅                                   | ✅                        |
| CollectSprintsMeta         | <100                            | ❌                                   | ❌                        |
| CollectEpicsMeta           | <100                            | ❌                                   | ✅                        |



## Jenkins's Incremental and Time Filter

| Subtask Name         | Estimated Max Number of Request | Does Support Incremental Collecting | Does Support Time Filter |
| -------------------- | ------------------------------- | ----------------------------------- | ------------------------ |
| CollectApiBuildsMeta | ≈100                            | ❌                                   | ❌                        |
| CollectApiStagesMeta | ≈10^4                           | ❌                                   | ✅                        |



## Gitlab's Incremental and Time Filter

| Subtask Name                | Estimated Max Number of Request | Does Support Incremental Collecting | Does Support Time Filter |
| --------------------------- | ------------------------------- | ----------------------------------- | ------------------------ |
| CollectApiIssuesMeta        | <10^4                           | ✅                                   | ✅                        |
| CollectApiMergeRequestsMeta | <10^3                           | ✅                                   | ✅                        |
| CollectApiMrNotesMeta       | <10^5                           | ❌                                   | ✅                        |
| CollectApiMrCommitsMeta     | <10^5                           | ❌                                   | ✅                        |
| **CollectApiPipelinesMeta** | <10^4                           | ✅                                   | ❌                        |
| **CollectApiJobsMeta**      | <10^5                           | ❌                                   | ❌                        |



## Github's Incremental and Time Filter

| Subtask Name                                     | Estimated Max Number of Request | Does Support Incremental Collecting | Does Support Time Filter |
| ------------------------------------------------ | ------------------------------- | ----------------------------------- | ------------------------ |
| ------------------------------------------------ | Common                          | ------------------------------      |                          |
| CollectMilestonesMeta                            | ≈10                             | ✅                                   | ❌                        |
| CollectRunsMeta                                  | <10^4                           | ❌                                   | ✅                        |
| CollectApiCommentsMeta                           | 400 (max page github supported) | ✅                                   | ❌                        |
| **CollectApiEventsMeta**                         | 400 (max page github supported) | ❌                                   | ❌                        |
| CollectApiPullRequestReviewsMeta                 | <10^5                           | ✅                                   | ✅                        |
| ------------------------------------------------ | Graphql Only (Default)          | ------------------------------      |                          |
| CollectIssueMeta                                 | ≈10^4                           | ❌                                   | ✅                        |
| CollectPrMeta                                    | ≈10^3                           | ❌                                   | ✅                        |
| CollectCheckRunMeta                              | <10^4                           | ❌                                   | ✅                        |
| CollectAccountMeta                               | ≈10^2                           |                                     |                          |
| ------------------------------------------------ | Restful Only (Not Default)      | ------------------------------      |                          |
| CollectApiIssuesMeta                             | ≈10^4                           | ✅                                   | ❌                        |
| CollectApiPullRequestsMeta                       | ≈10^2                           | ✅                                   | ❌                        |
| CollectApiPullRequestCommitsMeta                 | ≈10^4                           | ✅                                   | ✅                        |
| **CollectApiPrReviewCommentsMeta**               | ≈10^4                           | ✅                                   | ❌                        |
| **CollectAccountsMeta**                          | ≈10^4                           | ❌                                   | ❌                        |
| **CollectAccountOrgMeta**                        | ≈10^4                           | ❌                                   | ❌                        |
| **\*CollectJobsMeta\***                          | <**10^6**                       | ❌                                   | ❌                        |
| CollectApiCommitsMeta                            | not enabled                     | -                                   | -                        |
| CollectApiCommitStatsMeta                        | not enabled                     | -                                   | -                        |



## Feishu's Incremental and Time Filter

| Subtask Name                  | Estimated Max Number of Request | Does Support Incremental Collecting | Does Support Time Filter |
| ----------------------------- | ------------------------------- | ----------------------------------- | ------------------------ |
| CollectMeetingTopUserItemMeta | ≈10^3                           | ❌                                   | ✅                        |



## Bitbucket Incremental and Time Filter

| Subtask Name                        | Estimated Max Number of Request | Does Support Incremental Collecting | Does Support Time Filter |
| ----------------------------------- | ------------------------------- | ----------------------------------- | ------------------------ |
| ~~CollectApiRepoMeta~~              | 1                               | ❌                                   | ❌                        |
| CollectApiPullRequestsMeta          | ≈10^3                           | ❌                                   | ❌                        |
| **CollectApiIssuesMeta**            | ≈10^4                           | ❌                                   | ❌                        |
| **CollectApiPrCommentsMeta**        | ≈10^5                           | ❌                                   | ❌                        |
| **\*CollectApiIssueCommentsMeta\*** | ≈10^6                           | ❌                                   | ❌                        |
| **CollectApiPipelinesMeta**         | <10^4                           | ❌                                   | ❌                        |
| CollectApiDeploymentsMeta           | <10^2                           | ❌                                   | ❌                        |



## Gitee Incremental and Time Filter

| Subtask Name                         | Estimated Max Number of Request | Does Support Incremental Collecting | Does Support Time Filter |
| ------------------------------------ | ------------------------------- | ----------------------------------- | ------------------------ |
| ~~CollectApiRepoMeta~~               | 1                               | ❌                                   | ❌                        |
| CollectApiPullRequestsMeta           | ≈10^3                           | ❌                                   | ❌                        |
| **CollectApiIssuesMeta**             | ≈10^4                           | ❌                                   | ❌                        |
| **CollectCommitsMeta?**              | ≈10^4                           | ❌                                   | ❌                        |
| **CollectApiPrCommentsMeta**         | ≈10^5                           | ❌                                   | ❌                        |
| **\*CollectApiIssueCommentsMeta\***  | ≈10^6                           | ❌                                   | ❌                        |
| **CollectApiPullRequestCommitsMeta** | ≈10^5                           | ❌                                   | ❌                        |
| **CollectApiPullRequestReviewsMeta** | ≈10^5                           | ❌                                   | ❌                        |
| **\*CollectApiCommitStatsMeta\***    | ≈10^6 (Not enable)              | ❌                                   | ❌                        |

