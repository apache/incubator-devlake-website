---
title: "Raw Layer Schema"
description: >
   Caches raw API responses from data source plugins
sidebar_position: 3
---

## Summary

This document describes Apache DevLake's raw layer schema.

Referring to DevLake's [architecture](../Overview/Architecture.md), the raw layer stores the API responses from data sources (DevOps tools) in JSON. This saves developers' time if the raw data is to be transformed differently later on. Please note that communicating with data sources' APIs is usually the most time-consuming step.


## Use Cases

1. As a user, you can check raw data tables to verify data quality if you have concerns about the [domain layer data](DevLakeDomainLayerSchema.md).
2. As a developer, you can customize domain layer schema based on raw data tables via [customize](Plugins/customize.md).


## Data Models

Raw layer tables start with a prefix `_raw_`. Each plugin contains multiple raw data tables, the naming convension of these tables is `_raw_{plugin}_{entity}`. For instance,
- _raw_jira_issues
- _raw_jira_boards
- _raw_jira_board_issues
- ...

Normally, you do not need to use these tables, unless you have one of the above use cases.
