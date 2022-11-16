---
title: "Webhook"
description: >
  Webhook Plugin
---

## Overview 

Incoming Webhooks are your solution to bring data to Apache DevLake when there isn't a specific plugin ready for your DevOps tool. An Incoming Webhook allows users to actively push data to DevLake. 

When you create an Incoming Webhook within DevLake, DevLake generates a unique URL. You can then post JSON payloads to this URL to push data directly to your DevLake instance.

In v0.14+, users can push "incidents" and "deployments" required by DORA metrics to DevLake via Incoming Webhooks.

## Creating webhooks in DevLake

### Add a new webhook
To add a new webhook, go to the "Data Connections" page in config-ui and select "Issue/Deployment Incoming/Webhook".
![](https://i.imgur.com/jq6lzg1.png)

We recommend that you give your webhook connection a unique name so that you can identify and manage where you have used it later.

After clicking on the "Generate POST URL" button, you will find several webhook URLs. You can then post to these URLs from your CI/CD tool or issue tracking system to push data directly to DevLake. You can always come back to the webhook page to access the URLs later.

![](https://i.imgur.com/jBMQnjt.png)

### Put webhook on the internet

For the new webhook to work, it needs to be accessible from the DevOps tools from which you would like to push data to DevLake. If DevLake is deployed in your private network and your DevOps tool (e.g. CircleCI) is a cloud service that lives outside of your private network, then you need to make DevLake's webhook accessible to the outside cloud service.

There're many tools for this:

  - For testing and quick setup, [ngrok](https://ngrok.com/) is a useful utility that provides a publicly accessible web URL to any locally hosted application. You can put DevLake's webhook on the internet within 5 mins by following ngrok's [Getting Started](https://ngrok.com/docs/getting-started) guide. Note that, when posting to webhook, you may need to replace the `localhost` part in the webhook URL with the forwarding URL that ngrok provides.
  - If you prefer DIY, please checkout open-source reverse proxies like [fatedier/frp](https://github.com/fatedier/frp) or go for the classic [nginx](https://www.nginx.com/).


## Register a deployment

You can copy the generated deployment curl commands to your CI/CD script to post deployments to Apache DevLake. Below is the detailed payload schema:

| Key         | Required | Notes                                                        |
| :---------: | :------: | ------------------------------------------------------------ |
| commit_sha  |  ✔️ Yes   | the sha of the deployment commit                             |
| repo_url    |  ✔️ Yes   | the repo URL of the deployment commit                        |
| environment |   ✖️ No   | the environment this deployment happens. For example, `PRODUCTION` `STAGING` `TESTING` `DEVELOPMENT`. <br/>The default value is `PRODUCTION` |
| start_time  |   ✖️ No   | Time. Eg. 2020-01-01T12:00:00+00:00<br/> No default value.|
| end_time    |   ✖️ No   | Time. Eg. 2020-01-01T12:00:00+00:00<br/>The default value is the time when DevLake receives the POST request.|


### Deployment - Sample API Calls

Sample CURL to post deployments to DevLake. The following command should be replaced with the actual curl command copied from your Config UI:

```
curl https://sample-url.com/api/plugins/webhook/1/deployments -X 'POST' -d '{
    "commit_sha":"015e3d3b480e417aede5a1293bd61de9b0fd051d",
    "repo_url":"https://github.com/apache/incubator-devlake/",
    "environment":"PRODUCTION",
    "start_time":"2020-01-01T12:00:00+00:00",
    "end_time":"2020-01-02T12:00:00+00:00"
  }'
```

If you have set a [username/password](https://devlake.apache.org/docs/UserManuals/Authentication) for Config UI, you'll need to add them to the curl command to register a `deployment`:
```
curl https://sample-url.com/api/plugins/webhook/1/deployments -X 'POST' -u 'username:password' -d '{
    "commit_sha":"015e3d3b480e417aede5a1293bd61de9b0fd051d",
    "repo_url":"https://github.com/apache/incubator-devlake/",
    "environment":"PRODUCTION",
    "start_time":"2020-01-01T12:00:00+00:00",
    "end_time":"2020-01-02T12:00:00+00:00"
  }'
```

Read more in [Swagger](https://sample-url.com/api/swagger/index.html#/plugins%2Fwebhook/post_plugins_webhook__connectionId_deployments). 



#### Deployment - A real-world example in CircleCI

The following demo shows how to post "deployments" to DevLake from CircleCI. In this example, the CircleCI job 'deploy' is used to manage deployments.


  ```
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
              echo Hello, World!

    deploy:
      docker:
        - image: cimg/base:stable
      steps:
        - checkout
        - run:
            name: "deploy"
            command: |
              # The time a deploy started
              start_time=`date '+%Y-%m-%dT%H:%M:%S%z'`

              # Some deployment tasks here ...
              echo Hello, World!

              # Send the request to DevLake after deploy
              # The values start with a '$CIRCLE_' are CircleCI's built-in variables
              curl https://sample-url.com/api/plugins/webhook/1/deployments -X 'POST' -d "{
                \"commit_sha\":\"$CIRCLE_SHA1\",
                \"repo_url\":\"$CIRCLE_REPOSITORY_URL\",
                \"start_time\":\"$start_time\"
              }"

  workflows:
    build_and_deploy_workflow:
      jobs:
        - build
        - deploy
  ```



## Incident / Issue

If you want to collect issue or incident data from your system, you can use the two webhooks for issues. 

#### Update or Create Issues

`POST https://sample-url.com/api/plugins/webhook/1/issues`

needs to be called when an issue or incident is created. The body  should be a JSON and include columns as follows:

|          Keyname          | Required | Notes                                                        |
| :-----------------------: | :------: | ------------------------------------------------------------ |
|         board_key         |  ✔️ Yes   | issue belongs to which board/project                         |
|            url            |   ✖️ No   | issue's URL                                                  |
|         issue_key         |  ✔️ Yes   | issue's key, needs to be unique in a connection              |
|           title           |  ✔️ Yes   |                                                              |
|        description        |   ✖️ No   |                                                              |
|         epic_key          |   ✖️ No   | in which epic.                                               |
|           type            |   ✖️ No   | type, such as bug/incident/epic/...                          |
|          status           |  ✔️ Yes   | issue's status. Must be one of `TODO` `DONE` `IN_PROGRESS`   |
|      original_status      |  ✔️ Yes   | status in your system, such as created/open/closed/...       |
|        story_point        |   ✖️ No   |                                                              |
|      resolution_date      |   ✖️ No   | date, Format should be 2020-01-01T12:00:00+00:00             |
|       created_date        |  ✔️ Yes   | date, Format should be 2020-01-01T12:00:00+00:00             |
|       updated_date        |   ✖️ No   | date, Format should be 2020-01-01T12:00:00+00:00             |
|     lead_time_minutes     |   ✖️ No   | how long from this issue accepted to develop                 |
|     parent_issue_key      |   ✖️ No   |                                                              |
|         priority          |   ✖️ No   |                                                              |
| original_estimate_minutes |   ✖️ No   |                                                              |
|    time_spent_minutes     |   ✖️ No   |                                                              |
|  time_remaining_minutes   |   ✖️ No   |                                                              |
|        creator_id         |   ✖️ No   | the user id of the creator                                   |
|       creator_name        |   ✖️ No   | the user name of the creator, it will just be used to display |
|        assignee_id        |   ✖️ No   |                                                              |
|       assignee_name       |   ✖️ No   |                                                              |
|         severity          |   ✖️ No   |                                                              |
|         component         |   ✖️ No   | which component is this issue in.                            |

More information about these columns at [DomainLayerIssueTracking](https://devlake.apache.org/docs/DataModels/DevLakeDomainLayerSchema#domain-1---issue-tracking).



#### Close Issues (Optional)

`POST https://sample-url.com/api/plugins/webhook/1/issue/:boardKey/:issueId/close`

needs to be called when an issue or incident is closed. Replace `:boardKey` and `:issueId` with specific strings and keep the body empty.



### Issues Sample API Calls

Sample CURL for Issue Creating :

```
curl https://sample-url.com/api/plugins/webhook/1/issues -X 'POST' -d '{"board_key":"DLK","url":"","issue_key":"DLK-1234","title":"a feature from DLK","description":"","epic_key":"","type":"BUG","status":"TODO","original_status":"created","story_point":0,"resolution_date":null,"created_date":"2020-01-01T12:00:00+00:00","updated_date":null,"lead_time_minutes":0,"parent_issue_key":"DLK-1200","priority":"","original_estimate_minutes":0,"time_spent_minutes":0,"time_remaining_minutes":0,"creator_id":"user1131","creator_name":"Nick name 1","assignee_id":"user1132","assignee_name":"Nick name 2","severity":"","component":""}'
```

Sample CURL for Issue Closing:

```
curl http://127.0.0.1:4000/api/plugins/webhook/1/issue/DLK/DLK-1234/close -X 'POST'
```

Read more in Swagger: https://sample-url.com/api/swagger/index.html#/plugins%2Fwebhook/post_plugins_webhook__connectionId_issues. 

