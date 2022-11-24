---
title: "PR Size"
description: >
  PR Size
sidebar_position: 22
---

## What is this metric? 
The average code changes (in Lines of Code) of PRs in the selected time range.

## Why is it important?
Small PRs can reduce risks of introducing new bugs and increase code review quality, as problems may often be hidden in big chuncks of code and difficult to identify.

## Which dashboard(s) does it exist in?
- [Engineering Throughput and Cycle Time](../../../livedemo/EngineeringLeads/EngineeringThroughputAndCycleTime)
- [Engineering Throughput and Cycle Time - Team View](../../../livedemo/EngineeringLeads/EngineeringThroughputAndCycleTimeTeamView)


## How is it calculated?
This metric is calculated by counting the total number of code changes (in LOC) divided by the total number of PRs in the selected time range.

<b>Data Sources Required</b>

This metric relies on PRs/MRs collected from GitHub, GitLab, BitBucket, Gitee or other code review tools.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

If you want to measure the monthly trend of `PR review time` in the screenshot below, please run the following SQL in Grafana. 

![](/img/Metrics/pr-size-monthly.png)

```
with _pr_commits_data as(
  SELECT
    DATE_ADD(date(pr.created_date), INTERVAL -$interval(date(pr.created_date))+1 DAY) as time,
    pr.id as pr_id,
    prc.commit_sha,
    sum(c.additions)+sum(c.deletions) as loc
  FROM 
    pull_requests pr
    left join pull_request_commits prc on pr.id = prc.pull_request_id
    left join commits c on prc.commit_sha = c.sha
  WHERE
    $__timeFilter(pr.created_date)
    and pr.base_repo_id in ($repo_id)
  group by 1,2,3
)

SELECT 
  time,
  sum(loc)/count(distinct pr_id) as 'PR Size'
FROM _pr_commits_data
GROUP BY 1
```


## How to improve?
1. Divide coding tasks into workable and manageable pieces;
1. Encourage developers to submit small PRs and only keep related changes in the same PR.
