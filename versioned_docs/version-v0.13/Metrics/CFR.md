---
title: "DORA - Change Failure Rate(WIP)"
description: >
  DORA - Change Failure Rate
sidebar_position: 21
---

## What is this metric? 
The percentage of changes that were made to a code that then resulted in incidents, rollbacks, or any type of production failure.

## Why is it important?
Unlike Deployment Frequency and Lead Time for Changes that measure the throughput, Change Failure Rate measures the stability and quality of software delivery. A low CFR reflects a bad end-user experience as the production failure is relatively high.

## Which dashboard(s) does it exist in
N/A


## How is it calculated?
The number of failures per the number of deployments. For example, if there are five deployments in a day and one causes a failure, that is a 20% change failure rate.

As you can see, there is not much distinction between performance benchmarks for CFR:

| Groups           | Benchmarks      |
| -----------------| ----------------|
| Elite performers | 0%-15%          |
| High performers  | 16%-30%         |
| Medium performers| 16%-30%         |
| Low performers   | 16%-30%         |

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
- Add unit tests for all new feature
- "Shift left", start QA early and introduce more automated tests
- Enforce code review if it's not strictly executed
