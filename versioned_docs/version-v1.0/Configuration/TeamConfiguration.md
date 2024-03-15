---
title: "Team Configuration"
sidebar_position: 35
description: >
  Team Configuration
---
## What is 'Team Configuration' and how it works?

To organize and display metrics by `team`, Apache DevLake needs to know about the team configuration in an organization, specifically:

1. What are the teams?
2. Who are the users(unified identities)?
3. Which users belong to a team?
4. Which accounts(identities in specific tools) belong to the same user?

Each of the questions above corresponds to a table in DevLake's schema, illustrated below:

![image](/img/Team/teamflow0.png)

1. `teams` table stores all the teams in the organization.
2. `users` table stores the organization's roster. An entry in the `users` table corresponds to a person in the org.
3. `team_users` table stores which users belong to a team.
4. `user_accounts` table stores which accounts belong to a user. An `account` refers to an identiy in a DevOps tool and is automatically created when importing data from that tool. For example, a `user` may have a GitHub `account` as well as a Jira `account`.

Apache DevLake uses a simple heuristic algorithm based on emails and names to automatically map accounts to users and populate the `user_accounts` table.
When Apache DevLake cannot confidently map an `account` to a `user` due to insufficient information, it allows DevLake users to manually configure the mapping to ensure accuracy and integrity.

## A step-by-step guide

In the following sections, we'll walk through how to configure teams and create the five aforementioned tables (`teams`, `users`, `team_users`, `accounts`, and `user_accounts`).
The overall workflow is:

1. Create the `teams` table
2. Create the `users` and `team_users` table
3. Populate the `accounts` table via data collection
4. Run a heuristic algorithm to populate `user_accounts` table
5. Manually update `user_accounts` when the algorithm can't catch everything

Note:

1. Please replace `/path/to/*.csv` with the absolute path of the CSV file you'd like to upload.
2. Please replace `http://127.0.0.1:4000` with your actual Config UI service IP and port number. If you have enabled https, please replace it accordingly.

## Step 1 - Create the `teams` table

You can create the `teams` table by sending a PUT request to `/plugins/org/teams.csv` with a `teams.csv` file. To jumpstart the process, you can download a template `teams.csv` from `/plugins/org/teams.csv?fake_data=true`. Below are the detailed instructions:

1. Download the template `teams.csv` file. You can do it by 

    a. Pasting the URL into your browser to download the template.

    ```
    http://127.0.0.1:4000/api/plugins/org/teams.csv?fake_data=true
    ```

    b. Or using CURL:
    ```
    curl 'http://127.0.0.1:4000/api/rest/plugins/org/teams.csv?fake_data=true'  -X 'GET' -H 'Authorization: Bearer {API_key}'
    ```

2. Fill out `teams.csv` file and upload it to DevLake (If you are using Excel to modify the CSV file, please save it with UTF-8 encoding. See [how](https://answers.microsoft.com/en-us/msoffice/forum/all/how-can-i-save-a-csv-with-utf-8-encoding-using/12801501-c1e4-4a64-80d9-96b680b64cfe))

    a. Fill out `teams.csv` with your org data. Please don't modify the column headers or the file suffix.

    b. Upload `teams.csv` to DevLake with the following curl command
    ``` 
    curl 'http://127.0.0.1:4000/api/rest/plugins/org/teams.csv' -X 'PUT' -H 'Authorization: Bearer {API_key}' --form 'file=@"/path/to/teams.csv"'
    ```

    c. The PUT request would populate the `teams` table with data from `teams.csv` file.
    You can connect to the database and verify the data in the `teams` table. See 'Appendix A' for how to connect to the database.

    ![image](/img/Team/teamflow3.png)


## Step 2 - Create the `users` and `team_users` table

You can create the `users` and `team_users` table by sending a single PUT request to `/plugins/org/users.csv` with a `users.csv` file. To jumpstart the process, you can download a template `users.csv` from `/plugins/org/users.csv?fake_data=true`. Below are the detailed instructions:

1. Download the template `users.csv` file. You can do it by 

    a. Pasting the URL into your browser to download the template.

    ```
    http://127.0.0.1:4000/api/plugins/org/users.csv?fake_data=true
    ```

    b. Or using CURL:
    ```
    curl 'http://127.0.0.1:4000/api/rest/plugins/org/users.csv?fake_data=true'  -X 'GET' -H 'Authorization: Bearer {API_key}'
    ```

2. Fill out `users.csv` and upload it to DevLake (If you are using Excel to modify the CSV file, please save it with UTF-8 encoding. See [how](https://answers.microsoft.com/en-us/msoffice/forum/all/how-can-i-save-a-csv-with-utf-8-encoding-using/12801501-c1e4-4a64-80d9-96b680b64cfe))

    a.  Fill out `users.csv` with your org data. Please do not modify the column headers or the file suffix.

    b. Upload `users.csv` to DevLake with the following curl command:
    ```
    curl 'http://127.0.0.1:4000/api/rest/plugins/org/users.csv' -X 'PUT' -H 'Authorization: Bearer {API_key}' --form 'file=@"/path/to/users.csv"'
    ```

    c. The PUT request would populate the `users` table along with the `team_users` table with data from `users.csv` file. You can connect to the database and verify these two tables.

    ![image](/img/Team/teamflow1.png)
    
    ![image](/img/Team/teamflow2.png)

3. If you want to update `team_users` or `users` table, simply upload the updated `users.csv` to DevLake again following the previous step.

## Step 3 - Populate the `accounts` table via data collection

The `accounts` table is automatically populated when you collect data from data sources like GitHub and Jira through DevLake.

For example, the GitHub plugin would create one entry in the `accounts` table for each GitHub user involved in your repository. For demo purposes, we will insert some mock data into the `accounts` table using SQL:

```
INSERT INTO `accounts` (`id`, `created_at`, `updated_at`, `_raw_data_params`, `_raw_data_table`, `_raw_data_id`, `_raw_data_remark`, `email`, `full_name`, `user_name`, `avatar_url`, `organization`, `created_date`, `status`)
VALUES
        ('github:GithubAccount:1:1234', '2022-07-12 10:54:09.632', '2022-07-12 10:54:09.632', '{\"ConnectionId\":1,\"Owner\":\"apache\",\"Repo\":\"incubator-devlake\"}', '_raw_github_api_pull_request_reviews', 28, '', 'TyroneKCummings@teleworm.us', '', 'Tyrone K. Cummings', 'https://avatars.githubusercontent.com/u/101256042?u=a6e460fbaffce7514cbd65ac739a985f5158dabc&v=4', '', NULL, 0),
        ('jira:JiraAccount:1:629cdf', '2022-07-12 10:54:09.632', '2022-07-12 10:54:09.632', '{\"ConnectionId\":1,\"BoardId\":\"76\"}', '_raw_jira_api_users', 5, '', 'DorothyRUpdegraff@dayrep.com', '', 'Dorothy R. Updegraff', 'https://avatars.jiraxxxx158dabc&v=4', '', NULL, 0);

```

![image](/img/Team/teamflow4.png)

## Step 4 - Run a heuristic algorithm to populate `user_accounts` table

Now that we have data in both the `users` and `accounts` table, we can tell DevLake to infer the mappings between `users` and `accounts` with a simple heuristic algorithm based on names and emails.

1. Send an API request to DevLake to run the mapping algorithm

    ```
    curl --location --request POST '127.0.0.1:4000/api/pipelines' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "test",
        "plan":[
            [
                {
                    "plugin": "org",
                    "subtasks":["connectUserAccountsExact"]
                }
            ]
        ]
    }'
    ```

2. After successful execution, you can verify the data in `user_accounts` in the database. 

    ![image](/img/Team/teamflow5.png)

## Step 5 - Manually update `user_accounts` when the algorithm can't catch everything

It is recommended to examine the generated `user_accounts` table after running the algorithm. We will demonstrate how to manually update `user_accounts` when the mapping is inaccurate or incomplete in this section.

To make manual verification easier, DevLake provides an API for users to download `user_accounts` as a CSV file. Alternatively, you can verify and modify `user_accounts` all by SQL, see Appendix for more info.

1. Download the template by pasting the following URL to your browser:

    ```
    http://127.0.0.1:4000/api/plugins/org/user_account_mapping.csv
    ```

    b. Or using CURL:
    ```
    curl 'http://127.0.0.1:4000/api/rest/plugins/org/user_account_mapping.csv'  -X 'GET' -H 'Authorization: Bearer {API_key}'
    ```

    ![image](/img/Team/teamflow6.png)

2. If you find the mapping inaccurate or incomplete, you can modify the `user_account_mapping.csv` file and then upload it to DevLake. For example, here we change the `UserId` of row 'Id=github:GithubAccount:1:1234' in the `user_account_mapping.csv` file to 2.

3. Save and upload the updated `user_account_mapping.csv` file with the following curl command (If you are using Excel to modify the CSV file, please save it with UTF-8 encoding. See [how](https://answers.microsoft.com/en-us/msoffice/forum/all/how-can-i-save-a-csv-with-utf-8-encoding-using/12801501-c1e4-4a64-80d9-96b680b64cfe)):

    ```
    curl 'http://127.0.0.1:4000/api/rest/plugins/org/user_account_mapping.csv' -X 'PUT' -H 'Authorization: Bearer {API_key}' --form 'file=@"/path/to/user_account_mapping.csv"'
    ```

4. You can verify the data in the `user_accounts` table has been updated.

![image](/img/Team/teamflow7.png)

## Appendix A: how to connect to the database

There are many ways to connect to the database:

1. Through Grafana. Go to Grafana's Explore page. Switch the SQL editor to the code mode. Then, you can write SQL to describe database and query data.
2. Through database management tools such as Navicat, phyMyAdmin, DataGrip, MySQLWorkbench, etc. Type in your host, port, username and password to connect to the DB. The username and password can be fount in the image or .env file.
3. Through the command line. Take MySQL as an example:
    ```
    mysql -h <ip> -u <username> -p -P <port>
    ```

## Appendix B: how to examine `user_accounts` via SQL

```
SELECT a.id as account_id, a.email, a.user_name as account_user_name, u.id as user_id, u.name as real_name
FROM accounts a
        join user_accounts ua on a.id = ua.account_id
        join users u on ua.user_id = u.id
```


## Troubleshooting

If you run into any problem, please check the [Troubleshooting](/Troubleshooting/Installation.md) or [create an issue](https://github.com/apache/incubator-devlake/issues)
