---
title: "TAPD"
description: >
  Tapd Plugin
---

## Summary

This plugin collects TAPD data through its REST APIs. TAPD is an issue-tracking tool similar to Jira.

## Entities
### How to get more entities
Environment Variables `ENABLE_SUBTASKS_BY_DEFAULT` can be set to enable or disable the execution of subtasks, so that more entities can be collected.
Check [this doc](/GettingStarted/Environment.md#enable_subtasks_by_default) for more details.

## Supported Versions
Advanced mode available for Tapd Cloud. Check [this doc](https://devlake.apache.org/docs/Overview/SupportedDataSources#data-sources-and-data-plugins) for more details.

## Metrics

Metrics that can be calculated based on the data collected from Tapd:

- [Requirement Count](/Metrics/RequirementCount.md)
- [Requirement Lead Time](/Metrics/RequirementLeadTime.md)
- [Requirement Delivery Rate](/Metrics/RequirementDeliveryRate.md)
- [Bug Age](/Metrics/BugAge.md)
- [Incident Age](/Metrics/IncidentAge.md)

## Configuration

- Configuring Tapd via [config-ui](/Configuration/Tapd.md).
- Configuring Tapd via Config UI's [advanced mode](/Configuration/AdvancedMode.md#6-tapd).

