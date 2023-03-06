---
title: "Code Quality Reliability"
description: >
  Code Quality Reliability
sidebar_position: 30
---

## What is this metric?

Statistics on the number of Bug type Issues.

## Why is it important?

By analyzing these metrics, you can better understand the reliability and quality of your code, and improve your code's stability and maintainability. It helps users identify potential problems and provides optimization suggestions by checking for errors, vulnerabilities, and code smells in the code.

## Which dashboard(s) does it exist in?

- [SonarQube](/livedemo/DataSources/SonarQube)

## How is it calculated?

This metric is calculated by counting the total number of cq_issues under the `type=BUG` condition.

<b>Data Sources Required</b>

This metric relies on issues collected from SonarQube.

<b>Data Transformation Required</b>

N/A
