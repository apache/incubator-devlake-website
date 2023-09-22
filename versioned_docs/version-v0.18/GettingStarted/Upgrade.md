---
title: "Upgrade"
sidebar_position: 3
description: How to upgrade your Apache DevLake to a newer version
---

## Upgrade Notes

1. ENCRYPTION_SECRET: It is important to keep the ENCRYPTION_SECRET safe as it is used to encrypt sensitive information in the database, such as personal access tokens and passwords. Losing the ENCRYPTION_SECRET may result in the inability to decrypt this sensitive information.

2. .env file: The .env file is now optional. You can choose to store your variables in the environment instead. Remember to consider important variables such as ENCRYPTION_SECRET and DB_URL. If both the environment variables and .env file exist, the values in the environment variables will take precedence. However, make sure that these variables are defined in either one of them to avoid any issues with DevLake.

3. Back up your Grafana dashboards before upgrade if you have modified/customized any dashboards. You can re-import these dashboards to Grafana after the upgrade.

4. Upgrade to v0.18.0+: When upgrading from a previous version of DevLake, you need to find the ENCODE_KEY value in the .env file of devlake container, and assign the value to ENCRYPTION_SECRET according to the upgrade steps, see [helm setup](https://devlake.apache.org/docs/next/GettingStarted/HelmSetup) or [docker compose setup](https://devlake.apache.org/docs/next/GettingStarted/DockerComposeSetup). This will ensure that the encryption process continues to work as expected.

5. Upgrade to v0.18.0+: When upgrading from a previous version of DevLake, You may encounter the below error when upgrading because the built-in grafana has been replaced by the official grafana dependency. So you may need to delete the grafana deployment first, please also take care of Note 3 before deleting.

> Error: UPGRADE FAILED: cannot patch "devlake-grafana" with kind Deployment: Deployment.apps "devlake-grafana" is invalid: spec.selector: Invalid value: v1.LabelSelector{MatchLabels:map[string]string{"app.kubernetes.io/instance":"devlake", "app.kubernetes.io/name":"grafana"}, MatchExpressions:[]v1.LabelSelectorRequirement(nil)}: field is immutable

6. When upgrading via docker-compose.yml, please download the new docker-compose.yml and env.example from [release assets](https://github.com/apache/incubator-devlake/releases) to do the upgrade

These notes provide guidance on upgrading your Apache DevLake to a newer version. Ensure you follow them carefully to avoid any issues during the upgrade process.
