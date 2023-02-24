---
title: "Bamboo"
description: >
  Bamboo Plugin
---

## Summary

This plugin collects Bamboo data through [API](https://developer.atlassian.com/server/bamboo/rest/). It then computes and visualizes various DevOps metrics from the Bamboo data, which helps tech leads, QA and DevOps engineers, and project managers to answer questions such as:

- How long does it take for your codes to get merged?
- How much time is spent on code review?

## Entities

Check out the [Bamboo entities](/Overview/SupportedDataSources.md#data-collection-scope-by-each-plugin) collected by this plugin.

## Data Refresh Policy

Check out the [data refresh policy](/Overview/SupportedDataSources.md#bamboo) of this plugin.

## Metrics

Metrics that can be calculated based on the data collected from Bamboo:

- [DORA - Deployment Frequency](/Metrics/DeploymentFrequency.md)
- [DORA - Lead Time for Changes](/Metrics/LeadTimeForChanges.md)
- [DORA - Median Time to Restore Service](/Metrics/MTTR.md)
- [DORA - Change Failure Rate](/Metrics/CFR.md)

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
        "plugin": "bamboo",
        "options": {
          "connectionId": 1,
          "key": "TEST",
          "transformationRules":{
            "deploymentPattern":"",
            "productionPattern":"",
          }
        }
      }
    ]
  ]
}
'
```

## References

- [references](/DeveloperManuals/DeveloperSetup.md#references)
