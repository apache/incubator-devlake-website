---
title: "Project"
sidebar_position: 5
description: >
  `Project` is **a set of [Scope](../Glossary.md#data-scope) from different domains**, a way to group different resources, and it is crucial for some metric calculations like `Dora`.
---

# Summary

In related calculations such as `Dora` indicators, we often encounter situations requiring comprehensive calculations based on data from multiple data sources.

For example, we do code version management on `Gitlab`, and then do corresponding compilation and deployment operations in `Jenkins`. At this time, our indicator calculation will depend on the data of `Gitlab` and `Jenkins` at the same time.

However, the reality is that sometimes, we have plural `Gitlab` connections and plural `Jenkins` connections.

At this time, to support calculations that rely on multiple data sources like `Dora`, we need to correctly associate different [Scope](../Glossary.md#data-scope) under different data sources through a method.

So, we created `Project`

`Project` is **a set of [Scope](../Glossary.md#data-scope) from different domains**, a way to group different resources, and it is crucial for some metric calculation like `Dora`.

By adding the `project_name` field to the `blueprint` table, we associate `project` with `blueprint` one-to-one.

As a developer, when we are doing a new plugin development, or when we do some other operations that need to be associated with `Project` to add, delete, and modify operations, we need to have a detailed understanding of `Project`.

Next, let us introduce `Project` in the following order:
- `Project` related models
- Related APIs that can be used to manipulate `Project` models
- The interface that needs to be implemented when developing various plugins to support the `Project`.
	- The interface that needs to be implemented to develop the `Data Source Plugin`
	- The interface that needs to be implemented to develop the `Metrics Plugin`

# Models

To support project we contains the following three models:
 - `projects` describes a project object, including its name, creation and update time and other basic information
 - `project_metrics` describes what metrics plugin a project had enabled.
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

## project_metrics

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
| `table`        | varchar  | 255        | the table name of [Scope](../Glossary.md#data-scope)          | PK      |
| `row_id`       | varchar  | 255        | the row_id in the [Scope](../Glossary.md#data-scope) table    | PK      |


| **project_name** | **table** | **row_id**               |
| ---------------- | --------- | ------------------------ |
| project_1        | Repo      | gitlab:GithubRepo:1:lake |
| project_1        | Board     | jira:JiraBoard:1:lake    |
| project_2        | Repo      | github:GithubRepo:1:lake |

# How to operate the table through the API

By visiting `[Your Config-UI Host]/api/swagger/index.html`, you can go to the swagger document of `Devlake` deployed. In this document, `framework/projects` `framework/ProjectMetrics`, and `framework/plugins ` is the related API of `project`.

To protect the integrity of the data in the database as much as possible, we recommend using the API to perform corresponding operations instead of directly using SQL statements to operate the tables in the database.

When we need to manipulate the `projects` table, we can use the `framework/projects`:
- We can create a new `project` object through the `POST` `/projects` interface, which requires a `projectName` field as its name, which is unique.

After we created the `project` object or we already had a `project`:
- We can use the `GET /projects/:projectName` interface to obtain specific `project` information. In addition to the name, this information also includes the update time and creation time of the project, and will be associated with all The relevant `project_metrics` and `project_mapping` information of the current `project` will be returned after integration.
- We can use the `PATCH /projects/:projectName` interface to update the information of a specific `project`, such as updating its related `description` information.
- We can get all `project` information through the `GET /projects` interface. The returned information can be filtered by setting the parameter `search`, and the returned information can be paged by setting the parameters `page`, and `pageSize`.

After we created the `project` object or we already had a `project`:
- we can use the `POST /project_metrics/:projectName/:pluginName` to create a set of relationships between `project` and `Metrics Plugin`, Use the `projectName` and `pluginName` we obtained earlier to build this relationship. At the same time configure the corresponding `option` for it.

After we create a `project_metrics` relation or we already had one:
- We can use the `GET /project_metrics/:projectName/:pluginName` to get a set of `project_metrics` information.
- We can use the `PATCH /project_metrics/:projectName/:pluginName` to update the `project_metrics` information.

If we need to know which plugins are `Metrics Plugin`:
- we can use the `GET` `/plugins`, it will return a list of all plugin names and information about the plugins and `Metrics Plugin`.

# The interface that needs to be implemented

We divide plugins into three categories
- The first category is `Base Plugin`, such as `core`, `helper`, etc. These plug-ins provide basic support services for other plug-ins.
- The second category is `Data Source Plugin`, such as `GitLab` `GitHub` `Jira` `Jenkins`, etc. These plugins collect data from various data sources
- The third category is `Metrics Plugin`, such as `Dora`, etc. These plug-ins do not directly contact the data source but do secondary calculations based on 

the collected data after the `Data Source Plugin` works

The second and third types of plug-ins here need to implement the corresponding interface to support the project.

## Data Source Plugin

`Data Source Plugin` is a plugin used to extract data from a data source.

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
	MakeDataSourcePipelinePlanV200(connectionId uint64, scopes []*BlueprintScopeV200) (PipelinePlan, []Scope, errors.Error)
}
```

`project` needs to provide a specific set of [Scopes](../Glossary.md#data-scope) for a specific `connection` to the plug-in through this interface, and then obtain the plug-in involved in the `PipelineTask` All `plugins` and corresponding parameter information. At the same time, the plug-in needs to convert entities like `repo` and `board` in the data source into a `scope interface` that `project` can understand
   
The corresponding `scope interface` has been implemented in the framework layer as shown below

```go
type Board struct {
	domainlayer.DomainEntity
	Name        string `gorm:"type:varchar(255)"`
	Description string
	Url         string `gorm:"type:varchar(255)"`
	CreatedDate *time.Time
	Type        string `gorm:"type:varchar(255)"`
}

func (Board) TableName() string {
	return "boards"
}

func (r *Board) ScopeId() string {
	return r.Id
}

func (r *Board) ScopeName() string {
	return r.Name
}

type Repo struct {
	domainlayer.DomainEntity
	Name        string     `json:"name"`
	Url         string     `json:"url"`
	Description string     `json:"description"`
	OwnerId     string     `json:"ownerId" gorm:"type:varchar(255)"`
	Language    string     `json:"language" gorm:"type:varchar(255)"`
	ForkedFrom  string     `json:"forkedFrom"`
	CreatedDate time.Time  `json:"createdDate"`
	UpdatedDate *time.Time `json:"updatedDate"`
	Deleted     bool       `json:"deleted"`
}

func (Repo) TableName() string {
	return "repos"
}

func (r *Repo) ScopeId() string {
	return r.Id
}

func (r *Repo) ScopeName() string {
	return r.Name
}
```

The following is an example of `Gitlab` implementing the interface for reference:

```go
// impl/impl.go
func (plugin Gitlab) MakeDataSourcePipelinePlanV200(connectionId uint64, scopes []*core.BlueprintScopeV200) (pp core.PipelinePlan, sc []core.Scope, err errors.Error) {
	return api.MakeDataSourcePipelinePlanV200(connectionId, scopes)
}

```

```go
// api/blueprint_v200.go
func MakeDataSourcePipelinePlanV200(connectionId uint64, scopes []*core.BlueprintScopeV200) (pp core.PipelinePlan, sc []core.Scope, err errors.Error) {
	pp = make(core.PipelinePlan, 0, 1)
	sc = make([]core.Scope, 0, 3*len(scopes))
	err = nil

	connectionHelper := helper.NewConnectionHelper(BasicRes, validator.New())

	// get the connection info for url
	connection := &models.GitlabConnection{}
	err = connectionHelper.FirstById(connection, connectionId)
	if err != nil {
		return nil, nil, err
	}

	ps := make(core.PipelineStage, 0, len(scopes))
	for _, scope := range scopes {
		var board ticket.Board
		var repo code.Repo

		id := didgen.NewDomainIdGenerator(&models.GitlabProject{}).Generate(connectionId, scope.Id)

		repo.Id = id
		repo.Name = scope.Name

		board.Id = id
		board.Name = scope.Name

		sc = append(sc, &repo)
		sc = append(sc, &board)

		ps = append(ps, &core.PipelineTask{
			Plugin: "gitlab",
			Options: map[string]interface{}{
				"name": scope.Name,
			},
		})

		ps = append(ps, &core.PipelineTask{
			Plugin: "gitextractor",
			Options: map[string]interface{}{
				"url": connection.Endpoint + scope.Name,
			},
		})
	}

	pp = append(pp, ps)

	return pp, sc, nil
}
```
## Metrics Plugin
The `Metrics Plugin` is based on the data collected by the `Data Source Plugin` to do secondary calculations.

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
 
The following is an example of `Dora` implementing the interface for reference:

```go
func (plugin Dora) RequiredDataEntities() (data []map[string]interface{}, err errors.Error) {
	return []map[string]interface{}{
		{
			"model": "cicd_tasks",
			"requiredFields": map[string]string{
				"column":        "type",
				"execptedValue": "Deployment",
			},
		},
	}, nil
}

func (plugin Dora) IsProjectMetric() bool {
	return true
}

func (plugin Dora) RunAfter() ([]string, errors.Error) {
	return []string{}, nil
}

func (plugin Dora) Settings() interface{} {
	return nil
}

```