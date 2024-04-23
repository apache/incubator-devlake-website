---
title: "Opsgenie"
description: >
  Opsgenie Plugin
---

## Summary

This plugin collects Opsgenie incident data, users and teams, and uses them to compute incident-type DORA metrics. Namely,
* [Median time to restore service](/Metrics/MTTR.md)
* [Change failure rate](/Metrics/CFR.md).
* [Incident Age](/Metrics/IncidentAge.md)
* [Incident Count Per 1k Lines of Code](/Metrics/IncidentCountPer1kLinesOfCode.md)

## Supported Versions
Available for Atlassian Opsgenie Cloud, for both US or EU instances. Check [this doc](https://devlake.apache.org/docs/Overview/SupportedDataSources#data-sources-and-data-plugins) for more details.


## Configuration
* Configure Opsgenie via Config UI. See instructions [here](/Configuration/Opsgenie.md).
* Configure Opsgenie via Config UI's [advanced mode](/Configuration/AdvancedMode.md).
