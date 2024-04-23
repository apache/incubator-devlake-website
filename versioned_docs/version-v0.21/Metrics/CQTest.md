---
title: "Code Quality Test"
description: >
  Code Quality Test
sidebar_position: 31
---

## What is this metric?

This metric is the number of unit tests that have been executed against the code. This metric is collected from SonarQube, check [this doc](https://docs.sonarqube.org/latest/user-guide/metric-definitions/#tests) for detailed definition.

## Why is it important?

Test is an indicator used to indicate the test coverage of the code. This means that SonarQube checks that your code contains enough test cases to cover the various paths and branches in your code. This metric can help you understand the extent of your code test coverage, thereby determining your code quality and stability.

## Which dashboard(s) does it exist in?

- [SonarQube](/livedemo/DataSources/SonarQube)

## How is it calculated?

This SQL query retrieves the test coverage percentage for the lines to cover in a project from the cq_file_metrics table in SonarQube. The query calculates the percentage by subtracting the number of uncovered lines from the total number of lines to cover, then dividing the result by the total number of lines to cover, and multiplying by 100. The result is rounded to one decimal point and displayed as a percentage. Additionally, the query also includes a message that shows the total number of lines to cover in thousands.

<b>Data Sources Required</b>

This metric relies on file_metrics collected from SonarQube.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find unit tests that have been executed against the code in specific projects, eg. 'project1' and 'project2'.

```
SELECT
  CONCAT(ROUND((sum(lines_to_cover) - sum(uncovered_lines)) / sum(lines_to_cover) * 100, 1), '% ', 'Coverage on ', ROUND(sum(lines_to_cover) / 1000, 0),'k Lines to cover')
FROM cq_file_metrics
WHERE
  project_key in ('project1', 'project2')
```
