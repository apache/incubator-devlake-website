---
title: "Architecture"
description: >
  Understand the architecture of Apache DevLake
sidebar_position: 2
---

## Overview

<p align="center"><img src="/img/Architecture/arch-component.svg" /></p>
<p align="center">DevLake Components</p>

A DevLake installation typically consists of the following components:

- Config UI: A handy user interface to create, trigger, and debug Blueprints. A Blueprint specifies the where (data connection), what (data scope), how (transformation rule), and when (sync frequency) of a data pipeline.
- API Server: The main programmatic interface of DevLake.
- Runner: The runner does all the heavy-lifting for executing tasks. In the default DevLake installation, it runs within the API Server, but DevLake provides a temporal-based runner (beta) for production environments.
- Database: The database stores both DevLake's metadata and user data collected by data pipelines. DevLake supports MySQL and PostgreSQL as of v0.11.
- Plugins: Plugins enable DevLake to collect and analyze dev data from any DevOps tools with an accessible API. DevLake community is actively adding plugins for popular DevOps tools, but if your preferred tool is not covered yet, feel free to open a GitHub issue to let us know or check out our doc on how to build a new plugin by yourself.
- Dashboards: Dashboards deliver data and insights to DevLake users. A dashboard is simply a collection of SQL queries along with corresponding visualization configurations. DevLake's official dashboard tool is Grafana and pre-built dashboards are shipped in Grafana's JSON format. Users are welcome to swap for their own choice of dashboard/BI tool if desired.

## Dataflow
<p align="center">

  ![](../Configuration/images/arch-dataflow.svg)

</p>

A typical plugin's dataflow is illustrated below:

1. The Raw layer stores the API responses from data sources (DevOps tools) in JSON. This saves developers' time if the raw data is to be transformed differently later on. Please note that communicating with data sources' APIs is usually the most time-consuming step.
2. The Tool layer extracts raw data from JSONs into a relational schema that's easier to consume by analytical tasks. Each DevOps tool would have a schema that's tailored to its data structure, hence the name, the Tool layer.
3. The Domain layer attempts to build a layer of abstraction on top of the Tool layer so that analytics logics can be re-used across different tools. For example, GitHub's Pull Request (PR) and GitLab's Merge Request (MR) are similar entities. They each have their own table name and schema in the Tool layer, but they're consolidated into a single entity in the Domain layer, so that developers only need to implement metrics like Cycle Time and Code Review Rounds once against the domain layer schema.

## Principles

1. Extensible: DevLake's plugin system allows users to integrate with any DevOps tool. DevLake also provides a dbt plugin that enables users to define their own data transformation and analysis workflows.
2. Portable: DevLake has a modular design and provides multiple options for each module. Users of different setups can freely choose the right configuration for themselves.
3. Robust: DevLake provides an SDK to help plugins efficiently and reliably collect data from data sources while respecting their API rate limits and constraints.

<br/>
