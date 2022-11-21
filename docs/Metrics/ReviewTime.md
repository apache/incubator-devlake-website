---
title: "PR Review Time"
description: >
  PR Review Time
sidebar_position: 17
---

## What is this metric? 
The time it takes to complete a code review of a PR before it gets merged. 

## Why is it important?
Code review should be conducted almost in real-time and usually take less than two days. Abnormally long PR Review Time may indicate one or more of the following problems:
1. The PR size is too large that makes it difficult to review.
2. The team is too busy to review code.

## Which dashboard(s) does it exist in?
- Engineering Throughput and Cycle Time
- Engineering Throughput and Cycle Time - Team View


## How is it calculated?
This metric is the time frame between when the first comment is added to a PR, to when the PR is merged.

<b>Data Sources Required</b>

This metric relies on PR/MRs collected from GitHub or GitLab.

<b>Transformation Rules Required</b>

N/A

<b>SQL Queries</b>


## How to improve?
1. Use DevLake's dashboards to monitor your delivery progress;
2. Use automated tests for the initial work;
3. Reduce PR size;
4. Analyze the causes for long reviews.