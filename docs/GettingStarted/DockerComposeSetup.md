---
title: "Install via Docker Compose"
description: >
  The steps to install DevLake via Docker Compose
sidebar_position: 1
---


## Prerequisites

- [Docker v19.03.10+](https://docs.docker.com/get-docker)
- [docker-compose v2.2.3+](https://docs.docker.com/compose/install/) (If you have Docker Desktop installed then you already have the Compose plugin installed)

## Launch DevLake

- Commands written `like this` are to be run in your terminal.

1. Download `docker-compose.yml` and `env.example` from [latest release page](https://github.com/apache/incubator-devlake/releases/latest) into a folder.
2. Rename `env.example` to `.env`. For Mac/Linux users, please run `mv env.example .env` in the terminal. This file contains the environment variables that the Devlake server will use. Additional ones can be found in the compose file(s).
3. Run `docker compose up -d` to launch DevLake.

## Collect data and view dashboards

1. Visit `config-ui` at `http://localhost:4000` in your browser to configure DevLake and collect data.
   - Please follow the [tutorial](UserManuals/ConfigUI/Tutorial.md)
   - `devlake` container takes a while to fully boot up. If `config-ui` complains about API being unreachable, please wait a few seconds and refresh the page.
2. To view dashboards, click *View Dashboards* button in the top left corner, or visit `localhost:3002` (username: `admin`, password: `admin`).
   - We use [Grafana](https://grafana.com/) to visualize the DevOps [data](/Overview/SupportedDataSources.md) and build dashboards.
   - For how to customize and provision dashboards, please see our [Grafana doc](../UserManuals/Dashboards/GrafanaUserGuide.md).


## Upgrade to a newer version

Support for database schema migration was introduced to DevLake in v0.10.0. From v0.10.0 onwards, users can upgrade their instance smoothly to a newer version. However, versions prior to v0.10.0 do not support upgrading to a newer version with a different database schema.

<br/>


## Troubleshooting

If you run into any problem, please check the [Troubleshooting](/Troubleshooting/Installation.md) or [create an issue](https://github.com/apache/incubator-devlake/issues)
