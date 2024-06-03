---
title: "Webhook"
description: >
  Webhook Plugin
---

## Summary

Incoming Webhooks are your solution to bring data to Apache DevLake when there isn't a specific plugin ready for your DevOps tool. An Incoming Webhook allows users to actively push data to DevLake.

When you create an Incoming Webhook within DevLake, DevLake generates a unique URL. You can then post JSON payloads to this URL to push data directly to your DevLake instance.

In v0.14+, users can push "incidents" and "deployments" required by DORA metrics to DevLake via Incoming Webhooks.

Webhooks are meant to be used at the lowest level that you want to relate incidents with deployments. For example, if you want to relate incidents at the individual service level, you will need a webhook per service. If you wish to relate incidents at the product level, you will need a webhook for the product. This is because incidents on a project will be related to the last deployment on the project with a timestamp that is before the incident's timestamp. This is true regardless of the source of incidents or deployments.

Note: If you post incidents using webhook due to your tool not being supported but your deployments are collected via plugins automatically, you need to re-collect data for deployments for the posted incidents to get mapped to deployments based on timestamps. This is required for Change Failure Rate (DORA) metric to show up correctly for the project.

Diagram of the relationship between incidents and deployments:

![Change Failure Reporting](/img/Metrics/cfr-definition.png)

## Entities

Check out the [Incoming Webhooks entities](/Overview/SupportedDataSources.md#data-collection-scope-by-each-plugin) collected by this plugin.

## Metrics

Metrics that can be calculated based on the data collected from Incoming Webhooks:

- [Requirement Delivery Rate](/Metrics/RequirementDeliveryRate.md)
- [Requirement Granularity](/Metrics/RequirementGranularity.md)
- [Bug Age](/Metrics/BugAge.md)
- [Bug Count per 1k Lines of Code](/Metrics/BugCountPer1kLinesOfCode.md)
- [Incident Age](/Metrics/IncidentAge.md)
- [Incident Count per 1k Lines of Code](/Metrics/IncidentCountPer1kLinesOfCode.md)
- [DORA - Deployment Frequency](/Metrics/DeploymentFrequency.md)
- [DORA - Lead Time for Changes](/Metrics/LeadTimeForChanges.md)
- [DORA - Median Time to Restore Service](/Metrics/MTTR.md)
- [DORA - Change Failure Rate](/Metrics/CFR.md)

## Configuration

- Configuring Incoming Webhooks via [Config UI](/Configuration/webhook.md)

## API Sample Request

### Deployment

If you want to collect deployment data from your system, you can use the incoming webhooks for deployment.

#### Payload Schema

You can copy the generated deployment curl commands to your CI/CD script to post deployments to Apache DevLake. Below is the detailed payload schema:

|        Key         | Required | Notes                                                                                                                                                                           |
|:------------------:|:--------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|             id     |  ✔️ Yes  | This will be the unique ID of table cicd_deployments. This key replaced pipeline_id for clarity.                           |
|    createdDate     |  ✖️ No   | The time this deploy pipeline starts. E.g. 2020-01-01T12:00:00+00:00<br/> No default value.             |
|     startedDate     |  ✔️ Yes  | The time when the first deploy to a certain repo starts. E.g. 2020-01-01T12:00:00+00:00<br/> No default value.             |
|      finishedDate   |  ✔️ Yes   | The time when the last deploy to a certain repo ends. E.g. 2020-01-01T12:00:00+00:00<br/> No default value.            |
|    environment     |  ✖️ No   | The environment this deployment happens. For example, `PRODUCTION` `STAGING` `TESTING` `DEVELOPMENT`. <br/>The default value is `PRODUCTION`                                     |
|       result       |  ✖️ No   | deployment result, one of the values : `SUCCESS`, `FAILURE`, `ABORT`, `MANUAL`, <br/> The default value is `SUCCESS`.                  |
|   displayTitle    |  ✖️ No   | A readable title for the deployment.   |
|        name        |  ✖️ No   | Deprecated.        |
|      deploymentCommits.repoUrl      |  ✔️ Yes  | The repo URL of the deployment commit<br />If there is a row in the domain layer table `repos` where `repos.url` equals `repo_url`, the `repoId` will be filled with `repos.id`. |
|      deploymentCommits.repoId       |  ✖️ No   | Deprecated.                 |
|      deploymentCommits.refName      |  ✖️ No   | The branch/tag to deploy <br/> No default value.      |
|      deploymentCommits.startedDate      |  ✔️ Yes   | The start time of the deploy to this repo. E.g. 2020-01-01T12:00:00+00:00<br/> No default value.      |
|      deploymentCommits.finishedDate      |  ✔️ Yes   | The end time of the deploy to this repo. E.g. 2020-01-01T12:00:00+00:00<br/> No default value.      |
|     deploymentCommits.commitSha     |  ✔️ Yes  | Commit sha that triggers the deploy in this repo |
|     deploymentCommits.commitMsg     |  ✖️ No   | Commit sha of the deployment commit message   |
|   deploymentCommits.result    |  ✖️ No   | The result of the deploy to this repo.            |
|   deploymentCommits.displayTitle    |  ✖️ No   | A readable title for the deployment to this repo.            |
|       deploymentCommits.name        |  ✖️ No   | Deprecated.   |

More information about these columns at the domain layer tables: [cicd_deployments](/DataModels/DevLakeDomainLayerSchema.md#cicd_deployments) and [cicd_deployment_commits](/DataModels/DevLakeDomainLayerSchema.md#cicd_deployment_commits).


#### Register a Deployment - Sample API Calls

The payload supports the deployment to one or multiple repositories (referring to the [discussion](https://github.com/apache/incubator-devlake/discussions/6162)).

Please replace the `API_KEY` with the real token generated after creating a webhook.

```
curl <devlake-host>/api/rest/plugins/webhook/1/deployments -X 'POST' -H 'Authorization: Bearer {API_KEY}' -d '{
    "id": "required-id",
    "createdDate":"2020-01-01T11:00:00+00:00",
    "startedDate":"2020-01-01T12:00:00+00:00",
    "finishedDate":"2020-01-02T13:00:00+00:00",
    "environment":"PRODUCTION",
    "result": "FAILURE",
    "displayTitle":"optional-custom-deploy-display-title",
    "name": "optional-deployment-name. If you do not post a name, DevLake will generate one for you.",
    "deploymentCommits":[
       {
           "repoUrl":"required-repo-url",
           "refName": "optional-release-v0.17",
           "startedDate":"2020-01-01T11:00:00+00:00",
           "finishedDate":"2020-01-02T11:00:00+00:00",
           "commitSha":"c1",
           "commitMsg":"optional-msg-1",
           "name":"optional, if null, it will be deployment for {commit_sha}",
           "displayTitle":"optional-custom-deployment-commit-display-title-1"
       },
       {
           "repoUrl":"repo-2",
           "refName": "optional-release-v0.17",
           "startedDate":"2020-01-01T11:00:00+00:00",
           "finishedDate":"2020-01-02T11:00:00+00:00",
           "commitSha":"c2",
           "commitMsg":"optional-msg-2",
           "name":"optional, if null, it will be deployment for {commit_sha}",
           "displayTitle":"optional-custom-deployment-commit-display-title-2"
       }
    ]
  }'
```

#### A real-world example - Push CircleCI deployments to DevLake

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
            started_date=`date '+%Y-%m-%dT%H:%M:%S%z'`

            # Some deployment tasks here ...
            echo Hello, World!

            # Send the request to DevLake after deploy
            # The values start with a '$CIRCLE_' are CircleCI's built-in variables
            curl <devlake-host>/api/rest/plugins/webhook/1/deployments -X 'POST' -d "{
              \"id\": \"$PIPELINE_ID\",
              \"startedDate\":\"$started_date\",
              \"finishedDate\":\"$finished_date\",
              \"deploymentCommits\":\[
                \{
                  \"commitSha\":\"$CIRCLE_SHA1\",
                  \"repoUrl\":\"$CIRCLE_REPOSITORY_URL\",
                \}
              \]
            }"

workflows:
  build_and_deploy_workflow:
    jobs:
      - build
      - deploy
```

### Incident / Issue

If you want to collect issue or incident data from your system, you can use the two webhooks for issues.

#### Register Issues - Update or Create Issues

`POST <devlake-host>/api/rest/plugins/webhook/1/issues`

needs to be called when an issue or incident is created. The body should be a JSON and include columns as follows:

|          Keyname          | Required | Notes                                                         |
| :-----------------------: | :------: | ------------------------------------------------------------- |
|            url            |  ✖️ No   | Issue's URL                                                   |
|         issueKey         |  ✔️ Yes  | Issue's key, needs to be unique in a connection               |
|           title           |  ✔️ Yes  |                                                               |
|        description        |  ✖️ No   |                                                               |
|         epicKey          |  ✖️ No   | Issue's epic                                                |
|           type            |  ✖️ No   | Type, such as `INCIDENT`, `BUG`, `REQUIREMENT`
|          status           |  ✔️ Yes  | Issue's status. Must be one of `TODO` `DONE` `IN_PROGRESS`    |
|      originalStatus      |  ✔️ Yes  | Status in your tool, such as created/open/closed/...        |
|        storyPoint        |  ✖️ No   |                                                               |
|      resolutionDate      |  ✖️ No   | Resolved date, Format should be 2020-01-01T12:00:00+00:00              |
|       createdDate        |  ✔️ Yes  | Created date, Format should be 2020-01-01T12:00:00+00:00              |
|       updatedDate        |  ✖️ No   | Last updated date, Format should be 2020-01-01T12:00:00+00:00              |
|     leadTimeMinutes     |  ✖️ No   | How long from this issue accepted to develop.                   |
|     parentIssueKey      |  ✖️ No   |                                                               |
|         priority          |  ✖️ No   |                                                               |
| originalEstimateMinutes |  ✖️ No   |                                                               |
|    timeSpentMinutes     |  ✖️ No   |                                                               |
|  timeRemainingMinutes   |  ✖️ No   |                                                               |
|        creatorId         |  ✖️ No   | The user id of the creator                                    |
|       creatorName        |  ✖️ No   | The username of the creator, it will just be used to display |
|        assigneeId        |  ✖️ No   |                                                               |
|       assigneeName       |  ✖️ No   |                                                               |
|         severity          |  ✖️ No   |                                                               |
|         component         |  ✖️ No   |                              |

More information about these columns at the [domain layer issues table](/DataModels/DevLakeDomainLayerSchema.md#issues).

#### Register Issues - Close Issues (Optional)

`POST <devlake-host>/api/rest/plugins/webhook/1/issue/:issueId/close`

needs to be called when an issue or incident is closed. Replace `:issueId` with specific strings and keep the body empty.

#### Register Issues - Sample API Calls

Sample CURL for creating an incident:

```
curl <devlake-host>/api/rest/plugins/webhook/1/issues -X 'POST' -d '{
  "issueKey":"DLK-1234",
  "title":"a feature from DLK",
  "description":"",
  "url":"",
  "type":"INCIDENT",
  "status":"TODO",
  "createdDate":"2020-01-01T12:00:00+00:00",
  "updatedDate":"2020-01-01T12:00:00+00:00",
  "priority":"",
  "severity":"",
  "creatorId":"user1131",
  "creatorName":"Nick name 1",
  "assigneeId":"user1132",
  "assigneeName":"Nick name 2"
}'
```

Sample CURL for Issue Closing:

```
curl <devlake-host>/api/rest/plugins/webhook/1/issue/DLK-1234/close -X 'POST'
```

## References

- [references](/DeveloperManuals/DeveloperSetup.md#references)
