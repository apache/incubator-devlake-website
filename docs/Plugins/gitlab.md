---
title: "GitLab"
description: >
  GitLab Plugin
---

## Summary

This plugin gathers data from `Gitlab` to display information to the user in `Grafana`. We can help tech leaders answer such questions as:

- Is this month more productive than last?
- Was our quality improved or not?

## Entities

Check out the [Gitlab entities](/Overview/SupportedDataSources.md#data-collection-scope-by-each-plugin) collected by this plugin.

## Data Refresh Policy

Check out the [data refresh policy](/Overview/SupportedDataSources.md#gitlab) of this plugin.

## Metrics

Metrics that can be calculated based on the data collected from Gitlab:

- [Requirement Count](/Metrics/RequirementCount.md)
- [PR Merge Rate](/Metrics/PRMergeRate.md)

## Configuration

Configuring GitLab via [config-ui](/UserManuals/ConfigUI/GitLab.md).

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
