---
title: "Requirement Count"
description: >
  Requirement Count
sidebar_position: 1
---

## What is this metric? 
The number of delivered requirements or features.

## Why is it important?
1. Based on historical data, establish a baseline of the delivery capacity of a single iteration to improve the organization and planning of R&D resources.
2. Evaluate whether the delivery capacity matches the business phase and demand scale. Identify key bottlenecks and reasonably allocate resources.

## Which dashboard(s) does it exist in
- [Jira](https://devlake.apache.org/livedemo/DataSources/Jira)
- [GitHub](https://devlake.apache.org/livedemo/DataSources/GitHub)


## How is it calculated?
This metric is calculated by counting the number of delivered issues in type "REQUIREMENT" in the given data range.

<b>Data Sources Required</b>

This metric relies on the `issues` collected from Jira, GitHub, or TAPD.

<b>Data Transformation Required</b>

This metric relies on the 'type-requirement' configuration in Jira, GitHub or TAPD's transformation rules while adding/editing a blueprint. This configuration tells DevLake what issues are `requirements`.

<b>SQL Queries</b>

The following SQL shows how to find the total count of requirements in specific boards, eg. 'board-1' and 'board-2'.

```
select 
  count(*) as "Requirement Count"
from issues i
  join board_issues bi on i.id = bi.issue_id
where 
  i.type = 'REQUIREMENT'
  and i.status = 'DONE'
  -- please replace the board ids with your own, or create a '$board_id' variable in Grafana
  and bi.board_id in ('board-1','board-2')
  and $__timeFilter(i.created_date)
```

If you want to see the monthly trend of `requirement count` in the screenshot below, please run the following SQL

![](/img/Metrics/requirement-count-monthly.png)

```
SELECT
  DATE_ADD(date(i.created_date), INTERVAL -DAYOFMONTH(date(i.created_date))+1 DAY) as time,
  count(distinct case when status != 'DONE' then i.id else null end) as "Number of Open Requirements",
  count(distinct case when status = 'DONE' then i.id else null end) as "Number of Delivered Requirements"
FROM issues i
	join board_issues bi on i.id = bi.issue_id
	join boards b on bi.board_id = b.id
where 
  i.type = 'REQUIREMENT'
  and $__timeFilter(i.created_date)
  -- please replace the board ids with your own, or create a '$board_id' variable in Grafana
  and bi.board_id in ($board_id)
group by 1
```

## How to improve?
1. Analyze the number of requirements and delivery rate of different time cycles to find the stability and trend of the development process.
2. Analyze and compare the number of requirements delivered and delivery rate of each project/team, and compare the scale of requirements of different projects.
3. Based on historical data, establish a baseline of the delivery capacity of a single iteration (optimistic, probable and pessimistic values) to provide a reference for iteration estimation.
4. Drill down to analyze the number and percentage of requirements in different phases of SDLC. Analyze rationality and identify the requirements stuck in the backlog. 
