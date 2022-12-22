---
title: "Jira"
description: >
  Jira Plugin
---


## Summary

This plugin collects Jira data through Jira REST API. It then computes and visualizes various engineering metrics from the Jira data.

## Entities

Check out the [Jira entities](/Overview/SupportedDataSources.md#data-collection-scope-by-each-plugin) collected by this plugin.

## Metrics

Metrics that can be calculated based on the data collected from Jira:

- [Requirement Count](/Metrics/RequirementCount.md)
- [Requirement Lead Time](/Metrics/RequirementLeadTime.md)
- [Requirement Delivery Rate](/Metrics/RequirementDeliveryRate.md)
- [Requirement Granularity](/Metrics/RequirementGranularity.md)
- [Bug Age](/Metrics/BugAge.md)
- [Bug Count per 1k Lines of Code](/Metrics/BugCountPer1kLinesOfCode.md)
- [Incident Age](/Metrics/IncidentAge.md)
- [Incident Count per 1k Lines of Code](/Metrics/IncidentCountPer1kLinesOfCode.md)

## Configuration
Configuring Jira via [config-ui](/UserManuals/ConfigUI/Jira.md).

## Collect Data From JIRA

```shell
curl -X 'POST' \
  'http://127.0.0.1:8080/plugins/jira/connections' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "jira test",
  "endpoint": "https://merico.atlassian.net/rest/",
  "proxy": "http://127.0.1.1:1080",
  "username": "your user name",
  "password": "your password"
}'
```

### Create a new transformation rule

```shell
curl -X 'POST' \
  'http://127.0.0.1:8080/plugins/jira/transformation_rules' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "epicKeyField": "",
  "storyPointField": "",
  "remotelinkCommitShaPattern": "",
  "typeMappings": {
    "10040": {
      "standardType": "Incident",
      "statusMappings": null
    }
  }
}'
```

### Create a new scope

```shell
curl -X 'PUT' \
  'http://127.0.0.1:8080/plugins/jira/connections/1/scopes' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "data": [
    {
      "boardId": 8,
      "connectionId": 1,
      "name": "board 8"
    }
  ]
}'
```

### Trigger pipeline.

```shell
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
  "name": "MY PIPELINE",
  "plan": [
    [
      {
        "plugin": "jira",
        "options": {
          "connectionId": 1,
          "boardId": 8,
          "transformationRules": {
            "epicKeyField": "",
            "storyPointField": "",
            "remotelinkCommitShaPattern": "",
            "typeMappings": {
              "10040": {
                "standardType": "Incident",
                "statusMappings": null
              }
            }
          }
        }
      }
    ]
  ]
}
'
```


### Type mappings setting

1. mappings struct 

```json /blueprints/{blueprintId}
{
  "settings": {
    "connections": [
      {
        "connectionId": 1,
        "plugin": "jira",
        "scope": [
          {
            "entities": [
              "TICKET",
              "CROSS"
            ],
            "options": {
              "boardId": 8,
              "title": "迭代开发看板（停用）"
            },
            "transformation": {
              "deploymentPattern": "",
              "epicKeyField": "",
              "productionPattern": "",
              "remotelinkCommitShaPattern": "/commit/([0-9a-f]{40})$",
              "storyPointField": "",
              "typeMappings": {
                "10040": {
                  "standardType": "Incident",
                  "statusMappings": null
                }
              }
            }
          }
        ]
      }
    ]
  }
}
```

2. set mappings example:

```json PATCH /blueprints/{blueprintId}
{
  "name": "MY BLUEPRINT",
  "projectName": "",
  "mode": "NORMAL",
  "plan": [
    [
      {
        "plugin": "jira",
        "subtasks": [
          "collectStatus",
          "extractStatus",
          "collectProjects",
          "extractProjects",
          "collectBoard",
          "extractBoard",
          "collectIssueTypes",
          "extractIssueType",
          "collectIssues",
          "extractIssues",
          "collectIssueChangelogs",
          "extractIssueChangelogs",
          "collectAccounts",
          "collectWorklogs",
          "extractWorklogs",
          "collectRemotelinks",
          "extractRemotelinks",
          "collectSprints",
          "extractSprints",
          "convertBoard",
          "convertIssues",
          "convertWorklogs",
          "convertIssueChangelogs",
          "convertSprints",
          "convertSprintIssues",
          "convertIssueCommits",
          "extractAccounts",
          "convertAccounts",
          "collectEpics",
          "extractEpics"
        ],
        "options": {
          "boardId": 88,
          "connectionId": 1,
          "title": "KEON1 board",
          "transformationRules": {
            "epicKeyField": "",
            "storyPointField": "",
            "remotelinkCommitShaPattern": "",
            "typeMappings": {
              "10150": {
                "standardType": "Incident",
                "statusMappings": null
              }
            }
          }
        }
      }
    ]
  ],
  "enable": true,
  "cronConfig": "0 0 * * *",
  "isManual": true,
  "skipOnFail": false,
  "settings": {
    "version": "1.0.0",
    "connections": [
      {
        "plugin": "jira",
        "connectionId": 1,
        "scope": [
          {
            "transformation": {
              "epicKeyField": "",
              "typeMappings": {
                "10150": {
                  "standardType": "Incident"
                }
              },
              "storyPointField": "",
              "remotelinkCommitShaPattern": "",
              "incidentTags": [
                {
                  "id": "10150",
                  "key": "10150",
                  "title": "DORA Incident",
                  "value": "10150",
                  "type": "string"
                }
              ],
              "productionPattern": "",
              "deploymentPattern": ""
            },
            "options": {
              "boardId": 88,
              "title": "KEON1 board"
            },
            "entities": [
              "TICKET",
              "CROSS"
            ]
          }
        ]
      }
    ]
  },
  "id": 21
}
```

3. API forwarding
For example:
Requests to `http://your_devlake_host/plugins/jira/connections/1/proxy/rest/agile/1.0/board/8/sprint`
would be forwarded to `https://your_jira_host/rest/agile/1.0/board/8/sprint`

```GET /plugins/jira/connections/:connectionId/proxy/rest/*path
{
    "maxResults": 1,
    "startAt": 0,
    "isLast": false,
    "values": [
        {
            "id": 7,
            "self": "https://merico.atlassian.net/rest/agile/1.0/sprint/7",
            "state": "closed",
            "name": "EE Sprint 7",
            "startDate": "2020-06-12T00:38:51.882Z",
            "endDate": "2020-06-26T00:38:00.000Z",
            "completeDate": "2020-06-22T05:59:58.980Z",
            "originBoardId": 8,
            "goal": ""
        }
    ]
}
```
