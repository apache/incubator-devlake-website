---
title: "CircleCI"
description: >
  CircleCI Plugin
---


## Summary

This plugin collects various entities from CircleCI, including accounts, jobs, workflows, pipelines and projects.

## Supported Versions

Check [this doc](https://devlake.apache.org/docs/Overview/SupportedDataSources#data-sources-and-data-plugins) for more details.


## Entities

Check out the [CircleCI entities](/Overview/SupportedDataSources.md#data-collection-scope-by-each-plugin) collected by this plugin.

## Metrics

Metrics that can be calculated based on the data collected from CircleCI:
- [Build Count](/Metrics/BuildCount.md)
- [Build Duration](/Metrics/BuildDuration.md)
- [Build Success Rate](/Metrics/BuildSuccessRate.md)
- [DORA - Deployment Frequency](/Metrics/DeploymentFrequency.md)
- [DORA - Lead Time for Changes](/Metrics/LeadTimeForChanges.md)
- [DORA - Median Time to Restore Service](/Metrics/MTTR.md)
- [DORA - Change Failure Rate](/Metrics/CFR.md)


## Configuration

- Configuring CircleCI via [Config UI](/Configuration/CircleCI.md)

## API Sample Request
> Note: Please replace the `http://localhost:8080` in the sample requests with your actual DevLake API endpoint. For how to view DevLake API's swagger documentation, please refer to the "Using DevLake API" section of [Developer Setup](../DeveloperManuals/DeveloperSetup.md).

You can trigger data collection by making a POST request to `/pipelines`.
```shell
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
  "name": "project1",
  "plan": [
    [
      {
        "plugin": "circleci",
        "options": {
          "connectionId": 1,
          "fullName": "likyh/likyhphp",
          "transformationRules":{
            "deploymentPattern":"",
            "productionPattern":"",
            "issueStatusTodo":"new,open",
            "issueStatusInProgress":"",
            "issueStatusDone":"resolved,closed",
            "issueStatusOther":"on hold,wontfix,duplicate,invalid"
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
