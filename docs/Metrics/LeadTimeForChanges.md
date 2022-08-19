---
title: "DORA - Lead Time for Changes(WIP)"
description: >
  DORA - Lead Time for Changes
sidebar_position: 19
---

## What is this metric? 
The median amount of time for a commit to be deployed into production.

## Why is it important?
This metric measures the time it takes to commit code to the production environment and reflects the speed of software delivery. A lower average change preparation time means that your team is efficient at coding and deploying your project.

## Which dashboard(s) does it exist in
N/A


## How is it calculated?
This metric can be calculated in two ways:
- If a deployment can be linked to PRs, then the lead time for changes of a deployment is the average cycle time of its associated PRs. For instance,
   - Compared to the previous deployment `deploy-1`, `deploy-2` deployed three new commits `commit-1`, `commit-2` and `commit-3`.
   - `commit-1` is linked to `pr-1`, `commit-2` is linked to `pr-2` and `pr-3`, `commit-3` is not linked to any PR. Then, `deploy-2` is associated with `pr-1`, `pr-2` and `pr-3`.
   - `Deploy-2`'s lead time for changes = average cycle time of `pr-1`, `pr-2` and `pr-3`.
- If a deployment can't be linked to PRs, then the lead time for changes is computed based on its associated commits. For instance,
   - Compared to the previous deployment `deploy-1`, `deploy-2` deployed three new commits `commit-1`, `commit-2` and `commit-3`.
   - None of `commit-1`, `commit-2` and `commit-3` is linked to any PR. 
   - Calculate each commit's lead time for changes, which equals to `deploy-2`'s deployed_at - commit's authored_date
   - `Deploy-2`'s Lead time for changes = average lead time for changes of `commit-1`, `commit-2` and `commit-3`.

Below are the benchmarks for different development teams:

| Groups           | Benchmarks                           |
| -----------------| -------------------------------------|
| Elite performers | Less than one hour                   |
| High performers  | Between one day and one week         |
| Medium performers| Between one month and six months     |
| Low performers   | More than six months                 |

<i>Source: 2021 Accelerate State of DevOps, Google</i>

<b>Data Sources Required</b>

This metric relies on deployments collected in multiple ways:
- Open APIs of Jenkins, GitLab, GitHub, etc.
- Webhook for general CI tools.
- Releases and PR/MRs from GitHub, GitLab APIs, etc.

<b>Transformation Rules Required</b>

This metric relies on the deployment configuration in Jenkins, GitLab or GitHub transformation rules to let DevLake know what CI builds/jobs can be regarded as deployments.

## How to improve?
- Break requirements into smaller, more manageable deliverables
- Optimize the code review process
- "Shift left", start QA early and introduce more automated tests
- Integrate CI/CD tools to automate the deployment process
