---
title: "BitBucket Data Center"
sidebar_position: 7
description: Config UI instruction for BitBucket(Data Center)
---

Visit Config UI at : `http://localhost:4000` and go to `Connections` page.

## Step 1 - Add Data Connections

![image](/img/ConfigUI/bitbucket-server-config-ui.png)

### Connection Name

Give your connection a unique name to help you identify it in the future.

### Endpoint URL

For BitBucket Data Center/Server, you do need to enter the REST API endpoint URL, which generally is `https://<bitbucket-server>/`.

DevLake will support BitBucket Server in the future.

### Username and App Password

The following permissions are required to collect data from BitBucket repositories:

- Repository read

![bitbucket-server-permissions](/img/ConfigUI/bitbucket-server-permissions.png)


### Proxy URL (Optional)

If you are behind a corporate firewall or VPN you may need to utilize a proxy server. Enter a valid proxy server address on your network, e.g. `http://your-proxy-server.com:1080`


### Fixed Rate Limit (Optional)

DevLake uses a dynamic rate limit to collect BitBucket data. You can adjust the rate limit if you want to increase or lower the speed.

The maximum rate limit for different entities in BitBucket(Cloud) [varies from 1,000 - 60,000 requests/hour](https://support.atlassian.com/bitbucket-cloud/docs/api-request-limits/). The rate limit to access repository data is 1,000 requests/hour, but we find it can still run when we input a value that exceeds 1,000. You can try using a larger rate limit if you have large repositories.

<!-- ![image](https://user-images.githubusercontent.com/3294100/220094172-9e8e9e8b-75ea-4c3e-8e5b-716320dabb64.png) -->


### Test and Save Connection

Click `Test Connection`, if the connection is successful, click `Save Connection` to add the connection.

## Step 2 - Configure Blueprint

![image](https://user-images.githubusercontent.com/14050754/224308925-449a4d3e-ed52-45e9-bb72-0d2892df374f.png)

### Repositories

Select the BitBucket repositories to collect.

### Data Entities

Usually, you don't have to modify this part. However, if you don't want to collect certain BitBucket entities, you can unselect some entities to accelerate the collection speed.

- Source Code Management: BitBucket repos, commits, etc.
- Code Review: BitBucket PRs, PR comments, etc.

## Step 3 - Setting Sync Policy

You can choose how often you would like to sync your data in this step by selecting a sync frequency option or entering a cron code to specify your prefered schedule.

## Troubleshooting

If you run into any problems, please check the [Troubleshooting](/Troubleshooting/Configuration.md) or [create an issue](https://github.com/apache/incubator-devlake/issues).
