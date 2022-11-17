---
title: "Requirement Lead Time"
description: >
  Requirement Lead Time
sidebar_position: 2
---

## What is this metric? 
The amount of time it takes a requirement to deliver.

## Why is it important?
1. Analyze key projects and critical points, identify good/to-be-improved practices that affect requirement lead time, and reduce the risk of delays
2. Focus on the end-to-end velocity of value delivery process; coordinate different parts of R&D to avoid efficiency shafts; make targeted improvements to bottlenecks.

## Which dashboard(s) does it exist in
- [Jira](https://devlake.apache.org/livedemo/DataSources/Jira)
- [GitHub](https://devlake.apache.org/livedemo/DataSources/GitHub)
- [Community Experience](https://devlake.apache.org/livedemo/OSSMaintainers/CommunityExperience)


## How is it calculated?
This metric equals `resolution_date - created_date` of issues in type "REQUIREMENT".

<b>Data Sources Required</b>

This metric relies on issues collected from Jira, GitHub, or TAPD.

<b>Data Transformation Required</b>

This metric relies on the 'type-requirement' configuration in Jira, GitHub or TAPD's transformation rules while adding/editing a blueprint. This configuration tells DevLake what issues are `requirements`.

<b>SQL Queries</b>

The following SQL shows how to find the lead time of a specific `requirement`.
```
-- lead_time_minutes is a pre-calculated field whose value equals 'resolution_date - created_date'
SELECT
  lead_time_minutes/1440 as requirement_lead_time_in_days
FROM
  issues
WHERE
  type = 'REQUIREMENT'
```


If you want to measure the `mean requirement lead time` in the screenshot below, please run the following SQL in Grafana.

![](/img/Metrics/requirement-lead-time-monthly.png)

```
with _issues as(
  SELECT
    DATE_ADD(date(i.resolution_date), INTERVAL -DAY(date(i.resolution_date))+1 DAY) as time,
    AVG(i.lead_time_minutes/1440) as issue_lead_time
  FROM issues i
  	join board_issues bi on i.id = bi.issue_id
  	join boards b on bi.board_id = b.id
  WHERE
    -- $board_id is a variable defined in Grafana's dashboard settings to filter out issues by boards
    b.id in ($board_id)
    and i.type = 'REQUIREMENT'
    and i.status = "DONE"
    and $__timeFilter(i.resolution_date)
    -- the following condition will remove the month with incomplete data
    and i.resolution_date >= DATE_ADD(DATE_ADD($__timeFrom(), INTERVAL -DAY($__timeFrom())+1 DAY), INTERVAL +1 MONTH)
  group by 1
)

SELECT 
  date_format(time,'%M %Y') as month,
  issue_lead_time as "Mean Requirement Lead Time in Days"
FROM _issues
ORDER BY time
```

## How to improve?
1. Analyze the trend of requirement lead time to observe if it has improved over time.
2. Compare the requirement lead time of each project/team to identify key projects with abnormal lead time.
3. Drill down to analyze a requirement's staying time in different phases of SDLC. Analyze the bottleneck of delivery velocity and improve the workflow.