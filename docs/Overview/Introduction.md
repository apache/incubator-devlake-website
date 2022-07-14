---
title: "Introduction"
description: General introduction of Apache DevLake
sidebar_position: 1
---

## What is Apache DevLake?
Apache DevLake is an open-source dev data platform that ingests, analyzes, and visualizes the fragmented data from DevOps tools to distill insights for engineering productivity.

Apache DevLake is designed for developer teams looking to make better sense of their development process and to bring a more data-driven approach to their own practices. You can ask Apache DevLake many questions regarding your development process. Just connect and query.

## What can be accomplished with DevLake?
1. Collect DevOps data across the entire Software Development Life Cycle (SDLC) and connect the siloed data with a standard [data model](../DataModels/DevLakeDomainLayerSchema.md).
2. Visualize out-of-the-box engineering [metrics](../EngineeringMetrics.md) in a series of use-case driven dashboards
3. Easily extend DevLake to support your data sources, metrics, and dashboards with a flexible [framework](Architecture.md) for data collection and ETL (Extract, Transform, Load).

## How do I use DevLake?
### 1. Set up DevLake
You can easily set up Apache DevLake by following our step-by step instructions for [local setup](../QuickStart/LocalSetup.md) or [Kubernetes setup](../QuickStart/KubernetesSetup.md).

### 2. Create a Blueprint
The DevLake Configuration UI will guide you through the process (a Blueprint) to define the data connections, data scope, transformation and sync frequency of the data you wish to collect.

![img](/img/Introduction/userflow1.svg)

### 3. Track the Blueprint's progress
You can track the progress of the Blueprint you have just set up.

![img](/img/Introduction/userflow2.svg)

### 4. View the pre-built dashboards
Once the first run of the Blueprint is completed, you can view the corresponding dashboards.

![img](/img/Introduction/userflow3.png)

### 5. Customize the dahsboards with SQL
If the pre-built dashboards are limited for your use cases, you can always customize or create your own metrics or dashboards with SQL.

![img](/img/Introduction/userflow4.png)
