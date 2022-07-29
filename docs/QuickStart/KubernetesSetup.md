---
title: "Install via Kubernetes"
description: >
  The steps to install Apache DevLake via Kubernetes
sidebar_position: 2
---

We provide a sample [k8s-deploy.yaml](https://github.com/apache/incubator-devlake/blob/main/k8s-deploy.yaml) to help deploy DevLake to Kubernetes

[k8s-deploy.yaml](https://github.com/apache/incubator-devlake/blob/main/k8s-deploy.yaml) will create a namespace `devlake` on your k8s cluster, and use `nodePort 30004` for `config-ui`,  `nodePort 30002` for `grafana` dashboards. If you would like to use a specific version of Apache DevLake, please update the image tag of `grafana`, `devlake` and `config-ui` deployments.

## Step-by-step guide

1. Download [k8s-deploy.yaml](https://github.com/apache/incubator-devlake/blob/main/k8s-deploy.yaml)
2. Customize the settings (`devlake-config` config map):
   - Settings shared between `grafana` and `mysql`
     * `MYSQL_ROOT_PASSWORD`: set root password for `mysql`
     * `MYSQL_USER`: shared between `mysql` and `grafana`
     * `MYSQL_PASSWORD`: shared between `mysql` and `grafana`
     * `MYSQL_DATABASE`: shared between `mysql` and `grafana`
   - Settings used by `grafana`
     * `MYSQL_URL`: set MySQL URL for `grafana` in `$HOST:$PORT` format
     * `GF_SERVER_ROOT_URL`: Public URL to the `grafana`
   - Settings used by `config-ui`:
     * `GRAFANA_ENDPOINT`: FQDN of grafana which can be reached within k8s cluster, normally you don't need to change it unless namespace was changed
     * `DEVLAKE_ENDPOINT`: FQDN of devlake which can be reached within k8s cluster, normally you don't need to change it unless namespace was changed
     * `ADMIN_USER`/`ADMIN_PASS`: Not required, but highly recommended
   - Settings used by `devlake`:
     * `DB_URL`: update this value if  `MYSQL_USER`, `MYSQL_PASSWORD` or `MYSQL_DATABASE` were changed
3. The `devlake` deployment store its configuration in `/app/.env`. In our sample yaml, we use `hostPath` volume, so please make sure directory `/var/lib/devlake` exists on your k8s workers, or employ other techniques to persist `/app/.env` file. Please do NOT mount the entire `/app` directory, because plugins are located in `/app/bin` folder.
4. Finally, execute the following command and DevLake should be up and running:
   ```sh
   kubectl apply -f k8s-deploy.yaml
   ```


## FAQ

1. Can I use a managed Cloud database service instead of running database in docker?
  Yes, it only takes a few changes in the sample yaml file to make it happen. Below we'll use MySQL on AWS RDS as an example.
  1. (Optional) Create a MySQL instance on AWS RDS following this [doc](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html), skip this step if you'd like to use an existing instance
  2. Remove the `mysql` deployment and service sections from `k8s-deploy.yaml`
  3. Update `devlake-config` configmap according to your RDS instance setup:
    * `MYSQL_ROOT_PASSWORD`: remove this line
    * `MYSQL_USER`: use your RDS instance's master username
    * `MYSQL_PASSWORD`: use your RDS instance's password
    * `MYSQL_DATABASE`: use your RDS instance's DB name, you may need to create a database first with `CREATE DATABASE <DB name>;`
    * `MYSQL_URL`: set this for `grafana` in `$HOST:$PORT` format, where $HOST and $PORT should be your RDS instance's endpoint and port respectively
    * `DB_URL`: update the connection string with your RDS instance's info for `devlake`
