---
title: "Deploy to Kubernetes"
description: >
  The steps to install Apache DevLake in Kubernetes.
---


We provide a sample [k8s-deploy.yaml](https://github.com/apache/incubator-devlake/blob/main/k8s-deploy.yaml) for users interested in deploying Apache DevLake on a k8s cluster.

[k8s-deploy.yaml](https://github.com/apache/incubator-devlake/blob/main/k8s-deploy.yaml) will create a namespace `devlake` on your k8s cluster, and use `nodePort 30004` for `config-ui`,  `nodePort 30002` for `grafana` dashboards. If you would like to use certain version of Apache DevLake, please update the image tag of `grafana`, `devlake` and `config-ui` services to specify versions like `v0.10.1`.

Here's the step-by-step guide:

1. Download [k8s-deploy.yaml](https://github.com/apache/incubator-devlake/blob/main/k8s-deploy.yaml) to local machine
2. Some key points:
   - `config-ui` deployment:
     * `GRAFANA_ENDPOINT`: FQDN of grafana service which can be reached from user's browser
     * `DEVLAKE_ENDPOINT`: FQDN of devlake service which can be reached within k8s cluster, normally you don't need to change it unless namespace was changed
     * `ADMIN_USER`/`ADMIN_PASS`: Not required, but highly recommended
   - `devlake-config` config map:
     * `MYSQL_USER`: shared between `mysql` and `grafana` service
     * `MYSQL_PASSWORD`: shared between `mysql` and `grafana` service
     * `MYSQL_DATABASE`: shared between `mysql` and `grafana` service
     * `MYSQL_ROOT_PASSWORD`: set root password for `mysql`  service
   - `devlake` deployment:
     * `DB_URL`: update this value if  `MYSQL_USER`, `MYSQL_PASSWORD` or `MYSQL_DATABASE` were changed
3. The `devlake` deployment store its configuration in `/app/.env`. In our sample yaml, we use `hostPath` volume, so please make sure directory `/var/lib/devlake` exists on your k8s workers, or employ other techniques to persist `/app/.env` file. Please do NOT mount the entire `/app` directory, because plugins are located in `/app/bin` folder.
4. Finally, execute the following command, Apache DevLake should be up and running:
    ```sh
    kubectl apply -f k8s-deploy.yaml
    ```
<br/><br/><br/>
