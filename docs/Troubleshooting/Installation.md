---
title: "Installation Troubleshooting"
sidebar_position: 1
description: >
  Installation Troubleshooting
---

### `panic: invalid encKey` error

The cause is the `devlake` container trying to decrypt data in the database with the wrong key.
Please check the [GettingStarted/Upgrade](../GettingStarted/Upgrade.md) doc for more detail.

### `process was terminated unexpectedly` error

when collect datas, the task was failed.  The cause is the `devlake` container  and `grafana` container 's volumes not have the permissions to write.  it need to change the permissions of the volumes mounting directory of a and b to 777 


## None of them solve your problem?

Sorry for the inconvenience, please help us improve by [creating an issue](https://github.com/apache/incubator-devlake/issues)
