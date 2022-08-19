---
title: "Bug Count per 1k Lines of Code"
description: >
  Bug Count per 1k Lines of Code
sidebar_position: 12
---

## What is this metric? 
Amount of bugs per 1,000 lines of code.

## Why is it important?
1. Defect drill-down analysis to inform the development of design and code review strategies and to improve the internal QA process
2. Assist teams to locate projects/modules with higher defect severity and density, and clean up technical debts
3. Analyze critical points, identify good/to-be-improved practices that affect defect count or defect rate, to reduce the amount of future defects

## Which dashboard(s) does it exist in
N/A


## How is it calculated?
The number of bugs divided by total accumulated lines of code (additions + deletions) in the given data range.

<b>Data Sources Required</b>

This metric relies on 
- issues collected from Jira, GitHub or TAPD.
- commits collected from GitHub, GitLab or BitBucket.

<b>Transformation Rules Required</b>

This metric relies on
- "Issue type mapping" in Jira, GitHub or TAPD's transformation rules page to let DevLake know what type(s) of issues can be regarded as bugs.
- "PR-Issue Mapping" in GitHub, GitLab's transformation rules page to let DevLake know the bugs are fixed by which PR/MRs.


## How to improve?
1. From the project or team dimension, observe the statistics on the total number of defects, the distribution of the number of defects in each severity level/type/owner, the cumulative trend of defects, and the change trend of the defect rate in thousands of lines, etc.
2. From version cycle dimension, observe the statistics on the cumulative trend of the number of defects/defect rate, which can be used to determine whether the growth rate of defects is slowing down, showing a flat convergence trend, and is an important reference for judging the stability of software version quality
3. From the time dimension, analyze the trend of the number of test defects, defect rate to locate the key items/key points
4. Evaluate whether the software quality and test plan are reasonable by referring to CMMI standard values
