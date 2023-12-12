---
slug: compatibility-of-apache-devLake-with-postgreSQL
title: Compatibility of Apache DevLake with PostgreSQL
authors: ZhangLiang
tags: [devlake, database, postgresql]
---

Apache DevLake is a dev data platform that can collect and integrate data from different dev tools including Jira, Github, GitLab and Jenkins.

This blog will not aim at a comprehensive summary of the compatibility of database but a record of issues for future reference.

## 1.Different  Data Types
### PostgreSQL does not have a uint type
```sql=
type JenkinsBuild struct {
 common.NoPKModel
 JobName           string  `gorm:"primaryKey;type:varchar(255)"`
 Duration          float64 // build time
 DisplayName       string  // "#7"
 EstimatedDuration float64
 Number            int64 `gorm:"primaryKey;type:INT(10) UNSIGNED NOT NULL"`
 Result            string
 Timestamp         int64     // start time
 StartTime         time.Time // convered by timestamp
 CommitSha         string
}
```

In `JenkinsBuild.Number`, the`gorm`struct tag used `UNSIGNED`, which will lead to the failure to create table and should be removed.

![](https://i.imgur.com/N7E9Vwd.png)


### MySQL does not have a bool data type

For a field defined as bool type in model, gorm will map it to MySQL's TINYINT data type, which can be queried directly with 0 or 1 in SQL, but PostgreSQL has a bool type, so gorm will map it to the BOOL type. If 0 or 1 is still used in SQL to query, there will be a report of error.

Here is an example(only relevant fields are shown in the example). The lookup statement works in MySQL, but will lead to an error in PostgreSQL.

```sql=
type GitlabMergeRequestNote struct {
 MergeRequestId  int    `gorm:"index"`
 System          bool 
}
 
db.Where("merge_request_id = ? AND `system` = 0", gitlabMr.GitlabId).
```

After changing the sentence as it follows, an error will still be reported. The reason will be shown in the part about backticks.

```sql=
db.Where("merge_request_id = ? AND `system` = ?", gitlabMr.GitlabId, false)
```

## 2.Different Behaviors

### Bulk insertion
When `ON CONFLIT UPDATE ALL` was used to achieve bulk insertion, and if there are multiple records with the same primary key, it will report errors in PostgreSQL but not in MySQL.
![](https://i.imgur.com/zaExAUG.png)

![](https://i.imgur.com/BpZY8dN.png)

### Inconsistent definition of model with schema
For example, in the model definition, `GithubPullRequest.AuthorId` is of the int type, but this field in the database is of VARCHAR type. When inserting data, MySQL will accept it, but ProstgresSQL will report an error.
```sql=
type GithubPullRequest struct {
 GithubId        int    `gorm:"primaryKey"`
 RepoId          int    `gorm:"index"`
 Number          int    `gorm:"index"` 
 State           string `gorm:"type:varchar(255)"`
 Title           string `gorm:"type:varchar(255)"`
 GithubCreatedAt time.Time
 GithubUpdatedAt time.Time `gorm:"index"`
 ClosedAt        *time.Time
 // In order to get the following fields, we need to collect PRs individually from GitHub
 Additions      int
 Deletions      int
 Comments       int
 Commits        int
 ReviewComments int
 Merged         bool
 MergedAt       *time.Time
 Body           string
 Type           string `gorm:"type:varchar(255)"`
 Component      string `gorm:"type:varchar(255)"`
 MergeCommitSha string `gorm:"type:varchar(40)"`
 HeadRef        string `gorm:"type:varchar(255)"`
 BaseRef        string `gorm:"type:varchar(255)"`
 BaseCommitSha  string `gorm:"type:varchar(255)"`
 HeadCommitSha  string `gorm:"type:varchar(255)"`
 Url            string `gorm:"type:varchar(255)"`
 AuthorName     string `gorm:"type:varchar(100)"`
 AuthorId       int
 common.NoPKModel
}
```
![](https://i.imgur.com/onxGG8d.png)

## 3.MySQL-Specific Functions

We used the `GROUP_CONCAT`function in a complex query. Although there are similar functions in PostgreSQL, the function names are different and the usage is slightly different.

```sql=
cursor2, err := db.Table("pull_requests pr1").
  Joins("left join pull_requests pr2 on pr1.parent_pr_id = pr2.id").Group("pr1.parent_pr_id, pr2.created_date").Where("pr1.parent_pr_id != ''").
  Joins("left join repos on pr2.base_repo_id = repos.id").
  Order("pr2.created_date ASC").
  Select(`pr2.key as parent_pr_key, pr1.parent_pr_id as parent_pr_id, GROUP_CONCAT(pr1.base_ref order by pr1.base_ref ASC) as cherrypick_base_branches, 
   GROUP_CONCAT(pr1.key order by pr1.base_ref ASC) as cherrypick_pr_keys, repos.name as repo_name, 
   concat(repos.url, '/pull/', pr2.key) as parent_pr_url`).Rows()
```

Solution:
We finally decided to use two steps to achieve the `GROUP_CONCAT` function. First we used the simplest SQL query to get multiple pieces of the sorted data, and then used the code to group them.

After modification:
```sql=
    cursor2, err := db.Raw(
  `
   SELECT pr2.pull_request_key                 AS parent_pr_key,
          pr1.parent_pr_id                     AS parent_pr_id,
          pr1.base_ref                         AS cherrypick_base_branch,
          pr1.pull_request_key                 AS cherrypick_pr_key,
          repos.NAME                           AS repo_name,
          Concat(repos.url, '/pull/', pr2.pull_request_key) AS parent_pr_url,
        pr2.created_date
   FROM   pull_requests pr1
          LEFT JOIN pull_requests pr2
                 ON pr1.parent_pr_id = pr2.id
          LEFT JOIN repos
                 ON pr2.base_repo_id = repos.id
   WHERE  pr1.parent_pr_id != ''
   ORDER  BY pr1.parent_pr_id,
             pr2.created_date,
       pr1.base_ref ASC
   `).Rows()
```

## 4.Different Grammar
### Backticks
We used backticks in some SQL statements to protect field names from conflicting with MySQL reserved words, which can lead to errors in PostgreSQL. To solve this problem we revisited our code, modified all field names that conflict with reserved words, and removed the backticks in the SQL statement. In the example just mentioned:

```sql=
db.Where("merge_request_id = ? AND `system` = ?", gitlabMr.GitlabId, false)
```

Solution:
We changed `system` to `is_system` to avoid the usage of backticks.
```sql=
db.Where("merge_request_id = ? AND is_system = ?", gitlabMr.GitlabId, false)
```

### Non-standard delete statement
There were delete statements as followed in our code, which are legal in MySQL but will report an error in PostgreSQL.
```sql=
err := db.Exec(`
 DELETE ic
 FROM jira_issue_commits ic
 LEFT JOIN jira_board_issues bi ON (bi.source_id = ic.source_id AND bi.issue_id = ic.issue_id)
 WHERE ic.source_id = ? AND bi.board_id = ?
 `, sourceId, boardId).Error
```
