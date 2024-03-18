---
title: "Development Workflow"
sidebar_position: 03
---

# Development Workflow

This document shows the workflow of how to develop DevLake.

## Step 1 - Fork the repo

1. Visit the DevLake repo: https://github.com/apache/incubator-devlake;
2. Click the Fork button to create a fork of the DevLake;
3. We assume your fork is called `https://github.com/{user}/{repo}`.


## Step 2 - Clone the repo

1. Create your clone locally

```sh
mkdir -p ${WORKING_PATH}
cd ${WORKING_PATH}
# You can also use the url: github.com/apache/incubator-devlake
# if your ssh configuration is proper
git clone https://github.com/{user}/{repo}.git

cd ${PROJECT}

git remote add upstream https://github.com/apache/incubator-devlake.git
# Never push to upstream locally
git remote set-url --push upstream no_push
```

2. Confirm the remotes you've set is make sense

Execute `git remote -v` and you'll see output like below:

```sh
origin  github.com/{user}/incubator-devlake.git (fetch)
origin  github.com/{user}/incubator-devlake.git (push)
upstream        https://github.com/apache/incubator-devlake.git (fetch)
upstream        no_push (push)
```

## Step 3 - Keep your branch in sync

You will often need to update your local code to keep in sync with upstream

```sh
git fetch upstream
git checkout main
git rebase upstream/main
```

## Step 4 - Coding

First, you need to pull a new branch, the name is according to your own taste.

```sh
git checkout -b feat-xxx
```

Then start coding.

## Step 5 - Commit & Push

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