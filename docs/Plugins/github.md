---
title: "GitHub"
description: >
  GitHub Plugin
---

## Summary

This plugin gathers data from `GitHub` to display information to the user in `Grafana`. We can help tech leaders answer such questions as:

- Is this month more productive than last?
- How fast do we respond to customer requirements?
- Was our quality improved or not?

## Entities

Check out the [GitHub entities](/Overview/SupportedDataSources.md#data-collection-scope-by-each-plugin) collected by this plugin.

## Data Refresh Policy

Check out the [data refresh policy](/Overview/SupportedDataSources.md#github) of this plugin.

## Metrics

Metrics that can be calculated based on the data collected from GitHub:

- [Requirement Count](/Metrics/RequirementCount.md)
- [Requirement Lead Time](/Metrics/RequirementLeadTime.md)
- [Requirement Delivery Rate](/Metrics/RequirementDeliveryRate.md)
- [Requirement Granularity](/Metrics/RequirementGranularity.md)
- [Bug Age](/Metrics/BugAge.md)
- [Incident Age](/Metrics/IncidentAge.md)
- [PR Count](/Metrics/PRCount.md)
- [PR Time To Merge](/Metrics/PRTimeToMerge.md)
- [PR Merge Rate](/Metrics/PRMergeRate.md)

## Configuration

- Configuring GitHub via [Config UI](/UserManuals/ConfigUI/GitHub.md)

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
        "plugin": "github",
        "options": {
          "connectionId": 1,
          "scopeId": "384111310",
          "transformationRules":{
            "deploymentPattern":"",
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
