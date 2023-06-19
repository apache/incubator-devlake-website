---
title: "PagerDuty(Beta)"
description: >
  PagerDuty Plugin
---



## Summary

This plugin collects all incidents from PagerDuty, and uses them to compute incident-type DORA metrics. Namely,
* [Median time to restore service](/Metrics/MTTR.md)
* [Change failure rate](/Metrics/CFR.md).
* [Incident Age](/Metrics/IncidentAge.md)
* [Incident Count Per 1k Lines of Code](/Metrics/IncidentCountPer1kLinesOfCode.md)


## Configuration
* Configure PagerDuty via Config UI. See instructions [here](/Configuration/PagerDuty.md).
* Configure PagerDuty via Config UI's [advanced mode](/Configuration/AdvancedMode.md).