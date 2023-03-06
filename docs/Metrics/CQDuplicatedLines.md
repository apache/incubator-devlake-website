---
title: "Code Quality Duplicated Lines"
description: >
  Code Quality Duplicated Lines
sidebar_position: 38
---

## What is this metric?

Duplicated Lines is a code metric that measures the amount of duplicated code in a project.

## Why is it important?

Duplicated lines are individual lines of code that are identical or nearly identical to each other, and can occur within a single file or across multiple files. Duplicated code can make the codebase harder to maintain, increase the risk of bugs and errors, and make it more difficult to understand and modify the code. Identifying and removing duplicated code can improve the maintainability, reliability, and readability of the codebase, and reduce the risk of introducing bugs or errors in the future.

## Which dashboard(s) does it exist in?

- [SonarQube](/livedemo/DataSources/SonarQube)

## How is it calculated?

This SQL query calculates the percentage of duplicated lines in a project, as well as the total number of lines in the project.
The sum(duplicated_lines) represents the total number of duplicated lines in the project, while sum(num_of_lines) represents the total number of lines of code. These two values are divided and multiplied by 100 to get the percentage of duplicated lines in the project.

<b>Data Sources Required</b>

This metric relies on file metrics collected from SonarQube.

<b>Data Transformation Required</b>

N/A
