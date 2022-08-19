---
title: "Requirement Lead Time"
description: >
  Requirement Lead Time
sidebar_position: 4
---

## What is this metric? 
The amount of time it takes a requirement to deliver.

## Why is it important?
1. Analyze key projects and critical points, identify good/to-be-improved practices that affect requirement lead time, and reduce the risk of delays
2. Focus on the end-to-end velocity of value delivery process; coordinate different parts of R&D to avoid efficiency shafts; make targeted improvements to bottlenecks.

## Which dashboard(s) does it exist in
- Jira
- GitHub
- Community Experience


## How is it calculated?
This metric equals to `resolution_date` - `created_date` of issues in type "REQUIREMENT".

<b>Data Sources Required</b>

This metric relies on issues collected from Jira, GitHub, or TAPD.

<b>Transformation Rules Required</b>

This metric relies on the 'type-requirement' configuration in Jira, GitHub or TAPD transformation rules to let DevLake know what CI builds/jobs can be regarded as `Requirements`.


## How to improve?
1. Analyze the trend of requirement lead time to observe if it has improved over time.
2. Analyze and compare the requirement lead time of each project/team to identify key projects with abnormal lead time.
3. Drill down to analyze a requirement's staying time in different phases of SDLC. Analyze the bottleneck of delivery velocity and improve the workflow.