---
title: "PR Deploy Time"
description: >
  PR Deploy Time
sidebar_position: 18
---

## What is this metric? 
The time it takes from when a PR is merged to when it is deployed.

## Why is it important?
1. Based on historical data, establish a baseline of the delivery capacity of a single iteration to improve the organization and planning of R&D resources.
2. Evaluate whether the delivery capacity matches the business phase and demand scale. Identify key bottlenecks and reasonably allocate resources.

## Which dashboard(s) does it exist in?
- [Engineering Throughput and Cycle Time](/livedemo/EngineeringLeads/EngineeringThroughputAndCycleTime)
- [Engineering Throughput and Cycle Time - Team View](/livedemo/EngineeringLeads/EngineeringThroughputAndCycleTimeTeamView)

## How is it calculated?
`PR deploy time` is calculated by subtracting a PR's deployed_date and merged_date. Hence, we should associate PR/MRs with deployments.

Here are the detailed steps:

![](/img/Metrics/pr-commit-deployment-relation.png)

1. Find the [commits diff](https://devlake.apache.org/docs/Plugins/refdiff/) between two consecutive deployments by deployments' commit_sha 
under the same scope and environment (in terms of TESTING/STAGING/PRODUCTION),
     for example, we will get commit-2 and commit-3 by calculating commits_diff between deployment-1 and deployment-2, which means commit-2 and commit-3 are deployed by deployment-2 
2. Connect PR/MR and commits_diff through merge_commit or pr_commit, for example, 
we get pr-3 connected to commit-3
3. Now we can get pr-3's deploy time by finish_time of deployment-2 minus merge_time of pr-3.

<b>Data Transformation Required</b>

This metric relies on two sources:
1. PR/MRs collected from GitHub or GitLab by enabling "Code Review" under the Data Entities section.
2. Deployments collected in one of the following ways::
   - Open APIs of Jenkins, GitLab, GitHub, etc by enabling "CICD" under the Data Entities section.
   - Webhook for general CI tools.
   - Releases and PR/MRs from GitHub, GitLab APIs, etc.


<b>SQL Queries</b>

The following SQL shows how to find the `deploy time` of a specific PR. DevLake pre-calculates the metric and stores it in table.pull_requests.

```
SELECT
  deploy_timespan/60 as 'PR Deploy Time(h)'
FROM
  pull_requests
```


If you want to measure the monthly trend of `PR deploy time` in the screenshot below, please run the following SQL in Grafana. 

![](/img/Metrics/pr-deploy-time-monthly.png)

```
SELECT 
  DATE_ADD(date(created_date), INTERVAL -DAY(date(created_date))+1 DAY) as time,
  avg(deploy_timespan)/60 as 'PR Deploy Time(h)'
FROM pull_requests
GROUP BY 1
ORDER BY 1
```

## How to improve?
N/A

