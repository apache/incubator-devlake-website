---
title: "Mysql Troubleshooting"
sidebar_position: 4
description: >
  Mysql Troubleshooting
---

## How to manage the quickly increasing MySQL disk consumption?

DevLake is designed to collect data by first deleting the existing data and
then inserting new data. While this approach ensures that the latest data is
always available, it leads to a rapid increase in MySQL disk consumption.
This growth is primarily caused by the large size of the binary logs generated
after each data collection cycle.

### Why dose DevLake choose to delete the existing data and then insert new data?

Because we want to ensure that the latest data is 
always available. If we don't delete the existing data, some old data which has been deleted 
from the previous step will still be available in the DevLake database.


### How to purge old binary logs?

1. Connect to your MySQL server using the MySQL client or any other database management tool such as PhpMyAdmin, MySQL Workbench, etc.

2. Run the following command to check the current status of your binary log files:

```sql
SHOW BINARY LOGS;
```
This will display a list of all the binary log files that are currently available on your MySQL server.

3. Determine the last binary log file that you want to keep. This is the file that you want to retain for any future point-in-time recovery or replication purposes.

4. Run the following command to purge all binary logs that are older than the binary log file that you want to retain:

```sql
PURGE BINARY LOGS BEFORE 'DATE' ;
```
You need to provide the specific date and time up to which you want to purge the binary logs. The date and time should be formatted as a string in the 'YYYY-MM-DD hh:mm:ss' format.
For example, if you want to purge all binary logs before March 22, 2023, 15:30:00, you would replace DATE with '2023-03-22 15:30:00', like this:

```sql
PURGE BINARY LOGS BEFORE '2023-03-22 15:30:00' ;
```


5. After running the command, MySQL will delete all binary log files that are older than the specified file. You can verify that the purge was successful by running the SHOW BINARY LOGS; command again.

Note: Keep in mind that deleting old binary log files can affect point-in-time recovery and replication capabilities, so it's important to only delete files that are no longer needed.

Additionally, it's recommended to take a backup before deleting any binary log files in case you need to restore to a point before the binary logs were purged.

### How to "automate" the purge of old binary logs?

1. Connect to your MySQL server using the MySQL client or any other database management tool such as PhpMyAdmin, MySQL Workbench, etc.

2. Run the following command to set the expire_logs_days global variable to the number of days that you want to keep binary logs for:

```sql
SET GLOBAL expire_logs_days = 1;
```

### How to skip bin logs?

1. To skip bin logs, you can set the skip-log-bin configuration option directly in the docker-compose.yaml file using the command option. Here's an example of how to do this:
```yaml
services:
  mysql:
    image: mysql:8
    volumes:
      - mysql-storage:/var/lib/mysql
    restart: always
    ports:
      - "127.0.0.1:3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: admin
      MYSQL_DATABASE: lake
      MYSQL_USER: merico
      MYSQL_PASSWORD: merico
    command:
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_bin
      --skip-log-bin
```

2. After making the changes, you can restart the MySQL container using the following command:
```bash
  docker-compose restart mysql
```


### How to connect mysql server which requires SSL?
1. Skip-verifying the SSL certificate: you can add &tls=skip-verify to DB_URL variable, for example:
   ```
   DB_URL=mysql://merico:merico@localhost:3306/lake?charset=utf8mb4&parseTime=True&loc=UTC&tls=skip-verify
   ```
2. Verify the SSL certificate: you can add &tls=custom&ca-cert=/path/to/your/ca-certificate.crt to DB_URL variable, for example:
   ```
   DB_URL=mysql://merico:merico@lake.mysql.database.azure.com:3306/lake?charset=utf8mb4&parseTime=True&tls=custom&ca-cert=/path/to/your/DigiCertGlobalRootCA.crt.pem
   ```
   Note: in Python plugins, it will fallback to the `skip-verify` policy.