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

1. Download `docker-compose.yml` and `env.example` from the [latest release](https://github.com/apache/incubator-devlake/releases/tag/v0.19.0-beta1) into a folder.
2. Rename `env.example` to `.env`. For Mac/Linux users, please run `mv env.example .env` in the terminal. This file contains the environment variables that the Devlake server will use. Additional ones can be found in the compose file(s).
3. Generate a secure encryption key using a method such as OpenSSL. For example, run the following command to generate a 128-character string consisting of uppercase letters:

   ```
   openssl rand -base64 2000 | tr -dc 'A-Z' | fold -w 128 | head -n 1
   ```

   Copy the generated string. Set the value of the ENCRYPTION_SECRET environment variable:

   - Method 1: In the docker-compose.yml, set an environment variable ENCRYPTION_SECRET: "copied string"
   - Method 2: Alternatively, you can set the ENCRYPTION_SECRET environment variable in the .env file: ENCRYPTION_SECRET="copied string"

     If you set the ENCRYPTION_SECRET environment variable in both docker-compose.yml and the .env file, the value set in docker-compose.yml takes precedence.

   **Please make sure to keep the ENCRYPTION_SECRET safe as it is used to encrypt sensitive information in the database, such as personal access tokens and passwords. If ENCRYPTION_SECRET is lost, it may not be possible to decrypt this sensitive information.**

4. By default, the timezone is UTC. You can change it by adjusting the env variable TZ in docker-compose.yml

5. Run `docker-compose up -d` if the version of Docker Desktop is too low to use `docker compose up -d`.

## Collect data and view dashboards

1. Visit "config-ui" at `http://localhost:4000` in your browser to configure DevLake and collect data.
   - Please follow the [tutorial](Configuration/Tutorial.md)
   - "devlake" container takes a while to fully boot up. If "config-ui" complains about API being unreachable, please wait a few seconds and refresh the page.
2. To view dashboards, click _View Dashboards_ button in the top left corner, or visit `localhost:3002` (username: "admin", password: "admin").
   - We use [Grafana](https://grafana.com/) to visualize the DevOps [data](/Overview/SupportedDataSources.md) and build dashboards.
   - For how to customize and provision dashboards, please see our [Grafana doc](../Configuration/Dashboards/GrafanaUserGuide.md).

## Upgrade to a newer version

Please note:

Note 1: **Back up your Grafana dashboards** before upgrade if you have modified/customized any dashboards. You can re-import these dashboards to Grafana after the upgrade.

Note 2: **If you're upgrading from DevLake v0.17.x or earlier versions to v0.18.x or later versions**, you need to find the ENCODE_KEY value in the .env file of devlake container, and assign the value to ENCRYPTION_SECRET via .env file or environment variable in docker-compose.yml

1. Run `docker-compose down` to stop services;
2. Download `docker-compose.yml` and `env.example` from the [latest release](https://github.com/apache/incubator-devlake/releases/tag/v0.19.0-beta1).
3. Use the new `docker-compose.yml` and `env.example` to replace old `docker-compose.yml` and `.env`; Or if you have modified/customized values in the old files, compare the new files with the old ones, adjust the old files according to the new ones.
4. If upgrading from earlier versions to v0.18.0+, set ENCRYPTION_SECRET environment variable in docker-compose.yml or .env file, refer to above Note 2.
5. Run `docker-compose up -d` to start DevLake services.

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
