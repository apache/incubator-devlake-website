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

- [entities](https://devlake.apache.org/docs/next/Overview/SupportedDataSources)

## Metrics

- [Requirement Count](https://devlake.apache.org/docs/next/Metrics/RequirementCount)
- [Requirement Lead Time](https://devlake.apache.org/docs/next/Metrics/RequirementLeadTime)
- [Requirement Delivery Rate](https://devlake.apache.org/docs/next/Metrics/RequirementDeliveryRate)
- [Requirement Granularity](https://devlake.apache.org/docs/next/Metrics/RequirementGranularity)
- [Bug Age](https://devlake.apache.org/docs/next/Metrics/BugAge)
- [Incident Age](https://devlake.apache.org/docs/next/Metrics/IncidentAge)
- [PR Count](https://devlake.apache.org/docs/next/Metrics/PRCount)
- [PR Time To Merge](https://devlake.apache.org/docs/next/Metrics/PRTimeToMerge)
- [PR Merge Rate](https://devlake.apache.org/docs/next/Metrics/PRMergeRate)

## Configuration

- Configuring GitHub via [config-ui](https://devlake.apache.org/docs/next/UserManuals/ConfigUI/GitHub)

## API Sample Request

To collect data, select `Advanced Mode` on the `Create Blueprint` page and paste a JSON config like the following:

```json
[
  [
    {
      "plugin": "github",
      "options": {
        "connectionId": 1,
        "owner": "apache",
        "repo": "incubator-devlake",
        "transformationRules": {
          "deploymentPattern": "",
          "issueComponent": "",
          "issuePriority": "(high|medium|low)$",
          "issueSeverity": "",
          "issueTypeBug": "(bug)$",
          "issueTypeIncident": "",
          "issueTypeRequirement": "(feature|feature-request)$",
          "prBodyClosePattern": "",
          "prComponent": "",
          "prType": "(?i)push"
        }
      }
    }
  ]
]
```

## References

- [references](https://devlake.apache.org/docs/next/DeveloperManuals)
