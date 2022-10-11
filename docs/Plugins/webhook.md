---
title: "Webhook"
description: >
  Webhook Plugin
---

## Overview 

An Incoming Webhook allows users to actively push data to DevLake. It's particularly useful when DevLake is missing the plugin that pulls data from your DevOps tool.

When you create an Incoming Webhook within DevLake, DevLake generates a unique URL. You can post JSON payloads to this URL to push data to DevLake.

As of v0.14.0, users can push incidents and deployments data required by DORA metrics to DevLake via Incoming Webhook.

## Creating webhooks in DevLake

### Add a new webhook
To add a new webhook, go to "Data Connections" page in config-ui and select "Issue/Deployment Incoming/Webhook".
![image](https://user-images.githubusercontent.com/3294100/191309840-460fbc9c-15a1-4b12-a510-9ed5ccd8f2b0.png)

We recommand that you give your webhook connection a unique name so that you can identify and manage where you have used it later.

After clicking on "Generate POST URL", you will find four webhook URLs. Copy the ones that suits your usage into your CI or issue tracking systems. You can always come back to the webhook page to copy the URLs later on.

![image](https://user-images.githubusercontent.com/3294100/191400110-327c153f-b236-47e3-88cc-85bf8fcae310.png)

## Incident / Issue

If you want to collect issue or incident data from your system, you can use the two webhooks for issues. 

**Notice**: The URL shown in the screenshot and the following samples, `https://sample-url.com/...`, is just an example and should be replaced with the actual URL copied from your Config UI.

#### Update or Create Issues

`POST https://sample-url.com/api/plugins/webhook/1/issues`

needs to be called when an issue or incident is created. The body  should be a JSON and include columns as follows:

|          Keyname          | Require | Notes                                                        |
| :-----------------------: | :-----: | ------------------------------------------------------------ |
|         board_key         | Require | issue belongs to which board/project                         |
|            url            |         | issue's URL                                                  |
|         issue_key         | Require | issue's key, needs to be unique in a connection              |
|           title           | Require |                                                              |
|        description        |         |                                                              |
|         epic_key          |         | in which epic.                                               |
|           type            |         | type, such as bug/incident/epic/...                          |
|          status           | Require | issue's status. Must be one of `TODO` `DONE` `IN_PROGRESS`   |
|      original_status      | Require | status in your system, such as created/open/closed/...       |
|        story_point        |         |                                                              |
|      resolution_date      |         | date, Format should be 2020-01-01T12:00:00+00:00             |
|       created_date        | Require | date, Format should be 2020-01-01T12:00:00+00:00             |
|       updated_date        |         | date, Format should be 2020-01-01T12:00:00+00:00             |
|     lead_time_minutes     |         | how long from this issue accepted to develop                 |
|     parent_issue_key      |         |                                                              |
|         priority          |         |                                                              |
| original_estimate_minutes |         |                                                              |
|    time_spent_minutes     |         |                                                              |
|  time_remaining_minutes   |         |                                                              |
|        creator_id         |         | the user id of the creator                                   |
|       creator_name        |         | the user name of the creator, it will just be used to display |
|        assignee_id        |         |                                                              |
|       assignee_name       |         |                                                              |
|         severity          |         |                                                              |
|         component         |         | which component is this issue in.                            |

More information about these column at [DomainLayerIssueTracking](https://devlake.apache.org/docs/DataModels/DevLakeDomainLayerSchema#domain-1---issue-tracking).



#### Close Issues (Optional)

`POST https://sample-url.com/api/plugins/webhook/1/issue/:boardKey/:issueId/close`

needs to be called when an issue or incident is closed. Replace `:boardKey` and `:issueId` with specific strings and keep the body empty.



### Sample API Calls

Sample CURL for Issue Creating :

```
curl http://127.0.0.1:4000/api/plugins/webhook/1/issues -X 'POST' -d '{"board_key":"DLK","url":"","issue_key":"DLK-1234","title":"a feature from DLK","description":"","epic_key":"","type":"BUG","status":"TODO","original_status":"created","story_point":0,"resolution_date":null,"created_date":"2020-01-01T12:00:00+00:00","updated_date":null,"lead_time_minutes":0,"parent_issue_key":"DLK-1200","priority":"","original_estimate_minutes":0,"time_spent_minutes":0,"time_remaining_minutes":0,"creator_id":"user1131","creator_name":"Nick name 1","assignee_id":"user1132","assignee_name":"Nick name 2","severity":"","component":""}'
```

Sample CURL for Issue Closing:

```
curl http://127.0.0.1:4000/api/plugins/webhook/1/issue/DLK/DLK-1234/close -X 'POST'
```

Read more in Swagger: http://localhost:4000/api/swagger/index.html#/plugins%2Fwebhook/post_plugins_webhook__connectionId_issues. 

## Deployments

If your CI/CD tool isn't already supported by DevLake, you can insert curl commands in your CI/CD script to post deployment data to DevLake.

DevLake models CI/CD domain with two entities: Pipelines and Tasks. A pipeline has many tasks.

#### Example 1

Take GitHub Actions as an example, the screenshot below shows a GitHub Actions workflow, which consists of 6 jobs including `golangci-lint`, `unit-test`, and etc. When DevLake normalizes data from GitHub Actions, it creates the following records in the domain layer:

- 1 entry in cicd_pipelines table, corresponds to the GitHub workflow
- 6 entries in cicd_tasks table, one for each job in the GitHub workflow

![image](https://user-images.githubusercontent.com/3294100/191319143-ea5e9546-1c6d-4b2a-abba-95375cfdcec3.png)

#### Example 2

Then look at Jenkins build history, the screenshot below shows 12 Jenkins builds, and no Jenkins stages appeared. When DevLake normalizes data from Jenkins build history, it creates the following records in the domain layer:

- 12 entry in cicd_pipelines table, corresponds to the Jenkins builds

![image](https://user-images.githubusercontent.com/3294100/191319924-f05c4790-d368-4fe4-8c07-dea43e1dd2f3.png)
(Image from the Internet)

#### Example 3

Jenkins build may contain some stage. This screenshot shows 5 Jenkins builds, which consists of 1~4 stages including `Build the sudo images for installation`, `Basic Test: running from repo with preinstalled libs`, and etc. When DevLake normalizes data from Jenkins, it creates the following records in the domain layer:

* 5 entry in cicd_pipelines table, corresponds to the Jenkins builds

* 13 entry in cicd_tasks table, corresponds to the Jenkins stages

![image](https://user-images.githubusercontent.com/3294100/191320316-19e5a88f-550d-4460-b631-da634436e6e0.png)

(Image from the Internet)



After figuring out `pipeline` and `task`, we can start to add webhooks. Two hooks need to be added in shells. **Notice**: The URL shown in the following samples, `https://sample-url.com/...`, should be replaced with the actual URL copied from your Config UI.

#### Update or Create Tasks in the Pipeline

This hook should be added when the task starts and finishes. So in Example 3, we need to add 8 CURLs in the 4 tasks.

`POST https://sample-url.com/api/plugins/webhook/1/cicd_tasks`

The body should be a JSON and include columns as follows:

| Keyname       | Require | Notes                                                        |
| ------------- | ------- | ------------------------------------------------------------ |
| pipeline_name | Require | pipeline's name can be filled by any string **unique** in a connection |
| name          | Require | task's name should be **unique** in one pipeline             |
| result        | Require | one of `SUCCESS` `FAILURE` `ABORT` `IN_PROGRESS`             |
| status        | Require | one of `IN_PROGRESS` `DONE`                                  |
| type          | Require | one of `TEST` `LINT` `BUILD` `DEPLOYMENT`                    |
| environment   | Require | which type of machine did this task run in. one of `PRODUCTION` `STAGING` `TESTING` |
| started_date  | Require | date, Format should be 2020-01-01T12:00:00+00:00             |
| finished_date |         | date, Format should be 2020-01-01T12:00:00+00:00             |
| repo_id       | Require | build for which repo/project. It can be a **unique** string that you can distinguish |
| branch        |         |                                                              |
| commit_sha    |         |                                                              |

More information about these column at [DomainLayerCicdTask](https://devlake.apache.org/docs/DataModels/DevLakeDomainLayerSchema#cicd_tasks).



#### Close Pipelines

`POST https://sample-url.com/api/plugins/webhook/1/cicd_pipeline/:pipelineName/finish`

This hook should be called to tell DevLake a pipeline finish when a pipeline is completed. `:pipelineName` need to be replaced with the pipeline name in the previous webhook.

### Sample API Calls

Sample CURL for the tasks starting and finishing in deploy pipelines:

```
curl http://127.0.0.1:4000/api/plugins/webhook/1/cicd_tasks -X 'POST' -d '{"pipeline_name":"A123","name":"unit-test","result":"IN_PROGRESS","status":"IN_PROGRESS","type":"TEST","environment":"PRODUCTION","created_date":"2020-01-01T12:00:00+00:00","finished_date":"2020-01-01T12:59:59+00:00","repo_id":"devlake","branch":"main","commit_sha":"015e3d3b480e417aede5a1293bd61de9b0fd051d"}'
```

Sample CURL for pipeline completed:

```
curl http://127.0.0.1:4000/api/plugins/webhook/1/cicd_pipeline/A123/finish -X 'POST' -d ''
```

Read more in Swagger: http://localhost:4000/api/swagger/index.html#/plugins%2Fwebhook/post_plugins_webhook__connectionId_issues. 

### Sample Config in CircleCI

First, we need to know that CircleCI has three entities: pipeline, workflow, and job, and the entity workflow is the entity task in DevLake.
Second, we must get pipelines and task data from the build machine. In CircleCI, the data define in env, and we can get it by $CIRCLE_WORKFLOW_JOB_ID and so on. So we can write config to send task data in each workflow and send the close pipeline request in the last workflow.

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run:
          name: "build"
          command: |
            create_time=`date '+%Y-%m-%dT%H:%M:%S%z'`
            echo Hello, World!
            curl https://sample-url.com/api/plugins/webhook/1/cicd_tasks -X 'POST' -d "{\"pipeline_name\":\"`date '+%Y-%m-%d'`$CIRCLE_SHA1\",\"name\":\"$CIRCLE_WORKFLOW_JOB_ID\",\"result\":\"SUCCESS\",\"status\":\"DONE\",\"type\":\"BUILD\",\"environment\":\"PRODUCTION\",\"created_date\":\"$create_time\",\"finished_date\":\"`date '+%Y-%m-%dT%H:%M:%S%z'`\",\"repo_id\":\"$CIRCLE_REPOSITORY_URL\",\"branch\":\"$CIRCLE_BRANCH\",\"commit_sha\":\"$CIRCLE_SHA1\"}"

  deploy:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run:
          name: "deploy"
          command: |
            create_time=`date '+%Y-%m-%dT%H:%M:%S%z'`
            echo Hello, World!
            curl https://sample-url.com/api/plugins/webhook/1/cicd_tasks -X 'POST' -d "{\"pipeline_name\":\"`date '+%Y-%m-%d'`$CIRCLE_SHA1\",\"name\":\"$CIRCLE_WORKFLOW_JOB_ID\",\"result\":\"SUCCESS\",\"status\":\"DONE\",\"type\":\"DEPLOYMENT\",\"environment\":\"PRODUCTION\",\"created_date\":\"$create_time\",\"finished_date\":\"`date '+%Y-%m-%dT%H:%M:%S%z'`\",\"repo_id\":\"$CIRCLE_REPOSITORY_URL\",\"branch\":\"$CIRCLE_BRANCH\",\"commit_sha\":\"$CIRCLE_SHA1\"}"
      - run:
          name: "close pipeline"
          command: |
            env
            curl https://sample-url.com/api/plugins/webhook/1/cicd_pipeline/`date '+%Y-%m-%d'`$CIRCLE_SHA1/finish -X 'POST' -d ''
          when: always

workflows:
  say-hello-workflow:
    jobs:
      - build
      - deploy
```



Actually, we finish the webhook in prev step. If we want to do more, the config in CircleCI is as fellow. It will call webhook before tasks start and after tasks fail.
```yaml
# Use the latest 2.1 version of CircleCI pipeline process engine.
# See: https://circleci.com/docs/2.0/configuration-reference
version: 2.1

# Define a job to be invoked later in a workflow.
# See: https://circleci.com/docs/2.0/configuration-reference/#jobs
jobs:
  build:
    # Specify the execution environment. You can specify an image from Dockerhub or use one of our Convenience Images from CircleCI's Developer Hub.
    # See: https://circleci.com/docs/2.0/configuration-reference/#docker-machine-macos-windows-executor
    docker:
      - image: cimg/base:stable
    # Add steps to the job
    # See: https://circleci.com/docs/2.0/configuration-reference/#steps
    steps:
      - checkout
      - run:
          name: "build"
          command: |
            create_time=`date '+%Y-%m-%dT%H:%M:%S%z'`
            curl https://sample-url.com/api/plugins/webhook/1/cicd_tasks -X 'POST' -d "{……\"result\":\"IN_PROGRESS\",\"status\":\"IN_PROGRESS\"……}"
            echo Hello, World!
            sleep $[ ( $RANDOM % 10 )  + 1 ]
            curl https://sample-url.com/api/plugins/webhook/1/cicd_tasks -X 'POST' -d "{\"result\":\"SUCCESS\",\"status\":\"DONE\",……}"
      - run:
          name: "send fail"
          command: |
            curl https://sample-url.com/api/plugins/webhook/1/cicd_tasks -X 'POST' -d "{\"result\":\"FAILURE\",\"status\":\"DONE\"……}"
          when: on_fail

  deploy:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run:
          name: "deploy"
          command: |
          …… # the same as before
      - run:
          name: "send fail"
          command: |
          …… # the same as before
          when: on_fail 
      - run:
          name: "close pipeline"
          command: |
            env
            curl https://sample-url.com/api/plugins/webhook/1/cicd_pipeline/`date '+%Y-%m-%d'`$CIRCLE_SHA1/finish -X 'POST' -d ''
          when: always

# Invoke jobs via workflows
# See: https://circleci.com/docs/2.0/configuration-reference/#workflows
workflows:
  say-hello-workflow:
    jobs:
      - build
      - deploy
```
