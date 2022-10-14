---
title: "Configuring Webhook"
sidebar_position: 7
description: Config UI instruction for Webhook
---

Visit config-ui via the Domain Name or IP Address and Port, 

### Add a new webhook
![image](https://user-images.githubusercontent.com/3294100/191309840-460fbc9c-15a1-4b12-a510-9ed5ccd8f2b0.png)

#### Webhook name
We recommand that you give your webhook connection a unique name so that you can identify and manage where you have used it later.

### Use Webhooks
After clicking on "Generate POST URL", you will find four webhook URLs. Copy the ones that suits your usage into your CI or issue tracking systems. You can always come back to the webhook page to copy the URLs later on.

![image](https://user-images.githubusercontent.com/3294100/191400110-327c153f-b236-47e3-88cc-85bf8fcae310.png)

For more usage: [plugins/webhook](/Plugins/webhook.md).


### Webhook Accessibility

In real-world scenarios, most likely, you would like to call the webhook API from another machine inside some CI/CD scripts. The CI/CD Machine may be located in the same Internal Network or provided by a Cloud Service. 

In any case, the only rule is to make sure the CI/CD Machine could reach the config-ui instance.

  - Access the config-ui via IP Address or Domain Name that is accessible from the CI/CD Machine, since the Webhook FQDN is generated based on the Browser URL. In other words, `localhost` and `127.0.0.1` might not work.
  - If you set up Apache DevLake as [Internal Deployment](../Authentication#internal-deployment-recommended) and the CI/CD Machine belongs to a Cloud Service Provider, you may have to switch to `Internet Deployment` or employ reverse-proxy software like [fatedier/frp](https://github.com/fatedier/frp).
