---
title: "GitLab"
description: >
  GitLab Plugin
---


## Metrics

| Metric Name                 | Description                                                  |
|:----------------------------|:-------------------------------------------------------------|
| Pull Request Count          | Number of Pull/Merge Requests                                |
| Pull Request Pass Rate      | Ratio of Pull/Merge Review requests to merged                |
| Pull Request Reviewer Count | Number of Pull/Merge Reviewers                               |
| Pull Request Review Time    | Time from Pull/Merge created time until merged               |
| Commit Author Count         | Number of Contributors                                       |
| Commit Count                | Number of Commits                                            |
| Added Lines                 | Accumulated Number of New Lines                              |
| Deleted Lines               | Accumulated Number of Removed Lines                          |
| Pull Request Review Rounds  | Number of cycles of commits followed by comments/final merge |

## Configuration
Configuring GitLab via [config-ui](/UserManuals/ConfigUI/GitLab.md).

## Gathering Data with GitLab

To collect data, you can either utilize the `config-ui` or make a POST request to `/pipelines`

```
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "gitlab 20211126",
    "plan": [[{
        "plugin": "gitlab",
        "options": {
            "connectionId": 1,
            "projectId": <Your gitlab project id>
        }
    }]]
}
'
```

<br/><br/><br/>
