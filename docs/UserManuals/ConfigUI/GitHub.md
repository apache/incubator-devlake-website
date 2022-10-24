---
title: "Configuring GitHub"
sidebar_position: 2
description: Config UI instruction for GitHub
---

Visit config-ui: `http://localhost:4000`.
### Step 1 - Add Data Connections
![github-add-data-connections](/img/ConfigUI/github-add-data-connections.png)

#### Connection Name
Name your connection.

#### Endpoint URL
This should be a valid REST API endpoint, eg. `https://api.github.com/`. The url should end with `/`.

#### Auth Token(s)
GitHub personal access tokens are required to add a connection.
- Learn about [how to create a GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). The following permissions are required for `Apache DevLake` to collect data from private repositories:
  - `repo:status`
  - `repo_deployment`
  - `read:user`
  - `read:org`
- The data collection speed is relatively slow for GitHub since they have a **rate limit of [5,000 requests](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting) per hour** (15,000 requests/hour if you pay for GitHub enterprise). You can accelerate the process by configuring _multiple_ personal access tokens. Please note that multiple tokens should be created by different GitHub accounts. Tokens belonging to the same GitHub account share the rate limit.

#### Proxy URL (Optional)
If you are behind a corporate firewall or VPN you may need to utilize a proxy server. Enter a valid proxy server address on your network, e.g. `http://your-proxy-server.com:1080`

#### Test and Save Connection
Click `Test Connection`, if the connection is successful, click `Save Connection` to add the connection.


### Step 2 - Setting Data Scope
![github-set-data-scope](/img/ConfigUI/github-set-data-scope.png)

#### Projects
Enter the GitHub repos to collect. If you want to collect more than 1 repo, please separate repos with comma. For example, "apache/incubator-devlake,apache/incubator-devlake-website".

#### Data Entities
Usually, you don't have to modify this part. However, if you don't want to collect certain GitHub entities, you can unselect some entities to accelerate the collection speed.
- Issue Tracking: GitHub issues, issue comments, issue labels, etc.
- Source Code Management: GitHub repos, refs, commits, etc.
- Code Review: GitHub PRs, PR comments and reviews, etc.
- Cross Domain: GitHub accounts, etc.

### Step 3 - Adding Transformation Rules (Optional)
![github-add-transformation-rules-list](/img/ConfigUI/github-add-transformation-rules-list.png)
![github-add-transformation-rules](/img/ConfigUI/github-add-transformation-rules.png)
 
Without adding transformation rules, you can still view the "[GitHub Metrics](/livedemo/DataSources/GitHub)" dashboard. However, if you want to view "[Weekly Bug Retro](/livedemo/QAEngineers/WeeklyBugRetro)", "[Weekly Community Retro](/livedemo/OSSMaintainers/WeeklyCommunityRetro)" or other pre-built dashboards, the following transformation rules, especially "Type/Bug", should be added.<br/>

Each GitHub repo has at most ONE set of transformation rules.

#### Issue Tracking

- Severity: Parse the value of `severity` from issue labels.
   - when your issue labels for severity level are like 'severity/p0', 'severity/p1', 'severity/p2', then input 'severity/(.*)$'
   - when your issue labels for severity level are like 'p0', 'p1', 'p2', then input '(p0|p1|p2)$'

- Component: Same as "Severity".

- Priority: Same as "Severity".

- Type/Requirement: The `type` of issues with labels that match given regular expression will be set to "REQUIREMENT". Unlike "PR.type", submatch does nothing, because for issue management analysis, users tend to focus on 3 kinds of types (Requirement/Bug/Incident), however, the concrete naming varies from repo to repo, time to time, so we decided to standardize them to help analysts metrics.

- Type/Bug: Same as "Type/Requirement", with `type` setting to "BUG".

- Type/Incident: Same as "Type/Requirement", with `type` setting to "INCIDENT".

#### Code Review

- Type: The `type` of pull requests will be parsed from PR labels by given regular expression. For example:
   - when your labels for PR types are like 'type/feature-development', 'type/bug-fixing' and 'type/docs', please input 'type/(.*)$'
   - when your labels for PR types are like 'feature-development', 'bug-fixing' and 'docs', please input '(feature-development|bug-fixing|docs)$'

- Component: The `component` of pull requests will be parsed from PR labels by given regular expression.

#### Additional Settings (Optional)

- Tags Limit: It'll compare the last N pairs of tags to get the "commit diff', "issue diff" between tags. N defaults to 10.
   - commit diff: new commits for a tag relative to the previous one
   - issue diff: issues solved by the new commits for a tag relative to the previous one

- Tags Pattern: Only tags that meet given regular expression will be counted.

- Tags Order: Only "reverse semver" order is supported for now.

Please click `Save` to save the transformation rules for the repo. In the data scope list, click `Next Step` to continue configuring.

### Step 4 - Setting Sync Frequency
You can choose how often you would like to sync your data in this step by selecting a sync frequency option or enter a cron code to specify your prefered schedule.
