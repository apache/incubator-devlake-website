---
title: "Code Quality Code"
description: >
  Code Quality Code
sidebar_position: 39
---

## What is this metric?

It includes the number of lines of code, number of bugs, vulnerabilities, code smells, security hotspots, test coverage percentage, and duplication percentage.

## Why is it important?

It summarizes and analyzes the file metrics in SonarQube, which can help understand the quality status of the project. These indicators can be used to evaluate the code quality of the project, find out potential problems and fix them, and improve the maintainability and reliability of the code. readability and reliability. It helps teams better manage and maintain a project's codebase.

## Which dashboard(s) does it exist in?

- [SonarQube](https://devlake.apache.org/livedemo/DataSources/SonarQube)

## How is it calculated?

This SQL query selects several metrics for each file in SonarQube, including the number of lines of code, number of bugs, vulnerabilities, code smells, security hotspots, test coverage percentage, and duplication percentage.

The "file_name" column represents the name of the file being analyzed. The "num_of_lines" column shows the total number of lines in the file. The "bugs", "vulnerabilities", and "code_smells" columns represent the number of each type of issue found in the file. The "security_hotspots" column shows the number of security hotspots detected in the file.

The "coverage" column displays the test coverage percentage for the file. The "duplicated_lines_density" column represents the percentage of duplicated lines in the file.

<b>Data Sources Required</b>

This metric relies on file metrics collected from SonarQube.

<b>Data Transformation Required</b>

N/A
