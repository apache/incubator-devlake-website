---
title: "GitLab"
description: >
  GitLab Plugin
---


## Metrics

| Metric Name                 | Description                                                  |
|:----------------------------|:-------------------------------------------------------------|
| Pull Request Count          | Number of Pull/Merge Requests                                |
| Pull Request Pass Rate      | Ratio of Pull/Merge Review requests to merged                |
| Pull Request Reviewer Count | Number of Pull/Merge Reviewers                               |
| Pull Request Review Time    | Time from Pull/Merge created time until merged               |
| Commit Author Count         | Number of Contributors                                       |
| Commit Count                | Number of Commits                                            |
| Added Lines                 | Accumulated Number of New Lines                              |
| Deleted Lines               | Accumulated Number of Removed Lines                          |
| Pull Request Review Rounds  | Number of cycles of commits followed by comments/final merge |

## Configuration

### Provider (Datasource) Connection
The connection section of the configuration screen requires the following key fields to connect to the **GitLab API**.

![connection-in-config-ui](gitlab-connection-in-config-ui.png)

- **Connection Name** [`READONLY`]
  - ⚠️ Defaults to "**GitLab**" and may not be changed. As GitLab is a _single-source data provider_ at the moment, the connection name is read-only as there is only one instance to manage. As we advance on our development roadmap we may enable _multi-source_ connections for GitLab in the future.
- **Endpoint URL** (REST URL, starts with `https://` or `http://`)
  - This should be a valid REST API Endpoint eg. `https://gitlab.example.com/api/v4/`
  - ⚠️ URL should end with`/`
- **Personal Access Token** (HTTP Basic Auth)
  - Login to your GitLab Account and create a **Personal Access Token** to authenticate with the API using HTTP Basic Authentication. The token must be 20 characters long. Save the personal access token somewhere safe. After you leave the page, you no longer have access to the token.

    1. In the top-right corner, select your **avatar**.
    2. Click on **Edit profile**.
    3. On the left sidebar, select **Access Tokens**.
    4. Enter a **name** and optional **expiry date** for the token.
    5. Select the desired **scopes**.
    6. Click on **Create personal access token**.

    For help on **Creating a personal access token**, please see official [GitLab Docs on Personal Tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).
    For an overview of the **GitLab REST API**, please see official [GitLab Docs on REST](https://docs.gitlab.com/ee/development/documentation/restful_api_styleguide.html#restful-api)

Click **Save Connection** to update connection settings.

### Provider (Datasource) Settings
There are no additional settings for the GitLab Datasource Provider at this time.

> NOTE: `GitLab Project ID` Mappings feature has been deprecated.

## Gathering Data with GitLab

To collect data, you can make a POST request to `/pipelines`

```
curl --location --request POST 'localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "gitlab 20211126",
    "tasks": [[{
        "plugin": "gitlab",
        "options": {
            "projectId": <Your gitlab project id>
        }
    }]]
}
'
```

## Finding Project Id

To get the project id for a specific `GitLab` repository:
- Visit the repository page on GitLab
- Find the project id just below the title

  ![Screen Shot 2021-08-06 at 4 32 53 PM](https://user-images.githubusercontent.com/3789273/128568416-a47b2763-51d8-4a6a-8a8b-396512bffb03.png)

> Use this project id in your requests, to collect data from this project

## ⚠️ (WIP) Create a GitLab API Token <a id="gitlab-api-token"></a>

1. When logged into `GitLab` visit `https://gitlab.com/-/profile/personal_access_tokens`
2. Give the token any name, no expiration date and all scopes (excluding write access)

    ![Screen Shot 2021-08-06 at 4 44 01 PM](https://user-images.githubusercontent.com/3789273/128569148-96f50d4e-5b3b-4110-af69-a68f8d64350a.png)

3. Click the **Create Personal Access Token** button
4. Save the API token into `.env` file via `cofnig-ui` or edit the file directly.

<br/><br/><br/>
