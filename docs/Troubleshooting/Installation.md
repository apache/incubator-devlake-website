---
title: "Installation Troubleshooting"
sidebar_position: 1
description: >
  Installation Troubleshooting
---

### Seeing `panic: invalid encKey` error after upgrade

The reason it happens is the `devlake` is trying to decrypt data in the database with the wrong key.
Please check the [Upgrade](../GettingStarted/Upgrade.md) for more detail.

## None of them solve your problem?

Sorry for the inconvenience, please help us improve by [creating an issue](https://github.com/apache/incubator-devlake/issues)
