---
title: "PR Time To Merge"
description: >
  PR Time To Merge
sidebar_position: 2
---

## What is this metric? 
The time it takes from when a PR is issued to when it is merged. Essentially, PR Time to Merge = PR Pickup Time + PR Review Time.

## Why is it important?
The delay of reviewing and waiting to review PRs has large impact on delivery speed, while reasonably short PR Time to Merge can indicate frictionless teamwork. Improving on this metric is the key to reduce PR cycle time.

## Which dashboard(s) does it exist in?
- GitHub Basic Metrics
- Bi-weekly Community Retro


## How is it calculated?
<b>Data Sources Required</b>
This metric relies on PR/MRs collected from GitHub or GitLab.

<b>Transformation Rules Required</b>
N/A

<b>SQL Queries</b>


## How to improve?
1. Use DevLake's dashboards to monitor your delivery progress;
2. Have a habit to check for hanging PRs regularly;
3. Set up alerts for your communication tools (e.g. Slack, Lark) when new PRs are issued;
4. Reduce PR size;
5. Analyze the causes for long reviews.
