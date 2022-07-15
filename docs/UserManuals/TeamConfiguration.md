---
title: "Team Configuration"
sidebar_position: 6
description: >
  Team Configuration
---
## Summary
This is a brief step-by-step guide to using the team feature.

Notes: 
1. Please convert /xxxpath/*.csv to the absolute path of the csv file you want to upload. 
2. Please replace the 127.0.0.1:8080 in the text with the actual ip and port. 

## Step 1 - Construct the teams table.
a. Api request example, you can generate sample data.

    i.  GET request: http://127.0.0.1:8080/plugins/org/teams.csv?fake_data=true (put into the browser can download the corresponding csv file)

    ii. The corresponding curl command:
        curl --location --request GET 'http://127.0.0.1:8080/plugins/org/teams.csv?fake_data=true'
    

b. The actual api request.

    i.  Create the corresponding teams file: teams.csv 
    (Notes: 1.The table table field names should have initial capital letters. 2.Be careful not to change the file suffix when opening csv files through the tool ).

    ii. The corresponding curl command（Quick copy folder path for macOS, Shortcut option + command + c）:
    curl --location --request PUT 'http://127.0.0.1:8080/plugins/org/teams.csv' --form 'file=@"/xxxpath/teams.csv"'

    iii. After successful execution, the teams table is generated and the data can be seen in the database table teams. 
    (Notes: how to connect to the database: mainly through host, port, username, password, and then through sql tools, such as sequal ace, datagrip and other data, of course you can also access through the command line mysql -h `ip` -u `username` -p -P `port`)

![image](/img/Team/teamflow3.png)


## Step 2 - Construct user tables (roster)
a. Api request example, you can generate sample data.

    i.  Get request: http://127.0.0.1:8080/plugins/org/users.csv?fake_data=true (put into the browser can download the corresponding csv file).

    ii. The corresponding curl command:
    curl --location --request GET 'http://127.0.0.1:8080/plugins/org/users.csv?fake_data=true'


b. The actual api request.

    i.  Create the csv file (roster) (Notes: the table header is in capital letters: Id,Email,Name).

    ii. The corresponding curl command:
    curl --location --request PUT 'http://127.0.0.1:8080/plugins/org/users.csv' --form 'file=@"/xxxpath/users.csv"'

    iii. After successful execution, the users table is generated and the data can be seen in the database table users.

![image](/img/Team/teamflow1.png)
    
    iv. Generated the team_users table, you can see the data in the team_users table.

![image](/img/Team/teamflow2.png)

## Step 3 - Update users if you need  
If there is a problem with team_users association or data in users, just re-put users api interface, i.e. (b in step 2 above)

## Step 4 - Collect accounts 
The accounts table is collected by users through devlake. In order to match with users and facilitate the demonstration of subsequent functions, here I construct fake accounts data from the information in the users table. For real user collection, you need to run the corresponding plugin service through devlake, for example, the github plugin, and after running the corresponding plugin service, the accounts data will be generated. A sample sql for constructing fake data is given here.
```
INSERT INTO `accounts` (`id`, `created_at`, `updated_at`, `_raw_data_params`, `_raw_data_table`, `_raw_data_id`, `_raw_data_remark`, `email`, `full_name`, `user_name`, `avatar_url`, `organization`, `created_date`, `status`)
VALUES
        ('github:GithubAccount:1:1234', '2022-07-12 10:54:09.632', '2022-07-12 10:54:09.632', '{\"ConnectionId\":1,\"Owner\":\"apache\",\"Repo\":\"incubator-devlake\"}', '_raw_github_api_pull_request_reviews', 28, '', 'TyroneKCummings@teleworm.us', '', 'Tyrone K. Cummings', 'https://avatars.githubusercontent.com/u/101256042?u=a6e460fbaffce7514cbd65ac739a985f5158dabc&v=4', '', NULL, 0),
        ('jira:JiraAccount:1:629cdf', '2022-07-12 10:54:09.632', '2022-07-12 10:54:09.632', '{\"ConnectionId\":1,\"BoardId\":\"76\"}', '_raw_jira_api_users', 5, '', 'DorothyRUpdegraff@dayrep.com', '', 'Dorothy R. Updegraff', 'https://avatars.jiraxxxx158dabc&v=4', '', NULL, 0);

```

![image](/img/Team/teamflow4.png)

## Step 5 - Automatically match existing accounts and users through api requests

a. Api request:  the name of the plugin is "org", connctionId is order to keep same with other plugins.

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

b. After successful execution, the user_accounts table is generated, and you can see the data in table user_accounts.

![image](/img/Team/teamflow5.png)

## Step 6 - Get user_accountsr relationship
After generating the user_accounts relationship, the user can get the associated data through the GET method to confirm whether the data user and account match correctly and whether the matched accounts are complete.

a. http://127.0.0.1:8080/plugins/org/user_account_mapping.csv (put into the browser to download the file directly)

b. The corresponding curl command:
```
curl --location --request GET 'http://127.0.0.1:8080/plugins/org/user_account_mapping.csv'
```

![image](/img/Team/teamflow6.png)

c. You can also use sql statements to determine, here to provide a sql statement for reference only.
```
SELECT a.id as account_id, a.email, a.user_name as account_user_name, u.id as user_id, u.name as real_name
FROM accounts a 
        join user_accounts ua on a.id = ua.account_id
        join users u on ua.user_id = u.id
```

## Step 7 - Update user_accounts if you need
If the association between user and account is not as expected, you can change the user_account_mapping.csv file. For example, I change the UserId in the line Id=github:GithubAccount:1:1234 in the user_account_mapping.csv file to 2, and then upload the user_account_mapping.csv file through the api interface.

a. The corresponding curl command:
```
curl --location --request PUT 'http://127.0.0.1:8080/plugins/org/user_account_mapping.csv' --form 'file=@"/xxxpath/user_account_mapping.csv"'
```

b. You can see that the data in the user_accounts table has been updated.

![image](/img/Team/teamflow7.png)


**The above is the flow of user usage for the whole team feature.**
