---
title: "PR Size"
description: >
  PR Size
sidebar_position: 22
---

## What is this metric? 
The average code changes (in Lines of Code) of PRs in the selected time range.

## Why is it important?
Small PRs can reduce risks of introducing new bugs and increase code review quality, as problems may often be hidden in big chuncks of code and difficult to identify.

## Which dashboard(s) does it exist in?
- Engineering Throughput and Cycle Time
- Engineering Throughput and Cycle Time - Team View


## How is it calculated?
This metric is calculated by counting the total number of code changes (in LOC) divided by the total number of PRs in the selected time range.

<b>Data Sources Required</b>

This metric relies on PR/MRs collected from GitHub or GitLab.

<b>Transformation Rules Required</b>

N/A

<b>SQL Queries</b>


## How to improve?
1. Divide coding tasks into workable and manageable pieces;
1. Encourage developers to submit small PRs and only keep related changes in the same PR.
