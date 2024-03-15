---
title: "Bug Age"
description: >
  Bug Age
sidebar_position: 5
---

## What is this metric? 
The amount of time it takes a bug to fix.

## Why is it important?
1. Help the team to establish an effective hierarchical response mechanism for bugs. Focus on the resolution of important problems in the backlog.
2. Improve team's and individual's bug fixing efficiency. Identify good/to-be-improved practices that affect bug age age

## Which dashboard(s) does it exist in
- [Jira](https://devlake.apache.org/livedemo/DataSources/Jira)
- [GitHub](https://devlake.apache.org/livedemo/DataSources/GitHub)
- [Weekly Bug Retro](https://devlake.apache.org/livedemo/EngineeringLeads/WeeklyBugRetro)


## How is it calculated?
Similar to [requirement lead time](./RequirementLeadTime.md), this metric equals `resolution_date - created_date` of issues in type "BUG".

<b>Data Sources Required</b>

This metric relies on `issues` collected from Jira, GitHub, or TAPD.

<b>Data Transformation Required</b>

This metric relies on the 'type-bug' configuration in Jira, GitHub or TAPD's transformation rules while adding/editing a blueprint. This configuration tells DevLake what issues are `bugs`.

<b>SQL Queries</b>

The following SQL shows how to find the bug age of a specific `bug`.
```
-- lead_time_minutes is a pre-calculated field whose value equals 'resolution_date - created_date'
SELECT
  lead_time_minutes/1440 as bug_age_in_days
FROM
  issues
WHERE
  type = 'BUG'
```

If you want to measure the `mean bug age` in the screenshot below, please run the following SQL in Grafana.

![](/img/Metrics/bug-age-monthly.png)

```
with _bugs as(
  SELECT
    DATE_ADD(date(i.resolution_date), INTERVAL -DAY(date(i.resolution_date))+1 DAY) as time,
    AVG(i.lead_time_minutes/1440) as issue_lead_time
  FROM issues i
  	join board_issues bi on i.id = bi.issue_id
  	join boards b on bi.board_id = b.id
  WHERE
    -- $board_id is a variable defined in Grafana's dashboard settings to filter out issues by boards
    b.id in ($board_id)
    and i.status = "DONE"
    and i.type = 'BUG'
    and $__timeFilter(i.resolution_date)
    -- the following condition will remove the month with incomplete data
    and i.resolution_date >= DATE_ADD(DATE_ADD($__timeFrom(), INTERVAL -DAY($__timeFrom())+1 DAY), INTERVAL +1 MONTH)
  group by 1
)

SELECT 
  date_format(time,'%M %Y') as month,
  issue_lead_time as "Mean Bug Age in Days"
FROM _bugs
ORDER BY time
```

## How to improve?
1. Observe the trend of bug age and locate the key reasons.
2. Compare the age of bugs by severity levels, types (business, functional classification), affected components, etc.