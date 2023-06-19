---
title: "GitHub"
description: >
  GitHub Plugin
---



## Summary

This plugin gathers data from `GitHub` to display information to the user in `Grafana`. We can help tech leaders answer such questions as:

- Is this month more productive than last?
- How fast do we respond to customer requirements?
- Was our quality improved or not?

## Metrics

Here are some examples metrics using `GitHub` data:
- Avg Requirement Lead Time By Assignee
- Bug Count per 1k Lines of Code
- Commit Count over Time

## Screenshot

![image](/img/Plugins/github-demo.png)


## Configuration
- Configuring GitHub via [config-ui](/UserManuals/ConfigUI/GitHub.md).

## Sample Request
To collect data, select `Advanced Mode` on the `Create Pipeline Run` page and paste a JSON config like the following:

```json
[
  [
    {
      "plugin": "github",
      "options": {
        "connectionId": 1,
        "repo": "lake",
        "owner": "merico-dev"
      }
    }
  ]
]
```

You can also trigger data collection by making a POST request to `/pipelines`.
```
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "github 20211126",
    "plan": [[{
        "plugin": "github",
        "options": {
            "connectionId": 1,
            "repo": "lake",
            "owner": "merico-dev"
        }
    }]]
}
'
```
