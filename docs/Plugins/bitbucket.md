---
title: "BitBucket(Beta)"
description: >
  BitBucket Plugin
---



## Summary

This plugin collects various entities from Bitbucket, including pull requests, issues, comments, pipelines, git commits, and etc.

As of v0.14.2, `bitbucket` plugin can only be invoked through DevLake API. Its support in Config-UI is WIP.

## Entities

Check out the [BitBucket entities](/Overview/SupportedDataSources.md#data-collection-scope-by-each-plugin) collected by this plugin.

## Metrics

Metrics that can be calculated based on the data collected from bitbucket:

- [Commit Count](/Metrics/CommitCount.md)
- [Commit Author Count](/Metrics/CommitAuthorCount.md)
- [Added Lines of Code](/Metrics/AddedLinesOfCode.md)
- [Deleted Lines of Code](/Metrics/DeletedLinesOfCode.md)
- [PR Count](/Metrics/PRCount.md)
- [PR Time To Merge](/Metrics/PRTimeToMerge.md)
- [PR Merge Rate](/Metrics/PRMergeRate.md)
- [PR Review Depth](/Metrics/PRReviewDepth.md)
- [PR Size](/Metrics/PRSize.md)
- [Build Count](/Metrics/BuildCount.md)
- [Build Duration](/Metrics/BuildDuration.md)
- [Build Success Rate](/Metrics/BuildSuccessRate.md)

## Configuration

- Configuring Bitbucket via [Config UI](/Configuration/BitBucket.md)

## API Sample Request
> Note: Please replace the `http://localhost:8080` in the sample requests with your actual DevLake API endpoint. For how to view DevLake API's swagger documentation, please refer to the "Using DevLake API" section of [Developer Setup](../DeveloperManuals/DeveloperSetup.md).

1. Create a Bitbucket data connection: `POST /plugins/bitbucket/connections`. Please see a sample request below:

```shell
curl --location --request POST 'http://localhost:8080/plugins/bitbucket/connections' \
--header 'Content-Type: application/json' \
--data-raw '{
    "endpoint": "https://api.bitbucket.org/2.0/",
    "username": "<your username>",
    "password": "<your app password>",
    "name": "Bitbucket Cloud"
}'
```

2. Create a blueprint to collect data from Bitbucket: `POST /blueprints`. Please see a sample request below:

```shell
curl --location --request POST 'http://localhost:8080/blueprints' \
--header 'Content-Type: application/json' \
--data-raw '{
    "enable": true,
    "mode": "NORMAL",
    "name": "My Bitbucket Blueprint",
    "cronConfig": "<cron string of your choice>",
    "isManual": false,
    "plan": [[]],
    "settings": {
        "connections": [
            {
                "plugin": "bitbucket",
                "connectionId": 1,
                "scope": [
                    {
                        "entities": [
                            "CODE",
                            "TICKET",
                            "CODEREVIEW",
                            "CROSS"
                        ],
                        "options": {
                            "owner": "<owner of your repo>",
                            "repo": "<your repo name>"
                        }
                    }
                ]
            }
        ],
        "version": "1.0.0"
    }
}'
```

3. [Optional] Trigger the blueprint manually: `POST /blueprints/{blueprintId}/trigger`. Run this step if you want to trigger the newly created blueprint right away. See an example request below:

```shell
curl --location --request POST 'http://localhost:8080/blueprints/<blueprintId>/trigger' \
--header 'Content-Type: application/json'
```

## References

- [references](/DeveloperManuals/DeveloperSetup.md#references)
