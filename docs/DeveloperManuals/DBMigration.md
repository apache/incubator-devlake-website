---
title: "DB Migration"
description: >
  DB Migration
sidebar_position: 4
---

## Summary
Starting in v0.10.0, DevLake provides a lightweight migration tool for executing migration scripts.
Both the framework and the plugins can define their migration scripts in their own migration folder.
The migration scripts are written with gorm in Golang to support different SQL dialects.


## Migration Scripts
The migration scripts describe how to do database migration and implement the `MigrationScript` interface.
When DevLake starts, the scripts register themselves to the framework by invoking the `Register` function.
The method `Up` contains the steps of migration.

```go
type MigrationScript interface {
    // this function will contain the business logic of the migration (e.g. DDL logic)
    Up(basicRes BasicRes) errors.Error
    // the version number of the migration. typically in date format (YYYYMMDDHHMMSS), e.g. 20220728000001. Migrations are executed sequentially based on this number.
	Version() uint64
	// The name of this migration
	Name() string
}
```

## The Migration Model

For each migration, we define a "snapshot" datamodel of the model that we wish to perform the migration on.
The fields on this model shall be identical to the actual model; but unlike the actual one, this one will
never change in the future. The naming convention of these models is `<ModelName>YYYYMMDD` and they must implement
the `func TableName() string` method, and consumed by the `Script::Up` method.

## Table `migration_history`

The table tracks migration scripts execution and schemas changes, and from which, DevLake can figure out the current state of database schemas.

## Execution

Each plugin has a `migrationscripts` subpackage that lists all the migrations to be executed for that plugin. You
will need to add your migration to that list for the framework to pick it up. Similarly, there is a package
for the framework-only migrations defined under the `models` package.


## How It Works
1. Check `migration_history` table, calculate all the migration scripts need to be executed.
2. Sort scripts by `Version` and `Name` in ascending order. Please do NOT change these two values for the script after release for any reasons; otherwise, users may fail to upgrade due to the duplicated execution.
3. Execute the scripts.
4. Save the results in the `migration_history` table.


## Best Practices

When you write a new migration script, please pay attention to the fault tolerance and the side effect. It would be better if the failed script could be safely retried, in case if something goes wrong during the migration. For this purpose, the migration scripts should be well-designed. For example, if you have created a temporary table in the Up method, it should be dropped before exiting, regardless of success or failure.

Suppose we want to change the type of the Primary Key `name` of table `users` from `int` to `varchar(255)`

1. Rename `users` to `users_20221018` (stop if error, otherwise define a `defer` to rename back on error)
2. Create new `users` (stop if error, otherwise define a `defer` to drop the table on error)
3. Convert data from `users_20221018` to `users` (stop if error)
4. Drop table `users_20221018`

With these steps, the `defer` functions would be executed in reverse order if any error occurred during the migration process so the database would roll back to the original state in most cases.

However, you don't neccessary deal with all the mess. We had summarized some of the most useful code examples for you to follow:

- [Create new tables]https://github.com/apache/incubator-devlake/blob/main/backend/core/models/migrationscripts/20220406_add_frame_tables.go)
[Rename column](https://github.com/apache/incubator-devlake/blob/main/backend/core/models/migrationscripts/20220505_rename_pipeline_step_to_stage.go)
- [Add columns with default value](https://github.com/apache/incubator-devlake/blob/main/backend/core/models/migrationscripts/20220616_add_blueprint_mode.go)
- [Change the values(or type) of Primary Key](https://github.com/apache/incubator-devlake/blob/main/backend/core/models/migrationscripts/20220913_fix_commitfile_id_toolong.go)
- [Change the values(or type) of Column](https://github.com/apache/incubator-devlake/blob/main/backend/core/models/migrationscripts/20220903_encrypt_blueprint.go)

The above examples should cover most of the scenarios you may encounter. If you come across other scenarios, feel free to create issues in our GitHub Issue Tracker for discussions.


In order to help others understand the script you have written, there are a couple of rules we suggest to follow:

- Name your script in a meaningful way. For instance, `renamePipelineStepToStage` is more descriptive than `modifyPipelines`.
- The script should keep only the targeted `fields` you are attempting to operate except when using `migrationhelper.Transform`, which is a full table tranformation that requires full table definition. If this is the case, add comment to the end of the fields to indicate which ones are the targets.
- Add comments to the script when the operation is too complicated to be expressed in plain code.

Other rules to follow when writing a migration script:

- The migration script should only use the interfaces and packages offered by the framework like `core`, `errors` and `migrationhelper`. Do NOT import `gorm` or package from `plugin` directly.
- The name of `model struct` defined in your script should be suffixed with the `Version` of the script to distinguish from other scripts in the same package to keep it self-contained, i.e. `tasks20221018`. Do NOT refer `struct` defined in other scripts.
- All scripts and models names should be `camelCase` to avoid accidental reference from other packages.

