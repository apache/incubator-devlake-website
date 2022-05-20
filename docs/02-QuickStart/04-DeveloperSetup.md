---
title: "Developer Setup"
description: >
  The steps to install DevLake in develper mode.
---


#### Requirements

- <a href="https://docs.docker.com/get-docker" target="_blank">Docker v19.03.10+</a>
- <a href="https://golang.org/doc/install" target="_blank">Golang v1.17+</a>
- Make
  - Mac (Already installed)
  - Windows: [Download](http://gnuwin32.sourceforge.net/packages/make.htm)
  - Ubuntu: `sudo apt-get install build-essential libssl-dev`

#### How to setup dev environment
1. Navigate to where you would like to install this project and clone the repository:

   ```sh
   git clone https://github.com/merico-dev/lake.git
   cd lake
   ```

2. Install dependencies for plugins:

   - [RefDiff](../03-Plugins/refdiff.md#development)

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

6. Start the MySQL and Grafana containers:

    > Make sure the Docker daemon is running before this step.

    ```sh
    docker-compose up -d mysql grafana
    ```

7. Run lake and config UI in dev mode in two separate terminals:

    ```sh
    # run lake
    make dev
    # run config UI
    make configure-dev
    ```

    Q: I got an error saying: `libgit2.so.1.3: cannot open share object file: No such file or directory`

    A: Make sure your program can find `libgit2.so.1.3`. `LD_LIBRARY_PATH` can be assigned like this if your `libgit2.so.1.3` is located at `/usr/local/lib`:

    ```sh
    export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib
    ```

8. Visit config UI at `localhost:4000` to configure data connections.
    - Navigate to desired plugins pages on the Integrations page
    - Enter the required information for the plugins you intend to use.
    - Refer to the following for more details on how to configure each one:
        - [Jira](../03-Plugins/jira.md)
        - [GitLab](../03-Plugins/gitlab.md)
        - [Jenkins](../03-Plugins/jenkins.md)
        - [GitHub](../03-Plugins/github.md): For users who'd like to collect GitHub data, we recommend reading our [GitHub data collection guide](../04-UserManuals/github-user-guide-v0.10.0.md) which covers the following steps in detail.
    - Submit the form to update the values by clicking on the **Save Connection** button on each form page

9. Visit `localhost:4000/pipelines/create` to RUN a Pipeline and trigger data collection.


   Pipelines Runs can be initiated by the new "Create Run" Interface. Simply enable the **Data Connection Providers** you wish to run collection for, and specify the data you want to collect, for instance, **Project ID** for Gitlab and **Repository Name** for GitHub.

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

   Please refer to [Pipeline Advanced Mode](../04-UserManuals/create-pipeline-in-advanced-mode.md) for in-depth explanation.


10. Click *View Dashboards* button in the top left when done, or visit `localhost:3002` (username: `admin`, password: `admin`).

   We use <a href="https://grafana.com/" target="_blank">Grafana</a> as a visualization tool to build charts for the <a href="https://github.com/merico-dev/lake/wiki/DataModel.Domain-layer-schema">data stored in our database</a>. Using SQL queries, we can add panels to build, save, and edit customized dashboards.

   All the details on provisioning and customizing a dashboard can be found in the [Grafana Doc](../04-UserManuals/GRAFANA.md).

11. (Optional) To run the tests:

    ```sh
    make test
    ```

12. For DB migrations, please refer to [Migration Doc](../04-UserManuals/MIGRATIONS.md).
<br/><br/><br/>
