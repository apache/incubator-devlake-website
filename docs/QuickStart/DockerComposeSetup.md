---
title: "Install via Docker Compose"
description: >
  The steps to install DevLake via Docker Compose
sidebar_position: 1
---


## Prerequisites

- [Docker v19.03.10+](https://docs.docker.com/get-docker)
- [docker-compose v2.2.3+](https://docs.docker.com/compose/install/)

## Launch DevLake

- Commands written `like this` are to be run in your terminal.

1. Download `docker-compose.yml` and `env.example` from [latest release page](https://github.com/apache/incubator-devlake/releases/latest) into a folder.
2. Rename `env.example` to `.env`. For Mac/Linux users, please run `mv env.example .env` in the terminal.
3. Run `docker-compose up -d` to launch DevLake.

## Configure and collect data

1. Visit `config-ui` at `http://localhost:4000` in your browser to configure and collect data.
   - Please follow the [turorial](UserManuals/ConfigUI/Tutorial.md)
   - `devlake` takes a while to fully boot up. if `config-ui` complaining about api being unreachable, please wait a few seconds and try refreshing the page.
2. Click *View Dashboards* button in the top left when done, or visit `localhost:3002` (username: `admin`, password: `admin`).
   - We use [Grafana](https://grafana.com/) as a visualization tool to build charts for the [data](../DataModels/DataSupport.md) stored in our database.
   - Using SQL queries, we can add panels to build, save, and edit customized dashboards.
   - All the details on provisioning and customizing a dashboard can be found in the [Grafana Doc](../UserManuals/Dashboards/GrafanaUserGuide.md).


## Upgrade to a newer version

Support for database schema migration was introduced to DevLake in v0.10.0. From v0.10.0 onwards, users can upgrade their instance smoothly to a newer version. However, versions prior to v0.10.0 do not support upgrading to a newer version with a different database schema. We recommend users to deploy a new instance if needed.

<br/>
