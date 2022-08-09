---
title: "Jira"
description: >
  Jira Plugin
---


## Summary

This plugin collects Jira data through Jira Cloud REST API. It then computes and visualizes various engineering metrics from the Jira data.

<img width="2035" alt="jira metric display" src="https://user-images.githubusercontent.com/2908155/132926143-7a31d37f-22e1-487d-92a3-cf62e402e5a8.png" />

## Project Metrics This Covers

| Metric Name                         | Description                                                                                       |
|:------------------------------------|:--------------------------------------------------------------------------------------------------|
| Requirement Count	                  | Number of issues with type "Requirement"                                                          |
| Requirement Lead Time	              | Lead time of issues with type "Requirement"                                                       |
| Requirement Delivery Rate           | Ratio of delivered requirements to all requirements                                               |
| Requirement Granularity             | Number of story points associated with an issue                                                   |
| Bug Count	                          | Number of issues with type "Bug"<br/><i>bugs are found during testing</i>                         |
| Bug Age	                          | Lead time of issues with type "Bug"<br/><i>both new and deleted lines count</i>                   |
| Bugs Count per 1k Lines of Code     | Amount of bugs per 1000 lines of code                                                             |
| Incident Count                      | Number of issues with type "Incident"<br/><i>incidents are found when running in production</i>   |
| Incident Age                        | Lead time of issues with type "Incident"                                                          |
| Incident Count per 1k Lines of Code | Amount of incidents per 1000 lines of code                                                        |

## Configuration
Configuring Jira via [config-ui](/UserManuals/ConfigUI/Jira.md).

## Collect Data From JIRA

To collect data, select `Advanced Mode` on the `Create Pipeline Run` page and paste a JSON config like the following:

> <font color="#ED6A45">Warning: Data collection only supports single-task execution, and the results of concurrent multi-task execution may not meet expectations.</font>

```
[
  [
    {
      "plugin": "jira",
      "options": {
          "connectionId": 1,
          "boardId": 8,
          "since": "2006-01-02T15:04:05Z"
      }
    }
  ]
]
```

- `connectionId`: The `ID` field from **JIRA Integration** page.
- `boardId`: JIRA board id, see "Find Board Id" for details.
- `since`: optional, download data since a specified date only.


