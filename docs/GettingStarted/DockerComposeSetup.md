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

1. Download `docker-compose.yml` and `env.example` from the [latest release](https://github.com/apache/incubator-devlake/releases/tag/v0.17.0-beta9) into a folder.
2. Rename `env.example` to `.env`. For Mac/Linux users, please run `mv env.example .env` in the terminal. This file contains the environment variables that the Devlake server will use. Additional ones can be found in the compose file(s).
3. Run `docker-compose up -d` if the version of Docker Desktop is too low to use `docker compose up -d`.

## Collect data and view dashboards

1. Visit "config-ui" at `http://localhost:4000` in your browser to configure DevLake and collect data.
   - Please follow the [tutorial](Configuration/Tutorial.md)
   - "devlake" container takes a while to fully boot up. If "config-ui" complains about API being unreachable, please wait a few seconds and refresh the page.
2. To view dashboards, click _View Dashboards_ button in the top left corner, or visit `localhost:3002` (username: "admin", password: "admin").
   - We use [Grafana](https://grafana.com/) to visualize the DevOps [data](/Overview/SupportedDataSources.md) and build dashboards.
   - For how to customize and provision dashboards, please see our [Grafana doc](../Configuration/Dashboards/GrafanaUserGuide.md).

## Upgrade to a newer version

Please note: **Back up your Grafana dashboards** before upgrade if you have modified/customized any dashboards. You can re-import these dashboards to Grafana after the upgrade.

1. Run `docker-compose down` to stop services;
2. Open file "docker-compose.yml". Change the image tags of "grafana", "devlake" and "config-ui" to the new version, and save;
3. Run `docker-compose up -d` to start DevLake services.

Please check the [upgrade doc](Upgrade.md) for more information.

## FAQ

### Can I use a managed cloud database service instead of running database in Docker?

Yes, please follow the steps below:

1. Comment out the 'mysql' part in `docker-compose.yml`:

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
  command: --character-set-server=utf8mb4
    --collation-server=utf8mb4_bin
```

2. Comment out the 'mysql' volume in `docker-compose.yml`:

```yaml
volumes:
  mysql-storage:
```

3. Comment out the 'depends_on mysql' part in `docker-compose.yml`:

```yaml
depends_on:
  - mysql
```

4. Provide your managed cloud database connection info in the 'grafana' section in `docker-compose.yml`:

- MYSQL_URL: This parameter specifies the URL of your database instance. For example, if your database is hosted on a server with IP address 123.45.67.89 and port number 3306, the URL would be "123.45.67.89:3306".
- MYSQL_DATABASE: This parameter specifies the name of your database. For example, if your database is named "mydatabase", you would set this parameter to "mydatabase".
- MYSQL_USER: This parameter specifies the username that you will use to connect to your database. For example, if your username is "myuser", you would set this parameter to "myuser".
- MYSQL_PASSWORD: This parameter specifies the password that you will use to connect to your database. For example, if your password is "mypassword", you would set this parameter to "mypassword".

```yaml
MYSQL_URL: 123.45.67.89:3306
MYSQL_DATABASE: mydatabase
MYSQL_USER: myuser
MYSQL_PASSWORD: mypassword
```

5. Set DB_URL to your own DB_URL in `.env`:

```bash
DB_URL="mysql://YOUR_USER:YOUR_PASSWORD@YOUR_IP:YOUR_PORT/lake?charset=utf8mb4&parseTime=True"
# Don't forget to create db named `lake` in your own db, and set character-set-server=utf8mb4, collation-server=utf8mb4_bin as below
#      character-set-server=utf8mb4
#      collation-server=utf8mb4_bin
```

6. Final step: `docker compose up -d`

### Can I use an external Grafana instead of running Grafana in Docker?

Yes, please follow the steps below:

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

3. Set up the `config-ui` container to adopt the external Grafana in the `docker-compose.yml`

```yaml
config-ui:
  ...
  environment:
    USE_EXTERNAL_GRAFANA: "true"
    GRAFANA_ENDPOINT: "http://grafana.example.com"
  ...
```

4. Please connect your Grafana to DevLake's database by following https://grafana.com/docs/grafana/latest/administration/data-source-management/

5. If you want to import dashboards, please check https://grafana.com/docs/grafana/latest/dashboards/export-import/.

- You can find DevLake's self-built Grafana dashboards here (https://github.com/apache/incubator-devlake/tree/main/grafana/dashboards).

6. Final step: `docker compose up -d`

## Troubleshooting

If you run into any problem, please check the [Troubleshooting](/Troubleshooting/Installation.md) or [create an issue](https://github.com/apache/incubator-devlake/issues)
