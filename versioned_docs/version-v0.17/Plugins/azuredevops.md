---
title: "Azure DevOps"
description: >
  Azure DevOps Plugin
---

## Summary

This plugin collects Azure DevOps data through Azure DevOps REST API.

## Entities

Check out the [Azure DevOps entities](/Overview/SupportedDataSources.md#data-collection-scope-by-each-plugin) collected by this plugin.

## Data Refresh Policy

Right now, this plugin supports only full refresh.
Check out the [data refresh policy](/Overview/SupportedDataSources.md#Azure DevOps) of this plugin.

## Metrics

Metrics that can be calculated based on the data collected from Azure DevOps:

- [Commit Count](/Metrics/CommitCount.md)
- [Commit Author Count](/Metrics/CommitAuthorCount.md)
- [Added Lines of Code](/Metrics/AddedLinesOfCode.md)
- [Deleted Lines of Code](/Metrics/DeletedLinesOfCode.md)
- [Build Count](/Metrics/BuildCount.md)
- [Build Duration](/Metrics/BuildDuration.md)
- [Build Success Rate](/Metrics/BuildSuccessRate.md)
- [DORA - Deployment Frequency](/Metrics/DeploymentFrequency.md)
- [DORA - Lead Time for Changes](/Metrics/LeadTimeForChanges.md)
- [DORA - Median Time to Restore Service](/Metrics/MTTR.md)
- [DORA - Change Failure Rate](/Metrics/CFR.md)

## Configuration

Configuring Azure DevOps via [config-ui](/Configuration/AzureDevOps.md).

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
        "plugin": "azuredevops",
        "options": {
          "connectionId": 1,
          "scopeId": "orgname/reponame",
          "transformationRules": {
            "deploymentPattern": "",
            "productionPattern": ""
          }
        }
      }
    ]
  ]
}
'
```
