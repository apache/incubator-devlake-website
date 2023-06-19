---
title: "Tool Layer Schema"
description: >
   Extract raw data into a relational schema for each specific tool
sidebar_position: 2
---

## Summary

This document describes Apache DevLake's tool layer schema.

Referring to DevLake's [architecture](../Overview/Architecture.md), the Tool layer extracts raw data from JSONs into a relational schema that's easier to consume by analytical tasks. Each DevOps tool would have a schema that's tailored to its data structure, hence the name, the Tool layer.


## Use Cases

As a user, you can check tool data tables to verify data quality if you have concerns about the [domain layer data](DevLakeDomainLayerSchema.md).


## Data Models

Tool layer tables start with a prefix `_tool_`. Each plugin contains multiple tool data tables, the naming convension of these tables is `_tool_{plugin}_{entity}`. For instance,
- _tool_jira_issues
- _tool_jira_boards
- _tool_jira_board_issues`
- ...

Normally, you do not need to use tool layer tables, unless you have one of the above use cases.
