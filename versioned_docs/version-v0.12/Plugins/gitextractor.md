---
title: "GitExtractor"
description: >
  GitExtractor Plugin
---

## Summary
This plugin extracts commits and references from a remote or local git repository. It then saves the data into the database or csv files.

## Steps to make this plugin work

1. Use the Git repo extractor to retrieve data about commits and branches from your repository.
2. Use the GitHub plugin to retrieve data about Github issues and PRs from your repository.
NOTE: you can run only one issue collection stage as described in the Github Plugin README.
3. Use the [RefDiff](./refdiff.md) plugin to calculate version diff, which will be stored in `refs_commits_diffs` table.

## Sample Request

```
curl --location --request POST 'localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "git repo extractor",
    "plan": [
        [
            {
                "Plugin": "gitextractor",
                "Options": {
                    "url": "https://github.com/merico-dev/lake.git",
                    "repoId": "github:GithubRepo:384111310"
                }
            }
        ]
    ]
}
'
```
- `url`: the location of the git repository. It should start with `http`/`https` for a remote git repository and with `/` for a local one.
- `repoId`: column `id` of  `repos`.
- `proxy`: optional, http proxy, e.g. `http://your-proxy-server.com:1080`.
- `user`: optional, for cloning private repository using HTTP/HTTPS
- `password`: optional, for cloning private repository using HTTP/HTTPS
- `privateKey`: optional, for SSH cloning, base64 encoded `PEM` file
- `passphrase`: optional, passphrase for the private key


## Standalone Mode

You call also run this plugin in a standalone mode without any DevLake service running using the following command:

```
go run plugins/gitextractor/main.go -url https://github.com/merico-dev/lake.git -id github:GithubRepo:384111310 -db "merico:merico@tcp(127.0.0.1:3306)/lake?charset=utf8mb4&parseTime=True"
```

For more options (e.g., saving to a csv file instead of a db), please read `plugins/gitextractor/main.go`.

## Development

This plugin depends on `libgit2`, you need to install version 1.3.0 in order to run and debug this plugin on your local
machine. [Click here](./refdiff.md#Development) for a brief guide.

<br/><br/><br/>
