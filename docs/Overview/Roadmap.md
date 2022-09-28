---
title: "Roadmap"
description: >
  The goals and roadmap for DevLake in 2022
sidebar_position: 3
---


## Goals
DevLake has joined the Apache Incubator and is aiming to become a top-level project. To achieve this goal, the Apache DevLake (Incubating) community will continue to make efforts in helping development teams to analyze and improve their engineering productivity. In the 2022 Roadmap, we have summarized three major goals followed by the feature breakdown to invite the broader community to join us and grow together.

1. As a dev data analysis application, discover and implement 3 (or even more!) usage scenarios:
   - A collection of metrics to track the contribution, quality and growth of open-source projects
   - DORA metrics for DevOps engineers
   - To be decided ([let us know](https://join.slack.com/t/devlake-io/shared_invite/zt-17b6vuvps-x98pqseoUagM7EAmKC82xQ) if you have any suggestions!)
2. As dev data infrastructure, provide robust data collection modules, customizable data models, and data extensibility.
3. Design better user experience for end-users and contributors.

## Feature Breakdown
Apache DevLake is currently under rapid development. You are more than welcome to use the following table to explore your intereted features and make contributions. We deeply appreciate the collective effort of our community to make this project possible!

| Category | Features|
| --- | --- |
| More data sources across different [DevOps domains](../DataModels/DevLakeDomainLayerSchema.md) (Goal No.1 & 2)| Features in **bold** are of higher priority <br/><br/> Issue/Task Management: <ul><li>**Jira server** [#886 (closed)](https://github.com/apache/incubator-devlake/issues/886)</li><li>**Jira data center** [#1687 (closed)](https://github.com/apache/incubator-devlake/issues/1687)</li><li>GitLab Issues [#715 (closed)](https://github.com/apache/incubator-devlake/issues/715)</li><li>Trello [#1881 (open)](https://github.com/apache/incubator-devlake/issues/1881)</li><li>**TAPD** [#560 (closed)](https://github.com/apache/incubator-devlake/issues/560)</li><li>Teambition [#1882 (open)](https://github.com/apache/incubator-devlake/issues/1882)</li><li>Ones [#1884 (open)](https://github.com/apache/incubator-devlake/issues/1884)</li></ul> Source Code Management: <ul><li>BitBucket</li><li>Gitee [#1883 (open)](https://github.com/apache/incubator-devlake/issues/1883)</li><li>Coder</li></ul> Code Review: <ul><li>Gerrit</li></ul> CI/CD: <ul><li>GitHub Action</li><li>ArgoCI</li><li>ArgoCD</li><li>TeamCity</li></ul>Quality: <ul><li>**SonarQube**</li><li>Coverity</li></ul> QA: <ul><li>Selenium</li><li>Junit</li><li>JMeter</li><li>Cucumber Test</li></ul> Calendar: <ul><li>Google Calendar</li><li>Zoom Calendar</li><li>Lark Calendar</li><li>Tencent Calendar</li></ul> OSS Community Metrics: <ul><li>GitHub stars, clones, watches</li></ul>|
| Improved data collection, [data models](../DataModels/DevLakeDomainLayerSchema.md) and data extensibility (Goal No.2)| Data Collection: <br/> <ul><li>Complete the logging system</li><li>Implement a good error handling mechanism during data collection</li></ul> Data Models:<ul><li>Introduce DBT to allow users to create and modify the domain layer schema. [#1479 (closed)](https://github.com/apache/incubator-devlake/issues/1479)</li><li>Design the data models for 5 new domains, please refers to the data models of the tools under each domain (see the cell above):<ul><li>Quality</li><li>Testing</li><li>Calendar</li><li>Documentation</li><li>OSS Community Metrics</li></ul></li><li>Polish the data models for [existing domains](../DataModels/DevLakeDomainLayerSchema.md): Issue/Task Management, Source Code Management, Code Review and CI/CD.</li></ul> Data Extensibility: <ul><li>Enhance the performance of data application under large-scaled usage scenarios</li><li>Support OLAP databases for more flexible data storage options</li></ul>|
| Better user experience (Goal No.3) | For new users: <ul><li> Iterate on a clearer step-by-step guide to improve the pre-configuration experience.</li><li>Provide a new Config UI to reduce frictions for data configuration [#1700 (in-progress)](https://github.com/apache/incubator-devlake/issues/1700)</li><li> Showcase dashboard live demos to let users explore and learn about the dashboards. [#1784 (open)](https://github.com/apache/incubator-devlake/issues/1784)</li></ul>For returning users: <ul><li>Provide detailed guides to help users customize Grafana dashboards.</li><li>Work on the documentation for advanced features in the Config UI, such as the usage of Advanced Mode and replacements of old auth tokens for data connections.</li></ul>For contributors:<ul><li>Add more guide to set up DevLake in different operating system.</li><li>Provide clearer docs for contributors to get on board easier.</li><li>Add Swagger to document API [#292 closed](https://github.com/apache/incubator-devlake/issues/292)</li><li>More docs about raw/tool/domain data models</li></ul> |


## How to Influence the Roadmap
A roadmap is only useful when it captures real user needs. We are glad to hear from you if you have specific use cases, feedback, or ideas. You can submit an issue to let us know!
Also, if you plan to work (or are already working) on a new or existing feature, tell us, so that we can update the roadmap accordingly. We are happy to share knowledge and context to help your feature land successfully.
<br/><br/><br/>

