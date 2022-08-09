---
title: "Feishu"
description: >
  Feishu Plugin
---

## Summary

This plugin collects Feishu meeting data through [Feishu Openapi](https://open.feishu.cn/document/home/user-identity-introduction/introduction).

## Configuration

In order to fully use this plugin, you will need to get `app_id` and `app_secret` from a Feishu administrator (for help on App info, please see [official Feishu Docs](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal)),

A connection should be created before you can collection any data. Currently, this plugin supports creating connection by requesting `connections` API:

```
curl 'http://localhost:8080/plugins/feishu/connections' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "feishu",
    "endpoint": "https://open.feishu.cn/open-apis/vc/v1/",
    "proxy": "http://localhost:1080",
    "rateLimitPerHour": 20000,
    "appId": "<YOUR_APP_ID>",
    "appSecret": "<YOUR_APP_SECRET>"
}
'
```

## Collect data from Feishu

To collect data, select `Advanced Mode` on the `Create Pipeline Run` page and paste a JSON config like the following:


```json
[
  [
    {
      "plugin": "feishu",
      "options": {
        "connectionId": 1,
        "numOfDaysToCollect" : 80
      }
    }
  ]
]
```

> `numOfDaysToCollect`: The number of days you want to collect

> `rateLimitPerSecond`: The number of requests to send(Maximum is 8)

You can also trigger data collection by making a POST request to `/pipelines`.
```
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "feishu 20211126",
    "tasks": [[{
      "plugin": "feishu",
      "options": {
        "connectionId": 1,
        "numOfDaysToCollect" : 80
      }
    }]]
}
'
```
