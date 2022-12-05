---
title: "FAQ"
sidebar_position: 10
description: >
  Frequently Asked Questions
---

## Failed to collect data from the server with a self-signed certificate

There might be two problems when trying to collect data from a private GitLab server with a self-signed certificate:

1. "Test Connection" error. This can be solved by setting the environment variable `IN_SECURE_SKIP_VERIFY=true` for the `devlake` container
2. "GitExtractor" fails to clone the repository due to certificate verification, sadly, neither gogit nor git2go we are using supports insecure HTTPS.

A better approach would be adding your root CA to the `devlake` container:

1. Mount your `rootCA.crt` into the `devlake` container
2. Add a `command` node to install the mounted certificate

Here is a example for the `docker-compose` installation, the idea is applicable for other kinds of installation.
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


## Pipeline failed with "The total number of locks exceeds the lock table size"

We have had a couple of reports suggesting MySQL InnoDB would fail with the message.

- [Error 1206: The total number of locks exceeds the lock table size · Issue #3849 · apache/incubator-devlake](https://github.com/apache/incubator-devlake/issues/3849)
- [[Bug][Gitlab] gitlab collectApiJobs task failed for mysql locks error · Issue #3653 · apache/incubator-devlake](https://github.com/apache/incubator-devlake/issues/3653)

The cause of the problem is:

- Before Apache DevLake data collection starts, it must purge expired data in the database.
- MySQL InnoDB Engine would create locks in memory for the records being deleted.
- When deleting huge amounts of records, the memory bursts, hence the error.

You are likely to see the error when dealing with a huge repository or board. For MySQL, you can solve it by increasing the `innodb_buffer_pool_size` to a higher value.

Here is a example for the `docker-compose` installation, the idea is applicable for other kinds of installation.
```
  mysql:
    image: mysql:8.....
    ...
    # add the follow line to the mysql container
    command: --innodb-buffer-pool-size=200M
```


## None of them solve your problem?

Sorry for the inconvenience, please help us improve by [creating an issue](https://github.com/apache/incubator-devlake/issues)
