---
title: "PR Merge Rate"
description: >
  Pull Request Merge Rate
sidebar_position: 20
---

## What is this metric? 
The ratio of PRs/MRs that get merged.

## Why is it important?
1. Code review metrics are process indicators to provide quick feedback on developers' code quality
2. Promote the team to establish a unified coding specification and standardize the code review criteria
3. Identify modules with low-quality risks in advance, optimize practices, and precipitate into reusable knowledge and tools to avoid technical debt accumulation

## Which dashboard(s) does it exist in
- Jira
- GitHub
- GitLab
- Weekly Community Retro
- Engineering Throughput and Cycle Time
- Engineering Throughput and Cycle Time - Team View 


## How is it calculated?
The number of merged PRs divided by the number of all PRs in the given data range.

<b>Data Sources Required</b>

This metric relies on PRs/MRs collected from GitHub, GitLab or BitBucket.

<b>Transformation Rules Required</b>

N/A


## How to improve?
1. From the developer dimension, we evaluate the code quality of developers by combining the task complexity with the metrics related to the number of review passes and review rounds.
2. From the reviewer dimension, we observe the reviewer's review style by taking into account the task complexity, the number of passes and the number of review rounds.
3. From the project/team dimension, we combine the project phase and team task complexity to aggregate the metrics related to the number of review passes and review rounds, and identify the modules with abnormal code review process and possible quality risks.
