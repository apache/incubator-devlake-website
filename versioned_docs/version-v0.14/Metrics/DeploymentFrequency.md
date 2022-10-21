---
title: "DORA - Deployment Frequency"
description: >
  DORA - Deployment Frequency
sidebar_position: 18
---

## What is this metric? 
How often an organization deploys code to production or release it to end users.

## Why is it important?
Deployment frequency reflects the efficiency of a team's deployment. A team that deploys more frequently can deliver the product faster and users' feature requirements can be met faster.

## Which dashboard(s) does it exist in
DORA dashboard. See [live demo](https://grafana-lake.demo.devlake.io/grafana/d/qNo8_0M4z/dora?orgId=1).


## How is it calculated?
Deployment frequency is calculated based on the number of deployment days, not the number of deployments, e.g.,daily, weekly, monthly, yearly.

Below are the benchmarks for different development teams from Google's report. DevLake uses the same benchmarks.

| Groups           | Benchmarks                                    | DevLake Benchmarks                             |
| -----------------| --------------------------------------------- | ---------------------------------------------- |
| Elite performers | On-demand (multiple deploys per day)          | On-demand                                      |
| High performers  | Between once per week and once per month      | Between once per week and once per month       |
| Medium performers| Between once per month and once every 6 months| Between once per month and once every 6 months |
| Low performers   | Fewer than once per six months                | Fewer than once per six months                 |

<p><i>Source: 2021 Accelerate State of DevOps, Google</i></p>


<b>Data Sources Required</b>

This metric relies on deployments collected in multiple ways:
- Open APIs of Jenkins, GitLab, GitHub, etc.
- Webhook for general CI tools.
- Releases and PR/MRs from GitHub, GitLab APIs, etc.

<b>Transformation Rules Required</b>

This metric relies on the deployment configuration in Jenkins, GitLab or GitHub transformation rules to let DevLake know what CI builds/jobs can be regarded as deployments.

<b>SQL Queries</b>

If you want to measure the monthly trend of deployment count as the picture shown below, run the following SQL in Grafana.

![](/img/Metrics/deployment-frequency-monthly.jpeg)

```
with _deployments as (
-- get the deployment count each month
	SELECT
		date_format(finished_date,'%y/%m') as month,
		COUNT(distinct id) AS deployment_count
	FROM
		cicd_tasks
	WHERE
		type = 'DEPLOYMENT'
		and result = 'SUCCESS'
	GROUP BY 1
),

_calendar_months as(
-- deal with the month with no deployments
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
	case when d.deployment_count is null then 0 else d.deployment_count end as deployment_count
FROM 
	_calendar_months cm
	left join _deployments d on cm.month = d.month
ORDER BY 1
```

If you want to measure in which category your team falls into as the picture shown below, run the following SQL in Grafana.

![](/img/Metrics/deployment-frequency-text.jpeg)

```
with last_few_calendar_months as(
-- get the last few months within the selected time period in the top-right corner
	SELECT CAST((SYSDATE()-INTERVAL (H+T+U) DAY) AS date) day
	FROM ( SELECT 0 H
			UNION ALL SELECT 100 UNION ALL SELECT 200 UNION ALL SELECT 300
		) H CROSS JOIN ( SELECT 0 T
			UNION ALL SELECT  10 UNION ALL SELECT  20 UNION ALL SELECT  30
			UNION ALL SELECT  40 UNION ALL SELECT  50 UNION ALL SELECT  60
			UNION ALL SELECT  70 UNION ALL SELECT  80 UNION ALL SELECT  90
		) T CROSS JOIN ( SELECT 0 U
			UNION ALL SELECT   1 UNION ALL SELECT   2 UNION ALL SELECT   3
			UNION ALL SELECT   4 UNION ALL SELECT   5 UNION ALL SELECT   6
			UNION ALL SELECT   7 UNION ALL SELECT   8 UNION ALL SELECT   9
		) U
	WHERE
		(SYSDATE()-INTERVAL (H+T+U) DAY) > $__timeFrom()
),

_days_weeks_deploy as(
	SELECT
			date(DATE_ADD(last_few_calendar_months.day, INTERVAL -WEEKDAY(last_few_calendar_months.day) DAY)) as week,
			MAX(if(deployments.day is not null, 1, 0)) as week_deployed,
			COUNT(distinct deployments.day) as days_deployed
	FROM 
		last_few_calendar_months
		LEFT JOIN(
			SELECT
				DATE(finished_date) AS day,
				id
			FROM cicd_tasks
			WHERE
				type = 'DEPLOYMENT'
				and result = 'SUCCESS') deployments ON deployments.day = last_few_calendar_months.day
	GROUP BY week
	),

_monthly_deploy as(
	SELECT
			date(DATE_ADD(last_few_calendar_months.day, INTERVAL -DAY(last_few_calendar_months.day)+1 DAY)) as month,
			MAX(if(deployments.day is not null, 1, 0)) as months_deployed
	FROM 
		last_few_calendar_months
		LEFT JOIN(
			SELECT
				DATE(finished_date) AS day,
				id
			FROM cicd_tasks
			WHERE
				type = 'DEPLOYMENT'
				and result = 'SUCCESS') deployments ON deployments.day = last_few_calendar_months.day
	GROUP BY month
	),

_median_number_of_deployment_days_per_week as (
	SELECT x.days_deployed as median_number_of_deployment_days_per_week from _days_weeks_deploy x, _days_weeks_deploy y
	GROUP BY x.days_deployed
	HAVING SUM(SIGN(1-SIGN(y.days_deployed-x.days_deployed)))/COUNT(*) > 0.5
	LIMIT 1
),

_median_number_of_deployment_days_per_month as (
	SELECT x.months_deployed as median_number_of_deployment_days_per_month from _monthly_deploy x, _monthly_deploy y
	GROUP BY x.months_deployed
	HAVING SUM(SIGN(1-SIGN(y.months_deployed-x.months_deployed)))/COUNT(*) > 0.5
	LIMIT 1
)

SELECT 
	CASE  
		WHEN median_number_of_deployment_days_per_week >= 3 THEN 'On-demand'
		WHEN median_number_of_deployment_days_per_week >= 1 THEN 'Between once per week and once per month'
		WHEN median_number_of_deployment_days_per_month >= 1 THEN 'Between once per month and once every 6 months'
		ELSE 'Fewer than once per six months' END AS 'Deployment Frequency'
FROM _median_number_of_deployment_days_per_week, _median_number_of_deployment_days_per_month
```

## How to improve?
- Trunk development. Work in small batches and often merge their work into shared trunks.
- Integrate CI/CD tools for automated deployment
- Improve automated test coverage
