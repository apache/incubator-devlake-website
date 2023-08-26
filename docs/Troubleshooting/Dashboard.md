---
title: "Dashboard Troubleshooting"
sidebar_position: 3
description: >
  Dashboard Troubleshooting
---

## Debugging DORA Issue Metrics

This section may help if `Median Time to Restore Service (MTTR)` or `Change Failure Rate (CFR)` do not appear on the dashboards or you want to learn more about how these issue-based metrics are built.

### DORA Validation Dashboard
Starting from DevLake v0.18 this dashboard can be found near the `DORA` dashboard. Also, it can be accessed by a direct link in the `Dashboard Instruction` panel in the `DORA` dashboard.

This dashboard is a step-by-step guide to check which step went wrong **for all 4 of the DORA metrics**. The sections are:
- Check "Deployment Frequency"
- Check "Median Lead Time for Changes"
- Check "Change Failure Rate" & "Median Time to Restore Service

### SQL scripts behind Grafana charts
Each chart has a hidden button in the top-right corner to access the context menu. In that menu, click `Edit` to open a more detailed view with the script that tells how exactly the data is queried.

### How issues and deployments are associated to projects

Following Entity-Relationship diagrams below represent how the data is mapped and used for each of the 4 DORA metrics.
They are based on the SQL queries for each of the charts.

Legend:
- Blue box: user data source, be it **deployments**, **pull requests** from the source code, or **issues**
- White box: a table or entity used by DevLake
- Connections: lines that tell how the tables are mapped, also specify which fields are used.

The `project_mapping` is responsible for mapping **deployments**, **pull requests** from the source code, or **issues**.
To do so, it must be filtered using either `table = 'cicd_scopes'`, `table = 'repos'`, or `table = 'boards'` when connecting to another table.


![](/img/Troubleshooting/Dashboard/deployments.png)

![](/img/Troubleshooting/Dashboard/lead_time.png)

![](/img/Troubleshooting/Dashboard/mttr.png)

![](/img/Troubleshooting/Dashboard/cfr.png)

WIP


## None of them solve your problem?

Sorry for the inconvenience, please help us improve by [creating an issue](https://github.com/apache/incubator-devlake/issues)
