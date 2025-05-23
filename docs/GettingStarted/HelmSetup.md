---
title: "Install via Helm"
description: >
  The steps to install Apache DevLake via Helm for Kubernetes
sidebar_position: 3
---

## Prerequisites

- Helm >= 3.6.0
- Kubernetes >= 1.19.0

## Quick Start

#### You can also check https://github.com/apache/incubator-devlake-helm-chart to make contribution

#### To install or upgrade to the latest version, please check [here](https://github.com/apache/incubator-devlake-helm-chart/releases)

### Install

To install the chart with release name `devlake`,follow these steps:

1.  Generate a secure encryption key using a method such as OpenSSL. For example, run the following command to generate a 128-character string consisting of uppercase letters:

    ```
    openssl rand -base64 2000 | tr -dc 'A-Z' | fold -w 128 | head -n 1
    ```

2.  Copy the generated string, set the value of the ENCRYPTION_SECRET environment variable by running the following command:

    ```
    export ENCRYPTION_SECRET="copied string"
    ```

    This command will set the `ENCRYPTION_SECRET` environment variable to the value of the copied string.

    **Please make sure to keep the ENCRYPTION_SECRET safe as it is used to encrypt sensitive information in the database, such as personal access tokens and passwords. If ENCRYPTION_SECRET is lost, it may not be possible to decrypt this sensitive information.**

3.  By default, the timezone is UTC. To customize the timezone settings, apply the `--set commonEnvs.TZ="your timezone",grafana.env.TZ="your timezone"` command. For further guidance, please refer to [FAQ](#faq).

4.  By default, a random password is generated and stored in a Kubernetes Secret for the Grafana admin user. Alternatively, you can explicitly set the password via `--set grafana.adminPassword=<your password>`. For further guidance, please refer to [FAQ](#faq).

5.  Install the chart by running the following commands:

    ```shell
    helm repo add devlake https://apache.github.io/incubator-devlake-helm-chart
    helm repo update
    helm install devlake devlake/devlake --version=1.0-beta1 --set lake.encryptionSecret.secret=$ENCRYPTION_SECRET
    ```

And visit your devlake from the node port (32001 by default).

http://YOUR-NODE-IP:32001

#### Tips:

If you are using minikube inside your mac, please use the following command to forward the port:

```shell
kubectl port-forward service/devlake-ui  30090:4000
```

and open another terminal:

```shell
kubectl port-forward service/devlake-grafana  30091:3000
```

Then you can visit:
config-ui by url `http://YOUR-NODE-IP:30090`
grafana by url `http://YOUR-NODE-IP:30091`

### Upgrade

:::caution

**Back up your Grafana dashboards** before upgrading if you have modified/customized any dashboards. You can re-import these dashboards to Grafana after the upgrade.

:::

**If you are upgrading from DevLake v0.18.x or later versions:**

```shell
helm repo update
helm upgrade devlake devlake/devlake --version=1.0-beta1
```

<br/>

**If you are upgrading from DevLake v0.17.x or earlier versions to v0.18.x or later versions:**

1. Copy the ENCODE_KEY value from /app/config/.env of the lake pod (e.g. devlake-lake-0), and replace the <ENCRYPTION_SECRET> in the upgrade command below.

2. You may encounter the below error when upgrading because the built-in grafana has been replaced by the official grafana dependency. So you may need to delete the grafana deployment first.

  > Error: UPGRADE FAILED: cannot patch "devlake-grafana" with kind Deployment: Deployment.apps "devlake-grafana" is invalid: spec.selector: Invalid value: v1.LabelSelector{MatchLabels:map[string]string{"app.kubernetes.io/instance":"devlake", "app.kubernetes.io/name":"grafana"}, MatchExpressions:[]v1.LabelSelectorRequirement(nil)}: field is immutable

  ```shell
  helm repo update
  helm upgrade devlake devlake/devlake --version=1.0-beta1--set lake.encryptionSecret.secret=<ENCRYPTION_SECRET>
  ```

### Uninstall

To uninstall/delete the `devlake` release:

```shell
helm uninstall devlake
```

## Some example deployments

### Deploy with NodePort

Conditions:

- IP Address of Kubernetes node: 192.168.0.6
- Want to visit devlake with port 30000.

```
ENCRYPTION_SECRET=$(openssl rand -base64 2000 | tr -dc 'A-Z' | fold -w 128 | head -n 1)
helm install devlake devlake/devlake --set service.uiPort=30000 --set lake.encryptionSecret.secret=$ENCRYPTION_SECRET
```

After deployed, visit devlake: http://192.168.0.6:30000

### Deploy with Ingress

Conditions:

- I have already configured default ingress for the Kubernetes cluster
- I want to use http://devlake.example.com for visiting devlake

```
ENCRYPTION_SECRET=$(openssl rand -base64 2000 | tr -dc 'A-Z' | fold -w 128 | head -n 1)
helm install devlake devlake/devlake --set "ingress.enabled=true,ingress.hostname=devlake.example.com" --set lake.encryptionSecret.secret=$ENCRYPTION_SECRET
```

After deployed, visit devlake: http://devlake.example.com, and grafana at http://devlake.example.com/grafana

### Deploy with Ingress (Https)

Conditions:

- I have already configured ingress(class: nginx) for the Kubernetes cluster, and the https using 8443 port.
- I want to use https://devlake-0.example.com:8443 for visiting devlake.
- The https certificates are generated by letsencrypt.org, and the certificate and key files: `cert.pem` and `key.pem`

First, create the secret:

```
kubectl create secret tls ssl-certificate --cert cert.pem --key secret.pem
```

Then, deploy the devlake:

```
ENCRYPTION_SECRET=$(openssl rand -base64 2000 | tr -dc 'A-Z' | fold -w 128 | head -n 1)
helm install devlake devlake/devlake \
    --set "ingress.enabled=true,ingress.enableHttps=true,ingress.hostname=devlake-0.example.com" \
    --set "ingress.className=nginx,ingress.httpsPort=8443" \
    --set "ingress.tlsSecretName=ssl-certificate"
    --set lake.encryptionSecret.secret=$ENCRYPTION_SECRET
```

After deployed, visit devlake: https://devlake-0.example.com:8443, and grafana at https://devlake-0.example.com:8443/grafana

## Parameters

Some useful parameters for the chart, you could also check them in values.yaml

| Parameter                                 | Description                                                                           | Default                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------ |
| replicaCount                              | Replica Count for devlake, currently not used                                         | 1                        |
| imageTag                                  | The version tag for all images                                                        | see Values.yaml          |
| commonEnvs                                | The common envs for all pods except grafana                                           | {TZ: "UTC"}              |
| mysql.useExternal                         | If use external mysql server, set true                                                | false                    |
| mysql.externalServer                      | External mysql server address                                                         | 127.0.0.1                |
| mysql.externalPort                        | External mysql server port                                                            | 3306                     |
| mysql.username                            | username for mysql                                                                    | merico                   |
| mysql.password                            | password for mysql                                                                    | merico                   |
| mysql.database                            | database for mysql                                                                    | lake                     |
| mysql.rootPassword                        | root password for mysql                                                               | admin                    |
| mysql.storage.type                        | storage type, pvc or hostpath                                                         | pvc                      |
| mysql.storage.class                       | storage class for mysql's volume                                                      | ""                       |
| mysql.storage.size                        | volume size for mysql's data                                                          | 5Gi                      |
| mysql.storage.hostPath                    | the host path if mysql.storage.type is hostpath                                       | /devlake/mysql/data      |
| mysql.image.repository                    | repository for mysql's image                                                          | mysql                    |
| mysql.image.tag                           | image tag for mysql's image                                                           | 8                        |
| mysql.image.pullPolicy                    | pullPolicy for mysql's image                                                          | IfNotPresent             |
| mysql.initContainers                      | init containers to run to complete before mysql                                       | []                       |
| mysql.extraLabels                         | extra labels for mysql's statefulset                                                  | {}                       |
| mysql.securityContext                     | pod security context values                                                           | {}                       |
| mysql.containerSecurityContext            | container security context values                                                     | {}                       |
| mysql.service.type                        | mysql service type                                                                    | ClusterIP                |
| mysql.service.nodePort                    | specify mysql nodeport                                                                | ""                       |
| grafana                                   | dashboard, datasource, etc. settings for grafana, installed by grafana official chart |                          |
| lake.image.repository                     | repository for lake's image                                                           | apache/devlake           |
| lake.image.pullPolicy                     | pullPolicy for lake's image                                                           | Always                   |
| lake.port                                 | the port of devlake backend                                                           | 8080                     |
| lake.envs                                 | initial envs for lake                                                                 | see Values.yaml          |
| lake.extraEnvsFromSecret                  | existing secret name of extra envs                                                    | ""                       |
| lake.encryptionSecret.secretName          | the k8s secret name for ENCRYPTION_SECRET                                             | ""                       |
| lake.encryptionSecret.secret              | the secret for ENCRYPTION_SECRET                                                      | ""                       |
| lake.encryptionSecret.autoCreateSecret    | whether let the helm chart create the secret                                          | true                     |
| lake.extraLabels                          | extra labels for lake's statefulset                                                   | {}                       |
| lake.securityContext                      | pod security context values                                                           | {}                       |
| lake.containerSecurityContext             | container security context values                                                     | {}                       |
| ui.image.repository                       | repository for ui's image                                                             | apache/devlake-config-ui |
| ui.image.pullPolicy                       | pullPolicy for ui's image                                                             | Always                   |
| ui.basicAuth.enabled                      | If the basic auth in ui is enabled                                                    | false                    |
| ui.basicAuth.user                         | The user name for the basic auth                                                      | "admin"                  |
| ui.basicAuth.password                     | The password for the basic auth                                                       | "admin"                  |
| ui.basicAuth.autoCreateSecret             | If let the helm chart create the secret                                               | true                     |
| ui.basicAuth.secretName                   | The basic auth secret name                                                            | ""                       |
| ui.extraLabels                            | extra labels for ui's statefulset                                                     | {}                       |
| ui.securityContext                        | pod security context values                                                           | {}                       |
| ui.containerSecurityContext               | container security context values                                                     | {}                       |
| service.type                              | Service type for exposed service                                                      | NodePort                 |
| service.uiPort                            | Node port for config ui                                                               | 32001                    |
| service.ingress.enabled                   | If enable ingress                                                                     | false                    |
| service.ingress.enableHttps               | If enable https                                                                       | false                    |
| service.ingress.className                 | Name for ingressClass. leave empty for using default                                  | ""                       |
| service.ingress.hostname                  | The hostname/domainname for ingress                                                   | localhost                |
| service.ingress.prefix                    | The prefix for endpoints, currently not used                                          | /                        |
| service.ingress.tlsSecretName             | The secret name for tls's certificate for https                                       | ""                       |
| service.ingress.httpPort                  | The http port for ingress                                                             | 80                       |
| service.ingress.httpsPort                 | The https port for ingress                                                            | 443                      |
| option.database                           | The database type, valids: mysql                                                      | mysql                    |
| option.connectionSecretName               | The database connection details secret name                                           | devlake-mysql-auth       |
| option.autoCreateSecret                   | If let the helm chart create the secret                                               | true                     |


## FAQ

1. Can I use a managed Cloud database service instead of running database in docker?

Yes, it just set useExternal value to true while you deploy devlake with helm chart. Below we'll use MySQL on AWS RDS as an example.

a. (Optional) Create a MySQL instance on AWS RDS following this [doc](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html), skip this step if you'd like to use an existing instance
b. Provide below values while install from helm:

    - `mysql.useExternal`: this should be `true`
    - `mysql.externalServer`: use your RDS instance's IP address or domain name.
    - `mysql.externalPort`: use your RDS instance's database port.
    - `mysql.username`: use your `username` for access RDS instance's DB
    - `mysql.password`: use your `password` for access RDS instance's DB
    - `mysql.database`: use your RDS instance's DB name, you may need to create a database first with `CREATE DATABASE <DB name>;`

Here is the example:

```
helm repo add devlake https://apache.github.io/incubator-devlake-helm-chart
helm repo update
ENCRYPTION_SECRET=$(openssl rand -base64 2000 | tr -dc 'A-Z' | fold -w 128 | head -n 1)
helm install devlake devlake/devlake \
  --set mysql.useExternal=true \
  --set mysql.externalServer=db.example.com \
  --set mysql.externalPort=3306 \
  --set mysql.username=admin \
  --set mysql.password=password_4_admin \
  --set mysql.database=devlake
  --set lake.encryptionSecret.secret=$ENCRYPTION_SECRET

```

2. Can I use a secret to store the database connection details?

Yes, to do so, you need to have a secret in your Kubernetes Cluster that contains the following values:

- `MYSQL_USER`: The user to connect to your DB.
- `MYSQL_PASSWORD`: The password to connect to your DB.
- `MYSQL_DATABASE`: The database to connect to your DB.
- `MYSQL_ROOT_PASSWORD`: The root password to connect to your DB.
- `DB_URL`: mysql://`username`:`password`@`dbserver`:`port`/`database`?charset=utf8mb4&parseTime=True

The secret name needs to be the same as the value `option.connectionSecretName`

3. Can I use an external Grafana instead of running built-in Grafana?

Yes, the devlake helm chart supports using an external Grafana. You can set the following values while installing from helm:

- `grafana.enabled`: this should be `false`
- `grafana.external.url`: use your Grafana's URL, e.g. `https://grafana.example.com`

Here is the example:

```
helm repo add devlake https://apache.github.io/incubator-devlake-helm-chart
helm repo update
ENCRYPTION_SECRET=$(openssl rand -base64 2000 | tr -dc 'A-Z' | fold -w 128 | head -n 1)
helm install devlake devlake/devlake \
  --set grafana.enabled=false \
  --set grafana.external.url=https://grafana.example.com
  --set lake.encryptionSecret.secret=$ENCRYPTION_SECRET

```

4. How to set the timezone? If not explicitly set, the default is UTC

- `commonEnvs.TZ`: your timezone
- `grafana.env.TZ`: your timezone

Here is the example:

```
helm repo add devlake https://apache.github.io/incubator-devlake-helm-chart
helm repo update
ENCRYPTION_SECRET=$(openssl rand -base64 2000 | tr -dc 'A-Z' | fold -w 128 | head -n 1)
helm install devlake devlake/devlake \
  --set commonEnvs.TZ=<your timezone> \
  --set grafana.env.TZ=<your timezone>

```

5. How to set the Grafana admin password? If not explicitly set, a random password will be generated and saved in a Kubernetes Secret

- `grafana.adminPassword`: your password

Here is the example:

```
helm repo add devlake https://apache.github.io/incubator-devlake-helm-chart
helm repo update
ENCRYPTION_SECRET=$(openssl rand -base64 2000 | tr -dc 'A-Z' | fold -w 128 | head -n 1)
helm install devlake devlake/devlake \
  --set grafana.adminPassword=<your password> \
  --set lake.encryptionSecret.secret=$ENCRYPTION_SECRET

```

## Troubleshooting

If you run into any problem, please check the [Troubleshooting](/Troubleshooting/Installation.md) or [create an issue](https://github.com/apache/incubator-devlake/issues)
