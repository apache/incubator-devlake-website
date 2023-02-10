---
title: "Incoming Webhook"
sidebar_position: 7
description: Config UI instruction for Webhook
---

Visit config-ui: `http://{localhost}:4000`.

### Step 1 - Add a new incoming webhook

Go to the 'Data Connections' page. Create a webhook.

![webhook-add-data-connections](/img/ConfigUI/webhook-add-data-connections.png)

We recommend that you give your webhook connection a unique name so that you can identify and manage where you have used it later.

### Step 2 - Use Webhooks

Click on Generate POST URL, and you will find four webhook URLs. Copy the ones that suit your usage into your CI or issue-tracking systems. You can always come back to the webhook page to copy the URLs later on.

![webhook-use](/img/ConfigUI/webhook-use.png)

#### Put webhook on the internet

For the new webhook to work, it needs to be accessible from the DevOps tools from which you would like to push data to DevLake. If DevLake is deployed in your private network and your DevOps tool (e.g. CircleCI) is a cloud service that lives outside of your private network, then you need to make DevLake's webhook accessible to the outside cloud service.

There're many tools for this:

- For testing and quick setup, [ngrok](https://ngrok.com/) is a useful utility that provides a publicly accessible web URL to any locally hosted application. You can put DevLake's webhook on the internet within 5 mins by following ngrok's [Getting Started](https://ngrok.com/docs/getting-started) guide. Note that, when posting to webhook, you may need to replace the `localhost` part in the webhook URL with the forwarding URL that ngrok provides.
- If you prefer DIY, please checkout open-source reverse proxies like [fatedier/frp](https://github.com/fatedier/frp) or go for the classic [nginx](https://www.nginx.com/).

## Troubleshooting

If you run into any problem, please check the [Troubleshooting](/Troubleshooting/Configuration.md) or [create an issue](https://github.com/apache/incubator-devlake/issues)
