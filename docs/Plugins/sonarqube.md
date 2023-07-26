---
title: "SonarQube"
description: >
  SonarQube Plugin
---

## Summary

This plugin collects SonarQube data through its REST APIs. SonarQube is a tool for static code analysis and code quality management. It can help you discover potential problems and defects in your code, and provide suggestions and solutions.
(Please note that this version of SonarQube cannot collect issues with more than 10k+)

## Supported Versions

Available for SonarQube Server v8.x, v9.x. Check [this doc](https://devlake.apache.org/docs/Overview/SupportedDataSources#data-sources-and-data-plugins) for more details.

## Entities

Check out the [SonarQube entities](/Overview/SupportedDataSources.md#data-collection-scope-by-each-plugin) collected by this plugin.

## Data Refresh Policy

Check out the [data refresh policy](/Overview/SupportedDataSources.md#sonarqube) of this plugin.

## Metrics

Most of SonarQube metrics are collected and can be found in DevLake's SonarQube dashboard.

- [Code Quality Issue Count](/Metrics/CQIssueCount.md)
- [Code Quality Test](/Metrics/CQTest.md)
- [Code Quality Maintainability-Debt](/Metrics/CQMaintainability-Debt.md)
- [Code Quality Duplicated Blocks](/Metrics/CQDuplicatedBlocks.md)
- [Code Quality Duplicated Lines](/Metrics/CQDuplicatedLines.md)

## Configuration

- Configuring SonarQube via [config-ui](/Configuration/SonarQube.md).
- Configuring SonarQube via Config UI's [advanced mode](/Configuration/AdvancedMode.md#10-sonarqube).

## API Sample Request

You can trigger data collection by making a POST request to `/pipelines`.

```
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
  "name": "project1-BLUEPRINT",
  "blueprintId": 1,
  "plan": [
    [
      {
        "plugin": "sonarqube",
        "options": {
          "connectionId": 1,
           "projectKey": "testDevLake"
        }
      }
    ]
  ]
}
'
```

## References

- [references](/DeveloperManuals/DeveloperSetup.md#references)
