---
title: "Code Quality Hotspots"
description: >
  Code Quality Hotspots
sidebar_position: 32
---

## What is this metric?

Statistics on the number of Hotspots type Issues.

## Why is it important?

Hotspots are areas of code that occur frequently in the code and require further inspection. These areas of code are identified as Hotspots, indicating that they are likely to have problems or require code refactoring. It uses several analysis techniques to identify Hotspots, such as code complexity, repeated code blocks, security vulnerabilities, etc. Teams can use these metrics to prioritize code areas for review of these Hotspots to ensure code quality and security.

## Which dashboard(s) does it exist in?

- [SonarQube](https://devlake.apache.org/livedemo/DataSources/SonarQube)

## How is it calculated?

This metric is calculated by counting the total number of cq_issues under the `type=HOTSPOTS` and and `status=TO_REVIEW`condition.

<b>Data Sources Required</b>

This metric relies on issues collected from SonarQube.

<b>Data Transformation Required</b>

N/A
