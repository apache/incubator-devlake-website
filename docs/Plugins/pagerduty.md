---
title: "Pagerduty (WIP)"
description: >
  Pagerduty Plugin
---



## Summary

This plugin collects all incidents from Pagerduty, and uses them to compute incident-type DORA metrics.

As of v0.15.0, the `pagerduty` plugin can only be invoked through the DevLake API. Its support in Config-UI is WIP.


## Usage via DevLake API

> Note: Please replace the `http://localhost:8080` in the sample requests with your actual DevLake API endpoint. For how to view DevLake API's swagger documentation, please refer to the "Using DevLake API" section of [Developer Setup](../DeveloperManuals/DeveloperSetup.md).


1. Create a Pagerduty data connection: `POST /plugins/pagerduty/connections`. Please see a sample request below:

```
curl --location --request POST 'http://localhost:8080/plugins/pagerduty/connections' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "pagerduty-test1",
    "endpoint": "https://api.pagerduty.com",
    "token": "<api-access-token>"
}'
```

2. Create a blueprint to collect data from Pagerduty: `POST /blueprints`. Please see a sample request below:

```
curl --location --request POST 'http://localhost:8080/blueprints' \
--header 'Content-Type: application/json' \
--data-raw '{
    "cronConfig": "manual",
    "enable": true,
    "isManual": true,
    "mode": "NORMAL",
    "name": "test-blueprint",
    "settings": {
        "connections": [
            {
                "connectionId": 1,
                "plugin": "pagerduty",
                "scope": [
                    {
                        "entities": [
                            "TICKET"
                        ],
                        "options": {
                            "connectionId": 1,
                            "start_date": "2022-06-01T15:04:05Z"
                        }
                    }
                ]
            }
        ],
        "version": "1.0.0"
    }
}'
```

Here `start_date` is the time sinch which all created incidents will be collected.

3. [Optional] Trigger the blueprint manually: `POST /blueprints/{blueprintId}/trigger`. Run this step if you want to trigger the newly created blueprint right away. See an example request below:

```
curl --location --request POST 'http://localhost:8080/blueprints/<blueprintId>/trigger' \
--header 'Content-Type: application/json'
```
