---
title: "Code Quality Duplicated Blocks"
description: >
  Code Quality Duplicated Blocks
sidebar_position: 33
---

## What is this metric?

This metric is the number of duplicated blocks of lines. This metric is collected from SonarQube, check [this doc](https://docs.sonarqube.org/latest/user-guide/metric-definitions/#duplications) for detailed definition.

## Why is it important?

Duplicated Blocks is a code metric that measures the amount of duplicated code in a project. Duplicated blocks are sequences of code that are identical or nearly identical to each other, and can occur within a single file or across multiple files. Duplicated code can make the codebase harder to maintain, increase the risk of bugs and errors, and make it more difficult to understand and modify the code. Identifying and removing duplicated code can improve the maintainability, reliability, and readability of the codebase, and reduce the risk of introducing bugs or errors in the future.

## Which dashboard(s) does it exist in?

- [SonarQube](/livedemo/DataSources/SonarQube)

## How is it calculated?

This metric is calculated by counting the total number of duplicated_blocks.

<b>Data Sources Required</b>

This metric relies on file metrics collected from SonarQube.

<b>Data Transformation Required</b>

N/A

<b>SQL Queries</b>

The following SQL shows how to find duplicated blocks of lines in specific projects, eg. 'project1' and 'project2'.

```
SELECT
  sum(duplicated_blocks)
FROM cq_file_metrics
WHERE
  project_key in ('project1', 'project2')
```
