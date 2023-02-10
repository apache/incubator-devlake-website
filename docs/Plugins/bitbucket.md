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
- Configuring Bitbucket via Config UI's [advanced mode](/Configuration/AdvancedMode.md#9-BitBucket).

## API Sample Request

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
          "owner": "apache",
          "repo": "devlake",
        }
      }
    ]
  ]
}
'
```

## References

- [references](/DeveloperManuals/DeveloperSetup.md#references)
