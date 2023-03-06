---
title: "Code Quality Maintainability-CodeSmell"
description: >
  Code Quality Maintainability-CodeSmell
sidebar_position: 36
---

## What is this metric?

Statistics on the number of CODE_SMELL type Issues.

## Why is it important?

CODE_SMELL is a type of issue that represents a potential problem in the code that does not necessarily cause a functional error or bug, but may lead to other issues or make the code difficult to maintain, read or understand. Code smells are often caused by violations of best practices or established coding standards, such as complex or duplicated code, long methods or classes, or inconsistent naming conventions. Identifying and fixing code smells can improve the overall quality, maintainability, and reliability of the code, and reduce the risk of introducing bugs or errors in the future.

## Which dashboard(s) does it exist in?

- [SonarQube](https://devlake.apache.org/livedemo/DataSources/SonarQube)

## How is it calculated?

This metric is calculated by counting the total number of cq_issues under the `type=CODE_SMELL` condition.

<b>Data Sources Required</b>

This metric relies on issues collected from SonarQube.

<b>Data Transformation Required</b>

N/A
