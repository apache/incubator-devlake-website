---
title: "Developer Setup"
linkTitle: "Developer Setup"
tags: []
categories: []
weight: 3
description: >
  The steps to install DevLake in develper mode.
---



#### Requirements

- <a href="https://docs.docker.com/get-docker" target="_blank">Docker</a>
- <a href="https://golang.org/doc/install" target="_blank">Golang v1.17+</a>
- Make
  - Mac (Already installed)
  - Windows: [Download](http://gnuwin32.sourceforge.net/packages/make.htm)
  - Ubuntu: `sudo apt-get install build-essential`

#### How to setup dev environment
1. Navigate to where you would like to install this project and clone the repository:

   ```sh
   git clone https://github.com/merico-dev/lake.git
   cd lake
   ```

2. Install dependencies for plugins:

   - **RefDiff**

3. Install Go packages

    ```sh
	go get
    ```

4. Copy the sample config file to new local file:

    ```sh
    cp .env.example .env
    ```

5. Update the following variables in the file `.env`:

    * `DB_URL`: Replace `mysql:3306` with `127.0.0.1:3306`

5. Start the MySQL and Grafana containers:

    > Make sure the Docker daemon is running before this step.

    ```sh
    docker-compose up -d mysql grafana
    ```

6. Run lake and config UI in dev mode in two seperate terminals:

    ```sh
    # run lake
    make dev
    # run config UI
    make configure-dev
    ```

7. Visit config UI at `localhost:4000` to configure data sources.
   >- Navigate to desired plugins pages on the Integrations page
   >- You will need to enter the required information for the plugins you intend to use.
   >- Please reference the following for more details on how to configure each one:
   **jira**
   **gitlab**
   **jenkins**
   **github**

   >- Submit the form to update the values by clicking on the **Save Connection** button on each form page

8. Visit `localhost:4000/pipelines/create` to RUN a Pipeline and trigger data collection.


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


9. Click *View Dashboards* button in the top left when done, or visit `localhost:3002` (username: `admin`, password: `admin`).

   We use <a href="https://grafana.com/" target="_blank">Grafana</a> as a visualization tool to build charts for the <a href="https://github.com/merico-dev/lake/wiki/DataModel.Domain-layer-schema">data stored in our database</a>. Using SQL queries, we can add panels to build, save, and edit customized dashboards.

   All the details on provisioning and customizing a dashboard can be found in the **Grafana Doc**


10. (Optional) To run the tests:


    make test

<br/><br/><br/><br/>
