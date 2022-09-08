---
title: "customize"
description: >
  Customize Plugin
---



## Summary

This plugin provides user the ability to create/delete columns and extract data from some raw layer tables.
The columns created with this plugin must be start with the prefix `x_`

**NOTE:** All columns created by this plugin are of datatype `VARCHAR(255)`

## Sample Request
To extract data, select `Advanced Mode` on the `Create Pipeline Run` page and paste a JSON config like the following:
The below example demonstrates how to extract status name from the table `_raw_jira_api_issues` and assign it to the `x_test` column of the table `issues`.
We leverage the package `https://github.com/tidwall/gjson` to extract value from the JSON. For the extraction syntax, please refer to the [docs](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)
`table` domain layer table name
`rawDataTable` raw layer table, from which we extract values by json path
`rawDataParams` the filter to select records from the raw layer table. **the value should be a string not an object**
`mapping` the extraction rule, the key is extension field name, the value is json path
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
```
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
Get all extension columns(start with `x_`) of the table `issues`
> GET /plugins/customize/issues/fields

response
```json
[
    {
        "columnName": "x_test",
        "columnType": "VARCHAR(255)"
    }
]
```
Create extension column `x_test` for the table `issues`

> POST /plugins/customize/issues/fields
```json
{
    "name": "x_test"
}
```
Drop the column `x_text` for the table `issues`
> DELETE /plugins/customize/issues/fields/x_test