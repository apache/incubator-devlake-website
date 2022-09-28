---
title: "Incident Age"
description: >
  Incident Age
sidebar_position: 10
---

## What is this metric? 
The amount of time it takes a incident to fix.

## Why is it important?
1. Help the team to establish an effective hierarchical response mechanism for incidents. Focus on the resolution of important problems in the backlog.
2. Improve team's and individual's incident fixing efficiency. Identify good/to-be-improved practices that affect incident age

## Which dashboard(s) does it exist in
- Jira
- GitHub


## How is it calculated?
This metric equals to `resolution_date` - `created_date` of issues in type "INCIDENT".

<b>Data Sources Required</b>

This metric relies on issues collected from Jira, GitHub, or TAPD.

<b>Transformation Rules Required</b>

This metric relies on the 'type-incident' configuration in Jira, GitHub or TAPD transformation rules to let DevLake know what CI builds/jobs can be regarded as `Incidents`.


## How to improve?
1. Observe the trend of incident age and locate the key reasons.
2. According to the severity level, type (business, functional classification), affected module, source of bugs, count and observe the length of incident age.