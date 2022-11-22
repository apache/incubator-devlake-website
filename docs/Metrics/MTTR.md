---
title: "DORA - Median Time to Restore Service"
description: >
  DORA - Median Time to Restore Service
sidebar_position: 28
---

## What is this metric? 
The time to restore service after service incidents, rollbacks, or any type of production failure happened.

## Why is it important?
This metric is essential to measure the disaster control capability of your team and the robustness of the software.

## Which dashboard(s) does it exist in
DORA dashboard. See [live demo](https://grafana-lake.demo.devlake.io/grafana/d/qNo8_0M4z/dora?orgId=1).


## How is it calculated?
MTTR = Total [incident age](./IncidentAge.md) (in hours)/number of incidents.

If you have three incidents that happened in the given data range, one lasting 1 hour, one lasting 2 hours and one lasting 3 hours. Your MTTR will be: (1 + 2 + 3) / 3 = 2 hours.

Below are the benchmarks for different development teams from Google's report. However, it's difficult to tell which group a team falls into when the team's median time to restore service is `between one week and six months`. Therefore, DevLake provides its own benchmarks to address this problem:

| Groups           | Benchmarks                           | DevLake Benchmarks   
| -----------------| -------------------------------------| -------------------------------|
| Elite performers | Less than one hour                   | Less than one hour             |
| High performers  | Less one day                         | Less than one day              |
| Medium performers| Between one day and one week         | Between one day and one week   |
| Low performers   | More than six months                 | More than one week             |

<p><i>Source: 2021 Accelerate State of DevOps, Google</i></p>

<b>Data Sources Required</b>

This metric relies on:
- `Deployments` collected in one of the following ways:
  - Open APIs of Jenkins, GitLab, GitHub, etc.
  - Webhook for general CI tools.
  - Releases and PR/MRs from GitHub, GitLab APIs, etc.
- `Incidents` collected in one of the following ways:
  - Issue tracking tools such as Jira, TAPD, GitHub, etc.
  - Bug or Service Monitoring tools such as PagerDuty, Sentry, etc.
  - CI pipelines that marked the 'failed' deployments.

<b>Transformation Rules Required</b>

This metric relies on:
- Deployment configuration in Jenkins, GitLab or GitHub transformation rules to let DevLake know what CI builds/jobs can be regarded as `Deployments`.
- Incident configuration in Jira, GitHub or TAPD transformation rules to let DevLake know what CI builds/jobs can be regarded as `Incidents`.

<b>SQL Queries</b>

If you want to measure the monthly trend of median time to restore service as the picture shown below, run the following SQL in Grafana.

![](/img/Metrics/mttr-monthly.jpeg)

```
with _incidents as (
-- get the incident count each month
	SELECT
		date_format(created_date,'%y/%m') as month,
		cast(lead_time_minutes as signed) as lead_time_minutes
	FROM
		issues
	WHERE
		type = 'INCIDENT'
),

_find_median_mttr_each_month as (
	SELECT 
		x.*
	from _incidents x join _incidents y on x.month = y.month
	WHERE x.lead_time_minutes is not null and y.lead_time_minutes is not null
	GROUP BY x.month, x.lead_time_minutes
	HAVING SUM(SIGN(1-SIGN(y.lead_time_minutes-x.lead_time_minutes)))/COUNT(*) > 0.5
),

_find_mttr_rank_each_month as (
	SELECT
		*,
		rank() over(PARTITION BY month ORDER BY lead_time_minutes) as _rank 
	FROM
		_find_median_mttr_each_month
),

_mttr as (
	SELECT
		month,
		lead_time_minutes as med_time_to_resolve
	from _find_mttr_rank_each_month
	WHERE _rank = 1
),

_calendar_months as(
-- deal with the month with no incidents
	SELECT date_format(CAST((SYSDATE()-INTERVAL (month_index) MONTH) AS date), '%y/%m') as month
	FROM ( SELECT 0 month_index
			UNION ALL SELECT   1  UNION ALL SELECT   2 UNION ALL SELECT   3
			UNION ALL SELECT   4  UNION ALL SELECT   5 UNION ALL SELECT   6
			UNION ALL SELECT   7  UNION ALL SELECT   8 UNION ALL SELECT   9
			UNION ALL SELECT   10 UNION ALL SELECT  11
		) month_index
	WHERE (SYSDATE()-INTERVAL (month_index) MONTH) > SYSDATE()-INTERVAL 6 MONTH	
)

SELECT 
	cm.month,
	case 
		when m.med_time_to_resolve is null then 0 
		else m.med_time_to_resolve/60 end as med_time_to_resolve_in_hour
FROM 
	_calendar_months cm
	left join _mttr m on cm.month = m.month
ORDER BY 1
```

If you want to measure in which category your team falls into as the picture shown below, run the following SQL in Grafana.

![](/img/Metrics/mttr-text.jpeg)

``` 
with _incidents as (
-- get the incidents created within the selected time period in the top-right corner
	SELECT
		cast(lead_time_minutes as signed) as lead_time_minutes
	FROM
		issues
	WHERE
		type = 'INCIDENT'
		and $__timeFilter(created_date)
),

_median_mttr as (
	SELECT 
		x.lead_time_minutes as med_time_to_resolve
	from _incidents x, _incidents y
	WHERE x.lead_time_minutes is not null and y.lead_time_minutes is not null
	GROUP BY x.lead_time_minutes
	HAVING SUM(SIGN(1-SIGN(y.lead_time_minutes-x.lead_time_minutes)))/COUNT(*) > 0.5
	LIMIT 1
)

SELECT 
	case
		WHEN med_time_to_resolve < 60  then "Less than one hour"
    WHEN med_time_to_resolve < 24 * 60 then "Less than one Day"
    WHEN med_time_to_resolve < 7 * 24 * 60  then "Between one day and one week"
    ELSE "More than one week"
    END as med_time_to_resolve
FROM 
	_median_mttr
```

## How to improve?
- Use automated tools to quickly report failure
- Prioritize recovery when a failure happens
- Establish a go-to action plan to respond to failures immediately
- Reduce the deployment time for failure-fixing
