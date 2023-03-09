---
title: "Domain Layer Schema"
description: >
  The data tables to query engineering metrics
sidebar_position: 1
---

## Summary

This document describes Apache DevLake's domain layer schema.

Referring to DevLake's [architecture](../Overview/Architecture.md), the data in the domain layer is transformed from the data in the tool layer. The tool layer schema is based on the data from specific tools such as Jira, GitHub, Gitlab, Jenkins, etc. The domain layer schema can be regarded as an abstraction of tool-layer schemas.

<p align="center"><img src="/img/Architecture/arch-dataflow.svg" /></p>
<p align="center">DevLake Dataflow</p>

Domain layer schema itself includes 2 logical layers: a `DWD` layer and a `DWM` layer. The DWD layer stores the detailed data points, while the DWM is the slight aggregation and operation of DWD to store more organized details or middle-level metrics.

## Use Cases

1. [All metrics](../Metrics) from pre-built dashboards are based on this data schema.
2. As a user, you can create your own customized dashboards based on this data schema.
3. As a contributor, you can refer to this data schema while working on the ETL logic when adding/updating data source plugins.

## Data Models

This is the up-to-date domain layer schema for DevLake v0.10.x. Tables (entities) are categorized into 5 domains.

1. Issue tracking domain entities: Jira issues, GitHub issues, GitLab issues, etc.
2. Source code management domain entities: Git/GitHub/Gitlab commits and refs(tags and branches), etc.
3. Code review domain entities: GitHub PRs, Gitlab MRs, etc.
4. CI/CD domain entities: Jenkins jobs & builds, etc.
5. Code Quality entities: SonarQube issues, hotspots, file metrics, etc.
6. Cross-domain entities: entities that map entities from different domains to break data isolation.

### Schema Diagram

[![Domain Layer Schema](/img/DomainLayerSchema/schema-diagram.svg)](/img/DomainLayerSchema/schema-diagram.svg)

When reading the schema, you'll notice that many tables' primary key is called `id`. Unlike auto-increment id or UUID, `id` is a string composed of several parts to uniquely identify similar entities (e.g. repo) from different platforms (e.g. Github/Gitlab) and allow them to co-exist in a single table.

Tables that end with WIP are still under development.

### Naming Conventions

1. The name of a table is in plural form. Eg. boards, issues, etc.
2. The name of a table which describe the relation between 2 entities is in the form of [BigEntity in singular form]\_[SmallEntity in plural form]. Eg. board_issues, sprint_issues, pull_request_comments, etc.
3. Value of the field in enum type are in capital letters. Eg. [table.issues.type](#issues) has 3 values, REQUIREMENT, BUG, INCIDENT. Values that are phrases, such as 'IN_PROGRESS' of [table.issues.status](#issues), are separated with underscore '\_'.

## How to Customize Data Models

Apache DevLake provides 2 plugins:

- [customize](https://devlake.apache.org/docs/Plugins/customize): to create/delete columns in the domain layer schema with the data extracted from [raw layer tables](https://devlake.apache.org/docs/Overview/Architecture/#dataflow)
- [dbt](https://devlake.apache.org/docs/Plugins/customize): to transform data based on the domain layer schema and generate new tables

<br/>

## DWD Entities - (Data Warehouse Detail)

### Domain 1 - Issue Tracking

#### issues

An `issue` is the abstraction of Github/GitLab/BitBucket/Jira/TAPD/Zentao... issues.

| **field**                   | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **key** |
| :-------------------------- | :------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `id`                        | varchar  | 255        | An issue's `id` is composed of < plugin >:< Entity >:< PK0 >[:PK1]..." <ul><li>For Github issues, a Github issue's id is like "github:GithubIssues:< GithubIssueId >". Eg. 'github:GithubIssues:1049355647'</li> <li>For Jira issues, a Github repo's id is like "jira:JiraIssues:< JiraSourceId >:< JiraIssueId >". Eg. 'jira:JiraIssues:1:10063'. < JiraSourceId > is used to identify which jira source the issue came from, since DevLake users can import data from several different Jira instances at the same time.</li></ul>                                                                    | PK      |
| `issue_key`                 | varchar  | 255        | The key of this issue. For example, the key of this Github [issue](https://github.com/apache/incubator-devlake/issues/1145) is 1145.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |         |
| `url`                       | varchar  | 255        | The url of the issue. It's a web address in most cases.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |         |
| `title`                     | varchar  | 255        | The title of an issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |         |
| `description`               | longtext |            | The detailed description/summary of an issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |         |
| `type`                      | varchar  | 100        | The standard type of this issue. There're 3 standard types: <ul><li>REQUIREMENT: this issue is a feature</li><li>BUG: this issue is a bug found during test</li><li>INCIDENT: this issue is a bug found after release</li></ul>The 3 standard types are transformed from the original types of an issue. The transformation rule is set in the '.env' file or 'config-ui' before data collection. For issues with an original type that has not mapped to a standard type, the value of `type` will be the issue's original type.                                                                        |         |
| `original_type`             | varchar  | 100        | The original type of an issue.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |         |
| `status`                    | varchar  | 100        | The standard statuses of this issue. There're 3 standard statuses: <ul><li> TODO: this issue is in backlog or to-do list</li><li>IN_PROGRESS: this issue is in progress</li><li>DONE: this issue is resolved or closed</li></ul>The 3 standard statuses are transformed from the original statuses of an issue. The transformation rule: <ul><li>For Jira issue status: transformed from the Jira issue's `statusCategory`. Jira issue has 3 default status categories: 'To Do', 'In Progress', 'Done'.</li><li>For Github issue status: <ul><li>open -> TODO</li><li>closed -> DONE</li></ul></li></ul> |         |
| `original_status`           | varchar  | 100        | The original status of an issue.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |         |
| `story_point`               | double   |            | The story point of this issue. Only certain types(e.g. story) of Jira or TAPD issues has story points                                                                                                                                                                                                                                                                                                                                       |         |
| `priority`                  | varchar  | 255        | The priority of the issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |         |
| `component`                 | varchar  | 255        | The component a bug-issue affects. This field only supports Github plugin for now. The value is transformed from Github issue labels by the rules set according to the user's configuration of .env by end users during DevLake installation.                                                                                                                                                                                                                                                                                                                                                            |         |
| `severity`                  | varchar  | 255        | The severity level of a bug-issue. This field only supports Github plugin for now. The value is transformed from Github issue labels by the rules set according to the user's configuration of .env by end users during DevLake installation.                                                                                                                                                                                                                                                                                                                                                            |         |
| `parent_issue_id`           | varchar  | 255        | The id of its parent issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |         |
| `epic_key`                  | varchar  | 255        | The key of the epic this issue belongs to. For tools with no epic-type issues such as Github and Gitlab, this field is default to an empty string                                                                                                                                                                                                                                                                                                                                                                                                                                                        |         |
| `original_estimate_minutes` | int      |            | The original estimation of the time allocated for this issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |         |
| `time_spent_minutes`        | int      |            | The original estimation of the time allocated for this issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |         |
| `time_remaining_minutes`    | int      |            | The remaining time to resolve the issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |         |
| `creator_id`                | varchar  | 255        | The id of issue creator                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |         |
| `creator_name`              | varchar  | 255        | The name of the creator                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |         |
| `assignee_id`               | varchar  | 255        | The id of issue assignee.<ul><li>For Github issues: this is the last assignee of an issue if the issue has multiple assignees</li><li>For Jira issues: this is the assignee of the issue at the time of collection</li></ul>                                                                                                                                                                                                                                                                                                                                                                             |         |
| `assignee_name`             | varchar  | 255        | The name of the assignee                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |         |
| `created_date`              | datetime | 3          | The time issue created                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |         |
| `updated_date`              | datetime | 3          | The last time issue gets updated                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |         |
| `resolution_date`           | datetime | 3          | The time the issue changes to 'DONE'.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |         |
| `lead_time_minutes`         | int      |            | Describes the cycle time from issue creation to issue resolution.<ul><li>For issues whose type = 'REQUIREMENT' and status = 'DONE', lead_time_minutes = resolution_date - created_date. The unit is minute.</li><li>For issues whose type != 'REQUIREMENT' or status != 'DONE', lead_time_minutes is null</li></ul>                                                                                                                                                                                                                                                                                      |         |
| `original_project`          | varchar  | 255        | The name of the original project this issue belongs to. Transformed from a Jira project's name, a TAPD workspace's name, etc.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |         |
| `icon_url`          | varchar  | 255        | The url of the issue icon.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |         |

#### issue_labels

This table shows the labels of issues. Multiple entries can exist per issue. This table can be used to filter issues by label name.

| **field**  | **type** | **length** | **description**                                                   | **key**      |
| :--------- | :------- | :--------- | :---------------------------------------------------------------- | :----------- |
| `name`     | varchar  | 255        | Label name. Collect from GitHub issue labels or Jira issue labels |              |
| `issue_id` | varchar  | 255        | Issue ID                                                          | FK_issues.id |


#### issue_comments

This table shows the comments of issues. Only GitHub and TAPD issue comments are collected. Issues with multiple comments are shown as multiple records. This table can be used to calculate _metric - issue response time_.

| **field**      | **type** | **length** | **description**                            | **key**        |
| :------------- | :------- | :--------- | :----------------------------------------- | :------------- |
| `id`           | varchar  | 255        | The unique id of a comment                 | PK             |
| `issue_id`     | varchar  | 255        | Issue ID                                   | FK_issues.id   |
| `account_id`   | varchar  | 255        | The id of the account who made the comment | FK_accounts.id |
| `body`         | longtext |            | The body/detail of the comment             |                |
| `created_date` | datetime | 3          | The creation date of the comment           |                |

#### issue_changelogs

This table shows the changelogs of issues. Only Jira issue changelogs are collected for now. Issues with multiple changelogs are shown as multiple records. This is transformed from Jira or TAPD changelogs.

| **field**             | **type** | **length** | **description**                                                  | **key**        |
| :-------------------- | :------- | :--------- | :--------------------------------------------------------------- | :------------- |
| `id`                  | varchar  | 255        | The unique id of an issue changelog                              | PK             |
| `issue_id`            | varchar  | 255        | Issue ID                                                         | FK_issues.id   |
| `author_id`           | varchar  | 255        | The id of the user who made the change                           | FK_accounts.id |
| `author_name`         | varchar  | 255        | The id of the user who made the change                           |                |
| `field_id`            | varchar  | 255        | The id of changed field                                          |                |
| `field_name`          | varchar  | 255        | The id of changed field                                          |                |
| `original_from_value` | longtext  |         | The original value of the changed field                          |                |
| `original_to_value`   | longtext  |         | The new value of the changed field                               |                |
| `from_value`          | longtext  |         | The transformed/standardized original value of the changed field |                |
| `to_value`            | longtext  |         | The transformed/standardized new value of the changed field      |                |
| `created_date`        | datetime | 3          | The creation date of the changelog                               |                |

#### issue_worklogs

This table shows the work logged under issues. Only Jira issue worklogs are collected for now. Usually, an issue has multiple worklogs logged by different developers.

| **field**            | **type** | **length** | **description**                                                                         | **key**        |
| :------------------- | :------- | :--------- | :-------------------------------------------------------------------------------------- | :------------- |
| `id`                 | varchar  | 255        | The id of the worklog.                                                                  | PK             |
| `author_id`          | varchar  | 255        | The id of the author who logged the work                                                | FK_accounts.id |
| `comment`            | longtext | 255        | The comment made while logging the work.                                                |                |
| `time_spent_minutes` | int      |            | The time logged. The unit of value is normalized to minute. Eg. 1d =) 480, 4h30m =) 270 |                |
| `logged_date`        | datetime | 3          | The time of this logging action                                                         |                |
| `started_date`       | datetime | 3          | Start time of the worklog                                                               |                |
| `issue_id`           | varchar  | 255        | Issue ID                                                                                | FK_issues.id   |

#### boards

A `board` is an issue list or a collection of issues. It's the abstraction of a Jira board, a Jira or TAPD project, a [GitHub repo's issue list](https://github.com/apache/incubator-devlake/issues) or a GitLab repo's issue list. This table can be used to filter issues by the boards they belong to.

| **field**      | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                                                                                          | **key** |
| :------------- | :------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `id`           | varchar  | 255        | A board's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..." <ul><li>For a Github repo's issue list, the board id is like "< github >:< GithubRepos >:< ConnectionId >:< GithubRepoId >".<br/>E.g. "github:GithubRepo:384111310"</li> <li>For a Jira Board, the id is like "< jira >:< JiraSourceId >< JiraBoards >:< ConnectionId >:< JiraBoardsId >".<br/>E.g. "jira:1:JiraBoards:1:12"</li></ul> | PK      |
| `name`         | varchar  | 255        | The name of the board. Note: the board name of a Github repo 'apache/incubator-devlake' is 'apache/incubator-devlake', representing the [default issue list](https://github.com/apache/incubator-devlake/issues).                                                                                                                                                                                                     |         |
| `description`  | varchar  | 255        | The description of the board.                                                                                                                                                                                                                                                                                                                                                                                            |         |
| `url`          | varchar  | 255        | The url of the board. Eg. https://github.com/apache/incubator-devlake                                                                                                                                                                                                                                                                                                                                                    |         |
| `created_date` | datetime | 3          | Board creation time                                                                                                                                                                                                                                                                                                                                                                                                      |         |
| `type`         | varchar  | 255        | Identify scrum and non-scrum board                                                                                                                                                                                                                                                                                                                                                                                       |         |

#### board_issues

This table shows the relation between boards and issues. This table can be used to filter issues by board.

| **field**  | **type** | **length** | **description** | **key**      |
| :--------- | :------- | :--------- | :-------------- | :----------- |
| `board_id` | varchar  | 255        | Board id        | FK_boards.id |
| `issue_id` | varchar  | 255        | Issue id        | FK_issues.id |

#### sprints

A `sprint` is the abstraction of Jira sprints, TAPD iterations and GitHub milestones. A sprint contains a list of issues.

| **field**           | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **key**      |
| :------------------ | :------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| `id`                | varchar  | 255        | A sprint's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..."<ul><li>A sprint in a Github repo is a milestone, the sprint id is like "< github >:< GithubRepos >:< GithubRepoId >:< milestoneNumber >".<br/>E.g. The id for this [sprint](https://github.com/apache/incubator-devlake/milestone/5) is "github:GithubRepo:384111310:5"</li><li>For a Jira Board, the id is like "< jira >:< JiraSourceId >< JiraBoards >:< JiraBoardsId >".<br/>E.g. "jira:1:JiraBoards:12"</li></ul>                                                         | PK           |
| `name`              | varchar  | 255        | The name of sprint.<br/>For Github projects, the sprint name is the milestone name. For instance, 'v0.10.0 - Introduce Temporal to DevLake' is the name of this [sprint](https://github.com/apache/incubator-devlake/milestone/5).                                                                                                                                                                                                                                                                                                                   |              |
| `url`               | varchar  | 255        | The url of sprint.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |              |
| `status`            | varchar  | 255        | There're 3 statuses of a sprint:<ul><li>CLOSED: a completed sprint</li><li>ACTIVE: a sprint started but not completed</li><li>FUTURE: a sprint that has not started</li></ul>                                                                                                                                                                                                                                                                                                                                                                        |              |
| `started_date`      | datetime | 3          | The start time of a sprint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |              |
| `ended_date`        | datetime | 3          | The planned/estimated end time of a sprint. It's usually set when planning a sprint.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |              |
| `completed_date`    | datetime | 3          | The actual time to complete a sprint.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |              |
| `original_board_id` | datetime | 3          | The id of board where the sprint first created. This field is not null only when this entity is transformed from Jira sprints.<br/>In Jira, sprint and board entities have 2 types of relation:<ul><li>A sprint is created based on a specific board. In this case, board(1):(n)sprint. This field `original_board_id` is used to show the relation.</li><li>A sprint can be mapped to multiple boards, a board can also show multiple sprints. In this case, board(n):(n)sprint. This relation is shown in [table.board_sprints](#board_sprints).</li></ul> | FK_boards.id |

#### sprint_issues

This table shows the relation between sprints and issues that have been added to sprints. This table can be used to show metrics such as _'ratio of unplanned issues'_, _'completion rate of sprint issues'_, etc

| **field**        | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **key**       |
| :--------------- | :------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `sprint_id`      | varchar  | 255        | Sprint id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | FK_sprints.id |
| `issue_id`       | varchar  | 255        | Issue id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | FK_issues.id  |

#### board_sprints

| **field**   | **type** | **length** | **description** | **key**       |
| :---------- | :------- | :--------- | :-------------- | :------------ |
| `board_id`  | varchar  | 255        | Board id        | FK_boards.id  |
| `sprint_id` | varchar  | 255        | Sprint id       | FK_sprints.id |

<br/>

### Domain 2 - Source Code Management

#### repos

Information about GitHub or Gitlab repositories. A repository is always owned by a user.

| **field**      | **type** | **length** | **description**                                                                                                                                                                                                        | **key**        |
| :------------- | :------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- |
| `id`           | varchar  | 255        | A repo's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..."<br/>For example, a Github repo's id is like "< github >:< GithubRepos >:< ConnectionId >:< GithubRepoId >". Eg. 'github:GithubRepos:1:384111310' | PK             |
| `name`         | varchar  | 255        | The name of repo.                                                                                                                                                                                                      |                |
| `description`  | varchar  | 255        | The description of repo.                                                                                                                                                                                               |                |
| `url`          | varchar  | 255        | The url of repo. Eg. https://github.com/apache/incubator-devlake                                                                                                                                                       |                |
| `owner_id`     | varchar  | 255        | The id of the owner of repo                                                                                                                                                                                            | FK_accounts.id |
| `language`     | varchar  | 255        | The major language of repo. Eg. The language for apache/incubator-devlake is 'Go'                                                                                                                                      |                |
| `forked_from`  | varchar  | 255        | Empty unless the repo is a fork in which case it contains the `id` of the repo the repo is forked from.                                                                                                                |                |
| `deleted`      | tinyint  | 255        | 0: repo is active 1: repo has been deleted                                                                                                                                                                             |                |
| `created_date` | datetime | 3          | Repo creation date                                                                                                                                                                                                     |                |
| `updated_date` | datetime | 3          | Last full update was done for this repo                                                                                                                                                                                |                |

#### repo_languages(WIP)

Languages that are used in the repository along with byte counts for all files in those languages. This is in line with how GitHub calculates language percentages in a repository. Multiple entries can exist per repo.

The table is filled in when the repo has been first inserted on when an update round for all repos is made.

| **field**      | **type** | **length** | **description**                                                                                                                                                                                    | **key** |
| :------------- | :------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `id`           | varchar  | 255        | A repo's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..."<br/>For example, a Github repo's id is like "< github >:< GithubRepos >< GithubRepoId >". Eg. 'github:GithubRepos:384111310' | PK      |
| `language`     | varchar  | 255        | The language of repo.<br/>These are the [languages](https://api.github.com/repos/apache/incubator-devlake/languages) for apache/incubator-devlake                                                  |         |
| `bytes`        | int      |            | The byte counts for all files in those languages                                                                                                                                                   |         |
| `created_date` | datetime | 3          | The field is filled in with the latest timestamp the query for a specific `repo_id` was done.                                                                                                      |         |

#### repo_commits

The commits belong to the history of a repository. More than one repos can share the same commits if one is a fork of the other.

| **field**    | **type** | **length** | **description** | **key**        |
| :----------- | :------- | :--------- | :-------------- | :------------- |
| `repo_id`    | varchar  | 255        | Repo id         | FK_repos.id    |
| `commit_sha` | char     | 40         | Commit sha      | FK_commits.sha |

#### refs

A ref is the abstraction of a branch or tag.

| **field**    | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                             | **key**     |
| :----------- | :------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `id`         | varchar  | 255        | A ref's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..."<br/>For example, a Github ref is composed of "github:GithubRepos:< GithubRepoId >:< RefUrl >". Eg. The id of release v5.3.0 of PingCAP/TiDB project is 'github:GithubRepos:384111310:refs/tags/v5.3.0' A repo's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..."           | PK          |
| `ref_name`   | varchar  | 255        | The name of ref. Eg. '[refs/tags/v0.9.3](https://github.com/apache/incubator-devlake/tree/v0.9.3)'                                                                                                                                                                                                                                                          |             |
| `repo_id`    | varchar  | 255        | The id of repo this ref belongs to                                                                                                                                                                                                                                                                                                                          | FK_repos.id |
| `commit_sha` | char     | 40         | The commit this ref points to at the time of collection                                                                                                                                                                                                                                                                                                     |             |
| `is_default` | int      |            | <ul><li>0: the ref is the default branch. By the definition of [Github](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch), the default branch is the base branch for pull requests and code commits.</li><li>1: not the default branch</li></ul> |             |
| `merge_base` | char     | 40         | The merge base commit of the main ref and the current ref                                                                                                                                                                                                                                                                                                   |             |
| `ref_type`   | varchar  | 64         | There're 2 typical types:<ul><li>BRANCH</li><li>TAG</li></ul>                                                                                                                                                                                                                                                                                               |             |

#### commits_diffs

This table shows the commits added in a new commit compared to an old commit. This table can be used to support tag-based and deploy-based metrics.

The records of this table are computed by [RefDiff](https://github.com/apache/incubator-devlake/tree/main/plugins/refdiff) plugin. The computation should be manually triggered after using [GitRepoExtractor](https://github.com/apache/incubator-devlake/tree/main/plugins/gitextractor) to collect commits and refs. The algorithm behind is similar to [this](https://github.com/apache/incubator-devlake/compare/v0.8.0%E2%80%A6v0.9.0).

| **field**        | **type** | **length** | **description**                                                            | **key** |
| :--------------- | :------- | :--------- | :------------------------------------------------------------------------- | :------ |
| `new_commit_sha` | char     | 40         | The commit new ref/deployment points to at the time of collection          | PK      |
| `old_commit_sha` | char     | 40         | The commit old ref/deployment points to at the time of collection          | PK      |
| `commit_sha`     | char     | 40         | One of the added commits in the new ref compared to the old ref/deployment | PK      |
| `sorting_index`  | varchar  | 255        | An index for debugging, please skip it                                     |         |

#### finished_commits_diffs

This table shows the commits_diffs `new_commit_sha` and `old_commit_sha` pairs which are calculated successfully.

| **field**        | **type** | **length** | **description**                                                       | **key** |
| :--------------- | :------- | :--------- | :-------------------------------------------------------------------- | :------ |
| `new_commit_sha` | char     | 40         | The new commit new ref/deployment points to at the time of collection | PK      |
| `old_commit_sha` | char     | 40         | The commit old ref/deployment points to at the time of collection     | PK      |

#### ref_commits

| **field**        | **type** | **length** | **description**                                        | **key** |
| :--------------- | :------- | :--------- | :----------------------------------------------------- | :------ |
| `new_ref_id`     | varchar  | 255        | The new ref's id for comparison                        | PK      |
| `old_ref_id`     | varchar  | 255        | The old ref's id for comparison                        | PK      |
| `new_commit_sha` | char     | 40         | The commit new ref points to at the time of collection |         |
| `old_commit_sha` | char     | 40         | The commit old ref points to at the time of collection |         |

#### commits

| **field**         | **type** | **length** | **description**                                                                                                                                                         | **key**        |
| :---------------- | :------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- |
| `sha`             | char     | 40         | One of the added commits in the new ref compared to the old ref                                                                                                         | FK_commits.sha |
| `message`         | varchar  | 255        | Commit message                                                                                                                                                          |                |
| `author_name`     | varchar  | 255        | The value is set with command `git config user.name xxxxx` commit                                                                                                       |                |
| `author_email`    | varchar  | 255        | The value is set with command `git config user.email xxxxx` author                                                                                                      |                |
| `authored_date`   | datetime | 3          | The date when this commit was originally made                                                                                                                           |                |
| `author_id`       | varchar  | 255        | The id of commit author                                                                                                                                                 | FK_accounts.id |
| `committer_name`  | varchar  | 255        | The name of committer                                                                                                                                                   |                |
| `committer_email` | varchar  | 255        | The email of committer                                                                                                                                                  |                |
| `committed_date`  | datetime | 3          | The last time the commit gets modified.<br/>For example, when rebasing the branch where the commit is in on another branch, the committed_date changes.                 |                |
| `committer_id`    | varchar  | 255        | The id of committer                                                                                                                                                     | FK_accounts.id |
| `additions`       | int      |            | Added lines of code                                                                                                                                                     |                |
| `deletions`       | int      |            | Deleted lines of code                                                                                                                                                   |                |
| `dev_eq`          | int      |            | A metric that quantifies the amount of code contribution. The data can be retrieved from [AE plugin](https://github.com/apache/incubator-devlake/tree/main/plugins/ae). |                |

#### commit_files

The files have been changed via commits.

| **field**    | **type** | **length** | **description**                                        | **key**        |
| :----------- | :------- | :--------- | :----------------------------------------------------- | :------------- |
| `id`         | varchar  | 255        | The `id` is composed of "< Commit_sha >:< file_path >" | FK_commits.sha |
| `commit_sha` | char     | 40         | Commit sha                                             | FK_commits.sha |
| `file_path`  | varchar  | 255        | Path of a changed file in a commit                     |                |
| `additions`  | int      |            | The added lines of code in this file by the commit     |                |
| `deletions`  | int      |            | The deleted lines of code in this file by the commit   |                |

#### components

The components of files extracted from the file paths. This can be used to analyze Git metrics by component.

| **field**    | **type** | **length** | **description**                                        | **key**     |
| :----------- | :------- | :--------- | :----------------------------------------------------- | :---------- |
| `repo_id`    | varchar  | 255        | The repo id                                            | FK_repos.id |
| `name`       | varchar  | 255        | The name of component                                  |             |
| `path_regex` | varchar  | 255        | The regex to extract components from this repo's paths |             |

#### commit_file_components

The relationship between commit_file and component_name.

| **field**        | **type** | **length** | **description**              | **key**            |
| :--------------- | :------- | :--------- | :--------------------------- | :----------------- |
| `commit_file_id` | varchar  | 255        | The id of commit file        | FK_commit_files.id |
| `component_name` | varchar  | 255        | The component name of a file |                    |

#### commit_parents

The parent commit(s) for each commit, as specified by Git.

| **field**    | **type** | **length** | **description**   | **key**        |
| :----------- | :------- | :--------- | :---------------- | :------------- |
| `commit_sha` | char     | 40         | commit sha        | FK_commits.sha |
| `parent`     | char     | 40         | Parent commit sha | FK_commits.sha |

<br/>

### Domain 3 - Code Review

#### pull_requests

A pull request is the abstraction of GitHub pull request and Gitlab merge request.

| **field**          | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                                                                | **key**        |
| :----------------- | :------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- |
| `id`               | char     | 40         | A pull request's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..." Eg. For 'github:GithubPullRequests:1347'                                                                                                                                                                                                                                                                         | FK_commits.sha |
| `title`            | varchar  | 255        | The title of pull request                                                                                                                                                                                                                                                                                                                                                                      |                |
| `description`      | longtext |            | The body/description of pull request                                                                                                                                                                                                                                                                                                                                                           |                |
| `status`           | varchar  | 255        | the status of pull requests. For a Github pull request, the status can either be 'open' or 'closed'.                                                                                                                                                                                                                                                                                           |                |
| `parent_pr_id`     | varchar  | 255        | The id of the parent PR                                                                                                                                                                                                                                                                                                                                                                        |                |
| `pull_request_key` | varchar  | 255        | The key of PR. Eg, 1536 is the key of this [PR](https://github.com/apache/incubator-devlake/pull/1563)                                                                                                                                                                                                                                                                                         |                |
| `base_repo_id`     | varchar  | 255        | The repo that will be updated.                                                                                                                                                                                                                                                                                                                                                                 |                |
| `head_reop_id`     | varchar  | 255        | The repo containing the changes that will be added to the base. If the head repository is NULL, this means that the corresponding project had been deleted when DevLake processed the pull request.                                                                                                                                                                                            |                |
| `base_ref`         | varchar  | 255        | The branch name in the base repo that will be updated                                                                                                                                                                                                                                                                                                                                          |                |
| `head_ref`         | varchar  | 255        | The branch name in the head repo that contains the changes that will be added to the base                                                                                                                                                                                                                                                                                                      |                |
| `author_name`      | varchar  | 255        | The author's name of the pull request                                                                                                                                                                                                                                                                                                                                                          |                |
| `author_id`        | varchar  | 255        | The author's id of the pull request                                                                                                                                                                                                                                                                                                                                                            |                |
| `url`              | varchar  | 255        | the web link of the pull request                                                                                                                                                                                                                                                                                                                                                               |                |
| `type`             | varchar  | 255        | The work-type of a pull request.For example: feature-development, bug-fix, docs,etc.                                                                                                                                                                                                                                                                                                           |                |
| `component`        | varchar  | 255        | The component this PR affects.<br/>The value is transformed from Github/Gitlab pull request labels by configuring `GITHUB_PR_COMPONENT` in `.env` file during installation.                                                                                                                                                                                                                    |                |
| `created_date`     | datetime | 3          | The time PR created.                                                                                                                                                                                                                                                                                                                                                                           |                |
| `merged_date`      | datetime | 3          | The time PR gets merged. Null when the PR is not merged.                                                                                                                                                                                                                                                                                                                                       |                |
| `closed_date`      | datetime | 3          | The time PR closed. Null when the PR is not closed.                                                                                                                                                                                                                                                                                                                                            |                |
| `merge_commit_sha` | char     | 40         | the merge commit of this PR. By the definition of [Github](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch), when you click the default Merge pull request option on a pull request on Github, all commits from the feature branch are added to the base branch in a merge commit. |                |
| `base_commit_sha`  | char     | 40         | The base commit of this PR.                                                                                                                                                                                                                                                                                                                                                                    |                |
| `head_commit_sha`  | char     | 40         | The head commit of this PR.                                                                                                                                                                                                                                                                                                                                                                    |                |

#### pull_request_labels

This table shows the labels of pull request. Multiple entries can exist per pull request. This table can be used to filter pull requests by label name.

| **field**         | **type** | **length** | **description** | **key**             |
| :---------------- | :------- | :--------- | :-------------- | :------------------ |
| `name`            | varchar  | 255        | Label name      |                     |
| `pull_request_id` | varchar  | 255        | Pull request ID | FK_pull_requests.id |

#### pull_request_commits

A commit associated with a pull request

The list is additive. This means if a rebase with commit squashing takes place after the commits of a pull request have been processed, the old commits will not be deleted.

| **field**         | **type** | **length** | **description** | **key**             |
| :---------------- | :------- | :--------- | :-------------- | :------------------ |
| `pull_request_id` | varchar  | 255        | Pull request id | FK_pull_requests.id |
| `commit_sha`      | char     | 40         | Commit sha      | FK_commits.sha      |

#### pull_request_comments

Normal comments, review bodies, reviews' inline comments of GitHub's pull requests or GitLab's merge requests.

| **field**         | **type** | **length** | **description**                                                                                                                                            | **key**             |
| :---------------- | :------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| `id`              | varchar  | 255        | Comment id                                                                                                                                                 | PK                  |
| `pull_request_id` | varchar  | 255        | Pull request id                                                                                                                                            | FK_pull_requests.id |
| `body`            | longtext |            | The body of the comments                                                                                                                                   |                     |
| `account_id`      | varchar  | 255        | The account who made the comment                                                                                                                           | FK_accounts.id      |
| `created_date`    | datetime | 3          | Comment creation time                                                                                                                                      |                     |
| `position`        | int      |            | Deprecated                                                                                                                                                 |                     |
| `type`            | varchar  | 255        | - For normal comments: NORMAL<br/> - For review comments, ie. diff/inline comments: DIFF<br/> - For reviews' body (exist in GitHub but not GitLab): REVIEW |                     |
| `review_id`       | varchar  | 255        | Review_id of the comment if the type is `REVIEW` or `DIFF`                                                                                                 |                     |
| `status`          | varchar  | 255        | Status of the comment                                                                                                                                      |                     |

#### pull_request_events(WIP)

Events of pull requests.

| **field**         | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                                                                                                                          | **key**             |
| :---------------- | :------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| `id`              | varchar  | 255        | Event id                                                                                                                                                                                                                                                                                                                                                                                                                                                 | PK                  |
| `pull_request_id` | varchar  | 255        | Pull request id                                                                                                                                                                                                                                                                                                                                                                                                                                          | FK_pull_requests.id |
| `action`          | varchar  | 255        | The action to be taken, some values:<ul><li>`opened`: When the pull request has been opened</li><li>`closed`: When the pull request has been closed</li><li>`merged`: When Github detected that the pull request has been merged. No merges outside Github (i.e. Git based) are reported</li><li>`reoponed`: When a pull request is opened after being closed</li><li>`syncrhonize`: When new commits are added/removed to the head repository</li></ul> |                     |
| `actor_id`        | varchar  | 255        | The account id of the event performer                                                                                                                                                                                                                                                                                                                                                                                                                    | FK_accounts.id      |
| `created_date`    | datetime | 3          | Event creation time                                                                                                                                                                                                                                                                                                                                                                                                                                      |                     |

<br/>

### Domain 4 - CI/CD(WIP)

#### cicd_scopes

Information about Jenkins Job, GitHub Action or Gitlab CI.

- For GitHub: a GitHub repo is converted to a cicd_scope
- For Jenkins: a GitLab project is converted to a cicd_scope
- For GitLab: a Jenkins job is converted to a cicd_scope

| **field**      | **type** | **length** | **description**                                                                                                                                                                                                                    | **key** |
| :------------- | :------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `id`           | varchar  | 255        | A cicd_scope's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..."<br/>For example, a Github cicd_scope's id is like "< github >:< GithubRepos >:< ConnectionId >:< GithubRepoId >". Eg. 'github:GithubRepos:1:384111310' | PK      |
| `name`         | varchar  | 255        | The name of cicd_scope.                                                                                                                                                                                                            |         |
| `description`  | varchar  | 255        | The description of cicd_scope.                                                                                                                                                                                                     |         |
| `url`          | varchar  | 255        | The url of cicd_scope. Eg. https://github.com/apache/incubator-devlake or https://jenkins.xxx.cn/view/PROD/job/OPS_releasev2/                                                                                                      |         |
| `created_date` | datetime | 3          | cicd_scope creation date                                                                                                                                                                                                           |         |
| `updated_date` | datetime | 3          | Date of the last data collection for this cicd_scope                                                                                                                                                                               |         |

#### cicd_pipelines

A cicd_pipeline is a series of builds that have connections or a standalone build.

| **field**       | **type**        | **length** | **description**                                                                               | **key** |
| :-------------- | :-------------- | :--------- | :-------------------------------------------------------------------------------------------- | :------ |
| `id`            | varchar         | 255        | This key is generated based on details from the original plugin                               | PK      |
| `name`          | varchar         | 255        | For gitlab, as there is no name for pipeline, so we use projectId, others have their own name |         |
| `result`        | varchar         | 100        | The result of this task                                                                       |         |
| `status`        | varchar         | 100        | The status of this task                                                                       |         |
| `type`          | varchar         | 100        | To indicate if this is a DEPLOYMENT                                                           |         |
| `duration_sec`  | bigint unsigned |            | how long does this task take                                                                  |         |
| `started_date`  | datetime        | 3          | when did this task start                                                                      |         |
| `finished_date` | datetime        | 3          | when did this task finish                                                                     |         |
| `environment`   | varchar         | 255        | To indicate the environment in which the task is running                                      |         |

#### cicd_pipeline_commits

| **field**     | **type** | **length** | **description**                                                 | **key** |
| :------------ | :------- | :--------- | :-------------------------------------------------------------- | :------ |
| `pipeline_id` | varchar  | 255        | This key is generated based on details from the original plugin | PK      |
| `commit_sha`  | varchar  | 255        | The commit that trigger this pipeline                           | PK      |
| `branch`      | varchar  | 255        | The branch that trigger this pipeline                           |         |
| `repo`        | varchar  | 255        |                                                                 |         |
| `repo_id`     | varchar  | 255        | The repo that this pipeline belongs to                          |         |

#### cicd_tasks

A cicd_task is a single job of ci/cd.

| **field**       | **type**        | **length** | **description**                                                 | **key** |
| :-------------- | :-------------- | :--------- | :-------------------------------------------------------------- | :------ |
| `id`            | varchar         | 255        | This key is generated based on details from the original plugin | PK      |
| `name`          | varchar         | 255        |                                                                 |         |
| `pipeline_id`   | varchar         | 255        | The id of pipeline                                              |         |
| `result`        | varchar         | 100        | The result of this task                                         |         |
| `status`        | varchar         | 100        | The status of this task                                         |         |
| `type`          | varchar         | 100        | To indicate if this is a DEPLOYMENT                             |         |
| `duration_sec`  | bigint unsigned |            | how long does this task take                                    |         |
| `started_date`  | datetime        | 3          | when did this task start                                        |         |
| `finished_date` | datetime        | 3          | when did this task finish                                       |         |
| `environment`   | varchar         | 255        | To indicate the environment in which the task is running        |         |

### Domain 5 - Code Quality

The names of tables in the 'Code Quality' domain will start with a prefix cq\_

#### cq_projects

| **field**            | **type** | **length** | **description**                                                                     | **key** |
| :------------------- | :------- | :--------- | :---------------------------------------------------------------------------------- | :------ |
| `id`                 | varchar  | 255        | This key is generated based on details from the original plugin                     | PK      |
| `name`               | varchar  | 255        | The name of the project in SonarQube                                                |         |
| `qualifier`          | varchar  | 255        | The type of project. Examples include "TRK" for regular projects and "VW" for views |         |
| `visibility`         | varchar  | 64         | The visibility of the project. Examples include "public" and "private"              |         |
| `last_analysis_date` | datatime | 3          | The date and time of the most recent analysis of the project                        |         |
| `commit_sha`         | varchar  | 128        | It represents the version number or code version identifier of a project            |         |

#### cq_issues

| **field**                   | **type** | **length** | **description**                                                         | **key** |
| :-------------------------- | :------- | :--------- | :---------------------------------------------------------------------- | :------ |
| `id`                        | varchar  | 255        | This key is generated based on details from the original plugin         | PK      |
| `rule`                      | varchar  | 255        | The key of the rule that the issue is violating                         |         |
| `severity`                  | varchar  | 255        | The severity level of the issue                                         |         |
| `component`                 | varchar  | 255        | The name of the component where the issue was found                     |         |
| `project_key`               | varchar  | 255        | The key of the project that the issue belongs to                        |         |
| `line`                      | bigint   |            | The line number where the issue was found                               |         |
| `status`                    | varchar  | 255        | The status of the issue                                                 |         |
| `message`                   | longtext |            | The message associated with the issue                                   |         |
| `debt`                      | bigint   |            | The estimated time required to fix the issue                            |         |
| `effort`                    | bigint   |            | The effort required to fix the issue                                    |         |
| `commit_author_email`       | varchar  | 255        | The email address of the author of the commit that introduced the issue |         |
| `assignee`                  | varchar  | 255        | The person assigned to fix the issue                                    |         |
| `hash`                      | varchar  | 255        | A hash code for the issue                                               |         |
| `tags`                      | varchar  | 255        | Any tags associated with the issue                                      |         |
| `type`                      | varchar  | 255        | The type of the issue                                                   |         |
| `scope`                     | varchar  | 128        | The scope of the issue                                                  |         |
| `start_line`                | bigint   | 255        | The starting line of the issue                                          |         |
| `end_line`                  | bigint   | 255        | The ending line of the issue                                            |         |
| `start_offset`              | bigint   | 255        | The starting offset of the issue                                        |         |
| `end_offset`                | bigint   | 255        | The ending offset of the issue                                          |         |
| `vulnerability_probability` | varchar  | 100        | The probability of the issue being a vulnerability                      |         |
| `security_category`         | varchar  | 100        | The security category of the issue                                      |         |
| `created_date`              | datetime | 3          | The time when the issue was created                                     |         |
| `updated_date`              | datetime | 3          | The time when the issue was last updated                                |         |

#### cq_issue_code_blocks

| **field**      | **type** | **length** | **description**                                                                       | **key** |
| :------------- | :------- | :--------- | :------------------------------------------------------------------------------------ | :------ |
| `id`           | varchar  | 255        | This key is generated based on details from the original plugin                       | PK      |
| `issue_key`    | varchar  | 255        | A string that stores the key of the issue that the code block is associated with      |         |
| `component`    | varchar  | 255        | A string that stores the name of the component that the code block is associated with |         |
| `start_line`   | bigint   | 255        | An integer that stores the line number where the code block starts                    |         |
| `end_line`     | bigint   | 255        | An integer that stores the line number where the code block ends                      |         |
| `start_offset` | bigint   | 255        | An integer that stores the offset where the code block starts                         |         |
| `end_offset`   | bigint   | 255        | An integer that stores the offset where the code block ends                           |         |
| `msg`          | longtext |            | A long text field that stores the message associated with the code block              |         |

#### cq_file_metrics

| **field**                                  | **type** | **length** | **description**                                                 | **key** |
| :----------------------------------------- | :------- | :--------- | :-------------------------------------------------------------- | :------ |
| `id`                                       | varchar  | 255        | This key is generated based on details from the original plugin | PK      |
| `project_key`                              | varchar  | 255        | The key of the project that the issue belongs to                | PK      |
| `file_name`                                | longtext |            | longtext fields that store the name of the file                 |         |
| `file_path`                                | longtext |            | longtext fields that store the path of the file                 |         |
| `file_language`                            | longtext |            | longtext fields that store the language of the file             |         |
| `code_smells`                              | bigint   |            | Code smells of this file                                        |         |
| `sqale_index`                              | bigint   |            | Sqale index of the file                                         |         |
| `sqale_rating`                             | double   |            | Sqale rating of the file                                        |         |
| `bugs`                                     | bigint   |            | Bugs rating of the file                                         |         |
| `reliability_rating`                       | longtext |            | Reliability rating of the file                                  |         |
| `vulnerabilities`                          | bigint   |            | Vulnerabilities of the file                                     |         |
| `security_rating`                          | longtext |            | Security rating of the file                                     |         |
| `security_hotspots`                        | bigint   |            | Security hotspots of the file                                   |         |
| `security_hotspots_reviewed`               | double   |            | Security hotspots reviewed of the file                          |         |
| `security_review_rating`                   | longtext |            | Security review rating of the file                              |         |
| `ncloc`                                    | bigint   |            | Ncloc of the file                                               |         |
| `coverage`                                 | double   |            | Ncoverage of the file                                           |         |
| `lines_to_cover`                           | bigint   |            | Lines to cover of the file                                      |         |
| `duplicated_lines_density`                 | double   |            | Duplicated lines density of the file                            |         |
| `duplicated_blocks`                        | bigint   |            | Duplicated blocks of the file                                   |         |
| `duplicated_files`                         | bigint   |            | Duplicated files of the file                                    |         |
| `duplicated_lines`                         | bigint   |            | Duplicated lines of the file                                    |         |
| `effort_to_reach_maintainability_rating_a` | bigint   |            | Effort to reach maintainability rating a of the file            |         |
| `complexity`                               | bigint   |            | Complexity of the file                                          |         |
| `cognitive_complexity`                     | bigint   |            | Cognitive complexity of the file                                |         |
| `num_of_lines`                             | bigint   |            | Num of lines of the file                                        |         |

### Domain 6 - Cross-Domain Entities

These entities are used to map entities between different domains. They are the key players to break data isolation.

There're low-level entities such as issue_commits, users, and higher-level cross domain entities such as board_repos

#### issue_commits

A low-level mapping between "issue tracking" and "source code management" domain by mapping `issues` and `commits`. Issue(n): Commit(n).

The original connection between these two entities lies in either issue tracking tools like Jira or source code management tools like GitLab. You have to use tools to accomplish this.

For example, a common method to connect Jira issue and GitLab commit is a GitLab plugin [Jira Integration](https://docs.gitlab.com/ee/integration/jira/). With this plugin, the Jira issue key in the commit message written by the committers will be parsed. Then, the plugin will add the commit urls under this jira issue. Hence, DevLake's [Jira plugin](https://github.com/apache/incubator-devlake/tree/main/plugins/jira) can get the related commits (including repo, commit_id, url) of an issue.

| **field**    | **type** | **length** | **description** | **key**        |
| :----------- | :------- | :--------- | :-------------- | :------------- |
| `issue_id`   | varchar  | 255        | Issue id        | FK_issues.id   |
| `commit_sha` | char     | 40         | Commit sha      | FK_commits.sha |

#### pull_request_issues

This table shows the issues closed by pull requests. It's a medium-level mapping between "issue tracking" and "source code management" domain by mapping issues and commits. Issue(n): Commit(n).

The data is extracted from the body of pull requests conforming to certain regular expression. The regular expression can be defined in GITHUB_PR_BODY_CLOSE_PATTERN in the .env file

| **field**             | **type** | **length** | **description**  | **key**             |
| :-------------------- | :------- | :--------- | :--------------- | :------------------ |
| `pull_request_id`     | char     | 40         | Pull request id  | FK_pull_requests.id |
| `issue_id`            | varchar  | 255        | Issue id         | FK_issues.id        |
| `pull_request_number` | varchar  | 255        | Pull request key |                     |
| `issue_number`        | varchar  | 255        | Issue key        |                     |

#### board_repos (Deprecated)

A way to link "issue tracking" and "source code management" domain by mapping `boards` and `repos`. Board(n): Repo(n).

| **field**  | **type** | **length** | **description** | **key**      |
| :--------- | :------- | :--------- | :-------------- | :----------- |
| `board_id` | varchar  | 255        | Board id        | FK_boards.id |
| `repo_id`  | varchar  | 255        | Repo id         | FK_repos.id  |

#### accounts

This table stores of user accounts across different tools such as GitHub, Jira, GitLab, etc. This table can be joined to get the metadata of all accounts.
metrics, such as _'No. of Issue closed by contributor', 'No. of commits by contributor',_

| **field**      | **type** | **length** | **description**                                                                                                                                                                                                                                                              | **key** |
| :------------- | :------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `id`           | varchar  | 255        | An account's `id` is the identifier of the account of a specific tool. It is composed of "< Plugin >:< Entity >:< PK0 >[:PK1]..."<br/>For example, a Github account's id is composed of "< github >:< GithubAccounts >:< GithubUserId >)". Eg. 'github:GithubUsers:14050754' | PK      |
| `email`        | varchar  | 255        | Email of the account                                                                                                                                                                                                                                                         |         |
| `full_name`    | varchar  | 255        | Full name                                                                                                                                                                                                                                                                    |         |
| `user_name`    | varchar  | 255        | Username, nickname or Github login of an account                                                                                                                                                                                                                             |         |
| `avatar_url`   | varchar  | 255        |                                                                                                                                                                                                                                                                              |         |
| `organization` | varchar  | 255        | User's organization(s)                                                                                                                                                                                                                                                       |         |
| `created_date` | datetime | 3          | User creation time                                                                                                                                                                                                                                                           |         |
| `status`       | int      |            | 0: default, the user is active. 1: the user is not active                                                                                                                                                                                                                    |         |

#### users

| **field** | **type** | **length** | **description**               | **key** |
| --------- | -------- | ---------- | ----------------------------- | ------- |
| `id`      | varchar  | 255        | id of a person                | PK      |
| `email`   | varchar  | 255        | the primary email of a person |         |
| `name`    | varchar  | 255        | name of a person              |         |

#### user_accounts

| **field**    | **type** | **length** | **description** | **key**          |
| ------------ | -------- | ---------- | --------------- | ---------------- |
| `user_id`    | varchar  | 255        | users.id        | Composite PK, FK |
| `account_id` | varchar  | 255        | accounts.id     | Composite PK, FK |

#### teams

| **field**       | **type** | **length** | **description**                                    | **key** |
| --------------- | -------- | ---------- | -------------------------------------------------- | ------- |
| `id`            | varchar  | 255        | id from the data sources, decided by DevLake users | PK      |
| `name`          | varchar  | 255        | name of the team. Eg. team A, team B, etc.         |         |
| `alias`         | varchar  | 255        | alias or abbreviation of a team                    |         |
| `parent_id`     | varchar  | 255        | teams.id, default to null                          | FK      |
| `sorting_index` | int      | 255        | the field to sort team                             |         |

#### team_users

| **field** | **type** | **length** | **description**                                 | **key**          |
| --------- | -------- | ---------- | ----------------------------------------------- | ---------------- |
| `team_id` | varchar  | 255        | Full name of the team. Eg. team A, team B, etc. | Composite PK, FK |
| `user_id` | varchar  | 255        | users.id                                        | Composite PK, FK |

#### project

| **field**     | **type** | **length** | **description**              | **key** |
| ------------- | -------- | ---------- | ---------------------------- | ------- |
| `name`        | varchar  | 255        | name for project             | PK      |
| `description` | longtext |            | description of the project   |         |
| `created_at`  | datetime | 3          | created time of project      |         |
| `updated_at`  | datetime | 3          | last updated time of project |         |

#### project_metric_settings

| **field**       | **type** | **length** | **description**                                          | **key** |
| --------------- | -------- | ---------- | -------------------------------------------------------- | ------- |
| `project_name`  | varchar  | 255        | name for project                                         | PK      |
| `plugin_name`   | varchar  | 255        | name for plugin                                          | PK      |
| `plugin_option` | longtext |            | check if metric plugins have been enabled by the project |         |
| `enable`        | tinyint  | 1          | if the metric plugins is enabled                         |         |

#### project_mapping

| **field**      | **type** | **length** | **description**                                                        | **key** |
| -------------- | -------- | ---------- | ---------------------------------------------------------------------- | ------- |
| `project_name` | varchar  | 255        | name for project                                                       | PK      |
| `table`        | varchar  | 255        | the table name of [Scope](../Overview/KeyConcepts.md#data-scope)       | PK      |
| `row_id`       | varchar  | 255        | the row_id in the [Scope](../Overview/KeyConcepts.md#data-scope) table | PK      |

#### project_pr_metrics

| **field**          | **type** | **length** | **description**                                                                        | **key** |
| :----------------- | :------- | :--------- | :------------------------------------------------------------------------------------- | :------ |
| `id`               | varchar  | 255        | Id of PR                                                                               | PK      |
| `project_name`     | varchar  | 100        | The project that this PR belongs to                                                    | PK      |
| `first_review_id`  | longtext |            | The id of the first review on this pr                                                  |         |
| `first_commit_sha` | longtext |            | The sha of the first commit                                                            |         |
| `pr_coding_time`   | bigint   |            | The time it takes from the first commit until a PR is issued                           |         |
| `pr_pickup_time`   | bigint   |            | The time it takes from when a PR is issued until the first comment is added to that PR |         |
| `pr_review_time`   | bigint   |            | The time it takes to complete a code review of a PR before it gets merged              |         |
| `deployment_id`    | longtext |            | The id of cicd_task which deploy the commits of this PR                                |         |
| `pr_deploy_time`   | bigint   |            | The time it takes from when a PR is merged to when it is deployed                      |         |
| `pr_cycle_time`    | bigint   |            | The total time from the first commit to when the PR is deployed                        |         |

#### project_issue_metrics

| **field**       | **type** | **length** | **description**                             | **key** |
| :-------------- | :------- | :--------- | :------------------------------------------ | :------ |
| `id`            | varchar  | 255        | Id of Issue                                 | PK      |
| `project_name`  | varchar  | 100        | The project that this Issue belongs to      | PK      |
| `deployment_id` | longtext |            | The id of cicd_task which cause an incident |         |

<br/>

## DWM Entities - (Data Warehouse Middle)

DWM entities are the slight aggregation and operation of DWD to store more organized details or middle-level metrics.

#### refs_issues_diffs

This table shows the issues fixed by commits added in a new ref compared to an old one. The data is computed from [table.commits_diffs](#commits_diffs), [table.finished_commits_diffs](#finished_commits_diffs), [table.pull_requests](#pull_requests), [table.pull_request_commits](#pull_request_commits), and [table.pull_request_issues](#pull_request_issues).

This table can support tag-based analysis, for instance, '_No. of bugs closed in a tag_'.

| **field**            | **type** | **length** | **description**                                        | **key**      |
| :------------------- | :------- | :--------- | :----------------------------------------------------- | :----------- |
| `new_ref_id`         | varchar  | 255        | The new ref's id for comparison                        | FK_refs.id   |
| `old_ref_id`         | varchar  | 255        | The old ref's id for comparison                        | FK_refs.id   |
| `new_ref_commit_sha` | char     | 40         | The commit new ref points to at the time of collection |              |
| `old_ref_commit_sha` | char     | 40         | The commit old ref points to at the time of collection |              |
| `issue_number`       | varchar  | 255        | Issue number                                           |              |
| `issue_id`           | varchar  | 255        | Issue id                                               | FK_issues.id |

## Get Domain Layer Models in Developer Mode

When developing a new plugin, you need to refer to domain layer models, as all raw data should be transformed to domain layer data to provide standardized metrics across tools. Please use the following method to access the domain data models.

```golang
import "github.com/apache/incubator-devlake/models/domainlayer/domaininfo"

domaininfo := domaininfo.GetDomainTablesInfo()
for _, table := range domaininfo {
// do something
}
```

If you want to learn more about plugin models, please visit [PluginImplementation](https://devlake.apache.org/docs/DeveloperManuals/PluginImplementation)
