---
title: "Upgrade"
sidebar_position: 3
description: How to upgrade your Apache DevLake to a newer version
---

## Upgrade Notes

1. ENCRYPTION_SECRET: It is important to keep the ENCRYPTION_SECRET safe as it is used to encrypt sensitive information in the database, such as personal access tokens and passwords. Losing the ENCRYPTION_SECRET may result in the inability to decrypt this sensitive information.

2. .env file: The .env file is now optional. You can choose to store your variables in the environment instead. Remember to consider critical variables such as ENCRYPTION_SECRET and DB_URL. If both the environment variables and .env file exist, the values in the environment variables will take precedence. However, make sure that these variables are defined in either one of them to avoid any issues with DevLake.

3. Upgrade to v0.18.0+: When upgrading from a previous version of DevLake, you can find the ENCRYPTION_SECRET in the .env file. Note that in versions prior to v0.18, the ENCRYPTION_SECRET was referred to as ENCODE_KEY. Please assign its value to the ENCRYPTION_SECRET environment variable. This will ensure that the encryption process continues to work as expected.

These notes provide guidance on upgrading your Apache DevLake to a newer version. Ensure you follow them carefully to avoid any issues during the upgrade process.
