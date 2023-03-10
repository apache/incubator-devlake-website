---
title: "DORA - Change Failure Rate"
description: >
  DORA - Change Failure Rate
sidebar_position: 29
---

## What is this metric? 
The percentage of changes that were made to a code that then resulted in incidents, rollbacks, or any type of production failure.

## Why is it important?
Unlike Deployment Frequency and Lead Time for Changes that measure the throughput, Change Failure Rate measures the stability and quality of software delivery. A low CFR reflects a bad end-user experience as the production failure is relatively high.

## Which dashboard(s) does it exist in
DORA dashboard. See [live demo](https://grafana-lake.demo.devlake.io/grafana/d/qNo8_0M4z/dora?orgId=1).


## How is it calculated?
The number of deployments affected by incidents/total number of deployments. For example, if there are five deployments and two deployments cause one or more incidents, that is a 40% change failure rate.

![](/img/Metrics/cfr-definition.png)

Below are the benchmarks for different development teams from Google's report. However, it's difficult to tell which group a team falls into when the team's change failure rate is `18%` or `40%`. Therefore, DevLake provides its own benchmarks to address this problem:

| Groups           | Benchmarks      | DevLake Benchmarks |
| -----------------| ----------------| -------------------|
| Elite performers | 0%-15%          | 0%-15%             |
| High performers  | 16%-30%         | 16-20%             |
| Medium performers| 16%-30%         | 21%-30%            |
| Low performers   | 16%-30%         | > 30%              |

<p><i>Source: 2021 Accelerate State of DevOps, Google</i></p>

<b>Data Sources Required</b>

This metric relies on:
- `Deployments` collected in one of the following ways:
  - Open APIs of Jenkins, GitLab, GitHub, etc.
  - Webhook for general CI tools.
  - Releases and PR/MRs from GitHub, GitLab APIs, etc.
- `Incidents` collected in one of the following ways:
  - Issue tracking tools such as Jira, TAPD, GitHub, etc.
  - Incident or Service Monitoring tools such as PagerDuty, ServiceNow, etc.

<b>Transformation Rules Required</b>

This metric relies on:
- Deployment configuration in Jenkins, GitLab, GitHub or BitBucket transformation rules to let DevLake know which CI builds/jobs can be regarded as `Deployments`.
- Incident configuration in Jira, GitHub or TAPD transformation rules to let DevLake know which issues can be regarded as `Incidents`.

<b>SQL Queries</b>

If you want to measure the monthly trend of change failure rate, run the following SQL in Grafana.

![](/img/Metrics/cfr-monthly.jpeg)

```
with _deployments as (
-- get the deployments in each month
	SELECT
	  date_format(ct.finished_date,'%y/%m') as month,
		ct.id AS deployment_id
	FROM
		cicd_tasks ct
		join project_mapping pm on ct.cicd_scope_id = pm.row_id
	WHERE
	  pm.project_name in ($project)
		and type = 'DEPLOYMENT'
		and result = 'SUCCESS'
		and environment = 'PRODUCTION'
),

_incidents as (
-- get the incidents (caused by deployments) that are created within the selected time period in the top-right corner
	SELECT
		date_format(i.created_date,'%y/%m') as month,
		i.id AS incident_id,
		pim.deployment_id
	FROM
		issues  i
	  join project_issue_metrics pim on i.id = pim.id
	WHERE
	  pim.project_name in ($project) and
		i.type = 'INCIDENT'
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
),

_deployment_failures as (
-- calculate the number of incidents caused by each deployment
  SELECT 
		distinct
			cm.month,
			d.deployment_id,
			count(distinct i.incident_id) as incident_count
  FROM 
  	_calendar_months cm
  	left join _deployments d on cm.month = d.month
  	left join _incidents i on d.deployment_id = i.deployment_id
	GROUP BY 1,2
)

SELECT
  month,
	case when 
		count(deployment_id) is null then null
		else count(case when incident_count = 0 then null else incident_count end)/count(deployment_id) end as change_failure_rate
FROM _deployment_failures
GROUP BY 1
ORDER BY 1
```

If you want to measure in which category your team falls into, run the following SQL in Grafana.

![](/img/Metrics/cfr-text.jpeg)

```
with _deployments as (
-- get the deployment deployed within the selected time period in the top-right corner
	SELECT
		ct.id AS deployment_id,
		ct.finished_date as deployment_finished_date
	FROM
		cicd_tasks ct
		join project_mapping pm on ct.cicd_scope_id = pm.row_id
	WHERE
	  pm.project_name in ($project)
		and type = 'DEPLOYMENT'
		and result = 'SUCCESS'
		and environment = 'PRODUCTION'
    and $__timeFilter(finished_date)
),

_incident_caused_by_deployments as (
-- get the incidents (caused by deployments) that are created within the selected time period in the top-right corner
	SELECT
		i.id AS incident_id,
		pim.deployment_id
	FROM
		issues  i
	  join project_issue_metrics pim on i.id = pim.id
	WHERE
	  pim.project_name in ($project) and
		i.type = 'INCIDENT'
		and $__timeFilter(i.created_date)
),

_deployment_failures as (
-- calculate the number of incidents caused by each deployment
  SELECT 
		distinct
			d.deployment_id,
			d.deployment_finished_date,
			count(distinct i.incident_id) as incident_count
  FROM 
  	_deployments d
  	left join _incident_caused_by_deployments i on d.deployment_id = i.deployment_id
	GROUP BY 1,2
),

_change_failure_rate as (
	SELECT 
		case when count(deployment_id) is null then null
		else count(case when incident_count = 0 then null else 1 end)/count(deployment_id) end as change_failure_rate
	FROM
		_deployment_failures
)

SELECT
	case  
		when change_failure_rate <= .15 then "0-15%"
		when change_failure_rate <= .20 then "16%-20%"
		when change_failure_rate <= .30 then "21%-30%"
		else "> 30%" 
	end as change_failure_rate
FROM 
	_change_failure_rate
```

## How to improve?
- Add unit tests for all new feature
- "Shift left", start QA early and introduce more automated tests
- Enforce code review if it's not strictly executed
