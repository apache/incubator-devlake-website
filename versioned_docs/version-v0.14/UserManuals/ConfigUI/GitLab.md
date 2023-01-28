---
title: "Configuring GitLab"
sidebar_position: 3
description: Config UI instruction for GitLab
---

Visit config-ui: `http://localhost:4000`.
### Step 1 - Add Data Connections
![gitlab-add-data-connections](/img/ConfigUI/gitlab-add-data-connections.png)

#### Connection Name
Name your connection.

#### Endpoint URL
This should be a valid REST API endpoint. 
   - If you are using gitlab.com, the endpoint will be `https://gitlab.com/api/v4/`
   - If you are self-hosting GitLab, the endpoint will look like `https://gitlab.example.com/api/v4/`
The endpoint url should end with `/`.

#### Auth Token(s)
GitLab personal access tokens are required to add a connection. Learn about [how to create a GitLab personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).

###### Rate Limit
The data collection speed is restricted by the **rate limit of [120,000 requests/hour](https://docs.gitlab.com/ee/user/gitlab_com/index.html#gitlabcom-specific-rate-limits)** for GitLab Cloud. Tokens under the same IP address share the rate limit, so the actual rate limit for your token will be lower than this number.

#### Proxy URL (Optional)
If you are behind a corporate firewall or VPN you may need to utilize a proxy server. Enter a valid proxy server address on your network, e.g. `http://your-proxy-server.com:1080`

#### Test and Save Connection
Click `Test Connection`, if the connection is successful, click `Save Connection` to add the connection.


### Step 2 - Setting Data Scope

![image](https://user-images.githubusercontent.com/3294100/199533780-f506b308-6808-499c-90db-b39fcda27888.png)

#### Projects
Choose the Gitlab projects to collect. Limited by GitLab API, You need to type more than 2 characters to search.

* If you want to collect public repositories in GitLab, please uncheck "Only search my repositories" to search all repositories.

#### Data Entities
Usually, you don't have to modify this part. However, if you don't want to collect certain GitLab entities, you can unselect some entities to accerlerate the collection speed.
- Issue Tracking: GitLab issues, issue comments, issue labels, etc.
- Source Code Management: GitLab repos, refs, commits, etc.
- Code Review: GitLab MRs, MR comments and reviews, etc.
- Cross Domain: GitLab accounts, etc.

### Step 3 - Adding Transformation Rules (Optional)

#### CI/CD
This set of configurations is used for calculating [DORA metrics](../DORA.md).

If you're using GitLab CI to conduct `deployments`, please select "Detect Deployment from Jobs in GitLab CI", and input the RegEx in the following fields:
- Deployment: A GitLab CI job with a name that matches the given regEx will be considered as a deployment.
- Production: A GitLab CI job with a name that matches the given regEx will be considered a job in the production environment.

By the above two fields, DevLake can identify a production deployment among massive CI jobs.

You can also select "Not using Jobs in GitLab CI as Deployments" if you're not using GitLab CI to conduct deployments.

### Step 4 - Setting Sync Frequency
You can choose how often you would like to sync your data in this step by selecting a sync frequency option or enter a cron code to specify your prefered schedule.
