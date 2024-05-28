---
title: "Linker"
description: >
  Linker Plugin
---

This document describes everything you need to know about Linker, and implementing this powerful and practical framework in DevLake.

## Summary

Just like DORA plugin, linker works on domain layer, it tries to `link` domain layer's data.

For example, in the current version, linker use regexp to extract issue_key from pull_requests' title and description fields,
and tries to relate existing issues, put the relations to `pull_request_issues`.

## Supported Versions
Linker is added since release v1.0.0-beta10.

## Configuration
In projects' settings page.
![](/img/Plugins/linker-configuration.png)
