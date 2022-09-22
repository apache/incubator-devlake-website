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
2. Sort scripts by Version in ascending order.
3. Execute scripts.
4. Save results in the `migration_history` table.


## Best Practices
When you write a new migration script, please pay attention to the fault tolerance and the side effect. It would be better if the failed script could be safely retry, in case of something goes wrong during the migration. For this purpose, the migration scripts should be well-designed. For example, if you created a temporary table in the Up method, it should be dropped before exiting, regardless of success or failure. Using the defer statement to do some cleanup is a good idea. Let's demonstrate this idea with a concrete example.

Suppose we want to recalculate the column `name` of the table `user`

1. rename `user` to `user_bak` (stop if error, define `defer` to rename back on error)
2. create new `user` (stop if error, define `defer` to drop TABLE on error)
3. convert data from `user_bak` to `user` (stop if error)
4. drop `user_bak`

```golang

type User struct {
	name string `gorm:"type:varchar(255)"`
}

func (User) TableName() string {
	return "user"
}

type NewUser struct {
	name string `gorm:"type:text"`
}

func (NewUser) TableName() string {
	return "user"
}

type UserBak struct {
	name string `gorm:"type:varchar(255)"`
}

func (UserBak) TableName() string {
	return "user_bak"
}

func (*exampleScript) Up(ctx context.Context, db *gorm.DB) (errs errors.Error) {
	var err error

	// rename the user_bak to cache old table
	err = db.Migrator().RenameTable(&User{}, &UserBak{})
	if err != nil {
		return errors.Default.Wrap(err, "error no rename user to user_bak")
	}

	// rollback for rename back
	defer func() {
		if errs != nil {
			err = db.Migrator().RenameTable(&UserBak{}, &User{})
			if err != nil {
				errs = errors.Default.Wrap(err, fmt.Sprintf("fail to rollback table user_bak , you must to rollback by yourself. %s", err.Error()))
			}
		}
	}()

	// create new user table
	err = db.Migrator().AutoMigrate(&NewUser{})

	if err != nil {
		return errors.Default.Wrap(err, "error on auto migrate user")
	}

	// rollback for create new table
	defer func() {
		if errs != nil {
			err = db.Migrator().DropTable(&User{})
			if err != nil {
				errs = errors.Default.Wrap(err, fmt.Sprintf("fail to rollback table OldTable , you must to rollback by yourself. %s", err.Error()))
			}
		}
	}()

	// update old id to new id and write to the new table
	cursor, err := db.Model(&UserBak{}).Rows()
	if err != nil {
		return errors.Default.Wrap(err, "error on select NewTable")
	}
	defer cursor.Close()

	// caculate and save the data to new table
	batch, err := helper.NewBatchSave(api.BasicRes, reflect.TypeOf(&NewUser{}), 200)
	if err != nil {
		return errors.Default.Wrap(err, "error getting batch from table user")
	}
	defer batch.Close()
	for cursor.Next() {
		ot := UserBak{}
		err = db.ScanRows(cursor, &ot)
		if err != nil {
			return errors.Default.Wrap(err, "error scan rows from table user_bak")
		}
		nt := NewUser(ot)

		nt.name = nt.name + "new"

		err = batch.Add(&nt)
		if err != nil {
			return errors.Default.Wrap(err, "error on user batch add")
		}
	}

	// drop the old table
	err = db.Migrator().DropTable(&UserBak{})
	if err != nil {
		return errors.Default.Wrap(err, "error no drop user_bak")
	}
}

```

