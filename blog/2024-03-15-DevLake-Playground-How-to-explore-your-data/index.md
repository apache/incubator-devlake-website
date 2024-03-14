---
slug: DevLake-Playground-How-to-explore-your-data
title: DevLake Playground: How to explore your data
authors: [Jochum, Lennart]
tags: [devlake, playground, python, process mining]
---

DevLake comes with Grafana to create dashboards for your flow metrics, with the new exciting DevLake Playground, we unleash the power of Python on your data.

The DevLake Playground is a place for Jupyter Notebooks, with some predefined notebooks and the option to write your own. 
A Jupyter notebook is a combination of python code and documentation, so with some tweaks, you can easily change it to your own needs.
The benefits of these jupyter notebooks opposed to grafana are:
- Some functionality wouldn't translate easily to Grafana
- Python (code) vs SQL, for flexilibity on transforming the data, providing fast feedback
- Python libraries support more visualization types

## Use cases

### Analyzing development process through JIRA statuses
The [DevLake Domain model](https://devlake.apache.org/docs/DataModels/DevLakeDomainLayerSchema#schema-diagram) exposes the changes of issues of our issue tracker, include changes in status.
If we use that to visualize how issues really flow, we get a rudementary (automated) value stream map and can identify bottlenecks in our process or flaws in our process design.
This is inspired by [this blog post](https://xebia.com/blog/insights-from-your-jira-data-to-help-improve-your-team/):

![process graph](./processgraph.png)
For example, in the chart above, we see that it takes on average 15 days for Stories to go from "Ready" to "In Progress". And, it happened 476x within the selected time frame.

And, now that we have this data in our playground, we can easily change how we represent it. If we focus on the most common status transitions, we can visualize the distribution of durations in a box plot, out of the same data:

![box plot](./boxplot.png)

This functionality is made available through a [predefined notebook](https://github.com/apache/incubator-devlake-playground/blob/main/notebooks/process_analysis.ipynb), so you can easily run it with your own data.

### Explore data across different domains
Let's say we have an hypothesis: 'defect fixes are more quickly merged than new functionality'. Before building a dashboard, we want to see if the data quality is good enough and if we can test this hypothesis.
With [pandas](https://pandas.pydata.org/), we can easily join different tables from the [data model](https://devlake.apache.org/docs/DataModels/DevLakeDomainLayerSchema#schema-diagram). 
With the following code, we found a quick way to get a preliminary view:

```python
import pandas as pd

from playground.db_engine import create_db_engine

DB_URL = "mysql://merico:merico@127.0.0.1:3306/lake"

engine = create_db_engine(DB_URL)

df_pr_issues = pd.read_sql("select * from pull_request_issues", engine)
df_prs = pd.read_sql("select * from pull_requests", engine)
df_issues = pd.read_sql("select * from issues", engine)
# join pull requests and issues based on rows in pull_request_issues
df = pd.merge(df_pr_issues, df_prs, left_on="pull_request_id", right_on="id", suffixes=('_pr_issues', '_prs'))
df = pd.merge(df, df_issues, left_on="issue_id", right_on="id", suffixes=('_prs', '_issues'))

df['created_date_issues'] = pd.to_datetime(df['created_date_issues'])
df['resolution_date'] = pd.to_datetime(df['resolution_date'])
df['created_date_prs'] = pd.to_datetime(df['created_date_prs'])
df['merged_date'] = pd.to_datetime(df['merged_date'])
df['issue_lead_time'] = df['resolution_date'] - df['created_date_issues']
df['pr_lead_time'] = df['merged_date'] - df['created_date_prs']
df = df[['type_issues', 'title_issues', 'issue_lead_time', 'title_prs', 'pr_lead_time']]

# group lead times by issue_type, add count
df_grouped = df.groupby('type_issues').agg({
    'title_issues': 'count', 
    'issue_lead_time': ['mean', 'median', 'std'], 
    'pr_lead_time': ['mean', 'median', 'std']
})
# rename title_issue_count to issue_count
df.rename(columns={'title_issues': 'issue_count'}, inplace=True)
display(df_grouped)
```

If we run this example on the Devlake GitHub issues and pull requests (up to March 2024), we get the following output:

|             | title_issues | issue_lead_time            |                         |                            | pr_lead_time              |                        |                            |
| ----------- | ------------ | -------------------------- | ----------------------- | -------------------------- | ------------------------- | ---------------------- | -------------------------- |
|             | count        | mean                       | median                  | std                        | mean                      | median                 | std                        |
| type_issues |              |                            |                         |                            |                           |                        |                            |
|             | 34           | 66 days 14:53:28.709677419 | 42 days 05:59:04        | 67 days 14:35:49.143870568 | 3 days 11:42:34.857142857 | 0 days 12:54:43.500000 | 12 days 17:24:54.878541108 |
| BUG         | 141          | 10 days 07:27:20.572463768 | 1 days 22:42:39         | 20 days 14:51:35.075965706 | 1 days 16:51:51.529411764 | 0 days 01:04:54        | 10 days 10:20:54.566875184 |
| INCIDENT    | 2            | 0 days 00:50:49            | 0 days 00:50:49         | 0 days 00:59:50.688234865  | 0 days 00:06:39           | 0 days 00:06:39        | 0 days 00:00:42.426406871  |
| REQUIREMENT | 40           | 37 days 02:50:22.500000    | 16 days 03:56:45.500000 | 60 days 02:39:39.606995949 | 9 days 11:13:27.270270270 | 2 days 00:14:04        | 22 days 12:32:27.522638402 |


## Getting started
We hope you are as excited as we are. We look forward for you to join our community to get your feedback and contributions.
Want to get started? have a look at the [playground repository](https://github.com/apache/incubator-devlake-playground).