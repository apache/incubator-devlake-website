---
title: "Code Quality Duplicated Blocks"
description: >
  Code Quality Duplicated Blocks
sidebar_position: 37
---

## What is this metric?

Duplicated Blocks is a code metric that measures the amount of duplicated code in a project.

## Why is it important?

Duplicated Blocks is a code metric that measures the amount of duplicated code in a project. Duplicated blocks are sequences of code that are identical or nearly identical to each other, and can occur within a single file or across multiple files. Duplicated code can make the codebase harder to maintain, increase the risk of bugs and errors, and make it more difficult to understand and modify the code. Identifying and removing duplicated code can improve the maintainability, reliability, and readability of the codebase, and reduce the risk of introducing bugs or errors in the future.

## Which dashboard(s) does it exist in?

- [SonarQube](https://devlake.apache.org/livedemo/DataSources/SonarQube)

## How is it calculated?

This metric is calculated by counting the total number of duplicated_blocks.

<b>Data Sources Required</b>

This metric relies on file metrics collected from SonarQube.

<b>Data Transformation Required</b>

N/A
