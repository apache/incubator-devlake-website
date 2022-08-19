---
title: "Commit Count"
description: >
  Commit Count
sidebar_position: 6
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

<b>Transformation Rules Required</b>

N/A

<b>SQL Queries</b>

If you want to see the monthly trend, run the following SQL
```
  with _commits as(
    SELECT
      DATE_ADD(date(authored_date), INTERVAL -DAY(date(authored_date))+1 DAY) as time,
      count(*) as commit_count
    FROM commits
    WHERE
      message not like '%Merge%'
      and $__timeFilter(authored_date)
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
