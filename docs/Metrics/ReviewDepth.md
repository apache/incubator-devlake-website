---
title: "PR Review Depth"
description: >
  PR Review Depth
sidebar_position: 21
---

## What is this metric? 
The average number of comments of PRs in the selected time range.

## Why is it important?
PR Review Depth (in Comments per RR) is related to the quality of code review, indicating how thorough your team reviews PRs.

## Which dashboard(s) does it exist in?
- Engineering Throughput and Cycle Time
- Engineering Throughput and Cycle Time - Team View

## How is it calculated?
This metric is calculated by counting the total number of PR comments divided by the total number of PRs in the selected time range.

<b>Data Sources Required</b>

This metric relies on PR/MRs collected from GitHub or GitLab.

<b>Transformation Rules Required</b>

N/A

<b>SQL Queries</b>


## How to improve?
1. Encourage multiple reviewers to review a PR;
2. Review Depth is an indicator for generally how thorough your PRs are reviewed, but it does not mean the deeper the better. In some cases, spending an excessive amount of resources on reviewing PRs is also not recommended.