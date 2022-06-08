---
sidebar_position: 03
title: "Development Workflow"
---

# Development Use Cases

## Prerequests for development

1. Install docker

https://docs.docker.com/get-docker/

1. Clone the repository

```
git clone https://github.com/apache/incubator-devlake
```

2. Init your config file

`cp .env.example .env`

3. Install the correct version of go 

here: https://go.dev/dl/

4. Install all go dependencies

```
go version
go get
```
# Development Use Cases

## Use Case 1: I want to run this project just to see what it does

1. Run docker-compose

`docker-compose up -d`

## Use Case 2: I want to work on an existing plugin

In this case, you will need to run a few docker containers manually: 

```
docker-compose up -d mysql
docker-compose up -d grafana
docker-compose up -d config-ui
docker-compose up -d postgres
```

These are dependencies for most plugins.

Then you will need to run the plugin you want directly:

`go run ./plugin/xxx/xxx.go`

> Note: each plugin has it's own README file with more detailed instructions for you to use.

## Use Case 3: I want to work on the API

`make dev`

## Use Case 4: I want to work on the frontend

TBD

# Development Workflow

This document shows the workflow of how to develop DevLake.

## Step 1 - Clone the repo

1. Create your clone locally

```sh
mkdir -p ${WORKING_PATH}
cd ${WORKING_PATH}
# You can also use the url: git@github.com:merico-dev/lake.git
# if your ssh configuration is proper
git clone https://github.com/merico-dev/lake.git

cd lake

git remote add upstream https://github.com/apache/incubator-devlake.git
# Never push to upstream locally
git remote set-url --push upstream no_push
```

2. Confirm the remotes you've set make sense

Execute `git remote -v` and you'll see something similar to the following output:

```sh
origin  git@github.com:merico-dev/lake.git (fetch)
origin  git@github.com:merico-dev/lake.git (push)
upstream        https://github.com/apache/incubator-devlake.git (fetch)
upstream        no_push (push)
```

## Step 2 - Keep your branch in sync

You will often need to update your local code to keep in sync with upstream

```sh
git fetch upstream
git checkout main
git rebase upstream/main
```

## Step 3 - Coding

First, you need to pull a new branch, the name is according to your own taste.

```sh
git checkout -b feat-xxx
```

Then start coding.

## Step 4 - Commit & Push

```sh
git add <file>
git commit -s -m "some description here"
git push -f origin feat-xxx
```

### Style guides

##### Git Commit message

We follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) guidelines.

##### Commit tool

We use https://github.com/lintingzhen/commitizen-go to author our commits.

```
> git cz

cz-cli@4.2.4, cz-conventional-changelog@3.3.0

? Select the type of change that you're committing: (Use arrow keys)
> feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only changes
  style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  refactor: A code change that neither fixes a bug nor adds a feature
  perf:     A code change that improves performance
  test:     Adding missing tests or correcting existing tests
(Move up and down to reveal more choices)
? What is the scope of this change (e.g. component or file name): (press enter to skip)
? Write a short, imperative tense description of the change (max 93 chars):
 (23) add commit message tool
? Provide a longer description of the change: (press enter to skip)

? Are there any breaking changes? No
? Does this change affect any open issues? No
[chore/commit_message dc34f57] chore: add commit message tool
 5 files changed, 585 insertions(+), 4 deletions(-)
```


Then you can create a `pr` on GitHub.