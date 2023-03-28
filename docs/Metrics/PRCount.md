---
title: "PR Count"
description: >
  Pull Request Count
sidebar_position: 13
---

## What is this metric? 
The number of pull requests (eg. GitHub PRs, Bitbucket PRs, GitLab MRs) created.

## Why is it important?
1. Code review metrics are process indicators to provide quick feedback on developers' code quality
2. Promote the team to establish a unified coding specification and standardize the code review criteria
3. Identify modules with low-quality risks in advance, optimize practices, and precipitate into reusable knowledge and tools to avoid technical debt accumulation

## Which dashboard(s) does it exist in
- [GitHub](/livedemo/DataSources/GitHub)
- [GitLab](/livedemo/DataSources/GitLab)
- [Weekly Community Retro](/livedemo/OSSMaintainers/WeeklyCommunityRetro)
- [Engineering Throughput and Cycle Time](/livedemo/EngineeringLeads/EngineeringThroughputAndCycleTime)
- [Engineering Throughput and Cycle Time - Team View](/livedemo/EngineeringLeads/EngineeringThroughputAndCycleTimeTeamView)


## How is it calculated?
This metric is calculated by counting the number of PRs in the given data range.

<b>Data Sources Required</b>

This metric relies on PRs/MRs collected from GitHub, GitLab, BitBucket, Gitee or other code review tools.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find PRs **created** in specific repositories and given time range.

```
select
	count(*) as pull_request_count
from 
	pull_requests pr
where
  -- $__timeFilter will take Grafana's time range
  $__timeFilter(created_date)
  -- please replace the repo ids with your own, or create a '$repo_id' variable in Grafana
	and base_repo_id in ('repo_1', 'repo_2')
  -- remove PRs submitted by bots, comment it out if you don't need it
  and author_name not rlike  '^robot-|-robot$|\\[bot\\]|-bot$|-ci$|-testing$'
```

If you want to measure the monthly trend of `PR count` in the screenshot below, please run the following SQL in Grafana.

![](/img/Metrics/pr-count-monthly.png)

```
WITH _prs as(
  SELECT
    DATE_ADD(date(created_date), INTERVAL -DAY(date(created_date))+1 DAY) as time,
    count(*) as pr_count
  FROM pull_requests
  WHERE
    -- please replace the repo ids with your own, or create a '$repo_id' variable in Grafana
    base_repo_id in ('repo_1', 'repo_2')
    and $__timeFilter(created_date)
    -- the following condition will remove the month with incomplete data
    and created_date >= DATE_ADD(DATE_ADD($__timeFrom(), INTERVAL -DAY($__timeFrom())+1 DAY), INTERVAL +1 MONTH)
    -- remove PRs submitted by bots, comment it out if you don't need it
    and author_name not rlike  '^robot-|-robot$|\\[bot\\]|-bot$|-ci$|-testing$'
  GROUP BY 1
)

SELECT 
  date_format(time,'%M %Y') as month,
  pr_count as "Pull Request Count"
FROM _prs
ORDER BY time
```


## How to improve?
1. From the developer dimension, we evaluate the code quality of developers by combining the task complexity with the metrics related to the number of review passes and review rounds.
2. From the reviewer dimension, we observe the reviewer's review style by taking into account the task complexity, the number of passes and the number of review rounds.
3. From the project/team dimension, we combine the project phase and team task complexity to aggregate the metrics related to the number of review passes and review rounds, and identify the modules with abnormal code review process and possible quality risks.
