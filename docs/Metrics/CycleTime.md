---
title: "PR Cycle Time"
description: >
  PR Cycle Time
sidebar_position: 2
---

## What is this metric? 
PR Cycle Time is the sum of PR Coding Time, Pickup TIme, Review Time and Deploy Time. It is the total time from the first commit to when the PR is deployed.

## Why is it important?
PR Cycle Time indicate the overall speed of the delivery progress in terms of PR. 

## Which dashboard(s) does it exist in?
- Engineering Throughput and Cycle Time
- Engineering Throughput and Cycle Time - Team View


## How is it calculated?
You can define `deployment` based on your actual practice. For a full list of `deployment`'s definitions that DevLake support, please refer to [Deploy Frequency](/docs/Metrics/DeployFrequency.md).

<b>Data Sources Required</b>
This metric relies on PR/MRs collected from GitHub or GitLab.

<b>Transformation Rules Required</b>
N/A

<b>SQL Queries</b>


## How to improve?
1. Divide coding tasks into workable and manageable pieces;
2. Use DevLake's dashboards to monitor your delivery progress;
3. Have a habit to check for hanging PRs regularly;
4. Set up alerts for your communication tools (e.g. Slack, Lark) when new PRs are issued;
2. Use automated tests for the initial work;
5. Reduce PR size;
6. Analyze the causes for long reviews.