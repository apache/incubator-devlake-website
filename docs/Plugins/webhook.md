---
title: "Webhook"
description: >
  Webhook Plugin
---

## Summary

[Webhooks](https://en.wikipedia.org/wiki/Webhook) are user-defined HTTP callbacks that can be used for causing an event on one site that will trigger certain behavior on another site. They can be triggered in your deployment and bug recording systems, such as build shells in Jenkins or Jira. 

![webhook](https://user-images.githubusercontent.com/3294100/191303047-b66ece00-5095-420e-b52a-b61146de0d43.png)
(Image from the Internet)

While using webhooks in DevLake, your systems play the roles of system A as shown in the above image, and Apache DevLake as system B. You can use webhooks to:

* record bugs or incidents when DevLake cannot collect data from issue applications directly.
* detect code deployments by using custom deploy-time measurement 

DevLake does not limit the number of webhook requests. **But be aware** that your Database or other servers may not handle unlimited requests.

## Configuration
Configuring webhooks via the Config UI.

First, you can create a webhook connection from the Integration page. 
![image](https://user-images.githubusercontent.com/3294100/191309840-460fbc9c-15a1-4b12-a510-9ed5ccd8f2b0.png)

We recommand that you give your webhook connection a unique name so that you can identify and manage where you have used it later.

After cicking on "Generate POST URL", you will find four webhook URLs. Copy the ones that suits your usage into your CI or issue tracking systems. You can always come back to the webhook page to copy the URLS later on.

![image](https://user-images.githubusercontent.com/3294100/191400110-327c153f-b236-47e3-88cc-85bf8fcae310.png)



## Incident / Issue

If you want to collect issue or incident data from your system, you can use the two webhooks for issues. 

**Notice**: The URL shown in the screenshot and the following samples, `https://sample-url.com/...`, is just an example and should be replaced with the actual URL copied from your Config UI.

#### Update or Create Issues

`POST https://sample-url.com/api/plugins/webhook/1/issues`

needs to be called when an issue or incident is created. The body includes columns as follows:

```
board_key: issue belongs to which board/project
url(Optional):  issue's URL
issue_key: issue's key, needs to be unique in a connection
title
description(Optional)
epic_key(Optional): in which epic.
type(Optional): type, such as bug/incident/epic/...
status: issue's status. Must be one of TODO DONE IN_PROGRESS
original_status:  status in your system, such as created/open/closed/...
story_point(Optional)
resolution_date(Optional): date, Format should be 2020-01-01T12:00:00+00:00
created_date: date, Format should be 2020-01-01T12:00:00+00:00
updated_date(Optional): date, Format should be 2020-01-01T12:00:00+00:00
lead_time_minutes(Optional): how long from this issue accepted to develop
parent_issue_key(Optional)
priority(Optional)
original_estimate_minutes(Optional)
time_spent_minutes(Optional)
time_remaining_minutes(Optional)
creator_id(Optional): the user id of the creator
creator_name(Optional): the user name of the creator, it will just be used to display
assignee_id(Optional)
assignee_name(Optional)
severity(Optional)
component(Optional): which component is this issue in.
```



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

Adding pipeline webhook in your deploy shells will help you collect data into DevLake.

First, let us know there are two entities: Tasks and Pipelines. A pipeline means one build or deployment, and a pipeline may have more than one task.

![image](https://user-images.githubusercontent.com/3294100/191319143-ea5e9546-1c6d-4b2a-abba-95375cfdcec3.png)

(Example 1)

For example, we can find 6 tasks like `golangci-lint` and `unit-test` in one GitHub pipeline.

![image](https://user-images.githubusercontent.com/3294100/191319924-f05c4790-d368-4fe4-8c07-dea43e1dd2f3.png)

(Example 2. Image from the Internet)

In Example 2, we can find 12 Jenkins pipelines.

![image](https://user-images.githubusercontent.com/3294100/191320316-19e5a88f-550d-4460-b631-da634436e6e0.png)

(Example 3. Image from the Internet)

In Example 3, we can find 5 Jenkins pipelines, and these pipelines have 1~4 task(s).



After figuring out `pipeline` and `task`, we can start to add webhooks. Two hooks need to be added in shells. **Notice**: The URL shown in the following samples, `https://sample-url.com/...`, should be replaced with the actual URL copied from your Config UI.

#### Update or Create Tasks in the Pipeline

This hook should be added when the task starts and finishes. So in Example 3, we need to add 8 CURLs in the 4 tasks.

`POST https://sample-url.com/api/plugins/webhook/1/cicd_tasks`

The body should be a JSON and include columns as follows:

```
pipeline_name: pipeline's name can be filled by any string unique in a connection
name: task's name should be unique in one pipeline
result: Must be one of SUCCESS FAILURE ABORT IN_PROGRESS
status: Must be one of IN_PROGRESS DONE
type: one of TEST LINT BUILD DEPLOYMENT
environment: which type of machine did this task run in. one of PRODUCTION STAGING TESTING
started_date: date, Format should be 2020-01-01T12:00:00+00:00
finished_date(Optional): date, Format should be 2020-01-01T12:00:00+00:00
repo_id: build for which repo/project. It can be a unique string that you can distinguish
branch(Optional)
commit_sha(Optional)
```



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
