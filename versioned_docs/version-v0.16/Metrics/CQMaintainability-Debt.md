---
title: "Code Quality Maintainability-Debt"
description: >
  Code Quality Maintainability-Debt
sidebar_position: 32
---

## What is this metric?

This metric is a measure of effort to fix all code smells. This metric is collected from SonarQube, check [this doc](https://docs.sonarqube.org/latest/user-guide/metric-definitions/#maintainability) for detailed definition.

## Why is it important?

It helps developers and project managers understand the costs and risks associated with maintaining the codebase. High levels of technical debt can lead to more bugs, slower development cycles, and higher maintenance costs over time. By monitoring technical debt and working to reduce it, developers can ensure that their code is easier to maintain, more reliable, and more scalable.

## Which dashboard(s) does it exist in?

- [SonarQube](/livedemo/DataSources/SonarQube)

## How is it calculated?

This SQL query calculates the total technical debt in days for all issues in the SonarQube instance. check [this doc](https://docs.sonarqube.org/latest/user-guide/metric-definitions/#maintainability) for detailed info.

<b>Data Sources Required</b>

This metric relies on issues collected from SonarQube.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find effort to fix all code smells in specific projects, eg. 'project1' and 'project2'.

```
SELECT
  CONCAT(ROUND(SUM(debt) / (8 * 60), 0), ' days') AS 'Debt'
FROM cq_issues
WHERE
  $__timeFilter(created_date)
  project_key in ('project1', 'project2')
```
