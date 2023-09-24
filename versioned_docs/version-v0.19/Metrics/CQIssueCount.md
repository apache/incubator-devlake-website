---
title: "Code Quality Issue Count"
description: >
  Code Quality Issue Count
sidebar_position: 30
---

## What is this metric?

This metric is a the total number of issues found in a project by SonarQube. It includes various types of issues such as bugs, vulnerabilities, code smells, and security hotspots. This metric is collected from SonarQube, check [this doc](https://docs.sonarqube.org/latest/user-guide/metric-definitions/#issues) for detailed definition.

## Why is it important?

Issue provides information about potential problems or issues in the code. Issues can include bugs, vulnerabilities, and code smells, which can all affect the maintainability, reliability, and security of the codebase. By identifying and addressing issues, developers can improve the quality of their code and reduce technical debt. Additionally, tracking issues over time can help to identify trends and measure progress in improving code quality.

## Which dashboard(s) does it exist in?

- [SonarQube](/livedemo/DataSources/SonarQube)

## How is it calculated?

This metric is calculated by counting the total number of cq_issues.

<b>Data Sources Required</b>

This metric relies on issues collected from SonarQube.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find issues in specific projects, eg. 'project1' and 'project2'.

1. To get the issue count of 'BUG', please add the condition `type = BUG`

```
SELECT
  count(*) as 'Bugs'
FROM cq_issues
WHERE
  $__timeFilter(created_date)
  and  project_key in ('project1', 'project2')
  and `type` = 'BUG'
ORDER BY created_date
```

2. To get the issue count of 'VULNERABILITY', please add the condition `type = VULNERABILITY`

```
SELECT
  count(*) as 'Vulnerabilities'
FROM cq_issues
WHERE
  $__timeFilter(created_date)
  and project_key in ('project1', 'project2')
  and `type` = 'VULNERABILITY'
ORDER BY created_date
```

3. To get the issue count of 'HOTSPOTS', please add the condition `type = HOTSPOTS`

```
SELECT
  COUNT(IF(status = 'TO_REVIEW', 1, NULL)) AS 'Security Hotspots'
FROM cq_issues
WHERE
  $__timeFilter(created_date)
  and project_key in ('project1', 'project2')
  and `type` = 'HOTSPOTS'
ORDER BY created_date
```

```
SELECT
  CONCAT(ROUND(COUNT(IF(status != 'TO_REVIEW', 1, NULL)) / COUNT(*) * 100, 2), '%') AS 'Reviewed'
FROM cq_issues
WHERE
  $__timeFilter(created_date)
  and project_key in ('project1', 'project2')
  and `type` = 'HOTSPOTS'
ORDER BY created_date
```

4. To get the issue count of 'CODE_SMELL', please add the condition `type = CODE_SMELL`

```
SELECT
	COUNT(if(type = 'CODE_SMELL', 1, null)) as 'Code Smells'
FROM cq_issues
WHERE
  $__timeFilter(created_date)
  and project_key in ('project1', 'project2')
```

![](/img/Metrics/issue-type-count.png)
