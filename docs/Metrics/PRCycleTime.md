---
title: "PR Cycle Time"
description: >
  PR Cycle Time
sidebar_position: 14
---

## What is this metric? 
PR Cycle Time is the sum of PR Coding Time, Pickup TIme, Review Time and Deploy Time. It is the total time from the first commit to when the PR is deployed.

## Why is it important?
PR Cycle Time indicates the overall velocity of the delivery progress in terms of PR. 

## Which dashboard(s) does it exist in?
- [Engineering Throughput and Cycle Time](../../../livedemo/EngineeringLeads/EngineeringThroughputAndCycleTime)
- [Engineering Throughput and Cycle Time - Team View](../../../livedemo/EngineeringLeads/EngineeringThroughputAndCycleTimeTeamView)


## How is it calculated?
You can define `deployment` based on your actual practice. For a full list of `deployment`'s definitions that DevLake support, please refer to [Deployment Frequency](/docs/Metrics/DeploymentFrequency.md).

<b>Data Sources Required</b>

This metric relies on PRs/MRs collected from GitHub, GitLab, BitBucket, Gitee or other code review tools.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find the `cycle time` of a specific PR. DevLake pre-calculates the metric and stores it in table.pull_requests.

```
SELECT
  change_timespan/60 as 'PR Cycle Time(h)'
FROM
  pull_requests
```


If you want to measure the monthly trend of `PR cycle time` in the screenshot below, please run the following SQL in Grafana. 

![](/img/Metrics/pr-cycle-time-monthly.png)

```
SELECT 
  DATE_ADD(date(created_date), INTERVAL -DAY(date(created_date))+1 DAY) as time,
  avg(change_timespan)/60 as 'PR Cycle Time(h)'
FROM pull_requests
GROUP BY 1
ORDER BY 1
```


## How to improve?
1. Divide coding tasks into workable and manageable pieces;
2. Use DevLake's dashboards to monitor your delivery progress;
3. Have a habit to check for hanging PRs regularly;
4. Set up alerts for your communication tools (e.g. Slack, Lark) when new PRs are issued;
2. Use automated tests for the initial work;
5. Reduce PR size;
6. Analyze the causes for long reviews.