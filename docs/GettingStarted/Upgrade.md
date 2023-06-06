---
title: "Upgrade"
sidebar_position: 3
description: How to upgrade your Apache DevLake to a newer version
---

## Upgrade Options

### Option 1: Update the image tags to a newer version

This is recommended way to upgrade your instance, it is the easiest way to go. However, the `docker-compose.yml` or the `helm chart` might change over time (e.g., a new persistent volume is required for new feature to work properly), you may have to adopt these changes manually or opt for the next option.

### Option 2: Deploy a new instance while keeping the configuration if you are .env file as a volume

1. Dump the `.env` file from the existing `devlake` container and shut it down
2. Fire up the new container with the `.env` file mounted to the correct path.

   Please note that if the .env file contains the variable ENCODE_KEY, please replace it with ENCRYPTION_SECRET to match the naming convention used by the new version. Especially when upgrading from a previous version to v0.18.0.

## Two Things to Note

1. Database migration.
   Starting from [Release v0.10.0 · apache/incubator-devlake](https://github.com/apache/incubator-devlake/releases/tag/v0.10.0),
   DevLake auto-migrates your table schema and records to the newer version. Normally you don't need to do anything for the migration. However, please keep in mind the migration is one-way only, **downgrade is not supported**. Please consider backing up your database if there's any data you'd like to keep.

2. Preserve the value of `ENCRYPTION_SECRET`.
   When a user deploys a new DevLake instance and points it to an existing cloud managed database. Since the existing database is encrypted with the `ENCRYPTION_SECRET` in the `.env` file, the user needs to port the old `ENCRYPTION_SECRET` to the new DevLake instance.

   To back up the value of `ENCRYPTION_SECRET`:

   - if you are using .env file as a volume, please copy the value of `ENCRYPTION_SECRET` from the `.env` file in the container to a safe place before shutting down the old DevLake instance. Users can log into the `devlake` container and find it in .env file. The file path in the container is `/app/.env` or `/app/config/.env` if you were using `helm` (unless the `ENV_PATH` environment variable is specified).
   - if you are using environment variables, please copy the value of `ENCRYPTION_SECRET` from the environment variables to a safe place before shutting down the old DevLake instance.
