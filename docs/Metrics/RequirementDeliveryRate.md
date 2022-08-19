---
title: "Requirement Delivery Rate"
description: >
  Requirement Delivery Rate
sidebar_position: 3
---

## What is this metric? 
The ratio of delivered requirements to all requirements.

## Why is it important?
1. Based on historical data, establish a baseline of the delivery capacity of a single iteration to improve the organization and planning of R&D resources.
2. Evaluate whether the delivery capacity matches the business phase and demand scale. Identify key bottlenecks and reasonably allocate resources.

## Which dashboard(s) does it exist in
- Jira
- GitHub


## How is it calculated?
The number of delivered requirements divided by the total number of requirements in the given data range.

<b>Data Sources Required</b>

This metric relies on the issues collected from Jira, GitHub, or TAPD.

<b>Transformation Rules Required</b>

This metric relies on the 'type-requirement' configuration in Jira, GitHub or TAPD transformation rules to let DevLake know what CI builds/jobs can be regarded as `Requirements`.


## How to improve?
1. Analyze the number of requirements and delivery rate of different time cycles to find the stability and trend of the development process.
2. Analyze and compare the number of requirements delivered and delivery rate of each project/team, and compare the scale of requirements of different projects.
3. Based on historical data, establish a baseline of the delivery capacity of a single iteration (optimistic, probable and pessimistic values) to provide a reference for iteration estimation.
4. Drill down to analyze the number and percentage of requirements in different phases of SDLC. Analyze rationality and identify the requirements stuck in the backlog. 
