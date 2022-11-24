---
title: "PR Coding Time"
description: >
  PR Coding Time
sidebar_position: 15
---

## What is this metric? 
The time it takes from the first commit until a PR is issued. 

## Why is it important?
It is recommended that you keep every task on a workable and manageable scale for a reasonably short amount of coding time. The average coding time of most engineering teams is around 3-4 days.

## Which dashboard(s) does it exist in?
- [Engineering Throughput and Cycle Time](../../../livedemo/EngineeringLeads/EngineeringThroughputAndCycleTime)
- [Engineering Throughput and Cycle Time - Team View](../../../livedemo/EngineeringLeads/EngineeringThroughputAndCycleTimeTeamView)


## How is it calculated?
<b>Data Sources Required</b>

This metric relies on PRs/MRs collected from GitHub, GitLab, BitBucket, Gitee or other code review tools.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find the `coding time` of a specific PR. DevLake pre-calculates the metric and stores it in table.pull_requests.

```
SELECT
  coding_timespan/60 as 'PR Coding Time(h)'
FROM
  pull_requests
```


If you want to measure the monthly trend of `PR coding time` in the screenshot below, please run the following SQL in Grafana. 

![](/img/Metrics/pr-coding-time-monthly.png)

```
SELECT 
  DATE_ADD(date(created_date), INTERVAL -DAY(date(created_date))+1 DAY) as time,
  avg(coding_timespan)/60 as 'PR Coding Time(h)'
FROM pull_requests
GROUP BY 1
ORDER BY 1
```

## How to improve?
Divide coding tasks into workable and manageable pieces.
