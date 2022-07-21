---
title: "Team Configuration"
sidebar_position: 7
description: >
  Team Configuration
---
## What is 'Team Configuration' and how it works?

To render and organize metrics by team, DevLake needs to know about the team configuration in an organization, specifically:

1. What're the teams?
2. Who're the users?
3. Which users belong to a team?
4. Which accounts belong to a user?

Each of the questions above corresponds to a table in DevLake's schema, illustrated below:

![image](/img/Team/teamflow0.png)

1. `teams` table stores all the teams in the organization.
2. `users` table stores the organization's roster. An entry in the `users` table corresponds to a person in the org.
3. `team_users` table stores which users belong to a team.
4. `user_accounts` table stores which accounts belong to a user. An `account` refers to an identiy in a DevOps tool and is automatically created when importing data from that tool. For example, a `user` may have a GitHub `account` as well as a Jira `account`.

DevLake uses a simple heuristic algorithm based on names and emails to automatically map accounts to users and populate the `user_accounts` table.
When DevLake cannot confidently map an `account` to a `user` due to insufficient information, it allows DevLake users to manually configure the mapping to ensure accuracy and completeness.

## A step-by-step guide

In the following sections, we'll walk through how to configure teams and create the five aforementioned tables (`teams`, `users`, `team_users`, `accounts`, and `user_accounts`).
The overall workflow is:

1. Create the `teams` table
2. Create the `users` and `team_users` table
3. Populate the `accounts` table via data collection
4. Run a heursitic algorithm to populate `user_accounts` table
5. Manually update `user_accounts` when the algorithm can't catch everything

Note:

1. Please replace `/path/to/*.csv` with the absolute path of the csv file you'd like to upload.
2. Please replace `127.0.0.1:8080` with your actual DevLake service IP and port number.

## Step 1 - Create the `teams` table

You can create the `teams` table by sending a PUT request to `/plugins/org/teams.csv` with a `teams.csv` file. To jumpstart the process, you can download a template `teams.csv` from `/plugins/org/teams.csv?fake_data=true`. Below are the detailed instructions:

a. Dowload the template `teams.csv` file

    i.  GET http://127.0.0.1:8080/plugins/org/teams.csv?fake_data=true (pasting the URL into your browser will download the template)

    ii. If you prefer using curl:
        curl --location --request GET 'http://127.0.0.1:8080/plugins/org/teams.csv?fake_data=true'
    

b. Fill out `teams.csv` file and upload to DevLake

    i. Fill out `teams.csv` with your org data. Please don't modify the colume headers or the file suffix.

    ii. Upload `teams.csv` to DevLake with the following curl command: 
    curl --location --request PUT 'http://127.0.0.1:8080/plugins/org/teams.csv' --form 'file=@"/path/to/teams.csv"'

    iii. The PUT request would populate the `teams` table with data from `teams.csv` file.
    You can connect to the database and verify the data in `teams` table.
    See Appendix for how to connect to the database.

![image](/img/Team/teamflow3.png)


## Step 2 - Create the `users` and `team_users` table

You can create the `users` and `team_users` table by sending a single PUT request to `/plugins/org/users.csv` with a `users.csv` file. To jumpstart the process, you can download a template `users.csv` from `/plugins/org/users.csv?fake_data=true`. Below are the detailed instructions:

a. Dowload the template `users.csv` file

    i.  GET http://127.0.0.1:8080/plugins/org/users.csv?fake_data=true (pasting the URL into your browser will download the template)

    ii. If you prefer using curl:
    curl --location --request GET 'http://127.0.0.1:8080/plugins/org/users.csv?fake_data=true'


b. Fill out `users.csv` and upload to DevLake

    i.  Fill out `users.csv` with your org data. Please don't modify the colume headers or the file suffix

    ii. Upload `users.csv` to DevLake with the following curl command:
    curl --location --request PUT 'http://127.0.0.1:8080/plugins/org/users.csv' --form 'file=@"/path/to/users.csv"'

    iii. The PUT request would populate the `users` table along with the `team_users` table with data from `users.csv` file.
    You can connect to the database and verify these two tables.

![image](/img/Team/teamflow1.png)
    
![image](/img/Team/teamflow2.png)

c. If you ever want to update `team_users` or `users` table, simply upload the updated `users.csv` to DevLake again following step b.

## Step 3 - Populate the `accounts` table via data collection

The `accounts` table is automatically populated when you collect data from data sources like GitHub and Jira through DevLake.
For example, the GitHub plugin would create one entry in `accounts` table for each GitHub user involved in your repository.
For demo purpose, we'll insert some mock data into the `accounts` table using SQL:

```
INSERT INTO `accounts` (`id`, `created_at`, `updated_at`, `_raw_data_params`, `_raw_data_table`, `_raw_data_id`, `_raw_data_remark`, `email`, `full_name`, `user_name`, `avatar_url`, `organization`, `created_date`, `status`)
VALUES
        ('github:GithubAccount:1:1234', '2022-07-12 10:54:09.632', '2022-07-12 10:54:09.632', '{\"ConnectionId\":1,\"Owner\":\"apache\",\"Repo\":\"incubator-devlake\"}', '_raw_github_api_pull_request_reviews', 28, '', 'TyroneKCummings@teleworm.us', '', 'Tyrone K. Cummings', 'https://avatars.githubusercontent.com/u/101256042?u=a6e460fbaffce7514cbd65ac739a985f5158dabc&v=4', '', NULL, 0),
        ('jira:JiraAccount:1:629cdf', '2022-07-12 10:54:09.632', '2022-07-12 10:54:09.632', '{\"ConnectionId\":1,\"BoardId\":\"76\"}', '_raw_jira_api_users', 5, '', 'DorothyRUpdegraff@dayrep.com', '', 'Dorothy R. Updegraff', 'https://avatars.jiraxxxx158dabc&v=4', '', NULL, 0);

```

![image](/img/Team/teamflow4.png)

## Step 4 - Run a heursitic algorithm to populate `user_accounts` table

Now that we have data in both the `users` and `accounts` table, we can tell DevLake to infer the mappings between `users` and `accounts` with a simple heuristic algorithm based on names and emails.

a. Send an API request to DevLake to run the mapping algorithm

```
curl --location --request POST '127.0.0.1:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "test",
    "plan":[
        [
            {
                "plugin": "org",
                "subtasks":["connectUserAccountsExact"],
                "options":{
                    "connectionId":1
                }
            }
        ]
    ]
}'
```

b. After successful execution, you can verify the data in `user_accounts` in the database. 

![image](/img/Team/teamflow5.png)

## Step 5 - Manually update `user_accounts` when the algorithm can't catch everything

It is recommended to examine the generated `user_accounts` table after running the algorithm.
We'll domonstrate how to manually update `user_accounts` when the mapping is inaccurate/incomplete in this section.
To make manual verification easier, DevLake provides an API for users to download `user_accounts` as a csv file.
Alternatively, you can verify and modify `user_accounts` all by SQL, see Appendix for more info.

a. GET http://127.0.0.1:8080/plugins/org/user_account_mapping.csv(pasting the URL into your browser will download the file). If you prefer using curl:
```
curl --location --request GET 'http://127.0.0.1:8080/plugins/org/user_account_mapping.csv'
```

![image](/img/Team/teamflow6.png)

b. If you find the mapping inaccurate or incomplete, you can modify the `user_account_mapping.csv` file and then upload to DevLake.
For example, here we change the `UserId` of row Id=github:GithubAccount:1:1234 in the `user_account_mapping.csv` file to 2.
Then we upload the updated `user_account_mapping.csv` file with the following curl command:

```
curl --location --request PUT 'http://127.0.0.1:8080/plugins/org/user_account_mapping.csv' --form 'file=@"/path/to/user_account_mapping.csv"'
```

c. You can verify the data in the `user_accounts` table has been updated.

![image](/img/Team/teamflow7.png)

## Appendix: how to connect to the database

Here we use MySQL as an example. You can install database management tools like Sequel Ace, DataGrip, MySQLWorkbench, and etc.


Or through command line:

```
mysql -h <ip> -u <username> -p -P <port>
```

## Appendix: how to examine `user_accounts` via SQL

```
SELECT a.id as account_id, a.email, a.user_name as account_user_name, u.id as user_id, u.name as real_name
FROM accounts a
        join user_accounts ua on a.id = ua.account_id
        join users u on ua.user_id = u.id
```
