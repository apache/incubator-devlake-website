---
title: "DORA"
sidebar_position: 4
description: >
  DORA Metrics
---

This document describes everything you need to know about DORA, and implementing this powerful and practical framework in DevLake.

## What are DORA metrics?

Created six years ago by a team of researchers, DORA stands for "DevOps Research & Assessment" and is the answer to years of research, having examined thousands of teams, seeking a reliable and actionable approach to understanding the performance of software development teams.

DORA has since become a standardized framework focused on the stability and velocity of development processes, one that avoids the more controversial aspects of productivity and individual performance measures.

There are two key clusters of data inside DORA: Velocity and Stability. The DORA framework is focused on keeping them in context with each other, as a whole, rather than as independent variables, making the data more challenging to misinterpret or abuse.

Within velocity are two core metrics:

- [Deployment Frequency](./Metrics/DeploymentFrequency): Number of successful deployments to production, how rapidly is your team releasing to users?
- [Lead Time for Changes](./Metrics/LeadTimeForChanges): How long does it take from commit to the code running in production? This is important, as it reflects how quickly your team can respond to user requirements.

Stability is composed of two core metrics:

- [Median Time to Restore Service](./Metrics/MTTR): How long does it take the team to properly recover from a failure once it is identified?
- [Change Failure Rate](./Metrics/CFR): How often are your deployments causing a failure?

![](https://i.imgur.com/71EUflb.png)

To make DORA even more actionable, there are well-established benchmarks to determine if you are performing at "Elite", "High", "Medium", or "Low" levels. Inside DevLake, you will find the benchmarking table available to assess and compare your own projects.

## Why is DORA important?

DORA metrics help teams and projects measure and improve software development practices to consistently deliver reliable products, and thus happy users!

## How to implement DORA metrics with Apache DevLake?

You can set up DORA metrics in DevLake in a few steps:

- **Install**: [Getting Started](./GettingStarted)
- **Collect**: Collect data via blueprint
  - In the blueprint, select the data you wish to collect, and make sure you have selected the data required for DORA metrics
  - Configure DORA-related transformation rules to define `deployments` and `incidents`
  - Select a sync frequency for your data, save and run the blueprint.
- **Report**: DevLake provides a built-in DORA dashboard. See an example screenshot below or check out our [live demo](https://grafana-lake.demo.devlake.io/grafana/d/qNo8_0M4z/dora?orgId=1).
  ![DORA Dashboard](https://i.imgur.com/y1pUIsk.png)

DevLake now supports Jenkins, GitHub Action and GitLabCI as data sources for `deployments` data; Jira, GitHub issues, and TAPD as the sources for `incidents` data; Github PRs, GitLab MRs as the sources for `changes` data.

If your CI/CD tools are not listed on the [Supported Data Sources](./Overview/SupportedDataSources) page, have no fear! DevLake provides incoming webhooks to push your `deployments` data to DevLake. The webhook configuration doc can be found [here](./Configuration/webhook/).

## A real-world example

Let's walk through the DORA implementation process for a team with the following toolchain

- Code Hosting: GitHub
- CI/CD: GitHub Actions + CircleCI
- Issue Tracking: Jira

Calculating DORA metrics requires three key entities: **changes**, **deployments**, and **incidents**. Their exact definitions of course depend on a team's DevOps practice and varies team by team. For the team in this example, let's assume the following definition:

- Changes: All pull requests in GitHub.
- Deployments: GitHub action jobs that have "deploy" in their names and CircleCI's deployment jobs.
- Incidents: Jira issues whose types are `Crash` or `Incident`

In the next section, we'll demonstrate how to configure DevLake to implement DORA metrics for the aforementioned example team.

### Collect GitHub & Jira data via `blueprint`

1. Visit the config-ui at `http://localhost:4000`
2. Create a project: project1. Go to project1 and create a blueprint. let's name it "Blueprint for DORA", add a Jira and a GitHub connection. Click `Next Step`
   ![project1](/img/ConfigUI/project1.png)
   ![](https://i.imgur.com/lpPRZ6v.png)

3. Select Jira boards and GitHub repos to collect, click `Next Step`
   ![](https://i.imgur.com/Ko38n6J.png)

4. Click `Add Transformation` to configure for DORA metrics
   ![](https://i.imgur.com/Lhcu2DE.png)

5. To make it simple, fields with a ![](https://i.imgur.com/rrLopFx.png) label are DORA-related configurations for every data source. Via these fields, you can define what are "incidents" and "deployments" for each data source. After all data connections have been configured, click `Next Step`

   - This team uses Jira issue types `Crash` and `Incident` as "incident", so choose the two types in field "incident". Jira issues in these two types will be transformed to "incidents" in DevLake.
   - This team uses the GitHub action jobs named `deploy` and `build-and-deploy` to deploy, so type in `(?i)deploy` to match these jobs. These jobs will be transformed to "deployments" in DevLake.
     ![](https://i.imgur.com/1JZA2xn.png)

   Note: The following example shows where to find GitHub action jobs. It's easy to mix them up with GitHub workflows.
   ![](https://i.imgur.com/Y2hchEh.png)

6. Choose sync frequency, click 'Save and Run Now' to start data collection. The time to completion varies by data source and depends on the volume of data.
   ![](https://i.imgur.com/zPkfzGr.png)

For more details, please refer to our [blueprint manuals](./Configuration/Tutorial).

### Collect CircleCI data via `webhook`

Using CircleCI as an example, we demonstrate how to actively push data to DevLake using the Webhook approach, in cases where DevLake doesn't have a plugin specific to that tool to pull data from your data source.

7. Go to the 'Data Connections' page. Create a webhook.
   ![webhook-add-data-connections](/img/ConfigUI/webhook-add-data-connections.png)

We recommend that you give your webhook connection a unique name so that you can identify and manage where you have used it later.

8. Create a Project first, choose Incoming Webhooks, then you can `Add a Webhook` or `Select Existing Webhooks`. And click "Generate POST URL". DevLake will generate URLs that you can send JSON payloads to push `deployments` and `incidents` to Devlake. Copy the `Deployment` curl command.
   ![project-webhook-use](/img/ConfigUI/project-webhook-use.png)
   ![webhook-connection](/img/ConfigUI/webhook-connection.png)

9. Now head to your CircleCI's pipelines page in a new tab. Find your deployment pipeline and click `Configuration File`
   ![](https://i.imgur.com/XwPzmyk.png)

10. Paste the curl command copied in step 8 to the `config.yml`, change the key-values in the payload. See full payload schema [here](./Plugins/webhook/##register-a-deployment).

```
version: 2.1

jobs:
  build:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run:
          name: "build"
          command: |
            echo Hello, World!

  deploy:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run:
          name: "deploy"
          command: |
            # The time a deploy started
            start_time=`date '+%Y-%m-%dT%H:%M:%S%z'`

            # Some deployment tasks here ...
            echo Hello, World!

            # Send the request to DevLake after deploy
            # The values start with a '$CIRCLE_' are CircleCI's built-in variables
            curl http://127.0.0.1:4000/api/plugins/webhook/1/deployments -X 'POST' -d "{
              \"commit_sha\":\"$CIRCLE_SHA1\",
              \"repo_url\":\"$CIRCLE_REPOSITORY_URL\",
              \"start_time\":\"$start_time\"
            }"

workflows:
  build_and_deploy_workflow:
    jobs:
      - build
      - deploy
```

If you have set a [username/password](GettingStarted/Authentication.md) for Config UI, you need to add them to the curl to register a deployment:

```
curl https://sample-url.com/api/plugins/webhook/1/deployments -X 'POST' -u 'username:password' -d '{
    \"commit_sha\":\"$CIRCLE_SHA1\",
    \"repo_url\":\"$CIRCLE_REPOSITORY_URL\",
    \"start_time\":\"$start_time\"
  }'
```

11. Run the modified CircleCI pipeline. Check to verify that the request has been successfully sent.
    ![](https://i.imgur.com/IyneAMn.png)

12. You will find the corresponding `deployments` in table.cicd_tasks in DevLake's database.
    ![](https://i.imgur.com/6hguCYK.png)

### View and customize DevLake's DORA dashboard

With all the data collected, DevLake's DORA dashboard is ready to deliver your DORA metrics and benchmarks. You can find the DORA dashboard within the Grafana instance shipped with DevLake, ready for you to put into action.

You can customize the DORA dashboard by editing the underlying SQL query of each panel.

For a breakdown of each metric's SQL query, please refer to the corresponding metric docs:

- [Deployment Frequency](./Metrics/DeploymentFrequency)
- [Lead Time for Changes](./Metrics/LeadTimeForChanges)
- [Median Time to Restore Service](./Metrics/MTTR)
- [Change Failure Rate](./Metrics/CFR)

If you aren't familiar with Grafana, please refer to our [Grafana doc](Configuration/Dashboards/GrafanaUserGuide.md), or jump into Slack for help.

<br/>

:tada::tada::tada: Congratulations! You are now a DevOps Hero, with your own DORA dashboard!

<br/><br/>

## Try it Out

To create the DORA dashboard with your own toolchain, please look at the [configuration tutorial](Configuration/Tutorial.md) for more details.

<br/>

## Troubleshooting

If you run into any problem, please check the [Troubleshooting](/Troubleshooting/Configuration.md) or [create an issue](https://github.com/apache/incubator-devlake/issues)
