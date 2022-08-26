---
sidebar_position: 04
title: "Engineering Metrics"
linkTitle: "Engineering Metrics"
tags: []
categories: []
weight: 40000
description: >
  The definition, values and data required for the 20+ engineering metrics supported by DevLake.
---

<table>
    <tr>
        <th><b>Category</b></th>
        <th><b>Metric Name</b></th>
        <th><b>Definition</b></th>
        <th><b>Data Required</b></th>
        <th style={{width:'70%'}}><b>Use Scenarios and Recommended Practices</b></th>
        <th><b>Value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></th>
    </tr>
    <tr>
        <td rowspan="10">Delivery Velocity</td>
        <td>Requirement Count</td>
        <td>Number of issues in type "Requirement"</td>
        <td>Issue/Task Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/jira/README.md">Jira issues</a>, <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub issues</a>, etc</td>
        <td rowspan="2">
1. Analyze the number of requirements and delivery rate of different time cycles to find the stability and trend of the development process.
<br/>2. Analyze and compare the number of requirements delivered and delivery rate of each project/team, and compare the scale of requirements of different projects.
<br/>3. Based on historical data, establish a baseline of the delivery capacity of a single iteration (optimistic, probable and pessimistic values) to provide a reference for iteration estimation.
<br/>4. Drill down to analyze the number and percentage of requirements in different phases of SDLC. Analyze rationality and identify the requirements stuck in the backlog.</td>
        <td rowspan="2">1. Based on historical data, establish a baseline of the delivery capacity of a single iteration to improve the organization and planning of R&D resources.
<br/>2. Evaluate whether the delivery capacity matches the business phase and demand scale. Identify key bottlenecks and reasonably allocate resources.</td>
    </tr>
    <tr>
        <td>Requirement Delivery Rate</td>
        <td>Ratio of delivered requirements to all requirements</td>
        <td>Issue/Task Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/jira/README.md">Jira issues</a>, <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub issues</a>, etc</td>
    </tr>
    <tr>
        <td>Requirement Lead Time</td>
        <td>Lead time of issues with type "Requirement"</td>
        <td>Issue/Task Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/jira/README.md">Jira issues</a>, <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub issues</a>, etc</td>
        <td>
1. Analyze the trend of requirement lead time to observe if it has improved over time.
<br/>2. Analyze and compare the requirement lead time of each project/team to identify key projects with abnormal lead time.
<br/>3. Drill down to analyze a requirement's staying time in different phases of SDLC. Analyze the bottleneck of delivery velocity and improve the workflow.</td>
        <td>1. Analyze key projects and critical points, identify good/to-be-improved practices that affect requirement lead time, and reduce the risk of delays
<br/>2. Focus on the end-to-end velocity of value delivery process; coordinate different parts of R&D to avoid efficiency shafts; make targeted improvements to bottlenecks.</td>
    </tr>
    <tr>
        <td>Requirement Granularity</td>
        <td>Number of story points associated with an issue</td>
        <td>Issue/Task Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/jira/README.md">Jira issues</a>, <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub issues</a>, etc</td>
        <td>
1. Analyze the story points/requirement lead time of requirements to evaluate whether the ticket size, ie. requirement complexity is optimal.
<br/>2. Compare the estimated requirement granularity with the actual situation and evaluate whether the difference is reasonable by combining more microscopic workload metrics (e.g. lines of code/code equivalents)</td>
        <td>1. Promote product teams to split requirements carefully, improve requirements quality, help developers understand requirements clearly, deliver efficiently and with high quality, and improve the project management capability of the team.
<br/>2. Establish a data-supported workload estimation model to help R&D teams calibrate their estimation methods and more accurately assess the granularity of requirements, which is useful to achieve better issue planning in project management.</td>
    </tr>
    <tr>
        <td>Commit Count</td>
        <td>Number of Commits</td>
        <td>Source Code Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitextractor/README.md">Git</a>/<a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub</a>/<a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLab</a> commits</td>
        <td>
1. Identify the main reasons for the unusual number of commits and the possible impact on the number of commits through comparison
<br/>2. Evaluate whether the number of commits is reasonable in conjunction with more microscopic workload metrics (e.g. lines of code/code equivalents)</td>
        <td>1. Identify potential bottlenecks that may affect output
<br/>2. Encourage R&D practices of small step submissions and develop excellent coding habits</td>
    </tr>
    <tr>
        <td>Added Lines of Code</td>
        <td>Accumulated number of added lines of code</td>
        <td>Source Code Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitextractor/README.md">Git</a>/<a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub</a>/<a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLab</a> commits</td>
        <td rowspan="2">
1. From the project/team dimension, observe the accumulated change in Added lines to assess the team activity and code growth rate
<br/>2. From version cycle dimension, observe the active time distribution of code changes, and evaluate the effectiveness of project development model.
<br/>3. From the member dimension, observe the trend and stability of code output of each member, and identify the key points that affect code output by comparison.</td>
        <td rowspan="2">1. identify potential bottlenecks that may affect the output
<br/>2. Encourage the team to implement a development model that matches the business requirements; develop excellent coding habits</td>
    </tr>
    <tr>
        <td>Deleted Lines of Code</td>
        <td>Accumulated number of deleted lines of code</td>
        <td>Source Code Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitextractor/README.md">Git</a>/<a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub</a>/<a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLab</a> commits</td>
    </tr>
    <tr>
        <td>Pull Request Review Time</td>
        <td>Time from Pull/Merge created time until merged</td>
        <td>Source Code Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub</a> PRs, <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLab</a> MRs, etc</td>
        <td>
1. Observe the mean and distribution of code review time from the project/team/individual dimension to assess the rationality of the review time</td>
        <td>1. Take inventory of project/team code review resources to avoid lack of resources and backlog of review sessions, resulting in long waiting time
<br/>2. Encourage teams to implement an efficient and responsive code review mechanism</td>
    </tr>
    <tr>
        <td>Bug Age</td>
        <td>Lead time of issues in type "Bug"</td>
        <td>Issue/Task Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/jira/README.md">Jira issues</a>, <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub issues</a>, etc</td>
        <td rowspan="2">
1. Observe the trend of bug age and locate the key reasons.<br/>
2. According to the severity level, type (business, functional classification), affected module, source of bugs, count and observe the length of bug and incident age.</td>
        <td rowspan="2">1. Help the team to establish an effective hierarchical response mechanism for bugs and incidents. Focus on the resolution of important problems in the backlog.<br/>
2. Improve team's and individual's bug/incident fixing efficiency. Identify good/to-be-improved practices that affect bug age or incident age</td>
    </tr>
    <tr>
        <td>Incident Age</td>
        <td>Lead time of issues in type "Incident"</td>
        <td>Issue/Task Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/jira/README.md">Jira issues</a>, <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub issues</a>, etc</td>
    </tr>
    <tr>
        <td rowspan="8">Delivery Quality</td>
        <td>Pull Request Count</td>
        <td>Number of Pull/Merge Requests</td>
        <td>Source Code Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub</a> PRs, <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLab</a> MRs, etc</td>
        <td rowspan="3">
1. From the developer dimension, we evaluate the code quality of developers by combining the task complexity with the metrics related to the number of review passes and review rounds.<br/>
2. From the reviewer dimension, we observe the reviewer's review style by taking into account the task complexity, the number of passes and the number of review rounds.<br/>
3. From the project/team dimension, we combine the project phase and team task complexity to aggregate the metrics related to the number of review passes and review rounds, and identify the modules with abnormal code review process and possible quality risks.</td>
        <td rowspan="3">1. Code review metrics are process indicators to provide quick feedback on developers' code quality<br/>
2. Promote the team to establish a unified coding specification and standardize the code review criteria<br/>
3. Identify modules with low-quality risks in advance, optimize practices, and precipitate into reusable knowledge and tools to avoid technical debt accumulation</td>
    </tr>
    <tr>
        <td>Pull Request Pass Rate</td>
        <td>Ratio of Pull/Merge Review requests to merged</td>
        <td>Source Code Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub</a> PRs, <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLab</a> MRs, etc</td>
    </tr>
    <tr>
        <td>Pull Request Review Rounds</td>
        <td>Number of cycles of commits followed by comments/final merge</td>
        <td>Source Code Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub</a> PRs, <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLab</a> MRs, etc</td>
    </tr>
    <tr>
        <td>Pull Request Review Count</td>
        <td>Number of Pull/Merge Reviewers</td>
        <td>Source Code Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub</a> PRs, <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLab</a> MRs, etc</td>
        <td>1. As a secondary indicator, assess the cost of labor invested in the code review process</td>
        <td>1. Take inventory of project/team code review resources to avoid long waits for review sessions due to insufficient resource input</td>
    </tr>
    <tr>
        <td>Bug Count</td>
        <td>Number of bugs found during testing</td>
        <td>Issue/Task Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/jira/README.md">Jira issues</a>, <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub issues</a>, etc</td>
        <td rowspan="4">
1. From the project or team dimension, observe the statistics on the total number of defects, the distribution of the number of defects in each severity level/type/owner, the cumulative trend of defects, and the change trend of the defect rate in thousands of lines, etc.<br/>
2. From version cycle dimension, observe the statistics on the cumulative trend of the number of defects/defect rate, which can be used to determine whether the growth rate of defects is slowing down, showing a flat convergence trend, and is an important reference for judging the stability of software version quality<br/>
3. From the time dimension, analyze the trend of the number of test defects, defect rate to locate the key items/key points<br/>
4. Evaluate whether the software quality and test plan are reasonable by referring to CMMI standard values</td>
        <td rowspan="4">1. Defect drill-down analysis to inform the development of design and code review strategies and to improve the internal QA process<br/>
2. Assist teams to locate projects/modules with higher defect severity and density, and clean up technical debts<br/>
3. Analyze critical points, identify good/to-be-improved practices that affect defect count or defect rate, to reduce the amount of future defects</td>
    </tr>
    <tr>
        <td>Incident Count</td>
        <td>Number of Incidents found after shipping</td>
        <td>Source Code Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub</a> PRs, <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLab</a> MRs, etc</td>
    </tr>
    <tr>
        <td>Bugs Count per 1k Lines of Code</td>
        <td>Amount of bugs per 1,000 lines of code</td>
        <td>Source Code Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub</a> PRs, <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLab</a> MRs, etc</td>
    </tr>
    <tr>
        <td>Incidents Count per 1k Lines of Code</td>
        <td>Amount of incidents per 1,000 lines of code</td>
        <td>Source Code Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub</a> PRs, <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLab</a> MRs, etc</td>
    </tr>
    <tr>
        <td>Delivery Cost</td>
        <td>Commit Author Count</td>
        <td>Number of Contributors who have committed code</td>
        <td>Source Code Management entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitextractor/README.md">Git</a>/<a href="https://github.com/merico-dev/lake/blob/main/plugins/github/README.md">GitHub</a>/<a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLab</a> commits</td>
        <td>1. As a secondary indicator, this helps assess the labor cost of participating in coding</td>
        <td>1. Take inventory of project/team R&D resource inputs, assess input-output ratio, and rationalize resource deployment</td>
    </tr>
    <tr>
        <td rowspan="3">Delivery Capability</td>
        <td>Build Count</td>
        <td>The number of builds started</td>
        <td>CI/CD entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/jenkins/README.md">Jenkins</a> PRs, <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLabCI</a> MRs, etc</td>
        <td rowspan="3">1. From the project dimension, compare the number of builds and success rate by combining the project phase and the complexity of tasks<br/>
2. From the time dimension, analyze the trend of the number of builds and success rate to see if it has improved over time</td>
        <td rowspan="3">1. As a process indicator, it reflects the value flow efficiency of upstream production and research links<br/>
2. Identify excellent/to-be-improved practices that impact the build, and drive the team to precipitate reusable tools and mechanisms to build infrastructure for fast and high-frequency delivery</td>
    </tr>
    <tr>
        <td>Build Duration</td>
        <td>The duration of successful builds</td>
        <td>CI/CD entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/jenkins/README.md">Jenkins</a> PRs, <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLabCI</a> MRs, etc</td>
    </tr>
    <tr>
        <td>Build Success Rate</td>
        <td>The percentage of successful builds</td>
        <td>CI/CD entities: <a href="https://github.com/merico-dev/lake/blob/main/plugins/jenkins/README.md">Jenkins</a> PRs, <a href="https://github.com/merico-dev/lake/blob/main/plugins/gitlab/README.md">GitLabCI</a> MRs, etc</td>
    </tr>
</table>
<br/><br/><br/>
