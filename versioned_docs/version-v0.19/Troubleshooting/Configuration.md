---
title: "Configuration and Blueprint Troubleshooting"
sidebar_position: 2
description: >
  Debug errors found in Config UI or during data collection.
---

### Common Error Code while collecting/processing data

| Error code | An example                  | Causes | Solutions |
| ---------- | ----------------------------|--------|-----------|
| 429        | subtask collectAPiPipelines ended unexpectedly caused: Error waiting for async Collector execution caused by: retry exceeded 3 times calling projects/{projectId}/pipelines {429} | This error exmaple is caused by GitLab's Pipeline APIs. These APIs are implemented via Cloudflare, which is different from other GitLab entities. | Two ways: <br/> - Enable `fixed rate limit` in the GitLab connection, lower the API rates to 2,000. If it works, you can try increase the rates to accerlerate. This solution also applies to other plugins that return the 429 while collecting data, such as GitHub, TAPD, etc. <br/> - Upgrade to v0.15.x  |
| 403        | error: preparing task data for gitextractor caused by: unexpected http status code: 403 | This is usually caused by the permission of your tokens. For example, if you're using an un-supported auth method, or using a token without ticking permissions to certain entities you want to collect. | Find the supported authentication methods and token permissions that should be selected in the corresponding plugin's Config UI manuals, for example, [configuring GitHub](/docs/Configuration/GitHub.md#auth-tokens) |
| 1406       | subtask extractApiBuilds ended unexpectedly caused by: error adding the result to batch caused by: Error 1406: Data too long for column 'full_display_name' at row 138. See bug [#4053](https://github.com/apache/incubator-devlake/issues/4053) | This is usually thrown by MySQL because a certain value is too long | A work-around is to manually change the field length to varchar(255) or longer in MySQL. Also, please put up a [bug](https://github.com/apache/incubator-devlake/issues/new?assignees=&labels=type%2Fbug&template=bug-report.yml&title=%5BBug%5D%5BModule+Name%5D+Bug+title+) to let us know. | 


### Failed to collect data from the server with a self-signed certificate

There might be two problems when trying to collect data from a private GitLab server with a self-signed certificate:

1. "Test Connection" error. This can be solved by setting the environment variable `IN_SECURE_SKIP_VERIFY=true` for the `devlake` container
2. "GitExtractor" fails to clone the repository due to certificate verification, sadly, neither gogit nor git2go we are using supports insecure HTTPS.

A better approach would be adding your root CA to the `devlake` container:

1. Mount your `rootCA.crt` into the `devlake` container
2. Add a `command` node to install the mounted certificate

Here is an example of the `docker-compose`` installation, the idea applies to other installation methods.
```
  devlake:
    image: apache/devlake:v...
    ...
    volumes:
      ...
      - /path/to/your/rootCA.crt:/usr/local/share/ca-certificates/rootCA.crt
    command: [ "sh", "-c", "update-ca-certificates; lake" ]
    ...
```

### GitExtractor task failed in a GitHub/GitLab/BitBucket blueprint
See bug [#3719](https://github.com/apache/incubator-devlake/issues/3719)

This bug happens occasionally in v0.14.x and previous versions. It is fixed by changing the docker base image. Please upgrade to v0.15.x to get it fixed if you encounter it.


### Pipeline failed with "The total number of locks exceeds the lock table size"

We have had a couple of reports suggesting MySQL InnoDB would fail with the message.

- [Error 1206: The total number of locks exceeds the lock table size · Issue #3849 · apache/incubator-devlake](https://github.com/apache/incubator-devlake/issues/3849)
- [[Bug][GitLab] gitlab collectApiJobs task failed for mysql locks error · Issue #3653 · apache/incubator-devlake](https://github.com/apache/incubator-devlake/issues/3653)

The cause of the problem is:

- Before Apache DevLake data collection starts, it must purge expired data in the database.
- MySQL InnoDB Engine would create locks in memory for the records being deleted.
- When deleting huge amounts of records, the memory bursts, hence the error.

You are likely to see the error when dealing with a huge repository or board. For MySQL, you can solve it by increasing the `innodb_buffer_pool_size` to a higher value.

Here is an example of the `docker-compose` installation, the idea applies to other installation methods.
```
  mysql:
    image: mysql:8.....
    ...
    # add the follow line to the mysql container
    command: --innodb-buffer-pool-size=200M
```

### GitHub repositories keep loading when adding data scopes

See issue [#6038](https://github.com/apache/incubator-devlake/issues/6038)

If you're having trouble adding data scopes to a GitHub connection because the repositories keep loading, there are a few things you can check:
1. Make sure your access token has the necessary permissions.
2. If your account is protected by organization SAML enforcement, make sure you've authorized the token using SSO.
   
For more details about authenticating with SAML single sign-on, see here: https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on.

## None of them solve your problem?

Sorry for the inconvenience, please help us improve by [creating an issue](https://github.com/apache/incubator-devlake/issues)
