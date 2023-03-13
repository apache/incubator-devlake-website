---
title: "Dashboard Access Control"
sidebar_position: 2
description: >
  Dashboard Access Control
---


# Dashboard Access Control

This tutorial shows how to leverage Grafana's role-based access control (RBAC) to manage what dashboards a user has access to. If you're setting up a single DevLake instance to be shared by multiple teams in your organization, this tutorial can help you achieve data segregation between teams.

## Example solution: one folder for each team

One of the simplest solutions is to create one Grafana folder for each team and assign permissions to teams at the folder level. Below is a step-by-step walk through.

1. Sign in as Grafana admin and create a new folder

![create-new-folder](/img/Grafana/create-new-folder.png)

2. Click "Permissions" tab and remove the default access of "Editor (Role)" and "Viewer (Role)"

![folder-permission](/img/Grafana/folder-permission.png)

After removing default permissions:

![after-remove-default-permissions](/img/Grafana/after-remove-default-permissions.png)


3. Add "View" permission to the target team (you'll need to create this team in Grafana first)

![add-team-permission](/img/Grafana/add-team-permission.png)

4. Copy/move dashboards into this folder (you may need to edit the dashboard so that it only shows data belongs to this team)

## Reference

1. [Manage dashboard permissions by Grafana](https://grafana.com/docs/grafana/latest/administration/user-management/manage-dashboard-permissions/#grant-dashboard-folder-permissions)






