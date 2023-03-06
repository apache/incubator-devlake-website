---
title: "Code Quality Test"
description: >
  Code Quality Test
sidebar_position: 34
---

## What is this metric?

Statistics on test coverage of code file.

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
