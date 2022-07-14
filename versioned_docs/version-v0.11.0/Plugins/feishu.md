---
title: "Feishu"
description: >
  Feishu Plugin
---

## Summary

This plugin collects Feishu meeting data through [Feishu Openapi](https://open.feishu.cn/document/home/user-identity-introduction/introduction).

## Configuration

In order to fully use this plugin, you will need to get app_id and app_secret from a Feishu administrator (for help on App info, please see [official Feishu Docs](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal)),
then set these two parameters via Dev Lake's `.env`.

### By `.env`

The connection aspect of the configuration screen requires the following key fields to connect to the Feishu API. As Feishu is a single-source data provider at the moment, the connection name is read-only as there is only one instance to manage. As we continue our development roadmap we may enable multi-source connections for Feishu in the future.

```
FEISHU_APPID=app_id
FEISHU_APPSCRECT=app_secret
```

## Collect data from Feishu

To collect data, select `Advanced Mode` on the `Create Pipeline Run` page and paste a JSON config like the following:


```json
[
  [
    {
      "plugin": "feishu",
      "options": {
        "numOfDaysToCollect" : 80,
        "rateLimitPerSecond" : 5
      }
    }
  ]
]
```

> `numOfDaysToCollect`: The number of days you want to collect

> `rateLimitPerSecond`: The number of requests to send(Maximum is 8)

You can also trigger data collection by making a POST request to `/pipelines`.
```
curl --location --request POST 'localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "feishu 20211126",
    "tasks": [[{
      "plugin": "feishu",
      "options": {
        "numOfDaysToCollect" : 80,
        "rateLimitPerSecond" : 5
      }
    }]]
}
'
```