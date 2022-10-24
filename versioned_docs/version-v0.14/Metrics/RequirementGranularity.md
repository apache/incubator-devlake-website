---
title: "Requirement Granularity"
description: >
  Requirement Granularity
sidebar_position: 5
---

## What is this metric? 
The average number of story points per requirement.

## Why is it important?
1. Promote product teams to split requirements carefully, improve requirements quality, help developers understand requirements clearly, deliver efficiently and with high quality, and improve the project management capability of the team.
2. Establish a data-supported workload estimation model to help R&D teams calibrate their estimation methods and more accurately assess the granularity of requirements, which is useful to achieve better issue planning in project management.

## Which dashboard(s) does it exist in
- Jira
- GitHub


## How is it calculated?
The average story points of issues in type "REQUIREMENT" in the given data range.

<b>Data Sources Required</b>

This metric relies on issues collected from Jira, GitHub, or TAPD.

<b>Transformation Rules Required</b>

This metric relies on the 'type-requirement' configuration in Jira, GitHub or TAPD transformation rules to let DevLake know what CI builds/jobs can be regarded as `Requirements`.


## How to improve?
1. Analyze the story points/requirement lead time of requirements to evaluate whether the ticket size, ie. requirement complexity is optimal.
2. Compare the estimated requirement granularity with the actual situation and evaluate whether the difference is reasonable by combining more microscopic workload metrics (e.g. lines of code/code equivalents)
