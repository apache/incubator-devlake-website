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
3. If the docker desktop version installed by the user is too low to use `docker compose up -d`, please use `docker-compose up -d`.

## Collect data and view dashboards

1. Visit `config-ui` at `http://localhost:4000` in your browser to configure DevLake and collect data.
   - Please follow the [tutorial](Configuration/Tutorial.md)
   - `devlake` container takes a while to fully boot up. If `config-ui` complains about API being unreachable, please wait a few seconds and refresh the page.
2. To view dashboards, click _View Dashboards_ button in the top left corner, or visit `localhost:3002` (username: `admin`, password: `admin`).
   - We use [Grafana](https://grafana.com/) to visualize the DevOps [data](/Overview/SupportedDataSources.md) and build dashboards.
   - For how to customize and provision dashboards, please see our [Grafana doc](../Configuration/Dashboards/GrafanaUserGuide.md).

## Upgrade to a newer version

Support for database schema migration was introduced to DevLake in v0.10.0. From v0.10.0 onwards, users can upgrade their instance smoothly to a newer version. However, versions prior to v0.10.0 do not support upgrading to a newer version with a different database schema.

<br/>

## FAQ
### Can I use an external Database service instead of running Database in Docker?

    Yes, you can simply comment out the 'mysql' part in 'docker-compose.yml' and update some configurations in '.env' before you run docker compose up -d, here are the steps:

1. Comment out mysql part:
```yaml
  mysql:
    image: mysql:8
    volumes:
      - mysql-storage:/var/lib/mysql
    restart: always
    ports:
      - "127.0.0.1:3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: admin
      MYSQL_DATABASE: lake
      MYSQL_USER: merico
      MYSQL_PASSWORD: merico
    command:
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_bin
```

2. Comment out the 'mysql' volume:

```yaml
volumes:
   mysql-storage:
```

3. Comment out the 'depends_on mysql' part:

```yaml
    depends_on:
      - mysql
```

4. Set DB_URL to your own DB_URL in .env

```bash
DB_URL="mysql://YOUR_USER:YOUR_PASSWORD@YOUR_IP:YOUR_PORT/lake?charset=utf8mb4&parseTime=True"
# Don't forget to create db named `lake` in your own db, and set character-set-server=utf8mb4, collation-server=utf8mb4_bin as below
#      character-set-server=utf8mb4
#      collation-server=utf8mb4_bin
```


5. Final step: `docker compose up -d`

### Can I use an external Grafana instead of running Grafana in Docker?

    Yes, you can simply comment out grafana part in docker-compose.yml and update some configurations in .env before you run `docker compose up -d`, here are the steps:

1. Comment out the 'grafana' part:

```yaml
  grafana:
    image: mericodev/devlake-dashboard:latest
    build:
      context: grafana/
    ports:
      - "3002:3000"
    volumes:
      - grafana-storage:/var/lib/grafana
    environment:
      GF_SERVER_ROOT_URL: "http://localhost:4000/grafana"
      GF_USERS_DEFAULT_THEME: "light"
      MYSQL_URL: mysql:3306
      MYSQL_DATABASE: lake
      MYSQL_USER: merico
      MYSQL_PASSWORD: merico
    restart: always
    depends_on:
      - mysql
```

2. Comment out grafana volume:

```yaml
volumes:
   grafana-storage:
```

3. Set config-ui.environment.GRAFANA_ENDPOINT to your own grafana url in docker-compose.yml

4. Final step: `docker compose up -d`

## Troubleshooting

If you run into any problem, please check the [Troubleshooting](/Troubleshooting/Installation.md) or [create an issue](https://github.com/apache/incubator-devlake/issues)
