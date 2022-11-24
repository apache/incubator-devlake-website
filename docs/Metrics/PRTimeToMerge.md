---
title: "PR Time To Merge"
description: >
  PR Time To Merge
sidebar_position: 19
---

## What is this metric? 
The time it takes from when a PR is issued to when it is merged. Essentially, PR Time to Merge = PR Pickup Time + PR Review Time.

## Why is it important?
The delay of reviewing and waiting to review PRs has large impact on delivery speed, while reasonably short PR Time to Merge can indicate frictionless teamwork. Improving on this metric is the key to reduce PR cycle time.

## Which dashboard(s) does it exist in?
- [GitHub](../../../livedemo/DataSources/GitHub)
- [Weekly Community Retro](../../../livedemo/OSSMaintainers/WeeklyCommunityRetro)


## How is it calculated?
<b>Data Sources Required</b>

This metric relies on PRs/MRs collected from GitHub, GitLab, BitBucket, Gitee or other code review tools.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find the `mean time to merge of PRs` in specific repositories and given time range.

![](/img/Metrics/pr-time-to-merge-text.png)

```
SELECT
	avg(TIMESTAMPDIFF(Minute,created_date,merged_date)/1440)
FROM 
	pull_requests
WHERE 
  -- $__timeFilter will take Grafana's time range
  $__timeFilter(created_date)
  -- please replace the repo ids with your own, or create a '$repo_id' variable in Grafana
	and base_repo_id in ('repo_1', 'repo_2')
	and merged_date is not null
```

If you want to measure the monthly trend of `PR time to merge` in the screenshot below, please run the following SQL in Grafana. 

![](/img/Metrics/pr-time-to-merge-monthly.png)

```
with _prs as(
  SELECT
    DATE_ADD(date(created_date), INTERVAL -DAY(date(created_date))+1 DAY) as time,
    avg(TIMESTAMPDIFF(Minute,created_date,merged_date)/1440) as time_to_merge
  FROM pull_requests
  WHERE
    $__timeFilter(created_date)
    -- the following condition will remove the month with incomplete data
    and created_date >= DATE_ADD(DATE_ADD($__timeFrom(), INTERVAL -DAY($__timeFrom())+1 DAY), INTERVAL +1 MONTH)
    -- please replace the repo ids with your own, or create a '$repo_id' variable in Grafana
	  and base_repo_id in ('repo_1', 'repo_2')
  GROUP BY 1
)

SELECT 
  date_format(time,'%M %Y') as month,
  time_to_merge as "Time to Merge"
FROM _prs
ORDER BY time
```

## How to improve?
1. Use DevLake's dashboards to monitor your delivery progress;
2. Have a habit to check for hanging PRs regularly;
3. Set up alerts for your communication tools (e.g. Slack, Lark) when new PRs are issued;
4. Reduce PR size;
5. Analyze the causes for long reviews.
