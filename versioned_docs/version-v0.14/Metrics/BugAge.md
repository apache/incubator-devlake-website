---
title: "Bug Age"
description: >
  Bug Age
sidebar_position: 9
---

## What is this metric? 
The amount of time it takes a bug to fix.

## Why is it important?
1. Help the team to establish an effective hierarchical response mechanism for bugs. Focus on the resolution of important problems in the backlog.
2. Improve team's and individual's bug fixing efficiency. Identify good/to-be-improved practices that affect bug age age

## Which dashboard(s) does it exist in
- Jira
- GitHub
- Weekly Bug Retro


## How is it calculated?
This metric equals to `resolution_date` - `created_date` of issues in type "BUG".

<b>Data Sources Required</b>

This metric relies on issues collected from Jira, GitHub, or TAPD.

<b>Transformation Rules Required</b>

This metric relies on the 'type-bug' configuration in Jira, GitHub or TAPD transformation rules to let DevLake know what CI builds/jobs can be regarded as `Bugs`.


## How to improve?
1. Observe the trend of bug age and locate the key reasons.
2. According to the severity level, type (business, functional classification), affected module, source of bugs, count and observe the length of bug age.