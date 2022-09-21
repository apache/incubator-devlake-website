---
title: "Dal"
sidebar_position: 5
description: >
  The Dal (Data Access Layer) is designed to decouple the hard dependency on `gorm` in v0.12
---

## Summary

The Dal (Data Access Layer) is designed to decouple the hard dependency on `gorm` in v0.12.  The advantages of introducing this isolation are:

 - Unit Test: Mocking an Interface is easier and more reliable than Patching a Pointer.
 - Clean Code: DBS operations are more consistence than using `gorm ` directly.
 - Replaceable: It would be easier to replace `gorm` in the future if needed.

## The Dal Interface

```go
type Dal interface {
	AutoMigrate(entity interface{}, clauses ...Clause) error
	Exec(query string, params ...interface{}) error
	RawCursor(query string, params ...interface{}) (*sql.Rows, error)
	Cursor(clauses ...Clause) (*sql.Rows, error)
	Fetch(cursor *sql.Rows, dst interface{}) error
	All(dst interface{}, clauses ...Clause) error
	First(dst interface{}, clauses ...Clause) error
	Count(clauses ...Clause) (int64, error)
	Pluck(column string, dest interface{}, clauses ...Clause) error
	Create(entity interface{}, clauses ...Clause) error
	Update(entity interface{}, clauses ...Clause) error
	CreateOrUpdate(entity interface{}, clauses ...Clause) error
	CreateIfNotExist(entity interface{}, clauses ...Clause) error
	Delete(entity interface{}, clauses ...Clause) error
	AllTables() ([]string, error)
}
```


## How to use

### Query
```go
// Get a database cursor
user := &models.User{}
cursor, err := db.Cursor(
  dal.From(user),
  dal.Where("department = ?", "R&D"),
  dal.Orderby("id DESC"),
)
if err != nil {
  return err
}
for cursor.Next() {
  err = dal.Fetch(cursor, user)  // fetch one record at a time
  ...
}

// Get a database cursor by raw sql query
cursor, err := db.Raw("SELECT * FROM users")

// USE WITH CAUTIOUS: loading a big table at once is slow and dangerous
// Load all records from database at once. 
users := make([]models.Users, 0)
err := db.All(&users, dal.Where("department = ?", "R&D"))

// Load a column as Scalar or Slice
var email string
err := db.Pluck("email", &username, dal.Where("id = ?", 1))
var emails []string
err := db.Pluck("email", &emails)

// Execute query
err := db.Exec("UPDATE users SET department = ? WHERE department = ?", "Research & Development", "R&D")
```

### Insert
```go
err := db.Create(&models.User{
  Email: "hello@example.com", // assuming this the Primarykey
  Name: "hello",
  Department: "R&D",
})
```

### Update
```go
err := db.Create(&models.User{
  Email: "hello@example.com", // assuming this the Primarykey
  Name: "hello",
  Department: "R&D",
})
```
### Insert or Update
```go
err := db.CreateOrUpdate(&models.User{
  Email: "hello@example.com",  // assuming this is the Primarykey
  Name: "hello",
  Department: "R&D",
})
```

### Insert if record(by PrimaryKey) didn't exist
```go
err := db.CreateIfNotExist(&models.User{
  Email: "hello@example.com",  // assuming this is the Primarykey
  Name: "hello",
  Department: "R&D",
})
```

### Delete
```go
err := db.CreateIfNotExist(&models.User{
  Email: "hello@example.com",  // assuming this is the Primary key
})
```

### DDL and others
```go
// Returns all table names
allTables, err := db.AllTables()

// Automigrate: create/add missing table/columns
// Note: it won't delete any existing columns, nor does it update the column definition
err := db.AutoMigrate(&models.User{})
```

## How to do Unit Test
First, run the command `make mock` to generate the Mocking Stubs, the generated source files should appear in `mocks` folder. 
```
mocks
├── ApiResourceHandler.go
├── AsyncResponseHandler.go
├── BasicRes.go
├── CloseablePluginTask.go
├── ConfigGetter.go
├── Dal.go
├── DataConvertHandler.go
├── ExecContext.go
├── InjectConfigGetter.go
├── InjectLogger.go
├── Iterator.go
├── Logger.go
├── Migratable.go
├── PluginApi.go
├── PluginBlueprintV100.go
├── PluginInit.go
├── PluginMeta.go
├── PluginTask.go
├── RateLimitedApiClient.go
├── SubTaskContext.go
├── SubTaskEntryPoint.go
├── SubTask.go
└── TaskContext.go
```
With these Mocking stubs, you may start writing your TestCases using the `mocks.Dal`.
```go
import "github.com/apache/incubator-devlake/mocks"

func TestCreateUser(t *testing.T) {
    mockDal := new(mocks.Dal)
    mockDal.On("Create", mock.Anything, mock.Anything).Return(nil).Once()
    userService := &services.UserService{
        Dal: mockDal,
    }
    userService.Post(map[string]interface{}{
        "email": "helle@example.com",
        "name": "hello",
        "department": "R&D",
    })
    mockDal.AssertExpectations(t)
```

