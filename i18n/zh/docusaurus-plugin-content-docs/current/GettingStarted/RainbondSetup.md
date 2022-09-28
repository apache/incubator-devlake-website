---
title: "通过 Rainbond 安装"
sidebar_position: 7
description: >
  在Rainbond中安装DevLake的步骤。
---

本篇文档适用于不了解 Kubernetes 的用户。[Rainbond](https://www.rainbond.com/) 是建立在 Kubernetes 之上的开源云原生应用管理平台，简单易用，无需了解 Kubernetes 相关知识，轻松在 Kubernetes 上部署应用。

在 Rainbond 中可以很便捷、快速的安装 DevLake。

## 前提要求

* Rainbond 5.8.x 或以上

## 部署 DevLake

1.登录 Rainbond 控制台，点击左侧菜单的 `市场` 按钮，切换到开源应用商店, 在搜索框中搜索 `DevLake`，并点击安装按钮。

![](/img/GettingStarted/install-devlake.jpg)

2.填写安装信息, 并点击确认按钮开始安装 DevLake。
  * 团队: 选择或者创建新的团队
  * 集群: 选择或者创建新的集群
  * 应用: 选择或者创建新的应用
  * 版本: 选择 DevLake 版本

3.片刻之后，DevLake 安装完成，通过应用内的访问按钮访问 DevLake，默认访问策略由 Rainbond 自动生成。

![](/img/GettingStarted/topology-devlake.jpg)

## Next Step

创建 Blueprint, 参阅 [教程](/docs/UserManuals/ConfigUI/Tutorial#creating-a-blueprint)