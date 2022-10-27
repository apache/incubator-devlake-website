---
title: "Project"
sidebar_position: 5
description: >
  Project is an entity object that can be used for Dora to associate pr to deployment/issue.
---

## Summary
Project is an entity object that can be used for Dora to associate pr to deployment/issue.

It contains the following two models:
 - `projects` describes a project object, including its name, creation and update time and other basic information
 - `project_metrics` describes the mapping relationship enabled by a plugin, including the name of the project and plugin on both sides of the mapping, and basic information about plugin options.
 
It requires each plugin to implement an interface named `PluginMetric`

## The PluginMetric Interface


```go
type PluginMetric interface {
    // returns a list of required data entities and expected features.
    // [{ "model": "cicd_tasks", "requiredFields": {"column": "type", "execptedValue": "Deployment"}}, ...]
    RequiredDataEntities() (data map[string]interface{},err errors.Error)

    // This method returns all models of the current plugin
    GetTablesInfo() []core.Tabler
    
    // returns if the metric depends on Project for calculation. 
    // Currently, only dora would return true.
    IsProjectMetric() bool

    // indicates which plugins must be executed before executing this one. 
    // declare a set of dependencies with this
    RunAfter() (PluginsNames []string,errors.Error)

    // returns an empty pointer of the plugin setting struct.
    // (no concrete usage at this point)
    Settings() (p interface{})
}
```

## models

The following is the  table structure data of `project` related.

```go
type Projects struct {
    Name string `gorm:"primaryKey" gorm:"type:varchar(255)"`
    CreatedAt time.time
    UpdatedAt time.time
}

func (Projects) TableName() {
    return "project"
}

type ProjectMetrics struct { 
    ProjectName string `gorm:"primaryKey" gorm:"type:varchar(255)"`
    PluginName string `gorm:"primaryKey" gorm:"type:varchar(255)"`
    
}

func (ProjectMetrics) TableName() {
    return "project_metrics"
}
```

## api

`Project` will provide the following APIs to support users to perform related operations.

```go
// Used to obtain the corresponding information of the specified Project
// Request parameters: including project_name
// response parameter: complete information including updated time and created time information of Project
func GetProject(input *core.ApiResourceInput) (*core.ApiResourceOutput, errors.Error)

// Used to create a new Project data
// Request parameters: including project_name
// response parameter: if created successfully
func PostProject(input *core.ApiResourceInput) (*core.ApiResourceOutput,errors.Error)

// Used to update an existing Project data
// Consider merging with Project into an interface
// The advantage of separating into two interfaces is to avoid data loss caused by misoperation coverage
// Request parameters: including project_name
// response parameter: if updated successfully
func UpdateProject(input *core.ApiResourceInput) (*core.ApiResourceOutput,errors.Error)

// Used to obtain the corresponding information of the specified ProjectMetrics
// Request parameters: including project_name and plugin_name
// response parameter: complete information including plugin_options information of ProjectMetrics
func GetProjectMetrics(input *core.ApiResourceInput) (*core.ApiResourceOutput, errors.Error)

// Used to create a new ProjectMetrics data
// Request parameters: including project_name, plugin_name and plugin_options
// response parameter: if created successfully
func PostProjectMetrics(input *core.ApiResourceInput) (*core.ApiResourceOutput,errors.Error)

// Used to update an existing ProjectMetrics data
// Consider merging with PostProjectMetrics into an interface
// The advantage of separating into two interfaces is to avoid data loss caused by misoperation coverage
// Request parameters: including project_name, plugin_name and plugin_options
// response parameter: if updated successfully
func UpdateProjectMetrics(input *core.ApiResourceInput) (*core.ApiResourceOutput,errors.Error)

// Used to obtain the list of all plug-ins registered in the current devlake
// Request parameters: null
// response parameter: all plugin names data
func Get(c *gin.Context)
```

