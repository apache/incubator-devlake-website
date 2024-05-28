---
title: "Linker"
description: >
  Linker Plugin
---

This document comprehensively explains Linker and provides guidance on implementing this powerful and practical framework in DevLake.

## Summary

Just like the DORA plugin, the linker works on the domain layer and attempts to link domain layer data.

For example, in the current version, the linker uses regular expressions to extract issue_keys from pull requests' titles and description fields,
and it tries to relate existing issues, storing the relations in the `pull_request_issues` table.


## Supported Versions
The linker was added in release v1.0.0-beta10 and has been available ever since.

## Configuration
You can find the project settings page by clicking on the 'Settings' tab in the project overview.
![](/img/Plugins/linker-configuration.png)
