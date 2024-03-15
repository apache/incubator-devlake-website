---
title: "BitBucket Data Center"
description: >
  BitBucket Data Center Plugin
---



## Summary

This plugin collects various entities from Bitbucket Data Center, including pull requests, issues, comments, pipelines, git commits, and etc.

As of v0.20.0, `bitbucket_server` plugin can only be invoked through DevLake API. Its support in Config-UI is WIP.

## Supported Versions

Available for BitBucket Data Center 8.16 and BitBucket Data Center and Server 7.21. Check [this doc](https://devlake.apache.org/docs/Overview/SupportedDataSources#data-sources-and-data-plugins) for more details.


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

## Configuration

- Configuring Bitbucket via [Config UI](/Configuration/BitBucketServer.md)

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
        "plugin": "bitbucket",
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
