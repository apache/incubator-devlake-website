---
title: "Jira"
description: >
  Jira Plugin
---

## Summary

This plugin collects Jira data through Jira REST API. It then computes and visualizes various engineering metrics from the Jira data.

## Entities

Check out the [Jira entities](/Overview/SupportedDataSources.md#data-collection-scope-by-each-plugin) collected by this plugin.

## Data Refresh Policy

Check out the [data refresh policy](/Overview/SupportedDataSources.md#jira) of this plugin.

## Metrics

Metrics that can be calculated based on the data collected from Jira:

- [Requirement Count](/Metrics/RequirementCount.md)
- [Requirement Lead Time](/Metrics/RequirementLeadTime.md)
- [Requirement Delivery Rate](/Metrics/RequirementDeliveryRate.md)
- [Requirement Granularity](/Metrics/RequirementGranularity.md)
- [Bug Age](/Metrics/BugAge.md)
- [Bug Count per 1k Lines of Code](/Metrics/BugCountPer1kLinesOfCode.md)
- [Incident Age](/Metrics/IncidentAge.md)
- [Incident Count per 1k Lines of Code](/Metrics/IncidentCountPer1kLinesOfCode.md)

## Configuration

- Configuring Jira via [config-ui](/Configuration/Jira.md).
- Configuring Jira via Config UI's [advanced mode](/Configuration/AdvancedMode.md#4-jira).

## API Sample Request

You can trigger data collection by making a POST request to `/pipelines`.

```shell
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
  "name": "MY PIPELINE",
  "plan": [
    [
      {
        "plugin": "jira",
        "options": {
          "connectionId": 1,
          "boardId": 8,
          "transformationRules": {
            "epicKeyField": "",
            "storyPointField": "",
            "remotelinkCommitShaPattern": "",
            "typeMappings": {
              "10040": {
                "standardType": "Incident",
                "statusMappings": null
              }
            }
          }
        }
      }
    ]
  ]
}
'
```
