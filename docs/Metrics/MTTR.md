---
title: "DORA - Mean Time to Restore Service"
description: >
  DORA - Mean Time to Restore Service
sidebar_position: 20
---

## What is this metric? 
The time to restore service after service incidents, rollbacks, or any type of production failure happened.

## Why is it important?
This metric is essential to measure the disaster control capability of your team and the robustness of the software.

## Which dashboard(s) does it exist in
N/A


## How is it calculated?
MTTR = Total [incident age](./IncidentAge.md) (in hours)/number of incidents.

If you have three incidents that happened in the given data range, one lasting 1 hour, one lasting 2 hours and one lasting 3 hours. Your MTTR will be: (1 + 2 + 3) / 3 = 2 hours.

Below are the benchmarks for different development teams:

| Groups           | Benchmarks                           |
| -----------------| -------------------------------------|
| Elite performers | Less than one hour                   |
| High performers  | Less one day                         |
| Medium performers| Between one day and one week         |
| Low performers   | More than six months                 |

<i>Source: 2021 Accelerate State of DevOps, Google</i>

<b>Data Sources Required</b>

This metric relies on:
- `Deployments` collected in one of the following ways:
  - Open APIs of Jenkins, GitLab, GitHub, etc.
  - Webhook for general CI tools.
  - Releases and PR/MRs from GitHub, GitLab APIs, etc.
- `Incidents` collected in one of the following ways:
  - Issue tracking tools such as Jira, TAPD, GitHub, etc.
  - Bug or Service Monitoring tools such as PagerDuty, Sentry, etc.
  - CI pipelines that marked the 'failed' deployments.

<b>Transformation Rules Required</b>

This metric relies on:
- Deployment configuration in Jenkins, GitLab or GitHub transformation rules to let DevLake know what CI builds/jobs can be regarded as `Deployments`.
- Incident configuration in Jira, GitHub or TAPD transformation rules to let DevLake know what CI builds/jobs can be regarded as `Incidents`.

## How to improve?
- Use automated tools to quickly report failure
- Prioritize recovery when a failure happens
- Establish a go-to action plan to respond to failures immediately
- Reduce the deployment time for failure-fixing
