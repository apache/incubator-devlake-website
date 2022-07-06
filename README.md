# Apache DevLake Website

This project keeps all sources used for building up DevLake's official website which is served at https://devlake.apache.org/.

## Prerequisite


Please also make sure your node version is 10+, version lower than 10.x is not supported yet.

## Installation

1. Run `yarn install` or `yarn` in the root directory to install the dependencies.
2. Run `yarn start` in the root directory to start a local server, you will see the website in http://localhost:3000.

If you have higher version of node installed, you may consider `nvm` to allow different versions of `node` coexisting on your machine.

1. Follow the [instructions](http://nvm.sh) to install nvm
2. Run `nvm install v10.23.1` to install node v10
3. Run `nvm use v10.23.1` to switch the working environment to node v10

## How to send a PR

1. Do not use `git add .` to commit all the changes.
2. Just push your changed files, such as:
  * `*.md`
  * blog.js or docs.js or site.js
3. Send a PR to **main** branch.

## Blog Submission

We'd love to hear your thoughts both in creating and using DevLake! To submit a blog post to DevLake Blog, please follow the instructions [here](https://www.devlake.io/community//BlogSubmission).
