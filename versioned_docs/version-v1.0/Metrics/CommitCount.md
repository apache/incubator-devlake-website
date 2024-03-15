---
title: "Commit Count"
description: >
  Commit Count
sidebar_position: 9
---

## What is this metric? 
The number of commits created.

## Why is it important?
1. Identify potential bottlenecks that may affect output
2. Encourage R&D practices of small step submissions and develop excellent coding habits

## Which dashboard(s) does it exist in
- GitHub Release Quality and Contribution Analysis
- Demo-Is this month more productive than last?
- Demo-Commit Count by Author

## How is it calculated?
This metric is calculated by counting the number of commits in the given data range.

<b>Data Sources Required</b>

This metric relies on commits collected from GitHub, GitLab or BitBucket.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find commits in specific repositories, eg. 'repo-1' and 'repo-2'.
```
SELECT
  r.id,
  c.*
FROM 
  commits c
  LEFT JOIN repo_commits rc ON c.sha = rc.commit_sha
  LEFT JOIN repos r ON r.id = rc.repo_id
WHERE
  -- please replace the repo ids with your own, or create a '$repo_id' variable in Grafana
  r.id in ('repo-1','repo-2')
  and message not like '%Merge%'
  and $__timeFilter(c.authored_date)
  -- the following condition will remove the month with incomplete data
  and c.authored_date >= DATE_ADD(DATE_ADD($__timeFrom(), INTERVAL -DAY($__timeFrom())+1 DAY), INTERVAL +1 MONTH)
```

If you want to measure the monthly trend of `commit count` in the screenshot below, please run the following SQL in Grafana.

![](/img/Metrics/commit-count-monthly.png)

```
with _commits as(
  SELECT
    DATE_ADD(date(c.authored_date), INTERVAL -DAY(date(c.authored_date))+1 DAY) as time,
    count(c.sha) as commit_count
  FROM 
    commits c
    LEFT JOIN repo_commits rc ON c.sha = rc.commit_sha
    LEFT JOIN repos r ON r.id = rc.repo_id
  WHERE
    -- please replace the repo ids with your own, or create a '$repo_id' variable in Grafana
    r.id in ($repo_id)
    and message not like '%Merge%'
    and $__timeFilter(c.authored_date)
    -- the following condition will remove the month with incomplete data
    and c.authored_date >= DATE_ADD(DATE_ADD($__timeFrom(), INTERVAL -DAY($__timeFrom())+1 DAY), INTERVAL +1 MONTH)
  group by 1
)

SELECT 
  date_format(time,'%M %Y') as month,
  commit_count as "Commit Count"
FROM _commits
ORDER BY time
```

## How to improve?
1. Identify the main reasons for the unusual number of commits and the possible impact on the number of commits through comparison
2. Evaluate whether the number of commits is reasonable in conjunction with more microscopic workload metrics (e.g. lines of code/code equivalents)
