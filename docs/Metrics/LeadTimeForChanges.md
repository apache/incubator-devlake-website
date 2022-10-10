---
title: "DORA - Lead Time for Changes"
description: >
  DORA - Lead Time for Changes
sidebar_position: 19
---

## What is this metric? 
The median amount of time for a commit to be deployed into production.

## Why is it important?
This metric measures the time it takes to commit code to the production environment and reflects the speed of software delivery. A lower average change preparation time means that your team is efficient at coding and deploying your project.

## Which dashboard(s) does it exist in
DORA dashboard. See [live demo](https://grafana-lake.demo.devlake.io/grafana/d/qNo8_0M4z/dora?orgId=1).


## How is it calculated?
This metric can be calculated in two ways:
- If a deployment can be linked to PRs, then the lead time for changes of a deployment is the average cycle time of its associated PRs. For instance,
   - Compared to the previous deployment `deploy-1`, `deploy-2` deployed three new commits `commit-1`, `commit-2` and `commit-3`.
   - `commit-1` is linked to `pr-1`, `commit-2` is linked to `pr-2` and `pr-3`, `commit-3` is not linked to any PR. Then, `deploy-2` is associated with `pr-1`, `pr-2` and `pr-3`.
   - `Deploy-2`'s lead time for changes = average cycle time of `pr-1`, `pr-2` and `pr-3`.
- If a deployment can't be linked to PRs, then the lead time for changes is computed based on its associated commits. For instance,
   - Compared to the previous deployment `deploy-1`, `deploy-2` deployed three new commits `commit-1`, `commit-2` and `commit-3`.
   - None of `commit-1`, `commit-2` and `commit-3` is linked to any PR. 
   - Calculate each commit's lead time for changes, which equals to `deploy-2`'s deployed_at - commit's authored_date
   - `Deploy-2`'s Lead time for changes = average lead time for changes of `commit-1`, `commit-2` and `commit-3`.

Below are the benchmarks for different development teams from Google's report. However, it's difficult to tell which group a team falls into when the team's median lead time for changes is `between one week and one month`. Therefore, DevLake provides its own benchmarks to address this problem:

| Groups           | Benchmarks                           | DevLake Benchmarks 
| -----------------| -------------------------------------| --------------------------------|
| Elite performers | Less than one hour                   | Less than one hour              |
| High performers  | Between one day and one week         | Less than one week              |
| Medium performers| Between one month and six months     | Between one week and six months |
| Low performers   | More than six months                 | More than six months            |

<p><i>Source: 2021 Accelerate State of DevOps, Google</i></p>

<b>Data Sources Required</b>

This metric relies on deployments collected in multiple ways:
- Open APIs of Jenkins, GitLab, GitHub, etc.
- Webhook for general CI tools.
- Releases and PR/MRs from GitHub, GitLab APIs, etc.

<b>Transformation Rules Required</b>

This metric relies on the deployment configuration in Jenkins, GitLab or GitHub transformation rules to let DevLake know what CI builds/jobs can be regarded as deployments.

<b>SQL Queries</b>

If you want to measure the monthly trend of median lead time for changes as the picture shown below, run the following SQL in Grafana.

![](/img/Metrics/lead-time-for-changes-monthly.jpeg)

```
with _deployment_change_lead_time as (
-- to get each deployment's change lead time
	SELECT
		ct.id as deployment_id,
		ct.name as deployment_name,
		date_format(ct.finished_date,'%y/%m') as month,
		avg(pr.change_timespan) as change_lead_time_of_a_deployment
	FROM
		cicd_tasks ct 
		join cicd_pipeline_commits cpc on ct.pipeline_id = cpc.pipeline_id
		join pull_requests pr on cpc.commit_sha = pr.merge_commit_sha
	WHERE
		ct.type = 'DEPLOYMENT'
		and ct.result = 'success'
		and $__timeFilter(ct.finished_date)
	GROUP BY 1,2,3
),

_find_median_clt_each_month as (
	SELECT 
		x.month, x.change_lead_time_of_a_deployment
	from _deployment_change_lead_time x join _deployment_change_lead_time y on x.month = y.month
	WHERE x.change_lead_time_of_a_deployment is not null and y.change_lead_time_of_a_deployment is not null
	GROUP BY x.month, x.change_lead_time_of_a_deployment
	HAVING SUM(SIGN(1-SIGN(y.change_lead_time_of_a_deployment-x.change_lead_time_of_a_deployment)))/COUNT(*) > 0.5
),

_find_clt_rank_each_month as (
	SELECT
		*,
		rank() over(PARTITION BY month ORDER BY change_lead_time_of_a_deployment) as _rank 
	FROM
		_find_median_clt_each_month
),

_clt as (
	SELECT
		month,
		change_lead_time_of_a_deployment as med_change_lead_time
	from _find_clt_rank_each_month
	WHERE _rank = 1
),

_calendar_months as(
-- to	deal with the month with no incidents
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
		when _clt.med_change_lead_time is null then 0 
		else _clt.med_change_lead_time/60 end as med_change_lead_time_in_hour
FROM 
	_calendar_months cm
	left join _clt on cm.month = _clt.month
ORDER BY 1
```

If you want to measure in which category your team falls into as the picture shown below, run the following SQL in Grafana.

![](/img/Metrics/lead-time-for-changes-text.jpeg)

```
with _deployment_change_lead_time as (
-- get one deployment's change lead time
	SELECT
		ct.id as deployment_id,
		ct.name as deployment_name,
		ct.finished_date as deployed_at,
		avg(pr.change_timespan) as change_lead_time_of_a_deployment
	FROM
		cicd_tasks ct 
		join cicd_pipeline_commits cpc on ct.pipeline_id = cpc.pipeline_id
		join pull_requests pr on cpc.commit_sha = pr.merge_commit_sha
	WHERE
		ct.type = 'DEPLOYMENT'
		and ct.result = 'success'
		and $__timeFilter(ct.finished_date)
	GROUP BY 1,2,3
),

_median_change_lead_time as (
	SELECT x.change_lead_time_of_a_deployment as median_change_lead_time from _deployment_change_lead_time x, _deployment_change_lead_time y
	WHERE x.change_lead_time_of_a_deployment is not null and y.change_lead_time_of_a_deployment is not null
	GROUP BY x.change_lead_time_of_a_deployment
	HAVING SUM(SIGN(1-SIGN(y.change_lead_time_of_a_deployment-x.change_lead_time_of_a_deployment)))/COUNT(*) > 0.5
	LIMIT 1
)

SELECT 
  CASE
    WHEN median_change_lead_time < 60 then "Less than one hour"
    WHEN median_change_lead_time < 7 * 24 * 60 then "Less than one week"
    WHEN median_change_lead_time < 180 * 24 * 60 then "Between one week and six months"
    ELSE "More than six months"
    END as median_change_lead_time
FROM _median_change_lead_time
```

## How to improve?
- Break requirements into smaller, more manageable deliverables
- Optimize the code review process
- "Shift left", start QA early and introduce more automated tests
- Integrate CI/CD tools to automate the deployment process
