---
title: "Customize"
description: >
  Customize Plugin
---



## Summary

This plugin provides users the ability to:
- Add/delete columns in domain layer tables
- Insert values to certain columns with data extracted from some raw layer tables
- Import data from CSV files(only `issues` and `issue_commits` two tables are supported) 

**NOTE:** The names of columns added via this plugin must start with the prefix `x_`

For now, only the following five types were supported:
- varchar(255)
- text
- bigint
- float
- timestamp

## Sample Request

### Trigger Data Extraction
To extract data, switch to `Advanced Mode` on the first step of creating a Blueprint and paste a JSON config as the following:

The example below demonstrates how to extract status name from the table `_raw_jira_api_issues` and assign it to the `x_test` column of the table `issues`.
We leverage the package `https://github.com/tidwall/gjson` to extract value from the JSON. For the extraction syntax, please refer to this [docs](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)

- `table`: domain layer table name
- `rawDataTable`: raw layer table, from which we extract values by json path
- `rawDataParams`: the filter to select records from the raw layer table (**The value should be a string not an object**)
- `mapping`: the extraction rule; the key is the extension field name; the value is json path

```json
[
  [
    {
      "plugin":"customize",
      "options":{
        "transformationRules":[
          {
            "table":"issues", 
            "rawDataTable":"_raw_jira_api_issues", 
            "rawDataParams":"{\"ConnectionId\":1,\"BoardId\":8}", 
            "mapping":{
              "x_test":"fields.status.name" 
            }
          }
        ]
      }
    }
  ]
]
```

You can also trigger data extraction by making a POST request to `/pipelines`.
```shell
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "extract fields",
    "plan": [
        [
            {
                "plugin": "customize",
                "options": {
                    "transformationRules": [
                        {
                            "table": "issues",
                            "rawDataTable": "_raw_jira_api_issues",
                            "rawDataParams": "{\"ConnectionId\":1,\"BoardId\":8}",
                            "mapping": {
                                "x_test": "fields.status.name"
                            }
                        }
                    ]
                }
            }
        ]
    ]
}
'
```

### List Columns
Get all columns of the table `issues`
> GET /plugins/customize/issues/fields

**NOTE** some fields are omitted in the following example
response
```json
[
  {
    "columnName": "id",
    "displayName": "",
    "dataType": "varchar(255)",
    "description": ""
  },
  {
    "columnName": "created_at",
    "displayName": "",
    "dataType": "datetime(3)",
    "description": ""
  },
  {
    "columnName": "x_time",
    "displayName": "time",
    "dataType": "timestamp",
    "description": "test for time"
  },
  {
    "columnName": "x_int",
    "displayName": "bigint",
    "dataType": "bigint",
    "description": "test for int"
  },
  {
    "columnName": "x_float",
    "displayName": "float",
    "dataType": "float",
    "description": "test for float"
  },
  {
    "columnName": "x_text",
    "displayName": "text",
    "dataType": "text",
    "description": "test for text"
  },
  {
    "columnName": "x_varchar",
    "displayName": "varchar",
    "dataType": "varchar(255)",
    "description": "test for varchar"
  }
]

```

### Create a Customized Column
Create a new column `x_abc` with datatype `varchar(255)` for the table `issues`.

The value of `columnName` must start with `x_` and consist of no more than 50 alphanumerics and underscores.
The value of field `dataType` must be one of the following 5 types:
- varchar(255)
- text
- bigint
- float
- timestamp 

> POST /plugins/customize/issues/fields
```json
{
  "columnName": "x_abc",
  "displayName": "ABC",
  "dataType": "varchar(255)",
  "description": "test field"
}
```

### Drop A Column
Drop the column `x_text` of the table `issues`

> DELETE /plugins/customize/issues/fields/x_test

### Upload `issues.csv` file

> POST /plugins/customize/csvfiles/issues.csv

The HTTP `Content-Type` must be `multipart/form-data`, and the form should have three fields:

- `file`: The CSV file
- `boardId`: It will be written to the `id` field of the `boards` table, the `board_id` field of `board_issues`, and the `_raw_data_params` field of `issues`
- `boardName`: It will be written to the `name` field of the `boards` table

Upload a CSV file and import it to the `issues` table via this API. There should be no extra fields in the file except the `labels` field, and if the field value is `NULL`, it should be `NULL` in the CSV instead of the empty string.
DevLake will parse the CSV file and store it in the `issues` table, where the `labels` are stored in the `issue_labels` table. 
If the `boardId` does not appear, a new record will be created in the boards table. The `board_issues` table will be updated at the same time as the import.
The following is an issues.CSV file sample:

|id                           |_raw_data_params     |url                                                                 |icon_url|issue_key|title        |description                      |epic_key|type |status|original_status|story_point|resolution_date|created_date                 |updated_date                 |parent_issue_id|priority|original_estimate_minutes|time_spent_minutes|time_remaining_minutes|creator_id                                           |creator_name|assignee_id                                          |assignee_name|severity|component|lead_time_minutes|original_project|original_type|x_int         |x_time             |x_varchar|x_float|labels              |
|-----------------------------|---------------------|--------------------------------------------------------------------|--------|---------|-------------|---------------------------------|--------|-----|------|---------------|-----------|---------------|-----------------------------|-----------------------------|---------------|--------|-------------------------|------------------|----------------------|-----------------------------------------------------|------------|-----------------------------------------------------|-------------|--------|---------|-----------------|----------------|-------------|--------------|-------------------|---------|-------|--------------------|
|bitbucket:BitbucketIssue:1:1 |board789             |https://api.bitbucket.org/2.0/repositories/thenicetgp/lake/issues/1 |        |1        |issue test   |bitbucket issues test for devlake|        |issue|TODO  |new            |0          |NULL           |2022-07-17 07:15:55.959+00:00|2022-07-17 09:11:42.656+00:00|               |major   |0                        |0                 |0                     |bitbucket:BitbucketAccount:1:62abf394192edb006fa0e8cf|tgp         |bitbucket:BitbucketAccount:1:62abf394192edb006fa0e8cf|tgp          |        |         |NULL             |NULL            |NULL         |10            |2022-09-15 15:27:56|world    |8      |NULL                |
|bitbucket:BitbucketIssue:1:10|board789             |https://api.bitbucket.org/2.0/repositories/thenicetgp/lake/issues/10|        |10       |issue test007|issue test007                    |        |issue|TODO  |new            |0          |NULL           |2022-08-12 13:43:00.783+00:00|2022-08-12 13:43:00.783+00:00|               |trivial |0                        |0                 |0                     |bitbucket:BitbucketAccount:1:62abf394192edb006fa0e8cf|tgp         |bitbucket:BitbucketAccount:1:62abf394192edb006fa0e8cf|tgp          |        |         |NULL             |NULL            |NULL         |30            |2022-09-15 15:27:56|abc      |2456790|hello worlds        |
|bitbucket:BitbucketIssue:1:13|board789             |https://api.bitbucket.org/2.0/repositories/thenicetgp/lake/issues/13|        |13       |issue test010|issue test010                    |        |issue|TODO  |new            |0          |NULL           |2022-08-12 13:44:46.508+00:00|2022-08-12 13:44:46.508+00:00|               |critical|0                        |0                 |0                     |bitbucket:BitbucketAccount:1:62abf394192edb006fa0e8cf|tgp         |                                                     |             |        |         |NULL             |NULL            |NULL         |1             |2022-09-15 15:27:56|NULL     |0.00014|NULL                |
|bitbucket:BitbucketIssue:1:14|board789             |https://api.bitbucket.org/2.0/repositories/thenicetgp/lake/issues/14|        |14       |issue test011|issue test011                    |        |issue|TODO  |new            |0          |NULL           |2022-08-12 13:45:12.810+00:00|2022-08-12 13:45:12.810+00:00|               |blocker |0                        |0                 |0                     |bitbucket:BitbucketAccount:1:62abf394192edb006fa0e8cf|tgp         |bitbucket:BitbucketAccount:1:62abf394192edb006fa0e8cf|tgp          |        |         |NULL             |NULL            |NULL         |41534568464351|2022-09-15 15:27:56|NULL     |NULL   |label1,label2,label3|


### Upload `issue_commits.csv` file

> POST /plugins/customize/csvfiles/issue_commits.csv

The `Content-Type` should be  `multipart/form-data`, and the form should have two fields:

- `file`: The CSV file
- `boardId`: It will be written to the `_raw_data_params` field of `issue_commits`

The following is an issue_commits.CSV file sample:

|issue_id              |commit_sha                              |
|----------------------|----------------------------------------|
|jira:JiraIssue:1:10063|8748a066cbaf67b15e86f2c636f9931347e987cf|
|jira:JiraIssue:1:10064|e6bde456807818c5c78d7b265964d6d48b653af6|
|jira:JiraIssue:1:10065|8f91020bcf684c6ad07adfafa3d8a2f826686c42|
|jira:JiraIssue:1:10066|0dfe2e9ed88ad4e27f825d9b67d4d56ac983c5ef|
|jira:JiraIssue:1:10145|07aa2ebed68e286dc51a7e0082031196a6135f74|
|jira:JiraIssue:1:10145|d70d6687e06304d9b6e0cb32b3f8c0f0928400f7|
|jira:JiraIssue:1:10159|d28785ff09229ac9e3c6734f0c97466ab00eb4da|
|jira:JiraIssue:1:10202|0ab12c4d4064003602edceed900d1456b6209894|
|jira:JiraIssue:1:10203|980e9fe7bc3e22a0409f7241a024eaf9c53680dd|
