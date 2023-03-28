---
title: "Gitee(WIP)"
description: >
  Gitee Plugin
---

## Summary

This plugin collects `Gitee` data through [Gitee Openapi](https://gitee.com/api/v5/swagger).

## Configuration

In order to fully use this plugin, you will need to get `token` on the Gitee website.

A connection should be created before you can collection any data. Currently, this plugin supports creating connection by requesting `connections` API:

```
curl 'http://localhost:8080/plugins/gitee/connections' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "gitee",
    "endpoint": "https://gitee.com/api/v5/",
    "proxy": "http://localhost:1080",
    "rateLimitPerHour": 20000,
    "token": "<YOUR_TOKEN>"
}
'
```



## Collect data from Gitee

In order to collect data, you have to compose a JSON looks like following one, and send it by selecting `Advanced Mode` on `Create Pipeline Run` page:

1. Configure-UI Mode
```json
[
  [
    {
      "plugin": "gitee",
      "options": {
        "connectionId": 1,
        "repo": "lake",
        "owner": "merico-dev"
      }
    }
  ]
]
```
and if you want to perform certain subtasks.
```json
[
  [
    {
      "plugin": "gitee",
      "subtasks": ["collectXXX", "extractXXX", "convertXXX"],
      "options": {
        "connectionId": 1,
        "repo": "lake",
        "owner": "merico-dev"
      }
    }
  ]
]
```

2. Curl Mode:
   You can also trigger data collection by making a POST request to `/pipelines`.
```
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "gitee 20211126",
    "tasks": [[{
        "plugin": "gitee",
        "options": {
            "connectionId": 1,
            "repo": "lake",
            "owner": "merico-dev"
        }
    }]]
}
'
```
and if you want to perform certain subtasks.
```
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "gitee 20211126",
    "tasks": [[{
        "plugin": "gitee",
        "subtasks": ["collectXXX", "extractXXX", "convertXXX"],
        "options": {
            "connectionId": 1,
            "repo": "lake",
            "owner": "merico-dev"
        }
    }]]
}
'
```
