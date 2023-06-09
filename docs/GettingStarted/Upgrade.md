---
title: "Upgrade"
sidebar_position: 3
description: How to upgrade your Apache DevLake to a newer version
---

## Upgrade Notes

1. ENCRYPTION_SECRET: It is important to keep the ENCRYPTION_SECRET safe as it is used to encrypt sensitive information in the database, such as personal access tokens and passwords. Losing the ENCRYPTION_SECRET may result in the inability to decrypt this sensitive information.

2. .env file: The .env file is now optional. You have the flexibility to place the variables in the environment instead. Some of the variables you need to consider are ENCRYPTION_SECRET and DB_URL. If both environment variables and .env file exist, the values in the environment variables take priority. However, ensure that these variables are set in either one of them to avoid any failures with DevLake.

3. Upgrade to v0.18.0: If you are upgrading to version v0.18.0 from a previous version, there is a change in the environment variable used for encryption. Previously, it was called ENCODE_KEY. After upgrading to v0.18.0, if you have previously set ENCODE_KEY in your environment or .env file, please assign its value to the ENCRYPTION_SECRET environment variable. This will ensure that the encryption process continues to work as expected.

These notes provide guidance on upgrading your Apache DevLake to a newer version. Ensure you follow them carefully to avoid any issues during the upgrade process.
