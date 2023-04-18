---
title: "PR Pickup Time"
description: >
  PR Pickup Time
sidebar_position: 16
---

## What is this metric? 
The time it takes from when a PR is issued until the first comment is added to that PR. 

## Why is it important?
PR Pickup Time shows how engaged your team is in collaborative work by identifying the delay in picking up PRs. 

## Which dashboard(s) does it exist in?
- [Engineering Throughput and Cycle Time](/livedemo/EngineeringLeads/EngineeringThroughputAndCycleTime)
- [Engineering Throughput and Cycle Time - Team View](/livedemo/EngineeringLeads/EngineeringThroughputAndCycleTimeTeamView)


## How is it calculated?
<b>Data Sources Required</b>

This metric relies on PRs/MRs collected from GitHub, GitLab, BitBucket, Gitee or other code review tools.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find the `pickup time` of a specific PR. DevLake pre-calculates the metric and stores it in table.project_pr_metrics.

```
SELECT
  pr_pickup_time/60 as 'PR Pickup Time(h)'
FROM
  project_pr_metrics
```


If you want to measure the monthly trend of `PR pickup time` in the screenshot below, please run the following SQL in Grafana. 

![](/img/Metrics/pr-pickup-time-monthly.png)

```
SELECT 
  DATE_ADD(date(pr.created_date), INTERVAL -DAY(date(pr.created_date))+1 DAY) as time,
  avg(ppm.pr_pickup_time)/60 as 'PR Pickup Time(h)'
FROM 
  pull_requests pr
  JOIN project_pr_metrics ppm ON pr.id = ppm.id
GROUP BY 1
ORDER BY 1
```


## How to improve?
1. Use DevLake's dashboard to monitor your delivery progress;
2. Have a habit to check for hanging PRs regularly;
3. Set up alerts for your communication tools (e.g. Slack, Lark) when new PRs are issued.
