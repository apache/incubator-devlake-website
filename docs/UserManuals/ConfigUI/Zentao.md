---
title: "Configuring Zentao(Beta)"
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
   - `https://YOUR_DOMAIN:YOUR_PORT/`
The endpoint url should end with `/`.

#### Username/Password
Input the username and password of your Zentao account.

#### Proxy URL (Optional)
If you are behind a corporate firewall or VPN you may need to utilize a proxy server. Enter a valid proxy server address on your network, e.g. `http://your-proxy-server.com:1080`

#### Test and Save Connection
Click `Test Connection`, if the connection is successful, click `Save Connection` to add the connection.

### Step 2 - Configure Blueprint

Similar to other beta plugins, Zentao does not support `project`, which means, you can only collect Zentao data via blueprint's advanced mode.

Please go to the `Blueprints` page and switch to advanced mode. See how to use advanced mode and JSON [examples](AdvancedMode.md#zentao).

### Troubleshooting

If you run into any problem, please check the [Troubleshooting](/Troubleshooting/Configuration.md) or [create an issue](https://github.com/apache/incubator-devlake/issues)
