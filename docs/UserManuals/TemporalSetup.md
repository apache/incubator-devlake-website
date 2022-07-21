---
title: "Temporal Setup"
sidebar_position: 6
description: >
  The steps to install DevLake in Temporal mode.
---


Normally, DevLake would execute pipelines on a local machine (we call it `local mode`), it is sufficient most of the time. However, when you have too many pipelines that need to be executed in parallel, it can be problematic, as the horsepower and throughput of a single machine is limited.

`temporal mode` was added to support distributed pipeline execution, you can fire up arbitrary workers on multiple machines to carry out those pipelines in parallel to overcome the limitations of a single machine.

But, be careful, many API services like JIRA/GITHUB have a request rate limit mechanism. Collecting data in parallel against the same API service with the same identity would most likely hit such limit.

## How it works

1. DevLake Server and Workers connect to the same temporal server by setting up `TEMPORAL_URL`
2. DevLake Server sends a `pipeline` to the temporal server, and one of the Workers pick it up and execute it


**IMPORTANT: This feature is in early stage of development. Please use with caution**


## Temporal Demo

### Requirements

- [Docker](https://docs.docker.com/get-docker)
- [docker-compose](https://docs.docker.com/compose/install/)
- [temporalio](https://temporal.io/)

### How to setup

1. Clone and fire up  [temporalio](https://temporal.io/) services
2. Clone this repo, and fire up DevLake with command `docker-compose -f docker-compose-temporal.yml up -d`