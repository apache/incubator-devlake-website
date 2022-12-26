---
title: "Jenkins"
description: >
  Jenkins Plugin
---

## Summary

This plugin collects Jenkins data through [Remote Access API](https://www.jenkins.io/doc/book/using/remote-access-api/). It then computes and visualizes various DevOps metrics from the Jenkins data.

## Entities

Check out the [Jenkins entities](/Overview/SupportedDataSources.md#data-collection-scope-by-each-plugin) collected by this plugin.

## Data Refresh Policy

Check out the [data refresh policy](/Overview/SupportedDataSources.md#jenkins) of this plugin.

## Metrics

Metrics that can be calculated based on the data collected from Jenkins:

- [Build Count](/Metrics/BuildCount.md)
- [Build Duration](/Metrics/BuildDuration.md)
- [Build Success Rate](/Metrics/BuildSuccessRate.md)
- [DORA - Deployment Frequency](/Metrics/DeploymentFrequency.md)
- [DORA - Lead Time for Changes](/Metrics/LeadTimeForChanges.md)
- [DORA - Median Time to Restore Service](/Metrics/MTTR.md)
- [DORA - Change Failure Rate](/Metrics/CFR.md)

## Configuration

- Configuring Jenkins via [Config UI](/UserManuals/ConfigUI/Jenkins.md)

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
        "plugin": "jenkins",
        "options": {
          "connectionId": 1,
          "scopeId": "auto_deploy",
          "transformationRules":{
            "deploymentPattern":"",
            "productionPattern":""
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
