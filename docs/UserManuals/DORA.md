---
title: "DORA"
sidebar_position: 6
description: >
  DORA Metrics
---


This document describes all things about DORA, why and how to implement DORA metrics with Apache DevLake.

## What are DORA metrics?
Created six years ago by a team of researchers, DORA stands for "DevOps Research & Assessment" and is the answer to years of research, having examined thousands of teams, seeking a reliable and actionable approach to understanding the performance of software development teams.

DORA has since become a standardized framework focused on the stability and velocity of development processes, one that avoids the more controversial aspects of productivity measurements and individual performance metrics.

There are two key clusters of data inside DORA: Velocity and Stability. The DORA framework is focused on keeping these two in context with each other, as a whole, rather than as independent variables, making the data more challenging to misinterpret or abuse. 

Within velocity are two core metrics: 
- [Deployment Frequency](https://devlake.apache.org/docs/Metrics/DeploymentFrequency): Number of successful deployments to production, how rapidly is your team releasing to users?
- [Lead Time for Changes](https://devlake.apache.org/docs/Metrics/LeadTimeForChanges): How long does it take from commit to the code running in production? This is important, as it reflects how quickly your team can respond to user requirements.

Naturally, if you are pushing a consistently high tempo, you also want to ensure that the work that is being delivered is reliable, and that downtime and failures are readily recoverable.

Stability is composed of two core metrics:
- [Median Time to Restore Service](https://devlake.apache.org/docs/Metrics/MTTR): How long does it take the team to properly recover from a failure once it is identified?
- [Change Failure Rate](https://devlake.apache.org/docs/Metrics/CFR): How often are your deployments causing a failure?

![](https://i.imgur.com/71EUflb.png)

To make DORA even more actionable, there are some well-established benchmarks providing a simple lens to determine if you are performing at "Elite", "High", "Medium", or "Low" levels. 

## Why is DORA important?
DORA metrics help a team or project measure and improve software development practices to continuously deliver reliable products with user values.


## How to view DORA metrics in Apache DevLake?

It's easy to set up DORA metrics in DevLake. Usually, you can finish it in few steps:
- **Installation**: Install Apache DevLake [in different ways](https://devlake.apache.org/docs/GettingStarted)
- **Collect data**: Collect data via blueprint
    - In the blueprint, select the data you wish to collect, and make sure you have selected the data required for DORA metrics
    - Configure DORA-related transformation rules to define `deployments` and `incidents`
    - Select a sync frequency for your data, save and run the blueprint.
- **View DORA Dashboard**: DevLake provides a built-in DORA dashboard. You can see the screenshot below or go to the [live demo](https://grafana-lake.demo.devlake.io/grafana/d/qNo8_0M4z/dora?orgId=1) to play around.
![DORA Dashboard](https://i.imgur.com/y1pUIsk.png)

DevLake now supports Jenkins, GitHub Action and GitLabCI as data sources for `deployments` data; Jira, GitHub issues and TAPD as the sources for `incidents` data; Github PRs, GitLab MRs as the sources for `changes` data. You can simply follow the instructions in the Blueprint to set them up.

However, if your CI/CD tools are not listed on the [supported data sources](https://devlake.apache.org/docs/SupportedDataSources) page, DevLake provides incoming webhooks to push your `deployments` data to DevLake. The webhook configuration doc can be found [here](https://devlake.apache.org/docs/UserManuals/ConfigUI/webhook/).


## An example to set up
The following example shows the steps that a team needs to take to configure DORA metrics in DevLake. This team uses GitHub Action and CircleCI to do `deployments`, GitHub PRs as `changes` and Jira to manage `incidents`.

> Prerequesites: please make sure you have set up Apache DevLake. If you have not done so, you can follow the instructions [here](https://devlake.apache.org/docs/GettingStarted).

### Collect data via `blueprint`
1. Visit the config-ui at `http://localhost:4000`
2. Create a `blueprint`, let's name it "Blueprint for DORA", add a Jira and a GitHub connection. Click `Next Step`
![](https://i.imgur.com/lpPRZ6v.png)
3. Select Jira boards and GitHub repos to collect, click `Next Step`
![](https://i.imgur.com/Ko38n6J.png)
4. Click `Add Transformations` to configure for DORA metrics
![](https://i.imgur.com/Lhcu2DE.png)
5. To make it simple, fields with a ![](https://i.imgur.com/rrLopFx.png) label are DORA-related configurations for every data source. Via these fields, you can define what are "incidents" and "deployments" for each data source (see image below). After all the data connections have been configured, click `Next Step`
![](https://i.imgur.com/newUvp0.png). 

6. Choose sync frequency, click 'Save and Run Now' to start data collection. The duration varies along with the data source and the volume of data to collect.
![](https://i.imgur.com/zPkfzGr.png)

### Collect data via `webhook`
7. In the meantime of collecting Jira and GitHub data via blueprint, please go to the data connections page. Click "Incoming Issue/Deployment Webhook" to import `deployments` from CircleCI.
![](https://i.imgur.com/VsKAJNK.png)
8. Click 'Issue/Deployment Incoming Webhook', create a webhook named "CircleCI deployment". You can see the generated post url.
![](https://i.imgur.com/ezRlT64.png)

9. Visit your CircleCI in a new tab. Go to the pipelines page. Click `Configuration File`
![](https://i.imgur.com/XwPzmyk.png)

10. Add the Deployment webhook urls in Step 8 to your config.yml. 
   - Copy and paste`https://ui-my-svr02.demo.devlake.io/api/plugins/webhook/:webhook_id/cicd_tasks` to trigger after the 'deployment' job is finished
   - Copy and paste`https://ui-my-svr02.demo.devlake.io/api/plugins/webhook/:webhook_id/cicd_pipeline/:pipelineName/finish` to trigger after all CI jobs are finished
![](https://i.imgur.com/IUpb0dZ.jpg)

11. Run CircleCI workflow, you can see `deployments` data in table.cicd_tasks in DevLake's database.
![](https://i.imgur.com/4g1Cb2B.png)

12. View the built-in [DORA dashboard](http://localhost:4000/grafana/d/qNo8_0M4z/dora?orgId=1)

> **Note**: If you have any concern about the steps above, please read [blueprint manuals]( https://devlake.apache.org/docs/UserManuals/ConfigUI/Tutorial) (step 1-6) and [webhook manuals](https://devlake.apache.org/docs/UserManuals/ConfigUI/webhook) (step 7-12) if you have any problems.


### Customization
13. If you want to customize this DORA dashboard, please refer to the SQL in the docs for the four metrics: 
    - [Deployment Frequency](https://devlake.apache.org/docs/Metrics/DeploymentFrequency)
    - [Lead Time for Changes](https://devlake.apache.org/docs/Metrics/LeadTimeForChanges)
    - [Median Time to Restore Service](https://devlake.apache.org/docs/Metrics/MTTR)
    - [Change Failure Rate](https://devlake.apache.org/docs/Metrics/CFR)


<br/>

:tada::tada::tada: Congratulations! Now you have your own DORA dashboard. 

<br/><br/><br/>

