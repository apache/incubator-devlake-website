---
title: "Jenkins"
description: >
  Jenkins Plugin
---

## Summary

This plugin collects Jenkins data through [Remote Access API](https://www.jenkins.io/doc/book/using/remote-access-api/). It then computes and visualizes various DevOps metrics from the Jenkins data.

![image](https://user-images.githubusercontent.com/61080/141943122-dcb08c35-cb68-4967-9a7c-87b63c2d6988.png)

## Metrics

| Metric Name        | Description                         |
|:-------------------|:------------------------------------|
| Build Count        | The number of builds created        |
| Build Success Rate | The percentage of successful builds |

## Configuration

In order to fully use this plugin, you will need to set various configurations via Dev Lake's `config-ui`.

### By `config-ui`

The connection section of the configuration screen requires the following key fields to connect to the Jenkins API.

## Collect Data From Jenkins

To collect data, select `Advanced Mode` on the `Create Pipeline Run` page and paste a JSON config like the following:

```json
[
  [
    {
      "plugin": "jenkins",
      "options": {
        "connectionId": 1
      }
    }
  ]
]
```

## Relationship between job and build

Build is kind of a snapshot of job. Running job each time creates a build.
