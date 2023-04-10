---
title: "Zentao"
sidebar_position: 6
description: Config UI instruction for Zentao
---

Visit config-ui: `http://localhost:4000` and go to `Connections` page.

### Step 1 - Add Data Connections

![zentao-add-data-connections](/img/ConfigUI/zentao-add-data-connections.png)

#### Connection Name

Name your connection.

#### Endpoint URL

This should be a valid REST API endpoint

- `http://<host>:<port>/api.php/v1/`
- or `http://<host>:<port>/zentao/api.php/v1/`
  It depends on the path where you deploy zentao. The endpoint url should end with `/`.

#### Username/Password

Input the username and password of your Zentao account.

#### Proxy URL (Optional)

If you are behind a corporate firewall or VPN you may need to utilize a proxy server. Enter a valid proxy server address on your network, e.g. `http://your-proxy-server.com:1080`

#### Test and Save Connection

Click `Test Connection`, if the connection is successful, click `Save Connection` to add the connection.

### Step 2 - Setting Data Scope

![image](https://user-images.githubusercontent.com/3294100/230921313-d43821c2-0c41-4bb4-b1ef-d87e4afb1fa4.png)

#### Projects and Products

Please select the Zentao products for collecting stories/bugs and the Zentao projects for collecting executions. Both will also collect information on accounts/departments.

#### Data Entities

Usually, you don't have to modify this part. However, if you don't want to collect certain Lento entities, you can unselect some entities to accerlerate the collection speed.

- Issue Tracking: Lento issues, issue comments, issue labels, etc.

### Step 3 - Setting Sync Frequency

You can choose how often you would like to sync your data in this step by selecting a sync frequency option or enter a cron code to specify your prefered schedule.

## Troubleshooting

If you run into any problem, please check the [Troubleshooting](/Troubleshooting/Configuration.md) or [create an issue](https://github.com/apache/incubator-devlake/issues)

