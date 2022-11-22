---
title: "Build Duration"
description: >
  Build Duration
sidebar_position: 24
---

## What is this metric? 
The duration of successful builds.

## Why is it important?
1. As a process indicator, it reflects the value flow efficiency of upstream production and research links
2. Identify excellent/to-be-improved practices that impact the build, and drive the team to precipitate reusable tools and mechanisms to build infrastructure for fast and high-frequency delivery

## Which dashboard(s) does it exist in
- [Jenkins](https://grafana-lake.demo.devlake.io/grafana/d/W8AiDFQnk/jenkins?orgId=1)


## How is it calculated?
This metric is calculated by getting the duration of successful cicd_pipelines, such as Jenkins builds, GitLab pipelines and GitHub workflow runs in the given data range.

<b>Data Sources Required</b>

This metric relies on Jenkins builds, GitLab pipelines or GitHub workflow runs.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find the mean duration of successful CI builds **finished** in the given time range.
```
SELECT
  avg(duration_sec/60) as duration_in_minutes
FROM cicd_pipelines
WHERE
  result = 'SUCCESS'
  and $__timeFilter(finished_date)
ORDER BY 1
```

If you want to measure the `mean duration of builds` in the screenshot below, please run the following SQL in Grafana.

![](/img/Metrics/build-duration-monthly.png)

```
WITH _builds as(
  SELECT
    DATE_ADD(date(finished_date), INTERVAL -DAYOFMONTH(date(finished_date))+1 DAY) as time,
    avg(duration_sec) as mean_duration_sec
  FROM 
    cicd_pipelines
  WHERE
    $__timeFilter(finished_date)
    and id like "%jenkins%"
    and name in ($job_id)
    -- the following condition will remove the month with incomplete data
    and finished_date >= DATE_ADD(DATE_ADD($__timeFrom(), INTERVAL -DAY($__timeFrom())+1 DAY), INTERVAL +1 MONTH)
  GROUP BY 1
)

SELECT 
  date_format(time,'%M %Y') as month,
  mean_duration_sec/60 as mean_duration_minutes
FROM _builds
ORDER BY time
```

## How to improve?
1. From the project dimension, compare the number of builds and success rate by combining the project phase and the complexity of tasks.
2. From the time dimension, analyze the trend of the number of builds and success rate to see if it has improved over time.
