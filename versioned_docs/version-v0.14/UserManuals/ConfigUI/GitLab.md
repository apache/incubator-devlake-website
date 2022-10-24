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


#### Proxy URL (Optional)
If you are behind a corporate firewall or VPN you may need to utilize a proxy server. Enter a valid proxy server address on your network, e.g. `http://your-proxy-server.com:1080`

#### Test and Save Connection
Click `Test Connection`, if the connection is successful, click `Save Connection` to add the connection.


### Step 2 - Setting Data Scope

#### Projects
Enter the GitLab repos to collect. How to get `GitLab` repos?
- Visit the repository page on GitLab
- Find the project id below the title

![Get GitLab projects](https://user-images.githubusercontent.com/3789273/128568416-a47b2763-51d8-4a6a-8a8b-396512bffb03.png)

If you want to collect more than 1 repo, please separate repos with comma. For example, "apache/incubator-devlake,apache/incubator-devlake-website".

#### Data Entities
Usually, you don't have to modify this part. However, if you don't want to collect certain GitLab entities, you can unselect some entities to accerlerate the collection speed.
- Issue Tracking: GitLab issues, issue comments, issue labels, etc.
- Source Code Management: GitLab repos, refs, commits, etc.
- Code Review: GitLab MRs, MR comments and reviews, etc.
- Cross Domain: GitLab accounts, etc.

### Step 3 - Adding Transformation Rules (Optional)
There are no transformation rules for GitLab repos.

### Step 4 - Setting Sync Frequency
You can choose how often you would like to sync your data in this step by selecting a sync frequency option or enter a cron code to specify your prefered schedule.
