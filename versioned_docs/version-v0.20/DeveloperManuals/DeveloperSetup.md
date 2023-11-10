---
title: "Developer Setup"
description: >
  The steps to install DevLake in developer mode.
sidebar_position: 1
---


## Requirements

- <a href="https://docs.docker.com/get-docker" target="_blank">Docker v19.03.10+</a>
- <a href="https://golang.org/doc/install" target="_blank">Golang v1.19+</a>
- <a href="https://www.gnu.org/software/make/" target="_blank">GNU Make</a>
  - Mac (Preinstalled)
  - Windows: [Download](http://gnuwin32.sourceforge.net/packages/make.htm)
  - Ubuntu: `sudo apt-get install build-essential libssl-dev`

## How to setup dev environment

The following guide will walk through how to run DevLake's frontend (`config-ui`) and backend in dev mode.


1. Navigate to where you would like to install this project and clone the repository:

   ```sh
   git clone https://github.com/apache/incubator-devlake.git
   cd incubator-devlake
   ```

2. Install dependencies for plugins:

   - [RefDiff](../Plugins/refdiff.md#development)

3. Install Go packages

    ```sh
    cd backend
	go get
    cd ..
    ```

4. Copy the sample config file to new local file:

    ```sh
    cp env.example .env
    ```

5. Update the following variables in the file `.env`:

    * `DB_URL`: Replace `mysql:3306` with `127.0.0.1:3306`

6. Start the MySQL and Grafana containers:

    > Make sure the Docker daemon is running before this step.

    ```sh
    docker-compose -f docker-compose-dev.yml up -d mysql grafana
    ```

7. Run `devlake` and `config-ui` in dev mode in two separate terminals:

    ```sh
    # run devlake
    make dev
    # run config-ui
    make configure-dev
    ```

    For common errors, please see [Troubleshooting](#troubleshotting).

8.  Config UI is running at `localhost:4000`
    - For how to use Config UI, please refer to our [tutorial](Configuration/Tutorial.md)

## Running Tests

```sh
# install mockery
go install github.com/vektra/mockery/v2@latest
# generate mocking stubs
make mock
# run tests
make test
```

## DB migrations

Please refer to the [Migration Doc](../DeveloperManuals/DBMigration.md).

## Using DevLake API

All DevLake APIs (core service + plugin API) are documented with swagger. To see API doc live with swagger:

    - Install [swag](https://github.com/swaggo/swag).
    - Run `make swag` to generate the swagger documentation.
    - Visit `http://localhost:8080/swagger/index.html` while `devlake` is running.


## Developing dashboards

To access Grafana, click *View Dashboards* button in the top left corner of Config UI, or visit `localhost:3002` (username: `admin`, password: `admin`).

For provisioning, customizing, and creating dashboards, please refer to our [Grafana Doc](../Configuration/Dashboards/GrafanaUserGuide.md).


## Troubleshooting


    Q: Running `make dev` yields error: `libgit2.so.1.3: cannot open share object file: No such file or directory`

    A: `libgit2.so.1.3` is required by the gitextractor plugin and should be . Make sure your program can find `libgit2.so.1.3`. `LD_LIBRARY_PATH` can be assigned like this if your `libgit2.so.1.3` is located at `/usr/local/lib`:

    ```sh
    export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib
    ```
   
    Note that the version has to be pinned to 1.3.0. If you don't have it, you may need to build it manually with CMake from [source](https://github.com/libgit2/libgit2/releases/tag/v1.3.0).


## Compiling

    - Compile all plugins: `make build-plugin`
    - Compile specific plugins: `PLUGIN=<PLUGIN_NAME> make build-plugin`
    - Compile server: `make build`
    - Compile worker: `make build-worker`

## References

To dig deeper into developing and utilizing our built-in functions and have a better developer experience, feel free to dive into our [godoc](https://pkg.go.dev/github.com/apache/incubator-devlake) reference.
