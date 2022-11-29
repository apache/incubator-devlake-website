---
title: "Project"
sidebar_position: 5
description: >
  `Project` is **a set of [Scope](../Overview/KeyConcepts.md#data-scope) from different domains**, a way to group different resources, and it is crucial for some metric calculations like `Dora`.
---

# Summary

For some metric calculations such as the `DORA` metric, we often encounter situations requiring comprehensive calculations based on data from multiple data sources.

For example, we may use `Gitlab` for code version control, `Jenkins` for CI/CD, to calculate PR deployment cycle time, we need to know which `Gitlab Projects` and `Jenkins Jobs` are related for correctness and performance reasons.

However, in most cases, we have multiple `Gitlab Projects` / `Jenkins Jobs` that belong to different teams/agendas in our Apache DevLake database.

To distinguish them into different groups. The `Project` is introduced in v0.15. Essentially, a `project` consists of a set of [Scopes](../Overview/KeyConcepts.md#data-scope), i.e., a couple of `Gitlab Projects`, `Jira Boards` or `Jenkins Jobs`, etc.

`Project` is **a set of [Scope](../Overview/KeyConcepts.md#data-scope) from different domains**, a way to group different resources, and it is crucial for some metric calculation like `Dora`.

Next, let us introduce `Project` in the following order:
- `Project` related models
- Related APIs that can be used to manipulate `Project` models
- The interface that needs to be implemented when developing various plugins to support the `Project`.
	- The interface that needs to be implemented to develop the `Data Source Plugin`
	- The interface that needs to be implemented to develop the `Metrics Plugin`

# Models

To support project we contains the following three models:
 - `projects` describes a project object, including its name, creation and update time and other basic information
 - `project_metric_settings` describes what metrics plugin a project had enabled.
 - `project_mapping` describes the mapping relationship of project and scope, including the name of the project、table and row_id.

## projects

|   **field**   | **type** | **length** | **description**               | **key** |
| ------------- | -------- | ---------- | ----------------------------- | ------- |
| `name`        | varchar  | 255        | name for project              | PK      |
| `description` | longtext |            | description of the project    |         |
| `created_at`  | datetime | 3          | created time of project       |         |
| `updated_at`  | datetime | 3          | last updated time of project  |         | 


| **name**  | **describe**                         | **created_at**          | **updated_at**          |
| --------- | ------------------------------------ | ----------------------- | ------------------------|
| project_1 | this is one of the test projects     | 2022-11-01 01:22:13.000 | 2022-11-01 02:24:15.000 |
| project_2 | this is another project test project | 2022-11-01 01:23:29.000 | 2022-11-01 02:27:24.000 |

## project_metric_settings

|    **field**    | **type** | **length** | **description**                                            | **key** |
| --------------- | -------- | ---------- | ---------------------------------------------------------- | ------- |
| `project_name`  | varchar  | 255        | name for project                                           | PK      |
| `plugin_name`   | varchar  | 255        | name for plugin                                            | PK      |
| `plugin_option` | longtext |            | check if metric plugins have been enabled by the project   |         |
| `enable`        | tinyint  | 1          | if the metric plugins is enabled                           |         |


| **project_name** | **plugin_name** | **plugin_option** | **enable** |
| ---------------- | --------------- | ----------------- | ---------- |
| project_1        |   dora          | {}                | true       |
| project_2        |   dora          | {}                | false      |

## project_mapping

|   **field**    | **type** | **length** | **description**                                               | **key** |
| -------------- | -------- | ---------- | ------------------------------------------------------------- | ------- |
| `project_name` | varchar  | 255        | name for project                                              | PK      |
| `table`        | varchar  | 255        | the table name of [Scope](../Overview/KeyConcepts.md#data-scope)          | PK      |
| `row_id`       | varchar  | 255        | the row_id in the [Scope](../Overview/KeyConcepts.md#data-scope) table    | PK      |


| **project_name** | **table** | **row_id**               |
| ---------------- | --------- | ------------------------ |
| project_1        | Repo      | gitlab:GithubRepo:1:lake |
| project_1        | Board     | jira:JiraBoard:1:lake    |
| project_2        | Repo      | github:GithubRepo:1:lake |

# How to manage project via API

For API specification, please check the swagger doc(by visiting `[Your Config-UI Host]/api/swagger/index.html`).
Related endpoints:

1. /projects
2. /projects/:projectName/metrics
3. /plugins

# The interface that needs to be implemented

We divide plugins into two categories
- The first category is `Data Source Plugin`, such as `GitLab` `GitHub` `Jira` `Jenkins`, etc. These plugins collect data from various data sources
- The second category is `Metrics Plugin`, such as `Dora`, etc. These plug-ins do not directly contact the data source but do secondary calculations based on the collected data after the `Data Source Plugin` works

## Data Source Plugin

For example `GitLab` `GitHub` `Jira` `Jenkins` etc.

These plugins, from various data sources, extract data into the database and store them, they deal directly with the data source, so we classify them as `Data Source Plugin`.

## the DataSourcePluginBlueprintV200 interface

`Data Source Plugin` needs to implement `DataSourcePluginBlueprintV200` interface to support `project`

The interface definition for this interface is as follows

```go
// DataSourcePluginBlueprintV200 extends the V100 to provide support for
// Project, so that complex metrics like DORA can be implemented based on a set
// of Data Scopes
type DataSourcePluginBlueprintV200 interface {
	MakeDataSourcePipelinePlanV200(
		connectionId uint64,
		scopes []*BlueprintScopeV200,
		syncPolicy BlueprintSyncPolicy,
	) (PipelinePlan, []Scope, errors.Error)
}
```

`project` needs to provide a specific set of [Scopes](../Overview/KeyConcepts.md#data-scope) for a specific `connection` to the plug-in through this interface, and then obtain the plug-in involved in the `PipelineTask` All `plugins` and corresponding parameter information. At the same time, the plug-in needs to convert entities like `repo` and `board` in the data source into a `scope interface` that `project` can understand
   
The corresponding `scope interface` has been implemented at following files of in the framework layer:
- `models/domainlayer/devops/cicd_scope.go`
- `models/domainlayer/ticket/board.go`
- `models/domainlayer/code/repo.go`

In the `plugins/gitlab/impl/impl.go` file, there is a `Gitlab` plugin implementation of the above interface, which can be used as a reference.

And the `plugins/gitlab/api/blueprint_v200.go` contains implementation details. 

The following files contain the models that the relevant implementations depend on for reference:
- `plugins/gitlab/models/project.go`
- `plugins/gitlab/models/transformation_rule.go`

## Metrics Plugin

For example `Dora`, and `Refdff` plugins belong to the `Metrics Plugin`

These plugins are mainly for calculating various metrics, they do not directly contact the data source, so we classify them as `Metrics Plugin`.

## The PluginMetric Interface

`Metrics Plugin` needs to implement the `PluginMetric` interface to support `project`

The interface definition for this interface looks like this:

```go
type PluginMetric interface {
	// returns a list of required data entities and expected features.
	// [{ "model": "cicd_tasks", "requiredFields": {"column": "type", "execptedValue": "Deployment"}}, ...]
	RequiredDataEntities() (data []map[string]interface{}, err errors.Error)

	// returns if the metric depends on Project for calculation.
	// Currently, only dora would return true.
	IsProjectMetric() bool

	// indicates which plugins must be executed before executing this one.
	// declare a set of dependencies with this
	RunAfter() ([]string, errors.Error)

	// returns an empty pointer of the plugin setting struct.
	// (no concrete usage at this point)
	Settings() (p interface{})
}

```

`Project` needs `PluginMetric` to know whether a `Metrics Plugin` is dependent on `project`, and the tables and fields required in its calculation process.
 
In the `plugins/dora/impl/impl.go` file, there is a `Dora` plugin implementation of the above interface, which can be used as a sample reference.You can find it by searching the following fields:
- `func (plugin Dora) RequiredDataEntities() (data []map[string]interface{}, err errors.Error)`
- `func (plugin Dora) IsProjectMetric() bool`
- `func (plugin Dora) RunAfter() ([]string, errors.Error)`
- `func (plugin Dora) Settings() interface{}`

## References

To dig deeper into developing and utilizing our built-in functions and have a better developer experience, feel free to dive into our [godoc](https://pkg.go.dev/github.com/apache/incubator-devlake) reference.