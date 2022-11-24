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
- [Engineering Throughput and Cycle Time](../../../livedemo/EngineeringLeads/EngineeringThroughputAndCycleTime)
- [Engineering Throughput and Cycle Time - Team View](../../../livedemo/EngineeringLeads/EngineeringThroughputAndCycleTimeTeamView)

## How is it calculated?
This metric is calculated by counting the total number of PR comments divided by the total number of PRs in the selected time range.

<b>Data Sources Required</b>

This metric relies on PRs/MRs collected from GitHub, GitLab, BitBucket, Gitee or other code review tools.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

If you want to measure the monthly trend of `PR review time` in the screenshot below, please run the following SQL in Grafana. 

![](/img/Metrics/pr-review-depth-monthly.png)

```
SELECT
  DATE_ADD(date(pr.created_date), INTERVAL -$interval(date(pr.created_date))+1 DAY) as time,
  count(distinct prc.id)/count(pr.id) as "PR Review Depth"
FROM 
  pull_requests pr
  left join pull_request_comments prc on pr.id = prc.pull_request_id
WHERE
  $__timeFilter(pr.created_date)
  and pr.base_repo_id in ($repo_id)
  and pr.merged_date is not null
GROUP BY 1
```


## How to improve?
1. Encourage multiple reviewers to review a PR;
2. Review Depth is an indicator for generally how thorough your PRs are reviewed, but it does not mean the deeper the better. In some cases, spending an excessive amount of resources on reviewing PRs is also not recommended.