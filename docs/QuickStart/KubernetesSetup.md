---
title: "Install via Kubernetes"
description: >
  The steps to install Apache DevLake via Kubernetes
sidebar_position: 2
---

We provide a sample [k8s-deploy.yaml](https://github.com/apache/incubator-devlake/blob/main/k8s-deploy.yaml) for users interested in deploying Apache DevLake to a k8s cluster.

[k8s-deploy.yaml](https://github.com/apache/incubator-devlake/blob/main/k8s-deploy.yaml) will create a namespace `devlake` on your k8s cluster, and use `nodePort 30004` for `config-ui`,  `nodePort 30002` for `grafana` dashboards. If you would like to use a specific version of Apache DevLake, please update the image tag of `grafana`, `devlake` and `config-ui` deployments.

## Step-by-step guide

1. Download [k8s-deploy.yaml](https://github.com/apache/incubator-devlake/blob/main/k8s-deploy.yaml) to local machine
2. Customize the settings (`devlake-config` config map):
   - Settings shared between `grafana` and `mysql`
     * `MYSQL_ROOT_PASSWORD`: set root password for `mysql`
     * `MYSQL_USER`: shared between `mysql` and `grafana`
     * `MYSQL_PASSWORD`: shared between `mysql` and `grafana`
     * `MYSQL_DATABASE`: shared between `mysql` and `grafana`
     * `MYSQL_URL`: set MySQL URL for `grafana` in `$HOST:$PORT` format
   - Settings used by `config-ui`:
     * `GRAFANA_ENDPOINT`: FQDN of grafana service which can be reached within k8s cluster, normally you don't need to change it unless namespace was changed
     * `DEVLAKE_ENDPOINT`: FQDN of devlake service which can be reached within k8s cluster, normally you don't need to change it unless namespace was changed
     * `ADMIN_USER`/`ADMIN_PASS`: Not required, but highly recommended
   - Settings used by `devlake`:
     * `DB_URL`: update this value if  `MYSQL_USER`, `MYSQL_PASSWORD` or `MYSQL_DATABASE` were changed
3. The `devlake` deployment store its configuration in `/app/.env`. In our sample yaml, we use `hostPath` volume, so please make sure directory `/var/lib/devlake` exists on your k8s workers, or employ other techniques to persist `/app/.env` file. Please do NOT mount the entire `/app` directory, because plugins are located in `/app/bin` folder.
4. Finally, execute the following command, Apache DevLake should be up and running:
   ```sh
   kubectl apply -f k8s-deploy.yaml
   ```


## FAQ

- What if I want to replace MySQL with RDS?
  First, remove the `mysql` deployment section, and then update the `devlake-config` configmap accordingly:
  * `MYSQL_ROOT_PASSWORD`: remove this line
  * `MYSQL_USER`: set RDS username for grafana
  * `MYSQL_PASSWORD`: set RDS password for grafana
  * `MYSQL_DATABASE`: set RDS database for grafana
  * `MYSQL_URL`: set RDS URL for `grafana` in `$HOST:$PORT` format
  * `DB_URL`: set RDS URL for `devlake`
