---
title: "Build Count"
description: >
  Build Count
sidebar_position: 15
---

## What is this metric? 
The number of successful builds.

## Why is it important?
1. As a process indicator, it reflects the value flow efficiency of upstream production and research links
2. Identify excellent/to-be-improved practices that impact the build, and drive the team to precipitate reusable tools and mechanisms to build infrastructure for fast and high-frequency delivery

## Which dashboard(s) does it exist in
- Jenkins


## How is it calculated?
This metric is calculated by counting the number of successful CI builds/pipelines/runs in the given data range.

<b>Data Sources Required</b>

This metric relies on CI builds/pipelines/runs collected from Jenkins, GitLab or GitHub.

<b>Transformation Rules Required</b>

N/A

## How to improve?
1. From the project dimension, compare the number of builds and success rate by combining the project phase and the complexity of tasks.
2. From the time dimension, analyze the trend of the number of builds and success rate to see if it has improved over time.
