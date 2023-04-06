---
title: "Jenkins"
description: >
  Jenkins Plugin
---

## Summary

This plugin collects Jenkins data through [Remote Access API](https://www.jenkins.io/doc/book/using/remote-access-api/). It then computes and visualizes various DevOps metrics from the Jenkins data, which helps tech leads and DevOps engineers to answer questions such as:

- What is the deployment frequency of your team?
- What is the build success rate?
- How long does it take for a code change to be deployed into production?

### Note

Please note that it is important to avoid [rerunning Jenkins builds in place](https://www.jenkins.io/doc/pipeline/tour/running-multiple-steps/#timeouts-retries-and-more), and instead ensure that each rerun has a unique build number. This is because rerunning builds with the same build number can lead to inconsistencies in the data collected by the Jenkins plugin.

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

- Configuring Jenkins via [Config UI](/Configuration/Jenkins.md)
- Configuring Jenkins via Config UI's [advanced mode](/Configuration/AdvancedMode.md#3-jenkins).

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

or

```
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
  "name": "project1-BLUEPRINT",
  "blueprintId": 2,
  "plan": [
    [
      {
        "plugin": "jenkins",
        "options": {
          "connectionId": 1,
          "jobFullName": "auto_deploy",
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
