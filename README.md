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

1. Do not use `git add .` to commit all the changes.
2. Just push your changed files, such as:
  * `*.md`
  * blog.js or docs.js or site.js
3. Send a PR to **main** branch.

For detailed steps to create a PR, please refer: [Development Workflow page](/community/MakingContributions/development-workflow/)

## Blog Submission

We'd love to hear your thoughts both in creating and using DevLake! To submit a blog post to DevLake Blog, please follow the instructions [here](community/MakingContributions/BlogSubmission/).
