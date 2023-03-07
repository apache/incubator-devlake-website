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

This metric is calculated by counting the total number of cq_issues under the `type=VULNERABILITY` condition.

<b>Data Sources Required</b>

This metric relies on issues collected from SonarQube.

<b>Data Transformation Required</b>

N/A
