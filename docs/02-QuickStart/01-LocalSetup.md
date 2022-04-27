---
title: "Local Setup"
linkTitle: "Local Setup"
tags: []
categories: []
weight: 1
description: >
  The steps to install DevLake locally.
---


- If you only plan to run the product locally, this is the **ONLY** section you should need.
- Commands written `like this` are to be run in your terminal.

#### Required Packages to Install<a id="user-setup-requirements"></a>

- [Docker](https://docs.docker.com/get-docker)
- [docker-compose](https://docs.docker.com/compose/install/)

NOTE: After installing docker, you may need to run the docker application and restart your terminal

#### Commands to run in your terminal<a id="user-setup-commands"></a>

**IMPORTANT: DevLake doesn't support Database Schema Migration yet,  upgrading an existing instance is likely to break, we recommend that you deploy a new instance instead.**

1. Download `docker-compose.yml` and `env.example` from [latest release page](https://github.com/merico-dev/lake/releases/latest) into a folder.
2. Rename `env.example` to `.env`. For Mac/Linux users, please run `mv env.example .env` in the terminal.
3. Start Docker on your machine, then run `docker-compose up -d` to start the services.
4. Visit `localhost:4000` to set up configuration files.
   >- Navigate to desired plugins on the Integrations page
   >- Please reference the following for more details on how to configure each one:<br/>
      - **jira**
      - **gitlab**
      - **jenkins**
      - **github**
   >- Submit the form to update the values by clicking on the **Save Connection** button on each form page
   >- `devlake` takes a while to fully boot up. if `config-ui` complaining about api being unreachable, please wait a few seconds and try refreshing the page.


5. Visit `localhost:4000/pipelines/create` to RUN a Pipeline and trigger data collection.


   Pipelines Runs can be initiated by the new "Create Run" Interface. Simply enable the **Data Source Providers** you wish to run collection for, and specify the data you want to collect, for instance, **Project ID** for Gitlab and **Repository Name** for GitHub.

   Once a valid pipeline configuration has been created, press **Create Run** to start/run the pipeline.
   After the pipeline starts, you will be automatically redirected to the **Pipeline Activity** screen to monitor collection activity.

   **Pipelines** is accessible from the main menu of the config-ui for easy access.

   - Manage All Pipelines: `http://localhost:4000/pipelines`
   - Create Pipeline RUN: `http://localhost:4000/pipelines/create`
   - Track Pipeline Activity: `http://localhost:4000/pipelines/activity/[RUN_ID]`

   For advanced use cases and complex pipelines, please use the Raw JSON API to manually initiate a run using **cURL** or graphical API tool such as **Postman**. `POST` the following request to the DevLake API Endpoint.

    ```json
    [
        [
            {
                "plugin": "github",
                "options": {
                    "repo": "lake",
                    "owner": "merico-dev"
                }
            }
        ]
    ]
    ```

   Please refer to this wiki [How to trigger data collection](https://github.com/merico-dev/lake/wiki/How-to-use-the-triggers-page).

6. Click *View Dashboards* button in the top left when done, or visit `localhost:3002` (username: `admin`, password: `admin`).

   We use <a href="https://grafana.com/" target="_blank">Grafana</a> as a visualization tool to build charts for the <a href="https://github.com/merico-dev/lake/wiki/DataModel.Domain-layer-schema">data stored in our database</a>. Using SQL queries, we can add panels to build, save, and edit customized dashboards.

   All the details on provisioning and customizing a dashboard can be found in the **Grafana Doc**

#### Setup cron job

To synchronize data periodically, we provide **lake-cli** for easily sending data collection requests along with **a cron job** to periodically trigger the cli tool.
<br/><br/><br/>
