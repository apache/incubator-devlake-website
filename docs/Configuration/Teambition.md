---
title: "Teambition(WIP)"
sidebar_position: 23
description: Config UI instruction for Teambition
---

Visit Config UI: `http://localhost:4000` and go to `Connections` page.

## Step 1 - Add Data Connections
![teambition-add-data-connections](https://user-images.githubusercontent.com/3294100/229744282-1959dc82-9038-49a8-924d-11821fafa73a.png)

### Connection Name
Give your connection a unique name to help you identify it in the future.

#### Endpoint URL
This should be a valid REST API endpoint
   - `https://open.teambition.com/api/`
The endpoint url should end with `/`.

### App Id/Secret Key
Input the app id and secret key of your Teambition account, you can follow the steps as below.
![image-20230404213648139](https://user-images.githubusercontent.com/3294100/229810617-fe75cf7d-5a84-4741-9016-47140b276e18.png)![image](https://user-images.githubusercontent.com/3294100/229810458-cf47806b-6307-419c-8147-a176ebafca74.png)

You should ensure that you have added all the necessary "get" and "list" authentication methods.

![image](https://user-images.githubusercontent.com/3294100/229813323-0c490e65-1ecb-4e1c-8df2-ef68cb55a4a4.png)

#### Tenant Type/Tenant Id

It is important to add your app before finding the Tenant Id.

![image](https://user-images.githubusercontent.com/3294100/229812333-188e497f-db5c-426c-ad1e-6fdb5e1e3b17.png)

![image](https://user-images.githubusercontent.com/3294100/229812594-e3c619cb-363d-491f-aeae-3e8e6912c70a.png)

![image](https://user-images.githubusercontent.com/3294100/229814145-9bdf006e-450e-4c14-98c6-a5b3fba690ea.png)

### Proxy URL (Optional)

If you are behind a corporate firewall or VPN you may need to utilize a proxy server. Enter a valid proxy server address on your network, e.g. `http://your-proxy-server.com:1080`

### Ralte Limit (Optional)
For Teambition, we suggest you setting the rate limit to 5000

### Test and Save Connection
Click `Test Connection`, if the connection is successful, click `Save Connection` to add the connection.

## Step 2 - Configure Blueprint

Similar to other beta plugins, Teambition does not support `project`, which means, you can only collect Teambition data via blueprint's advanced mode.

Please go to the `Blueprints` page and switch to advanced mode. See how to use advanced mode and JSON [examples](AdvancedMode.md#11-teambition).

## Troubleshooting

If you run into any problem, please check the [Troubleshooting](/Troubleshooting/Configuration.md) or [create an issue](https://github.com/apache/incubator-devlake/issues)
