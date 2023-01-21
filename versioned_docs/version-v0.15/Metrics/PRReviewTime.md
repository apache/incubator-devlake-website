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
- [Engineering Throughput and Cycle Time](/livedemo/EngineeringLeads/EngineeringThroughputAndCycleTime)
- [Engineering Throughput and Cycle Time - Team View](/livedemo/EngineeringLeads/EngineeringThroughputAndCycleTimeTeamView)


## How is it calculated?
This metric is the time frame between when the first comment is added to a PR, to when the PR is merged.

<b>Data Sources Required</b>

This metric relies on PRs/MRs collected from GitHub, GitLab, BitBucket, Gitee or other code review tools.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find the `review time` of a specific PR. DevLake pre-calculates the metric and stores it in table.pull_requests.

```
SELECT
  review_timespan/60 as 'PR Review Time(h)'
FROM
  pull_requests
```


If you want to measure the monthly trend of `PR review time` in the screenshot below, please run the following SQL in Grafana. 

![](/img/Metrics/pr-review-time-monthly.png)

```
SELECT 
  DATE_ADD(date(created_date), INTERVAL -DAY(date(created_date))+1 DAY) as time,
  avg(review_timespan)/60 as 'PR Review Time(h)'
FROM pull_requests
GROUP BY 1
ORDER BY 1
```

## How to improve?
1. Use DevLake's dashboards to monitor your delivery progress;
2. Use automated tests for the initial work;
3. Reduce PR size;
4. Analyze the causes for long reviews.