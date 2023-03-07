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

This SQL query calculates the total technical debt in days for all issues in the SonarQube instance. Technical debt represents the amount of additional effort that is required to fix all the issues in a project. It is measured in terms of time (days, hours, etc.) that it would take to fix all the issues. The query uses the "debt" field in the "cq_issues" table to sum up the total debt for all issues, and then converts it into days by dividing the total debt by 8 hours (8 \* 60 minutes). The result is a string that shows the total debt in days.

<b>Data Sources Required</b>

This metric relies on issues collected from SonarQube.

<b>Data Transformation Required</b>

N/A
