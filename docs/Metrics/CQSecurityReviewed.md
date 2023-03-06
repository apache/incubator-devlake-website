---
title: "Code Quality Security Reviewed"
description: >
  Code Quality Security Reviewed
sidebar_position: 33
---

## What is this metric?

Statistics on the number of Security Hotspots type Issues.

## Why is it important?

Security Reviewed is an indicator in SonarQube that tracks security-related code issues that have been evaluated by developers. These issues can be potential vulnerabilities or other security issues in the code that need to be properly noted and fixed. By evaluating these issues, developers can determine which problems need to be fixed, and can safely ignore those that do not pose a security threat. The Security Reviewed metric helps teams understand the number and proportion of security-related issues that have been evaluated, and the team's progress in fixing them. This can help teams better protect their applications from security threats.

## Which dashboard(s) does it exist in?

- [SonarQube](https://devlake.apache.org/livedemo/DataSources/SonarQube)

## How is it calculated?

This metric is calculated by counting the total number of cq_issues under the `type=HOTSPOTS` and `status!=TO_REVIEW` condition.

<b>Data Sources Required</b>

This metric relies on issues collected from SonarQube.

<b>Data Transformation Required</b>

N/A
