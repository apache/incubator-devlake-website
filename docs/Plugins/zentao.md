---
title: "Zentao"
description: >
  Zentao Plugin
---

## Summary

This plugin collects Zentao data through its REST APIs. [Zentao](https://github.com/easysoft/zentaopms) is an issue-tracking tool similar to Jira.

## Entities
### How to get more entities
Environment Variables `ENABLE_SUBTASKS_BY_DEFAULT` can be set to enable or disable the execution of subtasks, so that more entities can be collected.
Check [this doc](/GettingStarted/Environment.md#enable_subtasks_by_default) for more details.

## Supported Versions

Advanced mode vailable for Zentao OSS v18.3, Enterprise v8.2, Flagship v4.3. Check [this doc](https://devlake.apache.org/docs/Overview/SupportedDataSources#data-sources-and-data-plugins) for more details.

## Metrics

Metrics that can be calculated based on the data collected from Zentao:

- [Requirement Count](/Metrics/RequirementCount.md)
- [Requirement Lead Time](/Metrics/RequirementLeadTime.md)
- [Requirement Delivery Rate](/Metrics/RequirementDeliveryRate.md)
- [Bug Age](/Metrics/BugAge.md)
- [Incident Age](/Metrics/IncidentAge.md)

## Configuration

- Configuring Zentao via [config-ui](/Configuration/Zentao.md).
- Configuring Zentao via Config UI's [advanced mode](/Configuration/AdvancedMode.md#8-zentao).


