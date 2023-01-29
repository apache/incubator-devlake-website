# Apache DevLake Website

This project keeps all sources used for building up DevLake's official website which is served at https://devlake.apache.org/.

## Prerequisite

Please also make sure your node version is 16.14+, version lower than 16.14.x is not supported yet.
 
## 💻 Start contributing from any browser or Chromebook

 Start developing and make changes to the code via a single click without any prior setup for free **Anytime-Anywhere**!

 [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/apache/incubator-devlake-website)

 Some *Recommendations* while using **Gitpod**:

 - Download the [gitpod browser extension](https://www.gitpod.io/docs/configure/user-settings/browser-extension) to start working on any branch,issue or PR via a single click in under a minute!
 - To enjoy *BLAZINGLY FAST* startup times while developing on your forked branches, consider [enabling prebuilds by installing Gitpod's GitHub App](https://www.gitpod.io/docs/configure/projects/prebuilds/#configuring-prebuilds-manually)

 ---
## Installation

**_NOTE:_** You can follow the below instructions to setup your developer environment in your `local machine` or use the `gitpod` method specified above to code without any prior setup ⚡️ as suggested above as well!

1. Run `yarn install` or `yarn` in the root directory to install the dependencies.
2. Run `yarn start` in the root directory to start a local server, you will see the website in http://localhost:3000.

Make sure you have the `node` version `>=16.14`. If you have a lower version of node installed, you may consider setting up `nvm` to allow different versions of `node` coexisting on your machine.

1. Follow the [instructions](http://nvm.sh) to install and setup nvm
2. Run `nvm install v16.14` to install node v16.14
3. Run `nvm use v16.14` to switch the working environment to node v16

## How to send a PR

### Step 1 - Fork the repo

1. Visit the DevLake repo: https://github.com/apache/incubator-devlake;
2. Click the Fork button to create a fork of the DevLake.
3. We assume your fork is called `https://github.com/{user}/{repo}`.


### Step 2 - Clone the repo

1. Create your clone locally

```sh
mkdir -p ${WORKING_PATH}
cd ${WORKING_PATH}
# You can also use the url: git@github.com:merico-dev/lake.git
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
origin  git@github.com:merico-dev/lake.git (fetch)
origin  git@github.com:merico-dev/lake.git (push)
upstream        https://github.com/apache/incubator-devlake.git (fetch)
upstream        no_push (push)
```

### Step 3 - Keep your branch in sync

You will often need to update your local code to keep in sync with upstream

```sh
git fetch upstream
git checkout main
git rebase upstream/main
```

### Step 4 - Coding

First, you need to pull a new branch, the name is according to your own taste.

```sh
git checkout -b feat-xxx
```

Then start coding.

### Step 5 - Commit & Push

```sh
git add <file>
git commit -s -m "some description here"
git push -f origin feat-xxx
```
#### Note: 
1. Do not use `git add .` to commit all the changes.
2. Just push your changed files, such as:
  * `*.md`
  * blog.js or docs.js or site.js
3. Send a PR to **main** branch.

## Blog Submission

We'd love to hear your thoughts both in creating and using DevLake! To submit a blog post to DevLake Blog, please follow the instructions [here](https://devlake.apache.org/community/make-contribution/BlogSubmission/).
