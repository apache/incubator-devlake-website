---
title: "Roadmap"
linkTitle: "Roadmap"
tags: []
categories: []
weight: 3
description: >
  The goals and roadmap for DevLake in 2022.
---


## Goals
DevLake has joined the Apache Incubator and is aiming to become a top-level project. To achieve this goal, the Apache DevLake (Incubating) community will continue to make efforts in helping development teams to analyze and improve their engineering productivity. In the 2022 Roadmap, we have summarized three major goals followed by the feature breakdown to invite the broader community to join us and grow together.

1. Investigate in the standard engineering data application by discovering and implementing 3 (or even more!) usage scenarios:
   - A collection of metrics to track the contribution, quality and growth of open-source projects
   - DORA metrics for DevOps engineers
   - To be decided ([let us know](https://join.slack.com/t/devlake-io/shared_invite/zt-17b6vuvps-x98pqseoUagM7EAmKC82xQ) if you have any suggestions!)
2. Improve the data infrastructure by providing robust data collection modules, customizable data models, and data extensibility
3. Design better user experience for end-users and contributors.

## Feature Breakdown
Apache DevLake is currently under rapid development. You are more than welcome to use the following table to explore your intereted features and make contributions. We deeply appreciate the collective effort of our community to make this project possible!

|Goals| Category | Features|
| --- | --- | --- |
|Goal No.1 & 2| More data sources across different [DevOps domains](../05-DataModels/01-DevLakeDomainLayerSchema.md)| Features in **bold** are of higher priority <br/><br/> Issue/Task Management: <ul><li>**Jira server** [#886 (closed)](https://github.com/apache/incubator-devlake/issues/886)</li><li>**Jira data center** [#1687 (closed)](https://github.com/apache/incubator-devlake/issues/1687)</li><li>GitLab Issues</li><li>Trello [#1881 (open)](https://github.com/apache/incubator-devlake/issues/1881)</li><li>**TAPD** [#560 (closed)](https://github.com/apache/incubator-devlake/issues/560)</li><li>Teambition [#1882 (open)](https://github.com/apache/incubator-devlake/issues/1882)</li><li>Ones [#1884 (open)](https://github.com/apache/incubator-devlake/issues/1884)</li></ul> Source Code Management: <ul><li>BitBucket</li><li>Gitee [#1883 (open)](https://github.com/apache/incubator-devlake/issues/1883)</li><li>Coder</li></ul> Code Review: <ul><li>Gerrit</li></ul> CI/CD: <ul><li>GitHub Action</li><li>ArgoCI</li><li>ArgoCD</li><li>TeamCity</li></ul>Quality: <ul><li>**SonarQube**</li><li>Fossa</li></ul> QA: <ul><li>Selenium</li><li>Junit</li><li>JMeter</li><li>Cucumber Test</li></ul> Calendar: <ul><li>Google Calendar</li><li>Zoom Calendar</li><li>Lark Calendar</li><li>Tencent Calendar</li></ul> OSS Community Metrics: <ul><li>GitHub stars, clones, watches</li></ul>|
|Goal No.2 | Improved data collection, [data models](../05-DataModels/01-DevLakeDomainLayerSchema.md) and data extensibility| Data Collection: <br/> <ol><li>Complete the logging system</li><li>Implement a good error handling mechanism during data collection</li></ol> Data Models:<ol><li>Introduce DBT to allow users to create and modify the domain layer schema. [#1479 (closed)](https://github.com/apache/incubator-devlake/issues/1479)</li><li>Implement the data models for 5 new domains:<ul><li>Quality</li><li>Testing</li><li>Calendar</li><li>Documentation</li><li>OSS Community Metrics</li></ul></li><li>Polish the data models for [existing domains](../05-DataModels/01-DevLakeDomainLayerSchema.md): Issue/Task Management, Source Code Management, Code Review and CI/CD.</li></ol> Data Extensibility: <ol><li>Enhance the performance of data application under large-scaled usage scenarios</li><li>Support OLAP databases for more flexible data storage options</li></ol>|
|Goal No.3| Better user experience | For new users: <ol><li> Iterate on a clearer step-by-step guide to improve the pre-configuration experience.</li><li>Design the new Config UI to reduce frictions for syncing data [#1700 (closed)](https://github.com/apache/incubator-devlake/issues/1700)</li><li> Showcase dashboard live demos to let users explore and learn about the dashboards. [#1784 (open)](https://github.com/apache/incubator-devlake/issues/1784)</li></ol>For returning users: <ol><li>Provide detailed guides to help users customize Grafana dashboards.</li><li>Work on the documentation for advanced features in the Config UI, such as the usage of Advancned Mode and replacements of old auth tokens for data connections.</li></ol>Others:<ol><li>Build a website to present well-organized documentation to DevLake users and contributors. </li></ol> |


## How to Influence the Roadmap
A roadmap is only useful when it captures real user needs. We are glad to hear from you if you have specific use cases, feedback, or ideas. You can submit an issue to let us know!
Also, if you plan to work (or are already working) on a new or existing feature, tell us, so that we can update the roadmap accordingly. We are happy to share knowledge and context to help your feature land successfully.
<br/><br/><br/>


