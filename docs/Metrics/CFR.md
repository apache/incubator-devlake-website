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

When there are multiple deployments triggered by one pipeline, tools like GitLab and BitBucket will generate more than one deployment. In these cases, DevLake will consider these deployments as ONE deployment and use the last deployment's finished date as the deployment finished date.

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

If you want to measure the monthly trend of Change Failure Rate, run the following SQL in Grafana.

![](/img/Metrics/cfr-monthly.jpeg)

```
-- Metric 4: change failure rate per month
with _deployments as (
-- When deploying multiple commits in one pipeline, GitLab and BitBucket may generate more than one deployment. However, DevLake consider these deployments as ONE production deployment and use the last one's finished_date as the finished date.
	SELECT
		cdc.cicd_deployment_id as deployment_id,
		max(cdc.finished_date) as deployment_finished_date
	FROM 
		cicd_deployment_commits cdc
		JOIN project_mapping pm on cdc.cicd_scope_id = pm.row_id and pm.`table` = 'cicd_scopes'
	WHERE
		pm.project_name in ($project)
		and cdc.result = 'SUCCESS'
		and cdc.environment = 'PRODUCTION'
	GROUP BY 1
	HAVING $__timeFilter(max(cdc.finished_date))
),

_failure_caused_by_deployments as (
-- calculate the number of incidents caused by each deployment
	SELECT
		d.deployment_id,
		d.deployment_finished_date,
		count(distinct case when i.type = 'INCIDENT' then d.deployment_id else null end) as has_incident
	FROM
		_deployments d
		left join project_issue_metrics pim on d.deployment_id = pim.deployment_id
		left join issues i on pim.id = i.id
	GROUP BY 1,2
),

_change_failure_rate_for_each_month as (
	SELECT 
		date_format(deployment_finished_date,'%y/%m') as month,
		case 
			when count(deployment_id) is null then null
			else sum(has_incident)/count(deployment_id) end as change_failure_rate
	FROM
		_failure_caused_by_deployments
	GROUP BY 1
)

SELECT 
	cm.month,
	cfr.change_failure_rate
FROM 
	calendar_months cm
	LEFT JOIN _change_failure_rate_for_each_month cfr on cm.month = cfr.month
	WHERE $__timeFilter(month_timestamp)
```

If you want to measure in which category your team falls, run the following SQL in Grafana.

![](/img/Metrics/cfr-text.jpeg)

```
with _deployments as (
-- When deploying multiple commits in one pipeline, GitLab and BitBucket may generate more than one deployment. However, DevLake consider these deployments as ONE production deployment and use the last one's finished_date as the finished date.
	SELECT
		cdc.cicd_deployment_id as deployment_id,
		max(cdc.finished_date) as deployment_finished_date
	FROM 
		cicd_deployment_commits cdc
		JOIN project_mapping pm on cdc.cicd_scope_id = pm.row_id
	WHERE
		pm.project_name in ($project)
		and cdc.result = 'SUCCESS'
		and cdc.environment = 'PRODUCTION'
	GROUP BY 1
	HAVING $__timeFilter(max(cdc.finished_date))
),

_failure_caused_by_deployments as (
-- calculate the number of incidents caused by each deployment
	SELECT
		d.deployment_id,
		d.deployment_finished_date,
		count(distinct case when i.type = 'INCIDENT' then d.deployment_id else null end) as has_incident
	FROM
		_deployments d
		left join project_issue_metrics pim on d.deployment_id = pim.deployment_id
		left join issues i on pim.id = i.id
	GROUP BY 1,2
),

_change_failure_rate as (
	SELECT 
		case 
			when count(deployment_id) is null then null
			else sum(has_incident)/count(deployment_id) end as change_failure_rate
	FROM
		_failure_caused_by_deployments
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
