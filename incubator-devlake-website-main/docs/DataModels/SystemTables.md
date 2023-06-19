---
title: "System Tables"
description: >
   Stores DevLake's own entities
sidebar_position: 4
---

## Summary

This document describes Apache DevLake's data models of its own entities. These tables are used and managed by the Devlake framework. 


## Use Cases

1. As a user, you can check `_devlake_blueprints` and `_devlake_pipelines` when failing to collect data via DevLake's blueprint.
2. As a contributor, you can check these tables to debug task concurrency or data migration features.


## Data Models

These tables start with a prefix `_devlake`. Unlike raw or tool data tables, DevLake only contains one set of system tables. The naming convension of these tables is `_raw_{plugin}_{entity}`, such as 
- _devlake_blueprints
- _devlake_pipelines
- _devlake_tasks
- _devlake_subtasks
- ...

Normally, you do not need to use these tables, unless you have one of the above use cases.
