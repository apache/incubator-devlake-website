---
title: "Commit Author Count"
description: >
  Commit Author Count
sidebar_position: 10
---

## What is this metric? 
The number of commit authors who have committed code.

## Why is it important?
Take inventory of project/team R&D resource inputs, assess input-output ratio, and rationalize resource deployment.


## Which dashboard(s) does it exist in
N/A


## How is it calculated?
This metric is calculated by counting the number of commit authors in the given data range.

<b>Data Sources Required</b>

This metric relies on commits collected from GitHub, GitLab or BitBucket.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find the `commit author count` in specific repositories, eg. 'repo-1' and 'repo-2'.

```
SELECT
  count(distinct c.author_id)
FROM 
  commits c
  LEFT JOIN repo_commits rc ON c.sha = rc.commit_sha
  LEFT JOIN repos r ON r.id = rc.repo_id
WHERE
  -- please replace the repo ids with your own, or create a '$repo_id' variable in Grafana
  r.id in ('repo-1', 'repo-2')
  and message not like '%Merge%'
  and $__timeFilter(c.authored_date)
  -- the following condition will remove the month with incomplete data
  and c.authored_date >= DATE_ADD(DATE_ADD($__timeFrom(), INTERVAL -DAY($__timeFrom())+1 DAY), INTERVAL +1 MONTH)
```


## How to improve?
As a secondary indicator, this helps assess the labor cost of participating in coding.
