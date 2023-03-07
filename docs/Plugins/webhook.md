---
title: "Webhook"
description: >
  Webhook Plugin
---

## Summary

Incoming Webhooks are your solution to bring data to Apache DevLake when there isn't a specific plugin ready for your DevOps tool. An Incoming Webhook allows users to actively push data to DevLake.

When you create an Incoming Webhook within DevLake, DevLake generates a unique URL. You can then post JSON payloads to this URL to push data directly to your DevLake instance.

In v0.14+, users can push "incidents" and "deployments" required by DORA metrics to DevLake via Incoming Webhooks.

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

|     Key     | Required | Notes                                                        |
| :---------: | :------: | ------------------------------------------------------------ |
| commit_sha  |  ✔️ Yes   | the sha of the deployment commit                             |
|  repo_url   |  ✔️ Yes   | the repo URL of the deployment commit<br />If there is a row in the domain layer  table `repos` where `repos.url` equals `repo_url`, the `repoId` will be filled with `repos.id`. |
| environment |   ✖️ No   | the environment this deployment happens. For example, `PRODUCTION` `STAGING` `TESTING` `DEVELOPMENT`. <br/>The default value is `PRODUCTION` |
| start_time  |   ✖️ No   | Time. Eg. 2020-01-01T12:00:00+00:00<br/> No default value.   |
|  end_time   |   ✖️ No   | Time. Eg. 2020-01-01T12:00:00+00:00<br/>The default value is the time when DevLake receives the POST request. |

#### Register a Deployment - Sample API Calls

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

If you have set a [username/password](GettingStarted/Authentication.md) for Config UI, you'll need to add them to the curl command to register a `deployment`:

```
curl https://sample-url.com/api/plugins/webhook/1/deployments -X 'POST' -u 'username:password' -d '{
    "commit_sha":"015e3d3b480e417aede5a1293bd61de9b0fd051d",
    "repo_url":"https://github.com/apache/incubator-devlake/",
    "environment":"PRODUCTION",
    "start_time":"2020-01-01T12:00:00+00:00",
    "end_time":"2020-01-02T12:00:00+00:00"
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

### Incident / Issue

If you want to collect issue or incident data from your system, you can use the two webhooks for issues.

#### Register Issues - Update or Create Issues

`POST https://sample-url.com/api/plugins/webhook/1/issues`

needs to be called when an issue or incident is created. The body should be a JSON and include columns as follows:

|          Keyname          | Required | Notes                                                         |
| :-----------------------: | :------: | ------------------------------------------------------------- |
|            url            |  ✖️ No   | issue's URL                                                   |
|         issue_key         |  ✔️ Yes  | issue's key, needs to be unique in a connection               |
|           title           |  ✔️ Yes  |                                                               |
|        description        |  ✖️ No   |                                                               |
|         epic_key          |  ✖️ No   | in which epic.                                                |
|           type            |  ✖️ No   | type, such as bug/incident/epic/...                           |
|          status           |  ✔️ Yes  | issue's status. Must be one of `TODO` `DONE` `IN_PROGRESS`    |
|      original_status      |  ✔️ Yes  | status in your system, such as created/open/closed/...        |
|        story_point        |  ✖️ No   |                                                               |
|      resolution_date      |  ✖️ No   | date, Format should be 2020-01-01T12:00:00+00:00              |
|       created_date        |  ✔️ Yes  | date, Format should be 2020-01-01T12:00:00+00:00              |
|       updated_date        |  ✖️ No   | date, Format should be 2020-01-01T12:00:00+00:00              |
|     lead_time_minutes     |  ✖️ No   | how long from this issue accepted to develop                  |
|     parent_issue_key      |  ✖️ No   |                                                               |
|         priority          |  ✖️ No   |                                                               |
| original_estimate_minutes |  ✖️ No   |                                                               |
|    time_spent_minutes     |  ✖️ No   |                                                               |
|  time_remaining_minutes   |  ✖️ No   |                                                               |
|        creator_id         |  ✖️ No   | the user id of the creator                                    |
|       creator_name        |  ✖️ No   | the user name of the creator, it will just be used to display |
|        assignee_id        |  ✖️ No   |                                                               |
|       assignee_name       |  ✖️ No   |                                                               |
|         severity          |  ✖️ No   |                                                               |
|         component         |  ✖️ No   | which component is this issue in.                             |

More information about these columns at [DomainLayerIssueTracking](https://devlake.apache.org/docs/DataModels/DevLakeDomainLayerSchema#domain-1---issue-tracking).

#### Register Issues - Close Issues (Optional)

`POST https://sample-url.com/api/plugins/webhook/1/issue/:issueId/close`

needs to be called when an issue or incident is closed. Replace `:issueId` with specific strings and keep the body empty.

#### Register Issues - Sample API Calls

Sample CURL for Issue Creating :

```
curl https://sample-url.com/api/plugins/webhook/1/issues -X 'POST' -d '{"url":"","issue_key":"DLK-1234","title":"a feature from DLK","description":"","epic_key":"","type":"BUG","status":"TODO","original_status":"created","story_point":0,"resolution_date":null,"created_date":"2020-01-01T12:00:00+00:00","updated_date":null,"lead_time_minutes":0,"parent_issue_key":"DLK-1200","priority":"","original_estimate_minutes":0,"time_spent_minutes":0,"time_remaining_minutes":0,"creator_id":"user1131","creator_name":"Nick name 1","assignee_id":"user1132","assignee_name":"Nick name 2","severity":"","component":""}'
```

Sample CURL for Issue Closing:

```
curl http://127.0.0.1:4000/api/plugins/webhook/1/issue/DLK-1234/close -X 'POST'
```

## References

- [references](/DeveloperManuals/DeveloperSetup.md#references)
