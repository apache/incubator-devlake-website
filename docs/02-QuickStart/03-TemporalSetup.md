---
title: "Temporal Setup"
description: >
  The steps to install DevLake in develper mode.
---


Normally, DevLake would execute pipelines on local machine (we call it `local mode`), it is sufficient most of the time.However, when you have too many pipelines that need to be executed in parallel, it can be problematic, either limited by the horsepower or throughput of a single machine.

`temporal mode` was added to support distributed pipeline execution, you can fire up arbitrary workers on multiple machines to carry out those pipelines in parallel without hitting the single machine limitation.

But, be careful, many API services like JIRA/GITHUB have request rate limit mechanism, collect data in parallel against same API service with same identity would most likely hit the wall.

## How it works

1. DevLake Server and Workers connect to the same temporal server by setting up `TEMPORAL_URL`
2. DevLake Server sends `pipeline` to temporal server, and one of the Workers would pick it up and execute


**IMPORTANT: This feature is in early stage of development. Please use with caution**


## Temporal Demo

### Requirements

- [Docker](https://docs.docker.com/get-docker)
- [docker-compose](https://docs.docker.com/compose/install/)
- [temporalio](https://temporal.io/)

### How to setup

1. Clone and fire up  [temporalio](https://temporal.io/) services
2. Clone this repo, and fire up DevLake with command `docker-compose -f docker-compose-temporal.yml up -d`