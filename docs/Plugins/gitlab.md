---
title: "GitLab"
description: >
  GitLab Plugin
---

## Summary

This plugin collects GitLab data through [API](https://docs.gitlab.com/ee/api/). It then computes and visualizes various DevOps metrics from the GitLab data, which helps tech leads, QA and DevOps engineers, and project managers to answer questions such as:

- How long does it take for your codes to get merged?
- How much time is spent on code review?
- How long does it take for your codes to get merged?
- How much time is spent on code review?

## Entities

Check out the [GitLab entities](/Overview/SupportedDataSources.md#data-collection-scope-by-each-plugin) collected by this plugin.

## Data Refresh Policy

Check out the [data refresh policy](/Overview/SupportedDataSources.md#gitlab) of this plugin.

## Metrics

Metrics that can be calculated based on the data collected from GitLab:

- [Commit Count](/Metrics/CommitCount.md)
- [Commit Author Count](/Metrics/CommitAuthorCount.md)
- [Added Lines of Code](/Metrics/AddedLinesOfCode.md)
- [Deleted Lines of Code](/Metrics/DeletedLinesOfCode.md)
- [PR Count](/Metrics/PRCount.md)
- [PR Cycle Time](/Metrics/PRCycleTime.md)
- [PR Coding Time](/Metrics/PRCodingTime.md)
- [PR Pickup Time](/Metrics/PRPickupTime.md)
- [PR Review Time](/Metrics/PRReviewTime.md)
- [PR Deploy Time](/Metrics/PRDeployTime.md)
- [PR Time To Merge](/Metrics/PRTimeToMerge.md)
- [PR Merge Rate](/Metrics/PRMergeRate.md)
- [PR Review Depth](/Metrics/PRReviewDepth.md)
- [PR Size](/Metrics/PRSize.md)
- [Build Count](/Metrics/BuildCount.md)
- [Build Duration](/Metrics/BuildDuration.md)
- [Build Success Rate](/Metrics/BuildSuccessRate.md)
- [DORA - Deployment Frequency](/Metrics/DeploymentFrequency.md)
- [DORA - Lead Time for Changes](/Metrics/LeadTimeForChanges.md)
- [DORA - Median Time to Restore Service](/Metrics/MTTR.md)
- [DORA - Change Failure Rate](/Metrics/CFR.md)

## Configuration

- Configuring GitLab via [config-ui](/UserManuals/ConfigUI/GitLab.md).
- Configuring GitLab via Config UI's [advanced mode](/UserManuals/ConfigUI/AdvancedMode.md#1-gitlab).


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
        "plugin": "gitlab",
        "options": {
          "connectionId": 1,
          "projectId": 33728042,
          "transformationRules":{
            "deploymentPattern":"",
            "productionPattern":"",
            "issueComponent":"",
            "issuePriority":"(high|medium|low)$",
            "issueSeverity":"",
            "issueTypeBug":"(bug)$",
            "issueTypeIncident":"",
            "issueTypeRequirement":"(feature|feature-request)$",
            "prBodyClosePattern":"",
            "prComponent":"",
            "prType":""
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
