---
title: "Domain Layer Schema"
description: >
  DevLake Domain Layer Schema
sidebar_position: 2
---

## Summary

This document describes the entities in DevLake's domain layer schema and their relationships.

Data in the domain layer is transformed from the data in the tool layer. The tool layer schema is based on the data from specific tools such as Jira, GitHub, Gitlab, Jenkins, etc. The domain layer schema can be regarded as an abstraction of tool-layer schemas.

Domain layer schema itself includes 2 logical layers: a `DWD` layer and a `DWM` layer. The DWD layer stores the detailed data points, while the DWM is the slight aggregation and operation of DWD to store more organized details or middle-level metrics.


## Use Cases
1. Users can make customized Grafana dashboards based on the domain layer schema.
2. Contributors can complete the ETL logic when adding new data source plugins refering to this data model.


## Data Model

This is the up-to-date domain layer schema for DevLake v0.10.x. Tables (entities) are categorized into 5 domains.
1. Issue tracking domain entities: Jira issues, GitHub issues, GitLab issues, etc
2. Source code management domain entities: Git/GitHub/Gitlab commits and refs, etc
3. Code review domain entities: GitHub PRs, Gitlab MRs, etc
4. CI/CD domain entities: Jenkins jobs & builds, etc
5. Cross-domain entities: entities that map entities from different domains to break data isolation


### Schema Diagram
![Domain Layer Schema](/img/DomainLayerSchema/schema-diagram.png)

When reading the schema, you'll notice that many tables' primary key is called `id`. Unlike auto-increment id or UUID, `id` is a string composed of several parts to uniquely identify similar entities (e.g. repo) from different platforms (e.g. Github/Gitlab) and allow them to co-exist in a single table.

Tables that end with WIP are still under development.


### Naming Conventions

1. The name of a table is in plural form. Eg. boards, issues, etc.
2. The name of a table which describe the relation between 2 entities is in the form of [BigEntity in singular form]\_[SmallEntity in plural form]. Eg. board_issues, sprint_issues, pull_request_comments, etc.
3. Value of the field in enum type are in capital letters. Eg. [table.issues.type](https://merico.feishu.cn/docs/doccnvyuG9YpVc6lvmWkmmbZtUc#ZDCw9k) has 3 values, REQUIREMENT, BUG, INCIDENT. Values that are phrases, such as 'IN_PROGRESS' of [table.issues.status](https://merico.feishu.cn/docs/doccnvyuG9YpVc6lvmWkmmbZtUc#ZDCw9k), are separated with underscore '\_'.

<br/>

## DWD Entities - (Data Warehouse Detail)

### Domain 1 - Issue Tracking

#### 1. Issues

An `issue` is the abstraction of Jira/Github/GitLab/TAPD/... issues.

| **field**                   | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **key** |
| :-------------------------- | :------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `id`                        | varchar  | 255        | An issue's `id` is composed of < plugin >:< Entity >:< PK0 >[:PK1]..." <ul><li>For Github issues, a Github issue's id is like "github:GithubIssues:< GithubIssueId >". Eg. 'github:GithubIssues:1049355647'</li> <li>For Jira issues, a Github repo's id is like "jira:JiraIssues:< JiraSourceId >:< JiraIssueId >". Eg. 'jira:JiraIssues:1:10063'. < JiraSourceId > is used to identify which jira source the issue came from, since DevLake users can import data from several different Jira instances at the same time.</li></ul>                                                                    | PK      |
| `number`                    | varchar  | 255        | The number of this issue. For example, the number of this Github [issue](https://github.com/merico-dev/lake/issues/1145) is 1145.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |         |
| `url`                       | varchar  | 255        | The url of the issue. It's a web address in most cases.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |         |
| `title`                     | varchar  | 255        | The title of an issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |         |
| `description`               | longtext |            | The detailed description/summary of an issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |         |
| `type`                      | varchar  | 255        | The standard type of this issue. There're 3 standard types: <ul><li>REQUIREMENT: this issue is a feature</li><li>BUG: this issue is a bug found during test</li><li>INCIDENT: this issue is a bug found after release</li></ul>The 3 standard types are transformed from the original types of an issue. The transformation rule is set in the '.env' file or 'config-ui' before data collection. For issues with an original type that has not mapped to a standard type, the value of `type` will be the issue's original type.                                                                        |         |
| `status`                    | varchar  | 255        | The standard statuses of this issue. There're 3 standard statuses: <ul><li> TODO: this issue is in backlog or to-do list</li><li>IN_PROGRESS: this issue is in progress</li><li>DONE: this issue is resolved or closed</li></ul>The 3 standard statuses are transformed from the original statuses of an issue. The transformation rule: <ul><li>For Jira issue status: transformed from the Jira issue's `statusCategory`. Jira issue has 3 default status categories: 'To Do', 'In Progress', 'Done'.</li><li>For Github issue status: <ul><li>open -> TODO</li><li>closed -> DONE</li></ul></li></ul> |         |
| `original_status`           | varchar  | 255        | The original status of an issue.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |         |
| `story_point`               | int      |            | The story point of this issue. It's default to an empty string for data sources such as Github issues and Gitlab issues.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |         |
| `priority`                  | varchar  | 255        | The priority of the issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |         |
| `component`                 | varchar  | 255        | The component a bug-issue affects. This field only supports Github plugin for now. The value is transformed from Github issue labels by the rules set according to the user's configuration of .env by end users during DevLake installation.                                                                                                                                                                                                                                                                                                                                                            |         |
| `severity`                  | varchar  | 255        | The severity level of a bug-issue. This field only supports Github plugin for now. The value is transformed from Github issue labels by the rules set according to the user's configuration of .env by end users during DevLake installation.                                                                                                                                                                                                                                                                                                                                                            |         |
| `parent_issue_id`           | varchar  | 255        | The id of its parent issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |         |
| `epic_key`                  | varchar  | 255        | The key of the epic this issue belongs to. For tools with no epic-type issues such as Github and Gitlab, this field is default to an empty string                                                                                                                                                                                                                                                                                                                                                                                                                                                        |         |
| `original_estimate_minutes` | int      |            | The orginal estimation of the time allocated for this issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |         |
| `time_spent_minutes`         | int      |            | The orginal estimation of the time allocated for this issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |         |
| `time_remaining_minutes`     | int      |            | The remaining time to resolve the issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |         |
| `creator_id`                 | varchar  | 255        | The id of issue creator                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |         |
| `assignee_id`               | varchar  | 255        | The id of issue assignee.<ul><li>For Github issues: this is the last assignee of an issue if the issue has multiple assignees</li><li>For Jira issues: this is the assignee of the issue at the time of collection</li></ul>                                                                                                                                                                                                                                                                                                                                                           |         |
| `assignee_name`             | varchar  | 255        | The name of the assignee                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |         |
| `created_date`              | datetime | 3          | The time issue created                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |         |
| `updated_date`              | datetime | 3          | The last time issue gets updated                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |         |
| `resolution_date`           | datetime | 3          | The time the issue changes to 'DONE'.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |         |
| `lead_time_minutes`         | int      |            | Describes the cycle time from issue creation to issue resolution.<ul><li>For issues whose type = 'REQUIREMENT' and status = 'DONE', lead_time_minutes = resolution_date - created_date. The unit is minute.</li><li>For issues whose type != 'REQUIREMENT' or status != 'DONE', lead_time_minutes is null</li></ul>                                                                                                                                                                                                                                                                    |         |

#### 2. issue_labels

This table shows the labels of issues. Multiple entries can exist per issue. This table can be used to filter issues by label name.

| **field**  | **type** | **length** | **description** | **key**      |
| :--------- | :------- | :--------- | :-------------- | :----------- |
| `name`     | varchar  | 255        | Label name      |              |
| `issue_id` | varchar  | 255        | Issue ID        | FK_issues.id |


#### 3. issue_comments(WIP)

This table shows the comments of issues. Issues with multiple comments are shown as multiple records. This table can be used to calculate _metric - issue response time_.

| **field**      | **type** | **length** | **description**                                                                                                                                                                               | **key**      |
| :------------- | :------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| `id`           | varchar  | 255        | The unique id of a comment                                                                                                                                                                    | PK           |
| `issue_id`     | varchar  | 255        | Issue ID                                                                                                                                                                                      | FK_issues.id |
| `user_id`      | varchar  | 255        | The id of the user who made the comment                                                                                                                                                       | FK_users.id  |
| `body`         | longtext |            | The body/detail of the comment                                                                                                                                                                |              |
| `created_date` | datetime | 3          | The creation date of the comment                                                                                                                                                              |              |
| `updated_date` | datetime | 3          | The last time comment gets updated                                                                                                                                                            |              |
| `position`     | int      |            | The position of a comment under an issue. It starts from 1. The position is sorted by comment created_date asc.<br/>Eg. If an issue has 5 comments, the position of the 1st created comment is 1. |              |

#### 4. issue_changelog(WIP)

This table shows the changelogs of issues. Issues with multiple changelogs are shown as multiple records.

| **field**      | **type** | **length** | **description**                                                       | **key**      |
| :------------- | :------- | :--------- | :-------------------------------------------------------------------- | :----------- |
| `id`           | varchar  | 255        | The unique id of an issue changelog                                   | PK           |
| `issue_id`     | varchar  | 255        | Issue ID                                                              | FK_issues.id |
| `actor_id`     | varchar  | 255        | The id of the user who made the change                                | FK_users.id  |
| `field`        | varchar  | 255        | The id of changed field                                               |              |
| `from`         | varchar  | 255        | The original value of the changed field                               |              |
| `to`           | varchar  | 255        | The new value of the changed field                                    |              |
| `created_date` | datetime | 3          | The creation date of the changelog                                    |              |


#### 5. issue_worklogs

This table shows the work logged under issues. Usually, an issue has multiple worklogs logged by different developers.

| **field**            | **type** | **length** | **description**                                                                              | **key**      |
| :------------------- | :------- | :--------- | :------------------------------------------------------------------------------------------- | :----------- |
| `issue_id`           | varchar  | 255        | Issue ID                                                                                     | FK_issues.id |
| `author_id`          | varchar  | 255        | The id of the user who logged the work                                                       | FK_users.id  |
| `comment`            | varchar  | 255        | The comment an user made while logging the work.                                             |              |
| `time_spent_minutes` | int      |            | The time user logged. The unit of value is normalized to minute. Eg. 1d =) 480, 4h30m =) 270 |              |
| `logged_date`        | datetime | 3          | The time of this logging action                                                              |              |
| `started_date`       | datetime | 3          | Start time of the worklog                                                                    |              |


#### 6. boards

A `board` is an issue list or a collection of issues. It's the abstraction of a Jira board, a Jira project or a [Github issue list](https://github.com/merico-dev/lake/issues). This table can be used to filter issues by the boards they belong to.

| **field**      | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                                                      | **key** |
| :------------- | :------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `id`           | varchar  | 255        | A board's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..." <ul><li>For a Github repo's issue list, the board id is like "< github >:< GithubRepos >:< GithubRepoId >". Eg. "github:GithubRepo:384111310"</li> <li>For a Jira Board, the id is like the board id is like "< jira >:< JiraSourceId >< JiraBoards >:< JiraBoardsId >". Eg. "jira:1:JiraBoards:12"</li></ul> | PK      |
| `name`           | varchar  | 255        | The name of the board. Note: the board name of a Github project 'merico-dev/lake' is 'merico-dev/lake', representing the [default issue list](https://github.com/merico-dev/lake/issues).                                                                                                                                                                                            |         |
| `description`  | varchar  | 255        | The description of the board.                                                                                                                                                                                                                                                                                                                                                        |         |
| `url`          | varchar  | 255        | The url of the board. Eg. https://Github.com/merico-dev/lake                                                                                                                                                                                                                                                                                                                         |         |
| `created_date` | datetime | 3          | Board creation time                                                                                                                                                                                                                                                                                                                             |         |

#### 7. board_issues

This table shows the relation between boards and issues. This table can be used to filter issues by board.

| **field**  | **type** | **length** | **description** | **key**      |
| :--------- | :------- | :--------- | :-------------- | :----------- |
| `board_id` | varchar  | 255        | Board id        | FK_boards.id |
| `issue_id` | varchar  | 255        | Issue id        | FK_issues.id |

#### 8. sprints

A `sprint` is the abstraction of Jira sprints, TAPD iterations and Github milestones. A sprint contains a list of issues.

| **field**           | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **key**      |
| :------------------ | :------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------- |
| `id`                | varchar  | 255        | A sprint's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..."<ul><li>A sprint in a Github repo is a milestone, the sprint id is like "< github >:< GithubRepos >:< GithubRepoId >:< milestoneNumber >".<br/>Eg. The id for this [sprint](https://github.com/merico-dev/lake/milestone/5) is "github:GithubRepo:384111310:5"</li><li>For a Jira Board, the id is like "< jira >:< JiraSourceId >< JiraBoards >:< JiraBoardsId >".<br/>Eg. "jira:1:JiraBoards:12"</li></ul>                                                                                                                       | PK           |
| `name`              | varchar  | 255        | The name of sprint.<br/>For Github projects, the sprint name is the milestone name. For instance, 'v0.10.0 - Introduce Temporal to DevLake' is the name of this [sprint](https://github.com/merico-dev/lake/milestone/5).                                                                                                                                                                                                                                                                                                                                                                               |              |
| `url`               | varchar  | 255        | The url of sprint.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |              |
| `status`            | varchar  | 255        | There're 3 statuses of a sprint:<ul><li>CLOSED: a completed sprint</li><li>ACTIVE: a sprint started but not completed</li><li>FUTURE: a sprint that has not started</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                           |              |
| `started_date`      | datetime | 3          | The start time of a sprint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |              |
| `ended_date`        | datetime | 3          | The planned/estimated end time of a sprint. It's usually set when planning a sprint.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |              |
| `completed_date`    | datetime | 3          | The actual time to complete a sprint.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |              |
| `original_board_id` | datetime | 3          | The id of board where the sprint first created. This field is not null only when this entity is transformed from Jira sprintas.<br/>In Jira, sprint and board entities have 2 types of relation:<ul><li>A sprint is created based on a specific board. In this case, board(1):(n)sprint. The `original_board_id` is used to show the relation.</li><li>A sprint can be mapped to multiple boards, a board can also show multiple sprints. In this case, board(n):(n)sprint. This relation is shown in [table.board_sprints](https://merico.feishu.cn/docs/doccnvyuG9YpVc6lvmWkmmbZtUc#xfm617)</li></ul> | FK_boards.id |

#### 9. sprint_issues

This table shows the relation between sprints and issues that have been added to sprints. This table can be used to show metrics such as _'ratio of unplanned issues'_, _'completion rate of sprint issues'_, etc

| **field**        | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **key**       |
| :--------------- | :------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `sprint_id`      | varchar  | 255        | Sprint id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | FK_sprints.id |
| `issue_id`       | varchar  | 255        | Issue id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | FK_issues.id  |
| `is_removed`     | bool     |            | If the issue is removed from this sprint, then TRUE; else FALSE                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |               |
| `added_date`     | datetime | 3          | The time this issue added to the sprint. If an issue is added to a sprint multiple times, the latest time will be the value.                                                                                                                                                                                                                                                                                                                                                                                                        |               |
| `removed_date`   | datetime | 3          | The time this issue gets removed from the sprint. If an issue is removed multiple times, the latest time will be the value.                                                                                                                                                                                                                                                                                                                                                                                                         |               |
| `added_stage`    | varchar  | 255        | The stage when issue is added to this sprint. There're 3 possible values:<ul><li>BEFORE_SPRINT<br/>Planning before sprint starts.<br/> Condition: sprint_issues.added_date <= sprints.start_date</li><li>DURING_SPRINT Planning during a sprint.<br/>Condition: sprints.start_date < sprint_issues.added_date <= sprints.end_date</li><li>AFTER_SPRINT<br/>Planing after a sprint. This is caused by improper operation - adding issues to a completed sprint.<br/>Condition: sprint_issues.added_date ) sprints.end_date</li></ul> |               |
| `resolved_stage` | varchar  | 255        | The stage when an issue is resolved (issue status turns to 'DONE'). There're 3 possible values:<ul><li>BEFORE_SPRINT<br/>Condition: issues.resolution_date <= sprints.start_date</li><li>DURING_SPRINT<br/>Condition: sprints.start_date < issues.resolution_date <= sprints.end_date</li><li>AFTER_SPRINT<br/>Condition: issues.resolution_date ) sprints.end_date</li></ul>                                                                                                                                                       |               |

#### 10. board_sprints

| **field**   | **type** | **length** | **description** | **key**       |
| :---------- | :------- | :--------- | :-------------- | :------------ |
| `board_id`  | varchar  | 255        | Board id        | FK_boards.id  |
| `sprint_id` | varchar  | 255        | Sprint id       | FK_sprints.id |

<br/>

### Domain 2 - Source Code Management

#### 11. repos

Information about Github or Gitlab repositories. A repository is always owned by a user.

| **field**      | **type** | **length** | **description**                                                                                                                                                                                | **key**     |
| :------------- | :------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `id`           | varchar  | 255        | A repo's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..."<br/>For example, a Github repo's id is like "< github >:< GithubRepos >< GithubRepoId >". Eg. 'github:GithubRepos:384111310' | PK          |
| `name`         | varchar  | 255        | The name of repo.                                                                                                                                                                              |             |
| `description`  | varchar  | 255        | The description of repo.                                                                                                                                                                       |             |
| `url`          | varchar  | 255        | The url of repo. Eg. https://Github.com/merico-dev/lake                                                                                                                                        |             |
| `owner_id`     | varchar  | 255        | The id of the owner of repo                                                                                                                                                                    | FK_users.id |
| `language`     | varchar  | 255        | The major language of repo. Eg. The language for merico-dev/lake is 'Go'                                                                                                                       |             |
| `forked_from`  | varchar  | 255        | Empty unless the repo is a fork in which case it contains the `id` of the repo the repo is forked from.                                                                                        |             |
| `deleted`      | tinyint  | 255        | 0: repo is active 1: repo has been deleted                                                                                                                                                     |             |
| `created_date` | datetime | 3          | Repo creation date                                                                                                                                                                             |             |
| `updated_date` | datetime | 3          | Last full update was done for this repo                                                                                                                                                        |             |

#### 12. repo_languages(WIP)

Languages that are used in the repository along with byte counts for all files in those languages. This is in line with how Github calculates language percentages in a repository. Multiple entries can exist per repo.

The table is filled in when the repo has been first inserted on when an update round for all repos is made.

| **field**      | **type** | **length** | **description**                                                                                                                                                                                    | **key** |
| :------------- | :------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `id`           | varchar  | 255        | A repo's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..."<br/>For example, a Github repo's id is like "< github >:< GithubRepos >< GithubRepoId >". Eg. 'github:GithubRepos:384111310' | PK      |
| `language`     | varchar  | 255        | The language of repo.<br/>These are the [languages](https://api.github.com/repos/merico-dev/lake/languages) for merico-dev/lake                                                                    |         |
| `bytes`        | int      |            | The byte counts for all files in those languages                                                                                                                                                   |         |
| `created_date` | datetime | 3          | The field is filled in with the latest timestamp the query for a specific `repo_id` was done.                                                                                                      |         |

#### 13. repo_commits

The commits belong to the history of a repository. More than one repos can share the same commits if one is a fork of the other.

| **field**    | **type** | **length** | **description** | **key**        |
| :----------- | :------- | :--------- | :-------------- | :------------- |
| `repo_id`    | varchar  | 255        | Repo id         | FK_repos.id    |
| `commit_sha` | char     | 40         | Commit sha      | FK_commits.sha |

#### 14. refs

A ref is the abstraction of a branch or tag.

| **field**    | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                             | **key**     |
| :----------- | :------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `id`         | varchar  | 255        | A ref's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..."<br/>For example, a Github ref is composed of "github:GithubRepos:< GithubRepoId >:< RefUrl >". Eg. The id of release v5.3.0 of PingCAP/TiDB project is 'github:GithubRepos:384111310:refs/tags/v5.3.0' A repo's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..."           | PK          |
| `ref_name`   | varchar  | 255        | The name of ref. Eg. '[refs/tags/v0.9.3](https://github.com/merico-dev/lake/tree/v0.9.3)'                                                                                                                                                                                                                                                                   |             |
| `repo_id`    | varchar  | 255        | The id of repo this ref belongs to                                                                                                                                                                                                                                                                                                                          | FK_repos.id |
| `commit_sha` | char     | 40         | The commit this ref points to at the time of collection                                                                                                                                                                                                                                                                                                     |             |
| `is_default` | int      |            | <ul><li>0: the ref is the default branch. By the definition of [Github](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch), the default branch is the base branch for pull requests and code commits.</li><li>1: not the default branch</li></ul> |             |
| `merge_base` | char     | 40         | The merge base commit of the main ref and the current ref                                                                                                                                                                                                                                                                                                   |             |
| `ref_type`   | varchar  | 64         | There're 2 typical types:<ul><li>BRANCH</li><li>TAG</li></ul>                                                                                                                                                                                                                                                                                               |             |

#### 15. refs_commits_diffs

This table shows the commits added in a new ref compared to an old ref. This table can be used to support tag-based analysis, for instance, '_No. of commits of a tag_', '_No. of merged pull request of a tag_', etc.

The records of this table are computed by [RefDiff](https://github.com/merico-dev/lake/tree/main/plugins/refdiff) plugin. The computation should be manually triggered after using [GitRepoExtractor](https://github.com/merico-dev/lake/tree/main/plugins/gitextractor) to collect commits and refs. The algorithm behind is similar to [this](https://github.com/merico-dev/lake/compare/v0.8.0%E2%80%A6v0.9.0).

| **field**            | **type** | **length** | **description**                                                 | **key**        |
| :------------------- | :------- | :--------- | :-------------------------------------------------------------- | :------------- |
| `commit_sha`         | char     | 40         | One of the added commits in the new ref compared to the old ref | FK_commits.sha |
| `new_ref_id`         | varchar  | 255        | The new ref's id for comparison                                 | FK_refs.id     |
| `old_ref_id`         | varchar  | 255        | The old ref's id for comparison                                 | FK_refs.id     |
| `new_ref_commit_sha` | char     | 40         | The commit new ref points to at the time of collection          |                |
| `old_ref_commit_sha` | char     | 40         | The commit old ref points to at the time of collection          |                |
| `sorting_index`      | varchar  | 255        | An index for debugging, please skip it                          |                |

#### 16. commits

| **field**         | **type** | **length** | **description**                                                                                                                                                  | **key**        |
| :---------------- | :------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- |
| `sha`             | char     | 40         | One of the added commits in the new ref compared to the old ref                                                                                                  | FK_commits.sha |
| `message`         | varchar  | 255        | Commit message                                                                                                                                                   |                |
| `author_name`     | varchar  | 255        | The value is set with command `git config user.name xxxxx` commit                                                                                                                            |                |
| `author_email`    | varchar  | 255        | The value is set with command `git config user.email xxxxx` author                                                                                                                                       |                |
| `authored_date`   | datetime | 3          | The date when this commit was originally made                                                                                                                    |                |
| `author_id`       | varchar  | 255        | The id of commit author                                                                                                                                          | FK_users.id    |
| `committer_name`  | varchar  | 255        | The name of committer                                                                                                                                            |                |
| `committer_email` | varchar  | 255        | The email of committer                                                                                                                                           |                |
| `committed_date`  | datetime | 3          | The last time the commit gets modified.<br/>For example, when rebasing the branch where the commit is in on another branch, the committed_date changes.          |                |
| `committer_id`    | varchar  | 255        | The id of committer                                                                                                                                              | FK_users.id    |
| `additions`       | int      |            | Added lines of code                                                                                                                                              |                |
| `deletions`       | int      |            | Deleted lines of code                                                                                                                                            |                |
| `dev_eq`          | int      |            | A metric that quantifies the amount of code contribution. The data can be retrieved from [AE plugin](https://github.com/merico-dev/lake/tree/v0.9.3/plugins/ae). |                |


#### 17. commit_files

The files have been changed via commits. Multiple entries can exist per commit.

| **field**    | **type** | **length** | **description**                        | **key**        |
| :----------- | :------- | :--------- | :------------------------------------- | :------------- |
| `commit_sha` | char     | 40         | Commit sha                             | FK_commits.sha |
| `file_path`  | varchar  | 255        | Path of a changed file in a commit     |                |
| `additions`  | int      |            | The added lines of code in this file   |                |
| `deletions`  | int      |            | The deleted lines of code in this file |                |

#### 18. commit_comments(WIP)

Code review comments on commits. These are comments on individual commits. If a commit is associated with a pull request, then its comments are in the [pull_request_comments](https://merico.feishu.cn/docs/doccnvyuG9YpVc6lvmWkmmbZtUc#xt2lv4) table.

| **field**      | **type** | **length** | **description**                     | **key**        |
| :------------- | :------- | :--------- | :---------------------------------- | :------------- |
| `id`           | varchar  | 255        | Unique comment id                   |                |
| `commit_sha`   | char     | 40         | Commit sha                          | FK_commits.sha |
| `user_id`      | varchar  | 255        | Id of the user who made the comment |                |
| `created_date` | datetime | 3          | Comment creation time               |                |
| `body`         | longtext |            | Comment body/detail                 |                |
| `line`         | int      |            |                                     |                |
| `position`     | int      |            |                                     |                |

#### 19. commit_parents

The parent commit(s) for each commit, as specified by Git.

| **field**    | **type** | **length** | **description**   | **key**        |
| :----------- | :------- | :--------- | :---------------- | :------------- |
| `commit_sha` | char     | 40         | commit sha        | FK_commits.sha |
| `parent`     | char     | 40         | Parent commit sha | FK_commits.sha |

<br/>

### Domain 3 - Code Review

#### 20. pull_requests

A pull request is the abstraction of Github pull request and Gitlab merge request.

| **field**          | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                                                                | **key**        |
| :----------------- | :------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- |
| `id`               | char     | 40         | A pull request's `id` is composed of "< plugin >:< Entity >:< PK0 >[:PK1]..." Eg. For 'github:GithubPullRequests:1347'                                                                                                                                                                                                                                                                         | FK_commits.sha |
| `title`            | varchar  | 255        | The title of pull request                                                                                                                                                                                                                                                                                                                                                                      |                |
| `description`      | longtext |            | The body/description of pull request                                                                                                                                                                                                                                                                                                                                                           |                |
| `status`           | varchar  | 255        | the status of pull requests. For a Github pull request, the status can either be 'open' or 'closed'.                                                                                                                                                                                                                                                                                           |                |
| `number`           | varchar  | 255        | The number of PR. Eg, 1536 is the number of this [PR](https://github.com/merico-dev/lake/pull/1563)                                                                                                                                                                                                                                                                                            |                |
| `base_repo_id`     | varchar  | 255        | The repo that will be updated.                                                                                                                                                                                                                                                                                                                                                                 |                |
| `head_reop_id`     | varchar  | 255        | The repo containing the changes that will be added to the base. If the head repository is NULL, this means that the corresponding project had been deleted when DevLake processed the pull request.                                                                                                                                                                                            |                |
| `base_ref`         | varchar  | 255        | The branch name in the base repo that will be updated                                                                                                                                                                                                                                                                                                                                          |                |
| `head_ref`         | varchar  | 255        | The branch name in the head repo that contains the changes that will be added to the base                                                                                                                                                                                                                                                                                                      |                |
| `author_name`      | varchar  | 255        | The creator's name of the pull request                                                                                                                                                                                                                                                                                                                                                         |                |
| `author_id`        | varchar  | 255        | The creator's id of the pull request                                                                                                                                                                                                                                                                                                                                                           |                |
| `url`              | varchar  | 255        | the web link of the pull request                                                                                                                                                                                                                                                                                                                                                               |                |
| `type`             | varchar  | 255        | The work-type of a pull request. For example: feature-development, bug-fix, docs, etc.<br/>The value is transformed from Github pull request labels by configuring `GITHUB_PR_TYPE` in `.env` file during installation.                                                                                                                                                                        |                |
| `component`        | varchar  | 255        | The component this PR affects.<br/>The value is transformed from Github/Gitlab pull request labels by configuring `GITHUB_PR_COMPONENT` in `.env` file during installation.                                                                                                                                                                                                                    |                |
| `created_date`     | datetime | 3          | The time PR created.                                                                                                                                                                                                                                                                                                                                                                           |                |
| `merged_date`      | datetime | 3          | The time PR gets merged. Null when the PR is not merged.                                                                                                                                                                                                                                                                                                                                       |                |
| `closed_date`      | datetime | 3          | The time PR closed. Null when the PR is not closed.                                                                                                                                                                                                                                                                                                                                            |                |
| `merge_commit_sha` | char     | 40         | the merge commit of this PR. By the definition of [Github](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch), when you click the default Merge pull request option on a pull request on Github, all commits from the feature branch are added to the base branch in a merge commit. |                |

#### 21. pull_request_labels

This table shows the labels of pull request. Multiple entries can exist per pull request. This table can be used to filter pull requests by label name.

| **field**         | **type** | **length** | **description** | **key**             |
| :---------------- | :------- | :--------- | :-------------- | :------------------ |
| `name`            | varchar  | 255        | Label name      |                     |
| `pull_request_id` | varchar  | 255        | Pull request ID | FK_pull_requests.id |

#### 22. pull_request_commits

A commit associated with a pull request

The list is additive. This means if a rebase with commit squashing takes place after the commits of a pull request have been processed, the old commits will not be deleted.

| **field**         | **type** | **length** | **description** | **key**             |
| :---------------- | :------- | :--------- | :-------------- | :------------------ |
| `pull_request_id` | varchar  | 255        | Pull request id | FK_pull_requests.id |
| `commit_sha`      | char     | 40         | Commit sha      | FK_commits.sha      |

#### 23. pull_request_comments(WIP)

A code review comment on a commit associated with a pull request

The list is additive. If commits are squashed on the head repo, the comments remain intact.

| **field**         | **type** | **length** | **description**                                                                                                                                                                                     | **key**             |
| :---------------- | :------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| `id`              | varchar  | 255        | Comment id                                                                                                                                                                                          | PK                  |
| `pull_request_id` | varchar  | 255        | Pull request id                                                                                                                                                                                     | FK_pull_requests.id |
| `user_id`         | varchar  | 255        | Id of user who made the comment                                                                                                                                                                     | FK_users.id         |
| `created_date`    | datetime | 3          | Comment creation time                                                                                                                                                                               |                     |
| `body`            | longtext |            | The body of the comment                                                                                                                                                                             |                     |
| `position`        | int      |            | The position of a comment under a pull request. It starts from 1. The position is sorted by comment created_date asc.<br/>Eg. If a PR has 5 comments, the position of the 1st created comment is 1. |                     |

#### 24. pull_request_events(WIP)

Events of pull requests.

| **field**         | **type** | **length** | **description**                                                                                                                                                                                                                                                                                                                                                                                                                                          | **key**             |
| :---------------- | :------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| `id`              | varchar  | 255        | Event id                                                                                                                                                                                                                                                                                                                                                                                                                                                 | PK                  |
| `pull_request_id` | varchar  | 255        | Pull request id                                                                                                                                                                                                                                                                                                                                                                                                                                          | FK_pull_requests.id |
| `action`          | varchar  | 255        | The action to be taken, some values:<ul><li>`opened`: When the pull request has been opened</li><li>`closed`: When the pull request has been closed</li><li>`merged`: When Github detected that the pull request has been merged. No merges outside Github (i.e. Git based) are reported</li><li>`reoponed`: When a pull request is opened after being closed</li><li>`syncrhonize`: When new commits are added/removed to the head repository</li></ul> |                     |
| `actor_id`        | varchar  | 255        | The user id of the event performer                                                                                                                                                                                                                                                                                                                                                                                                                       | FK_users.id         |
| `created_date`    | datetime | 3          | Event creation time                                                                                                                                                                                                                                                                                                                                                                                                                                      |                     |

<br/>

### Domain 4 - CI/CD(WIP)

#### 25. jobs

The CI/CD schedule, not a specific task.

| **field** | **type** | **length** | **description** | **key** |
| :-------- | :------- | :--------- | :-------------- | :------ |
| `id`      | varchar  | 255        | Job id          | PK      |
| `name`    | varchar  | 255        | Name of job     |         |

#### 26. builds

A build is an execution of a job.

| **field**      | **type** | **length** | **description**                                                  | **key**    |
| :------------- | :------- | :--------- | :--------------------------------------------------------------- | :--------- |
| `id`           | varchar  | 255        | Build id                                                         | PK         |
| `job_id`       | varchar  | 255        | Id of the job this build belongs to                              | FK_jobs.id |
| `name`         | varchar  | 255        | Name of build                                                    |            |
| `duration_sec` | bigint   |            | The duration of build in seconds                                 |            |
| `started_date` | datetime | 3          | Started time of the build                                        |            |
| `status`       | varchar  | 255        | The result of build. The values may be 'success', 'failed', etc. |            |
| `commit_sha`   | char     | 40         | The specific commit being built on. Nullable.                    |            |


### Cross-Domain Entities

These entities are used to map entities between different domains. They are the key players to break data isolation.

There're low-level entities such as issue_commits, users, and higher-level cross domain entities such as board_repos

#### 27. issue_commits

A low-level mapping between "issue tracking" and "source code management" domain by mapping `issues` and `commits`. Issue(n): Commit(n).

The original connection between these two entities lies in either issue tracking tools like Jira or source code management tools like GitLab. You have to use tools to accomplish this.

For example, a common method to connect Jira issue and GitLab commit is a GitLab plugin [Jira Integration](https://docs.gitlab.com/ee/integration/jira/). With this plugin, the Jira issue key in the commit message written by the committers will be parsed. Then, the plugin will add the commit urls under this jira issue. Hence, DevLake's [Jira plugin](https://github.com/merico-dev/lake/tree/main/plugins/jira) can get the related commits (including repo, commit_id, url) of an issue.

| **field**    | **type** | **length** | **description** | **key**        |
| :----------- | :------- | :--------- | :-------------- | :------------- |
| `issue_id`   | varchar  | 255        | Issue id        | FK_issues.id   |
| `commit_sha` | char     | 40         | Commit sha      | FK_commits.sha |

#### 28. pull_request_issues

This table shows the issues closed by pull requests. It's a medium-level mapping between "issue tracking" and "source code management" domain by mapping issues and commits. Issue(n): Commit(n).

The data is extracted from the body of pull requests conforming to certain regular expression. The regular expression can be defined in GITHUB_PR_BODY_CLOSE_PATTERN in the .env file

| **field**             | **type** | **length** | **description**     | **key**             |
| :-------------------- | :------- | :--------- | :------------------ | :------------------ |
| `pull_request_id`     | char     | 40         | Pull request id     | FK_pull_requests.id |
| `issue_id`            | varchar  | 255        | Issue id            | FK_issues.id        |
| `pull_request_number` | varchar  | 255        | Pull request number |                     |
| `issue_number`        | varchar  | 255        | Issue number        |                     |

#### 29. board_repo(WIP)

A rough way to link "issue tracking" and "source code management" domain by mapping `boards` and `repos`. Board(n): Repo(n).

The mapping logic is under development.

| **field**  | **type** | **length** | **description** | **key**      |
| :--------- | :------- | :--------- | :-------------- | :----------- |
| `board_id` | varchar  | 255        | Board id        | FK_boards.id |
| `repo_id`  | varchar  | 255        | Repo id         | FK_repos.id  |

#### 30. users(WIP)

This is the table to unify user identities across tools. This table can be used to do all user-based metrics, such as _'No. of Issue closed by contributor', 'No. of commits by contributor',_

| **field**      | **type** | **length** | **description**                                                                                                                                                                                         | **key** |
| :------------- | :------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------ |
| `id`           | varchar  | 255        | A user's `id` is composed of "< Plugin >:< Entity >:< PK0 >[:PK1]..."<br/>For example, a Github user's id is composed of "< github >:< GithubUsers >< GithubUserId)". Eg. 'github:GithubUsers:14050754' | PK      |
| user_name      | varchar  | 255        | username/Github login of a user                                                                                                                                                                         |         |
| `fullname`     | varchar  | 255        | User's full name                                                                                                                                                                                        |         |
| `email`        | varchar  | 255        | Email                                                                                                                                                                                                   |         |
| `avatar_url`   | varchar  | 255        |                                                                                                                                                                                                         |         |
| `organization` | varchar  | 255        | User's organization or comany name                                                                                                                                                                      |         |
| `created_date` | datetime | 3          | User creation time                                                                                                                                                                                      |         |
| `deleted`      | tinyint  |            | 0: default. The user is active 1: the user is no longer active                                                                                                                                          |         |

<br/>

## DWM Entities - (Data Warehouse Middle)

DWM entities are the slight aggregation and operation of DWD to store more organized details or middle-level metrics.

#### 31. issue_status_history

This table shows the history of 'status change' of issues. This table can be used to break down _'issue lead time'_ to _'issue staying time in each status'_ to identify the bottleneck of the delivery workflow.

| **field**         | **type** | **length** | **description**                 | **key**         |
| :---------------- | :------- | :--------- | :------------------------------ | :-------------- |
| `issue_id`        | varchar  | 255        | Issue id                        | PK, FK_issue.id |
| `original_status` | varchar  | 255        | The original status of an issue |                 |
| `start_date`      | datetime | 3          | The start time of the status    |                 |
| `end_date`        | datetime | 3          | The end time of the status      |                 |

#### 32. Issue_assignee_history

This table shows the 'assignee change history' of issues. This table can be used to identify _'the actual developer of an issue',_ or _'contributor involved in an issue'_ for contribution analysis.

| **field**    | **type** | **length** | **description**                                    | **key**         |
| :----------- | :------- | :--------- | :------------------------------------------------- | :-------------- |
| `issue_id`   | varchar  | 255        | Issue id                                           | PK, FK_issue.id |
| `assignee`   | varchar  | 255        | The name of assignee of an issue                   |                 |
| `start_date` | datetime | 3          | The time when the issue is assigned to an assignee |                 |
| `end_date`   | datetime | 3          | The time when the assignee changes                 |                 |

#### 33. issue_sprints_history

This table shows the 'scope change history' of sprints. This table can be used to analyze the _'how much and how frequently does a team change plans'_.

| **field**    | **type** | **length** | **description**                                    | **key**         |
| :----------- | :------- | :--------- | :------------------------------------------------- | :-------------- |
| `issue_id`   | varchar  | 255        | Issue id                                           | PK, FK_issue.id |
| `sprint_id`  | varchar  | 255        | Sprint id                                          | FK_sprints.id   |
| `start_date` | datetime | 3          | The time when the issue added to a sprint          |                 |
| `end_date`   | datetime | 3          | The time when the issue gets removed from a sprint |                 |

#### 34. refs_issues_diffs

This table shows the issues fixed by commits added in a new ref compared to an old one. The data is computed from [table.ref_commits_diff](https://merico.feishu.cn/docs/doccnvyuG9YpVc6lvmWkmmbZtUc#yJOyqa), [table.pull_requests](https://merico.feishu.cn/docs/doccnvyuG9YpVc6lvmWkmmbZtUc#Uc849c), [table.pull_request_commits](https://merico.feishu.cn/docs/doccnvyuG9YpVc6lvmWkmmbZtUc#G9cPfj), and [table.pull_request_issues](https://merico.feishu.cn/docs/doccnvyuG9YpVc6lvmWkmmbZtUc#we6Uac).

This table can support tag-based analysis, for instance, '_No. of bugs closed in a tag_'.

| **field**            | **type** | **length** | **description**                                        | **key**      |
| :------------------- | :------- | :--------- | :----------------------------------------------------- | :----------- |
| `new_ref_id`         | varchar  | 255        | The new ref's id for comparison                        | FK_refs.id   |
| `old_ref_id`         | varchar  | 255        | The old ref's id for comparison                        | FK_refs.id   |
| `new_ref_commit_sha` | char     | 40         | The commit new ref points to at the time of collection |              |
| `old_ref_commit_sha` | char     | 40         | The commit old ref points to at the time of collection |              |
| `issue_number`       | varchar  | 255        | Issue number                                           |              |
| `issue_id`           | varchar  | 255        | Issue id                                               | FK_issues.id |
