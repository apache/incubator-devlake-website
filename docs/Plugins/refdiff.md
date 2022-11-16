---
title: "RefDiff"
description: >
  RefDiff Plugin
---


## Summary

For development workload analysis, we often need to know how many commits have been created between 2 releases. This plugin calculates which commits differ between 2 Ref (branch/tag), and the result will be stored back into the database for further analysis.

## Important Note

You need to run `gitextractor` before the `refdiff` plugin. The `gitextractor` plugin should create records in the `refs` table in your database before this plugin can be run.

## Configuration

This is an enrichment plugin based on the domain layer data, no configuration is needed.

## How to use refdiff

To trigger the enrichment, you need to insert a new task into your pipeline.

1. Make sure `commits` and `refs` are collected into your database, `refs` table should contain records like following:
    ```
    id                                            ref_type
    github:GithubRepo:384111310:refs/tags/0.3.5   TAG
    github:GithubRepo:384111310:refs/tags/0.3.6   TAG
    github:GithubRepo:384111310:refs/tags/0.5.0   TAG
    github:GithubRepo:384111310:refs/tags/v0.0.1  TAG
    github:GithubRepo:384111310:refs/tags/v0.2.0  TAG
    github:GithubRepo:384111310:refs/tags/v0.3.0  TAG
    github:GithubRepo:384111310:refs/tags/v0.4.0  TAG
    github:GithubRepo:384111310:refs/tags/v0.6.0  TAG
    github:GithubRepo:384111310:refs/tags/v0.6.1  TAG
    ```
2. If you want to run calculatePrCherryPick, please configure GITHUB_PR_TITLE_PATTERN in .env, you can check the example in .env.example(we have a default value, please make sure your pattern is disclosed by single quotes '')
3. And then, trigger a pipeline like the following format, you can also define sub-tasks, calculateRefDiff will calculate commits between two refs, and creatRefBugStats will create a table to show a bug list between two refs:
```shell
curl -v -XPOST http://localhost:8080/pipelines --data @- <<'JSON'
{
    "name": "test-refdiff",
    "tasks": [
        [
            {
                "plugin": "refdiff",
                "options": {
                    "repoId": "github:GithubRepo:384111310",
                    "pairs": [
                       { "newRef": "refs/tags/v0.6.0", "oldRef": "refs/tags/0.5.0" },
                       { "newRef": "refs/tags/0.5.0", "oldRef": "refs/tags/0.4.0" }
                    ],
                    "tasks": [
                        "calculateCommitsDiff",
                        "calculateIssuesDiff",
                        "calculatePrCherryPick",
                    ]
                }
            }
        ]
    ]
}
JSON
```
Or if you preferred calculating latest releases
```shell
curl -v -XPOST http://localhost:8080/pipelines --data @- <<'JSON'
{
    "name": "test-refdiff",
    "tasks": [
        [
            {
                "plugin": "refdiff",
                "options": {
                    "repoId": "github:GithubRepo:384111310",
                    "tagsPattern": "v\d+\.\d+.\d+",
                    "tagsLimit": 10,
                    "tagsOrder": "reverse semver",
                    "tasks": [
                        "calculateCommitsDiff",
                        "calculateIssuesDiff",
                        "calculatePrCherryPick",
                    ]
                }
            }
        ]
    ]
}
JSON
```

## How to use refdiff in DORA
RefDiff can be called by the [DORA plugin](https://github.com/apache/incubator-devlake/tree/main/plugins/dora) to support the calculation of [DORA metrics](https://devlake.apache.org/docs/UserManuals/DORA). RefDiff has a subtask called 'calculateProjectDeploymentCommitsDiff'. This subtask takes the `project_name` from task options to calculate the commits diff between two consecutive deployments in this project. That is to say, refdiff will generate the relationship between `deployed commit(s)` and the `deployment` in which these commits get deployed.
 
```shell
curl -v -XPOST http://localhost:8080/pipelines --data @- <<'JSON'
{
    "name": "test-refdiff-dora",
    "tasks": [
        [
            {
                "plugin": "refdiff",
                "options": {
                    "projectName": "xxxx",
                    "tasks": [
                        "calculateProjectDeploymentCommitsDiff"
                    ]
                }
            }
        ]
    ]
}
```

## Development

This plugin depends on `libgit2`, you need to install version 1.3.0 to run and debug this plugin on your local
machine.

### Linux

```
1. require cmake
[ubuntu]
apt install cmake -y
[centos]
yum install cmake -y

2. compiling 
git clone -b v1.3.0 https://github.com/libgit2/libgit2.git && cd libgit2
mkdir build && cd build && cmake ..
make && make install

3.PKG_CONFIG and LD_LIBRARY_PATH
[centos]
export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib64:/usr/local/lib64/pkgconfig
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib64
[ubuntu]
export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib:/usr/local/lib/pkgconfig
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib
```

#### Troubleshooting (Linux)

> Q: # pkg-config --cflags  -- libgit2 Package libgit2 was not found in the pkg-config search path.
Perhaps you should add the directory containing `libgit2.pc` to the PKG_CONFIG_PATH environment variable
No package 'libgit2' found pkg-config: exit status 1

> A:
> Make sure your pkg config path covers the installation:
> if your libgit2.pc in `/usr/local/lib64/pkgconfig`(like centos)
> 
> `export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib64:/usr/local/lib64/pkgconfig`
> 
> else if your libgit2.pc in `/usr/local/lib/pkgconfig`(like ubuntu)
> 
> `export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib:/usr/local/lib/pkgconfig`
> 
> else consider install pkgconfig or rebuild the libgit2

### MacOS

NOTE: **Do NOT** install libgit2 via `MacPorts` or `homebrew`, install from source instead.
```
brew install cmake
git clone https://github.com/libgit2/libgit2.git
cd libgit2
git checkout v1.3.0
mkdir build
cd build
cmake ..
make
make install
```

#### Troubleshooting (MacOS)

> Q: I got an error saying: `pkg-config: exec: "pkg-config": executable file not found in $PATH`

> A:
> 1. Make sure you have pkg-config installed:
>
> `brew install pkg-config`
>
> 2. Make sure your pkg config path covers the installation:
> `export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib:/usr/local/lib/pkgconfig`

<br/><br/><br/>
