---
title: "Code Quality Maintainability-Debt"
description: >
  Code Quality Maintainability-Debt
sidebar_position: 35
---

## What is this metric?

Statistics on the number of debt type Issues.

## Why is it important?

Debt represents the total amount of technical debt found by developers in the project, which is calculated through a series of code analysis indicators (such as code duplication, code complexity, code coverage, code comment rate, etc.).

## Which dashboard(s) does it exist in?

- [SonarQube](/livedemo/DataSources/SonarQube)

## How is it calculated?

This SQL query calculates the total technical debt in days for all issues in the SonarQube instance. Technical debt represents the amount of additional effort that is required to fix all the issues in a project. It is measured in terms of time (days, hours, etc.) that it would take to fix all the issues. The query uses the "debt" field in the "cq_issues" table to sum up the total debt for all issues, and then converts it into days by dividing the total debt by 8 hours (8 \* 60 minutes). The result is a string that shows the total debt in days.

<b>Data Sources Required</b>

This metric relies on issues collected from SonarQube.

<b>Data Transformation Required</b>

N/A
