---
title: "E2E Test Guide"
description: >
  The steps to write E2E tests for plugins.
---

# How to write E2E tests for plugins

## Why write E2E tests

E2E testing, as a part of automated testing, generally refers to black-box testing at the file and module level or unit testing that allows the use of some external services such as databases. The purpose of writing E2E tests is to shield some internal implementation logic and see whether the same external input can output the same result in terms of data aspects. In addition, compared to the black-box integration tests, it can avoid some chance problems caused by network and other factors. More information about the plugin can be found here: Why write E2E tests (incomplete).
In DevLake, E2E testing consists of interface testing and input/output result validation for the plugin Extract/Convert subtask. This article only describes the process of writing the latter.

## Preparing data

Let's take a simple plugin - Feishu Meeting Hours Collection as an example here. Its directory structure looks like this.
![image](https://user-images.githubusercontent.com/3294100/175061114-53404aac-16ca-45d1-a0ab-3f61d84922ca.png)
Next, we will write the E2E tests of the sub-tasks.

The first step in writing the E2E test is to run the Collect task of the corresponding plugin to complete the data collection, that is, to have the corresponding data saved in the table starting with `_raw_feishu_` in the database.
Here are the logs and database tables using the DirectRun (cmd) run method.
```
$ go run plugins/feishu/main.go --numOfDaysToCollect 2 --connectionId 1 (Note: command may change with version upgrade)
[2022-06-22 23:03:29] INFO failed to create dir logs: mkdir logs: file exists
press `c` to send cancel signal
[2022-06-22 23:03:29]  INFO  [feishu] start plugin
[2022-06-22 23:03:33]  INFO  [feishu] scheduler for api https://open.feishu.cn/open-apis/vc/v1 worker: 13, request: 10000, duration: 1h0m0s
[2022-06-22 23:03:33]  INFO  [feishu] total step: 2
[2022-06-22 23:03:33]  INFO  [feishu] executing subtask collectMeetingTopUserItem
[2022-06-22 23:03:33]  INFO  [feishu] [collectMeetingTopUserItem] start api collection
[2022-06-22 23:03:34]  INFO  [feishu] [collectMeetingTopUserItem] finished records: 1
[2022-06-22 23:03:34]  INFO  [feishu] [collectMeetingTopUserItem] end api collection error: %!w(<nil>)
[2022-06-22 23:03:34]  INFO  [feishu] finished step: 1 / 2
[2022-06-22 23:03:34]  INFO  [feishu] executing subtask extractMeetingTopUserItem
[2022-06-22 23:03:34]  INFO  [feishu] [extractMeetingTopUserItem] get data from _raw_feishu_meeting_top_user_item where params={"connectionId":1} and got 148
[2022-06-22 23:03:34]  INFO  [feishu] [extractMeetingTopUserItem] finished records: 1
[2022-06-22 23:03:34]  INFO  [feishu] finished step: 2 / 2
```

<img width="993" alt="image" src="https://user-images.githubusercontent.com/3294100/175064505-bc2f98d6-3f2e-4ccf-be68-a1cab1e46401.png"/>
Ok, the data has now been saved to the `_raw_feishu_*` table, and the `data` column is the return information from the plugin. Here we only collected data for the last 2 days. The data information is not much, but it also covers a variety of situations. That is, the same person has data on different days.

It is also worth mentioning that the plugin runs two tasks, `collectMeetingTopUserItem` and `extractMeetingTopUserItem`, the former is the task of collecting, which is needed to run this time, and the latter is the task of extracting data. It doesn't matter whether it runs in the prepared data session.

Next, we need to export the data to .csv format. This step is a variety of options. You can show your skills, and I only introduce a few common methods here.

### DevLake Code Generator Export

Run `go run generator/main.go create-e2e-raw` directly and follow the guidelines to complete the export. This solution is the simplest, but has some limitations, such as the exported fields being fixed. You can refer to the next solutions if you need more customisation options.

![usage](https://user-images.githubusercontent.com/3294100/175849225-12af5251-6181-4cd9-ba72-26087b05ee73.gif)

### GoLand Database export

![image](https://user-images.githubusercontent.com/3294100/175067303-7e5e1c4d-2430-4eb5-ad00-e38d86bbd108.png)

This solution is very easy to use and will not cause problems using Postgres or MySQL.
![image](https://user-images.githubusercontent.com/3294100/175068178-f1c1c290-e043-4672-b43e-54c4b954c685.png)
The success criteria for csv export is that the go program can read it without errors, so several points are worth noticing.

1. the values in the csv file should be wrapped in double quotes to avoid special symbols such as commas in the values that break the csv format
2. double quotes in csv files are escaped. generally `""` represents a double quote
3. pay attention to whether the column `data` is the actual value, not the value after base64 or hex

After exporting, move the .csv file to `plugins/feishu/e2e/raw_tables/_raw_feishu_meeting_top_user_item.csv`.

### MySQL Select Into Outfile

This is MySQL's solution for exporting query results to a file. The MySQL currently started in docker-compose.yml comes with the --security parameter, so it does not allow `select ... into outfile`. The first step is to turn off the security parameter, which is done roughly as follows.
![origin_img_v2_c809c901-01bc-4ec9-b52a-ab4df24c376g](https://user-images.githubusercontent.com/3294100/175070770-9b7d5b75-574b-49ed-9bca-e9f611f60795.jpg)
After closing it, use `select ... into outfile` to export the csv file. The export result is rough as follows.
![origin_img_v2_ccfdb260-668f-42b4-b249-6c2dd45816ag](https://user-images.githubusercontent.com/3294100/175070866-2204ae13-c058-4a16-bc20-93ab7c95f832.jpg)
Notice that the data field has extra hexsha fields, which need to be manually converted to literal quantities.

### Vscode Database

This is Vscode's solution for exporting query results to a file, but it is not easy to use. Here is the export result without any configuration changes
![origin_img_v2_c9eaadaa-afbc-4c06-85bc-e78235f7eb3g](https://user-images.githubusercontent.com/3294100/175071987-760c2537-240c-4314-bbd6-1a0cd85ddc0f.jpg)
However, it is obvious that the escape symbol does not conform to the csv specification, and the data is not successfully exported. After adjusting the configuration and manually replacing `\"` with `""`, we get the following result.
![image](https://user-images.githubusercontent.com/3294100/175072314-954c6794-3ebd-45bb-98e7-60ddbb5a7da9.png)
The data field of this file is encoded in base64, so it needs to be decoded manually to a literal amount before using it.

### MySQL workerbench

This tool must write the SQL yourself to complete the data export, which can be rewritten by imitating the following SQL.
```sql
SELECT id, params, CAST(`data` as char) as data, url, input,created_at FROM _raw_feishu_meeting_top_user_item;
```
![image](https://user-images.githubusercontent.com/3294100/175080866-1631a601-cbe6-40c0-9d3a-d23ca3322a50.png)
Select csv as the save format and export it for use.

### Postgres Copy with csv header

`Copy(SQL statement) to '/var/lib/postgresql/data/raw.csv' with csv header;` is a common export method for PG to export csv, which can also be used here.
```sql
COPY (
SELECT id, params, convert_from(data, 'utf-8') as data, url, input,created_at FROM _raw_feishu_meeting_top_user_item
) to '/var/lib/postgresql/data/raw.csv' with csv header;
```
Use the above statement to complete the export of the file. If pg runs in docker, just use the command `docker cp` to export the file to the host.

## Writing E2E tests

First, create a test environment. For example, let's create `meeting_test.go`.
![image](https://user-images.githubusercontent.com/3294100/175091380-424974b9-15f3-457b-af5c-03d3b5d17e73.png)
Then enter the test preparation code in it as follows. The code is to create an instance of the `feishu` plugin and then call `ImportCsvIntoRawTable` to import the data from the csv file into the `_raw_feishu_meeting_top_user_item` table.

```go
func TestMeetingDataFlow(t *testing.T) {
	var plugin impl.Feishu
	dataflowTester := e2ehelper.NewDataFlowTester(t, "feishu", plugin)

	// import raw data table
	dataflowTester.ImportCsvIntoRawTable("./raw_tables/_raw_feishu_meeting_top_user_item.csv", "_raw_feishu_meeting_top_user_item")
}
```
The signature of the import function is as follows.
```func (t *DataFlowTester) ImportCsvIntoRawTable(csvRelPath string, rawTableName string)```
He has a twin, with only slight differences in parameters.
```func (t *DataFlowTester) ImportCsvIntoTabler(csvRelPath string, dst schema.Tabler)```
The former is used to import tables in the raw layer. The latter is used to import arbitrary tables.
**Note:** These two functions will delete the db table and use `gorm.AutoMigrate` to re-create a new table to clear data in it.
After importing the data is complete, run this tester and it must be PASS without any test logic at this moment. Then write the logic for calling the call to the extractor task in `TestMeetingDataFlow`.

```go
func TestMeetingDataFlow(t *testing.T) {
	var plugin impl.Feishu
	dataflowTester := e2ehelper.NewDataFlowTester(t, "feishu", plugin)

	taskData := &tasks.FeishuTaskData{
		Options: &tasks.FeishuOptions{
			ConnectionId: 1,
		},
	}

	// import raw data table
	dataflowTester.ImportCsvIntoRawTable("./raw_tables/_raw_feishu_meeting_top_user_item.csv", "_raw_feishu_meeting_top_user_item")

	// verify extraction
	dataflowTester.FlushTabler(&models.FeishuMeetingTopUserItem{})
	dataflowTester.Subtask(tasks.ExtractMeetingTopUserItemMeta, taskData)

}
```
The added code includes a call to `dataflowTester.FlushTabler` to clear the table `_tool_feishu_meeting_top_user_items` and a call to `dataflowTester.Subtask` to simulate the running of the subtask `ExtractMeetingTopUserItemMeta`.

Now run it and see if the subtask `ExtractMeetingTopUserItemMeta` completes without errors. The data results of the `extract` run generally come from the raw table, so the plugin subtask will run correctly if written without errors. We can observe if the data is successfully parsed in the db table in the tool layer. In this case the `_tool_feishu_meeting_top_user_items` table has the correct data.

If the run is incorrect, maybe you can troubleshoot the problem with the plugin itself before moving on to the next step.

## Verify that the results of the task are correct

Let's continue writing the test and add the following code at the end of the test function
```go
func TestMeetingDataFlow(t *testing.T) {
    ......
    
    dataflowTester.VerifyTable(
      models.FeishuMeetingTopUserItem{},
      "./snapshot_tables/_tool_feishu_meeting_top_user_items.csv",
      []string{"connection_id", "start_time", "name"},
      []string{
        "meeting_count",
        "meeting_duration",
        "user_type",
        "_raw_data_params",
        "_raw_data_table",
        "_raw_data_id",
        "_raw_data_remark",
      },
    )
}
```
Its purpose is to call `dataflowTester.VerifyTable` to complete the validation of the data results. The third parameter is the table's primary keys, and the fourth parameter is all the fields of the table that need to be verified. The data used for validation exists in `. /snapshot_tables/_tool_feishu_meeting_top_user_items.csv`, but of course, this file does not exist yet.

To facilitate the generation of the file mentioned above, DevLake has adopted a testing technique called `Snapshot`, which will automatically generate the file based on the run results when the `VerifyTable` file is called without the csv existing.

But note! Please do two things after the snapshot is created: 1. check if the file is generated correctly 2. re-run it to make sure there are no errors between the generated results and the re-run results.
These two operations are critical and directly related to the quality of test writing. We should treat the snapshot file in `.csv' format like a code file.

If there is a problem with this step, there are usually 2 ways to solve it.
1. The validated fields contain fields like create_at runtime or self-incrementing ids, which cannot be repeatedly validated and should be excluded.
2. there is `\n` or `\r\n` or other escape mismatch fields in the run results. Generally, when parsing the `httpResponse` error, you can follow these solutions:
    1. modify the field type of the content in the api model to `json.
    2. convert it to string when parsing
    3. so that the `\n` symbol can be kept intact, avoiding the parsing of line breaks by the database or the operating system


For example, in the `github` plugin, this is how it is handled.
![image](https://user-images.githubusercontent.com/3294100/175098219-c04b810a-deaf-4958-9295-d5ad4ec152e6.png)
![image](https://user-images.githubusercontent.com/3294100/175098273-e4a18f9a-51c8-4637-a80c-3901a3c2934e.png)

Well, at this point, the E2E writing is done. We have added a total of 3 new files to complete the testing of the meeting length collection task. It's pretty easy.
![image](https://user-images.githubusercontent.com/3294100/175098574-ae6c7fb7-7123-4d80-aa85-790b492290ca.png)

## Run E2E tests for all plugins like CI

It's straightforward. Just run `make e2e-plugins` because DevLake has already solidified it into a script~

