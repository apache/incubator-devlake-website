---
title: "DB Migration"
description: >
  DB Migration
sidebar_position: 3
---

## Summary
Starting in v0.10.0, DevLake provides a lightweight migration tool for executing migration scripts.
Both framework itself and plugins define their migration scripts in their own migration folder.
The migration scripts are written with gorm in Golang to support different SQL dialects.


## Migration Script
Migration script describes how to do database migration.
They implement the `Script` interface.
When DevLake starts, scripts register themselves to the framework by invoking the `Register` function.
The method `Up` contains the steps of migration.

```go
type Script interface {
    // this function will contain the business logic of the migration (e.g. DDL logic)
	Up(ctx context.Context, db *gorm.DB) errors.Error
    // the version number of the migration. typically in date format (YYYYMMDDHHMMSS), e.g. 20220728000001. Migrations are executed sequentially based on this number.
	Version() uint64
	// The name of this migration
	Name() string
}
```

## Migration Model

For each migration we define a "snapshot" datamodel of the model that we wish to perform the migration on.
The fields on this model shall be identical to the actual model, but unlike the actual one, this one will
never change in the future. The naming convention of these models is `<ModelName>YYYYMMDD` and they must implement
the `func TableName() string` method, and consumed by the `Script::Up` method.

## Table `migration_history`

The table tracks migration scripts execution and schemas changes.
From which, DevLake could figure out the current state of database schemas.

## Execution

Each plugin has a `migrationscripts` subpackage that lists all the migrations to be executed for that plugin. You
will need to add your migration to that list for the framework to pick it up. Similarly, there is such a package
for the framework-only migrations defined under the `models` package.


## How It Works
1. Check `migration_history` table, calculate all the migration scripts need to be executed.
2. Sort scripts by `Version` and `Name` in ascending order. You should NOT change these 2 values for the script after release for whatever reasons, or user may fail to upgrade due to duplicate execution.
3. Execute scripts.
4. Save results in the `migration_history` table.


## Best Practices

When you write a new migration script, please pay attention to the fault tolerance and the side effect. It would be better if the failed script could be safely retry, in case of something goes wrong during the migration. For this purpose, the migration scripts should be well-designed. For example, if you created a temporary table in the Up method, it should be dropped before exiting, regardless of success or failure. 

Suppose we want to change the type of the Primary Key `name` of table `users` from `int` to `varchar(255)`

1. Rename `users` to `users_20221018` (stop if error, otherwise define a `defer` to rename back on error)
2. Create new `users` (stop if error, otherwise define a `defer` to drop the table on error)
3. Convert data from `users_20221018` to `users` (stop if error)
4. Drop table `users_20221018`

With these steps, the `defer` functions would be executed in reverse order if any error occurred during the migration process so the database would roll back to the original state in most cases.

However, you don't neccessary deal with all these mess. We had summarized some of the most useful code examples for you to follow:

- [Create new tables](https://github.com/apache/incubator-devlake/blob/main/models/migrationscripts/20220406_add_frame_tables.go)
[Rename column](https://github.com/apache/incubator-devlake/blob/main/models/migrationscripts/20220505_rename_pipeline_step_to_stage.go)
- [Add columns with default value](https://github.com/apache/incubator-devlake/blob/main/models/migrationscripts/20220616_add_blueprint_mode.go)
- [Change the values(or type) of Primary Key](https://github.com/apache/incubator-devlake/blob/main/models/migrationscripts/20220913_fix_commitfile_id_toolong.go)
- [Change the values(or type) of Column](https://github.com/apache/incubator-devlake/blob/main/models/migrationscripts/20220929_modify_lead_time_minutes.go)

The above examples should cover most of the scenarios you may run into. Feel free to post issue on our github repo otherwise.


In order to help others understand the script you wrote, there are a couple of rules you have to follow:

In order to help others understand the script you wrote, there are a couple of rules you have to follow:

- Name your script in a meaningful way. For instance `renamePipelineStepToStage` is far more better than `modifyPipelines`
- The script should keep only the targeted `fields` you are attempting to operate except when using `migrationhelper.Transform` which is a full table tranformation that requires full table definition, if this is the case, add comment to the end of the fields to indicate which ones are the target.
- Add comment to the script when the operation are too complicated to express in plain code.

Other rules to follow when writing a migration script:

- The migration script should use only the interfaces and packages offerred by the framework like `core`, `errors` and `migrationhelper`, do NOT import `gorm` or package from `plugin` directly.
- The name of `model struct` defined in your script should be suffixed with the `Version` of the script to distinguish from other scripts in the same package to keep it self-contained, i.e. `tasks20221018`. do NOT refer `struct` defined in other scripts.
- All scripts and models names should be `camelCase` to avoid accidentally reference from other packages

