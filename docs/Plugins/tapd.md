---
title: "Tapd"
description: >
  Tapd Plugin
---

## Summary

This plugin collects Tapd data through Tapd REST API. 

## Configuration
Configuring Tapd via [config-ui](/UserManuals/ConfigUI/Tapd.md).

## Collect Data From Tapd

To collect data, select `Advanced Mode` on the `Create Blueprint` page and paste a JSON config like the following:

> <font color="#ED6A45">Warning: Data collection only supports single-task execution, and the results of concurrent multi-task execution may not meet expectations.</font>

```
[
    [
        {
            "plugin": "tapd",
            "options": {
                "workspaceId": 34***66,
                "connectionId": 1
            }
        }
    ],
    [
        {
            "plugin": "tapd",
            "options": {
                "workspaceId": 6***14,
                "connectionId": 1
            }
        }
    ]
]
```

- `connectionId`: The `ID` field from **TAPD Integration** page.
- `workspaceId`: TAPD workspace id, you can get it from two ways: 
  - url: ![tapd-workspace-id](../../static/img/ConfigUI/tapd-find-workspace-id.png) 
  - db: you can check workspace info from db._tool_tapd_workspaces and get all workspaceId you want to collect after execution of the following json in `advanced mode` 
    ```json
    [
            [
                    {
                            "plugin": "tapd",
                            "options": {
                                    "companyId": 55850509,
                                    "workspaceId": 1,
                                    "connectionId": 1
                            },
                            "subtasks": [
                                    "collectCompanies",
                                    "extractCompanies"
                            ]
                    }
            ]
    ]
    ```

