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
1. Moving to Apache Incubator and making DevLake a graduation-ready project.
2. Explore and implement 3 typical use scenarios to help certain engineering teams and developers:
   - Observation of open-source project contribution and quality
   - DORA metrics for the DevOps team
   - SDLC workflow monitoring and improvement
3. Better UX for end-users and contributors.


## DevLake 2022 Roadmap
DevLake is currently under rapid development. This page describes the project’s public roadmap, the result of an ongoing collaboration between the core maintainers and the broader DevLake community.<br/><br/>
This roadmap is broken down by the goals in the last section.


| Category | Features|
| --- | --- |
| More data sources across different [DevOps domains](../05-DataModels/01-DevLakeDomainLayerSchema.md)| 1. **Issue/Task Management - Jira server** <br/> 2. **Issue/Task Management - Jira data center** <br/> 3. Issue/Task Management - GitLab Issues <br/> 4. Issue/Task Management - Trello  [#1881](https://github.com/apache/incubator-devlake/issues/1881) <br/> 5. **Issue/Task Management - TAPD** <br/> 6. Issue/Task Management - Teambition <br/> 7. Issue/Task Management - Ones <br/> 8. **Source Code Management - GitLab on-premise** <br/> 9. Source Code Management - BitBucket <br/> 10. Source Code Management - Gitee <br/> 11. Source Code Management - Coder <br/> 12. Code Review - Gerrit <br/> 13. **CI/CD - GitHub Action** <br/> 14. CI/CD - ArgoCI <br/> 15. CI/CD - ArgoCD <br/> 16. CI/CD - TeamCity <br/> 17. **Quality - SonarQube** <br/> 18. Quality - Fossa <br/> 19. QA - Selenium <br/> 20. QA - Junit <br/> 21. QA - JMeter <br/> 22. QA - Cucumber test <br/> 23. Calendar - Google Calendar <br/> 24. Calendar - Zoom Calendar <br/> 25. **Calendar - Lark Calendar** <br/> 26. Calendar - Tencent Calendar <br/> 27. OSS Communnity Metrics - GitHub stars, clones, watches <br/>|
| More comprehensive and flexible [engineering data model](../05-DataModels/01-DevLakeDomainLayerSchema.md) | 1. Implement the data models for the Quality, Testing, Calendar, Documentation and OSS Communnity Metrics domains.<br/> 2. Polish the data models for [existing domains](../05-DataModels/01-DevLakeDomainLayerSchema.md): Issue/Task Management, Source Code Management, Code Review and CI/CD.<br/> 3. Introduce DBT to allow users to create and modify the domain layer schema.<br/> |
| Better User Experience | For new users: <br/> 1. Iterate on a clearer step-by-step guide to improve the pre-configuration experience.<br/>2. Design the new Config UI to reduce frictions for syncing data. <br/> 3. Showcase dashboard live demos to let users explore and learn about the dashboards.<br/><br/>For returning users:<br/> 1. Provide detailed guides to help users customize Grafana dashboards.<br/> 2. Work on the documentation for advanced features in the Config UI, such as the usage of Advancned Mode and replacements of old auth tokens for data connections.<br/><br/>Others:<br/> 1. Improve data collection speed for Github and other plugins with strict API rate limit <br/> 2. Build a website to present well-organized documentation to DevLake users and contributors. <br/> |


## How to Influence the Roadmap
A roadmap is only useful when it captures real user needs. We are glad to hear from you if you have specific use cases, feedback, or ideas. You can submit an issue to let us know!
Also, if you plan to work (or are already working) on a new or existing feature, tell us, so that we can update the roadmap accordingly. We are happy to share knowledge and context to help your feature land successfully.
<br/><br/><br/>


