---
title: "DORA - Deployment Frequency(WIP)"
description: >
  DORA - Deployment Frequency
sidebar_position: 18
---

## What is this metric? 
How often an organization deploys code to production or release it to end users.

## Why is it important?
Deployment frequency reflects the efficiency of a team's deployment. A team that deploys more frequently can deliver the product faster and users' feature requirements can be met faster.

## Which dashboard(s) does it exist in
N/A


## How is it calculated?
Deployment frequency is calculated based on the number of deployment days, not the number of deployments, e.g.,daily, weekly, monthly, yearly.

| Groups           | Benchmarks                           |
| -----------------| -------------------------------------|
| Elite performers | Multiple times a day                 |
| High performers  | Once a week to once a month          |
| Medium performers| Once a month to once every six months|
| Low performers   | Less than once every six months      |

<p><i>Source: 2021 Accelerate State of DevOps, Google</i></p>


<b>Data Sources Required</b>

This metric relies on deployments collected in multiple ways:
- Open APIs of Jenkins, GitLab, GitHub, etc.
- Webhook for general CI tools.
- Releases and PR/MRs from GitHub, GitLab APIs, etc.

<b>Transformation Rules Required</b>

This metric relies on the deployment configuration in Jenkins, GitLab or GitHub transformation rules to let DevLake know what CI builds/jobs can be regarded as deployments.

## How to improve?
- Trunk development. Work in small batches and often merge their work into shared trunks.
- Integrate CI/CD tools for automated deployment
- Improve automated test coverage
