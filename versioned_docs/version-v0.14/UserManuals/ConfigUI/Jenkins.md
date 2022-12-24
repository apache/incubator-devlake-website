---
title: "Configuring Jenkins"
sidebar_position: 5
description: Config UI instruction for Jenkins
---

Visit config-ui: `http://localhost:4000`.
### Step 1 - Add Data Connections
![jenkins-add-data-connections](/img/ConfigUI/jenkins-add-data-connections.png)

#### Connection Name
Name your connection.

#### Endpoint URL
This should be a valid REST API endpoint. Eg. `https://ci.jenkins.io/`. The endpoint url should end with `/`.

#### Username (E-mail)
Your User ID for the Jenkins Instance.

#### Password
For help on Username and Password, please see Jenkins docs on [using credentials](https://www.jenkins.io/doc/book/using/using-credentials/). You can also use "API Access Token" for this field, which can be generated at `User` -> `Configure` -> `API Token` section on Jenkins.

#### Test and Save Connection
Click `Test Connection`, if the connection is successful, click `Save Connection` to add the connection.

### Step 2 - Setting Data Scope
There is no data cope setting for Jenkins.

### Step 3 - Adding Transformation Rules (Optional)
This set of configurations is used for calculating [DORA metrics](../DORA.md).

If you're using Jenkins builds to conduct `deployments`, please select "Detect Deployment from Jenkins Builds", and input the RegEx in the following fields:
- Deployment: A Jenkins build with a name that matches the given regEx will be considered as a deployment.
- Production: A Jenkins build with a name that matches the given regEx will be considered a build in the production environment.

By the above two fields, DevLake can identify a production deployment among massive CI jobs.

You can also select "Not using Jenkins builds as Deployments" if you're not using Jenkins to conduct deployments.

### Step 4 - Setting Sync Frequency
You can choose how often you would like to sync your data in this step by selecting a sync frequency option or enter a cron code to specify your prefered schedule.
