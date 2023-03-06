---
title: "Code Quality Security"
description: >
  Code Quality Security
sidebar_position: 31
---

## What is this metric?

Statistics on the number of Vulnerability Issues and the proportion of reviewed Vulnerability issues.

## Why is it important?

Security is a metric used to measure security issues in code. This includes various bugs, weaknesses and risks present in the code. It analyzes your code using a built-in set of security rules to detect code patterns that may lead to security issues. These rules help teams identify potential security vulnerabilities so they can be detected and resolved early to improve code security and quality.

## Which dashboard(s) does it exist in?

- [SonarQube](/livedemo/DataSources/SonarQube)

## How is it calculated?

This metric is calculated by counting the total number of cq_issues under the `type=VULNERABILITY` condition.

<b>Data Sources Required</b>

This metric relies on issues collected from SonarQube.

<b>Data Transformation Required</b>

N/A
