---
title: "Trello(WIP)"
description: >
  Trello Plugin
---

## Summary

This plugin collects `Trello` data through [Trello's rest api](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/).

## Configuration

In order to fully use this plugin, you will need to get `apikey` and `token` on the [Trello website](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/).

A connection should be created before you can collect any data. Currently, this plugin supports creating connection by requesting `connections` API:

```
curl 'http://localhost:8080/plugins/trello/connections' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "trello",
    "endpoint": "https://api.trello.com/",
    "rateLimitPerHour": 20000,
    "appId": "<YOUR_APIKEY>",
    "secretKey": "<YOUR_TOKEN>"
}
'
```

## Collect data from Trello



You can make the following request to get all the boards.

```
curl 'http://localhost:8080/plugins/trello/connections/<CONNECTION_ID>/proxy/rest/1/members/me/boards?fields=name,id'
```


In order to collect data, you have to compose a JSON looks like following one, and send it by selecting `Advanced Mode` on `Create Pipeline Run` page:

1. Configure-UI Mode
```json
[
  [
    {
      "plugin": "trello",
      "options": {
        "connectionId": <CONNECTION_ID>,
        "boardId": "<BOARD_ID>"
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
      "plugin": "trello",
      "subtasks": ["collectXXX", "extractXXX", "convertXXX"],
      "options": {
        "connectionId": <CONNECTION_ID>,
        "boardId": "<BOARD_ID>"
      }
    }
  ]
]
```

2. Curl Mode:

In order to collect data, you have to make a POST request to `/pipelines`.

```
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name":"MY PIPELINE",
    "plan":[
        [
            {
                "plugin":"trello",
                "options":{
                    "connectionId":<CONNECTION_ID>,
                    "boardId":"<BOARD_ID>"
                }
            }
        ]
    ]
}
'
```

You can make the following request to get all the boards.

```
curl 'http://localhost:8080/plugins/trello/connections/<CONNECTION_ID>/proxy/rest/1/members/me/boards?fields=name,id'
```
