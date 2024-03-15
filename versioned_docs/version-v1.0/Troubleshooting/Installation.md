---
title: "Installation Troubleshooting"
sidebar_position: 1
description: >
  Installation Troubleshooting
---

### `panic: invalid encKey` error

The cause is the `devlake` container trying to decrypt data in the database with the wrong key.
Please check the [GettingStarted/Upgrade](../GettingStarted/Upgrade.md) doc for more detail.

### Go Panic in OpenShift Kubernetes

One of the known root causes of the phonomenon is the Dynatrace agent being injected into the container. 
Excluding the namespace from the Dynatrace deployments should fix the problem.
Check [#5612](https://github.com/apache/incubator-devlake/issues/5612) if you needed more detail.

## None of them solve your problem?

Sorry for the inconvenience, please help us improve by [creating an issue](https://github.com/apache/incubator-devlake/issues)
