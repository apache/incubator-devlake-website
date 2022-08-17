---
title: "Pull Request Review Rounds"
description: >
  Requirement Count
sidebar_position: 2
---

## What is this metric? 
The number of issues created with the type `REQUIREMENT`.

## Why is it important?
1. Based on historical data, establish a baseline of the delivery capacity of a single iteration to improve the organization and planning of R&D resources.
2. Evaluate whether the delivery capacity matches the business phase and demand scale. Identify key bottlenecks and reasonably allocate resources.

## Which dashboard(s) does it exist in
- Jira
- GitHub


## How is it calculated?
This metric is calculated by counting the number of completed issues in type "REQUIREMENT".

<b>Data Sources Required</b>

This metric relies on issues collected from Jira, GitHub, or TAPD.

<b>Transformation Rules Required</b>

This metric relies on the "issue type mapping" in "blueprint-transformation rules" page to let DevLake know what issues can be regarded as `REQUIREMENT`.

<b>SQL Queries</b>

If you want to see a single count, run the following SQL in Grafana
```
  select 
    count(*) as value
  from issues i
    join board_issues bi on i.id = bi.issue_id
  where 
    i.type in ($type)
    and i.type = 'REQUIREMENT'
    -- this is the default variable in Grafana
    and $__timeFilter(i.created_date)
    and bi.board_id in ($board_id)
```

If you want to see the monthly trend, run the following SQL
```
  SELECT
    DATE_ADD(date(i.created_date), INTERVAL -DAYOFMONTH(date(i.created_date))+1 DAY) as time,
    count(distinct case when status != 'DONE' then i.id else null end) as "Number of Open Issues",
    count(distinct case when status = 'DONE' then i.id else null end) as "Number of Delivered Issues"
  FROM issues i
    join board_issues bi on i.id = bi.issue_id
    join boards b on bi.board_id = b.id
  WHERE 
    i.type = 'REQUIREMENT'
    and $__timeFilter(i.created_date)
    and bi.board_id in ($board_id)
  GROUP by 1
```

## How to improve?
1. Analyze the number of requirements and delivery rate of different time cycles to find the stability and trend of the development process.
2. Analyze and compare the number of requirements delivered and delivery rate of each project/team, and compare the scale of requirements of different projects.
3. Based on historical data, establish a baseline of the delivery capacity of a single iteration (optimistic, probable and pessimistic values) to provide a reference for iteration estimation.
4. Drill down to analyze the number and percentage of requirements in different phases of SDLC. Analyze rationality and identify the requirements stuck in the backlog. 
