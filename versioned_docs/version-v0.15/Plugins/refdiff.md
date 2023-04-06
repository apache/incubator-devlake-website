---
title: "RefDiff"
description: >
  RefDiff Plugin
---

## Summary

RefDiff is a plugin that performs calculation tasks and has 2 main purposes.

- Calculate the difference in commits between releases/tags to [analyze the amount of code in each release](https://github.com/apache/incubator-devlake/blob/main/plugins/refdiff/tasks/commit_diff_calculator.go)
- Calculate the difference in commits between deployments to [calculate DORA metrics](https://github.com/apache/incubator-devlake/blob/main/plugins/refdiff/tasks/project_deployment_commit_diff_calculator.go)

And the output of RefDiff is stored in the table commits_diffs, finished_commits_diffs, ref_commits.

## Important Note

You need to run `gitextractor` before the `refdiff` plugin. The `gitextractor` plugin should create records in the `refs` table in your database before this plugin can be run.

## Configuration

This is an enrichment plugin based on the domain layer data, no configuration is needed.

## How to use refdiff

To trigger the enrichment, you need to insert a new task into your pipeline.

1. Make sure `commits` and `refs` are collected into your database, `refs` table should contain records like following:
   ```
   id                                            ref_type
   github:GithubRepo:1:384111310:refs/tags/0.3.5   TAG
   github:GithubRepo:1:384111310:refs/tags/0.3.6   TAG
   github:GithubRepo:1:384111310:refs/tags/0.5.0   TAG
   github:GithubRepo:1:384111310:refs/tags/v0.0.1  TAG
   github:GithubRepo:1:384111310:refs/tags/v0.2.0  TAG
   github:GithubRepo:1:384111310:refs/tags/v0.3.0  TAG
   github:GithubRepo:1:384111310:refs/tags/v0.4.0  TAG
   github:GithubRepo:1:384111310:refs/tags/v0.6.0  TAG
   github:GithubRepo:1:384111310:refs/tags/v0.6.1  TAG
   ```
2. If you want to run calculatePrCherryPick, please configure GITHUB_PR_TITLE_PATTERN in .env, you can check the example in .env.example(we have a default value, please make sure your pattern is disclosed by single quotes '')
3. And then, trigger a pipeline like the following format:

```shell
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "test-refdiff",
    "plan": [
        [
            {
                "plugin": "refdiff",
                "options": {
                    "repoId": "github:GithubRepo:1:384111310",
                    "pairs": [
                       { "newRef": "refs/tags/v0.6.0", "oldRef": "refs/tags/0.5.0" },
                       { "newRef": "refs/tags/0.5.0", "oldRef": "refs/tags/0.4.0" }
                    ],
                    "tasks": [
                        "calculateCommitsDiff",
                        "calculateIssuesDiff",
                        "calculatePrCherryPick",
                    ]
                }
            }
        ]
    ]
}'
```

Or if you preferred calculating latest releases

```shell
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "test-refdiff",
    "plan": [
        [
            {
                "plugin": "refdiff",
                "options": {
                    "repoId": "github:GithubRepo:1:384111310",
                    "tagsPattern": "v\d+\.\d+.\d+",
                    "tagsLimit": 10,
                    "tagsOrder": "reverse semver",
                    "tasks": [
                        "calculateCommitsDiff",
                        "calculateIssuesDiff",
                        "calculatePrCherryPick",
                    ]
                }
            }
        ]
    ]
}'
```

## How to use refdiff in DORA

RefDiff can be called by the [DORA plugin](https://github.com/apache/incubator-devlake/tree/main/plugins/dora) to support the calculation of [DORA metrics](https://devlake.apache.org/docs/UserManuals/DORA). RefDiff has a subtask called 'calculateProjectDeploymentCommitsDiff'. This subtask takes the `project_name` from task options to calculate the commits diff between two consecutive deployments in this project. That is to say, refdiff will generate the relationship between `deployed commit(s)` and the `deployment` in which these commits get deployed.

```shell
curl 'http://localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "test-refdiff-dora",
    "plan": [
        [
            {
                "plugin": "refdiff",
                "options": {
                    "projectName": "project_name_1",
                    "tasks": [
                        "calculateProjectDeploymentCommitsDiff"
                    ]
                }
            }
        ]
    ]
}'
```

## Development

This plugin depends on `libgit2`, you need to install version 1.3.0 in order to run and debug this plugin on your local
machine. [Click here](./gitextractor.md#Development) for a brief guide.

<br/><br/><br/>
