---
title: "GitExtractor"
description: >
  GitExtractor Plugin
---

## Summary

This plugin extracts commits and references from a remote or local git repository. It then saves the data into the database or csv files.

## Steps to make this plugin work

1. Use the Git repo extractor to retrieve data about commits and branches from your repository.
2. Use the GitHub plugin to retrieve data about Github issues and PRs from your repository.
   NOTE: you can run only one issue collection stage as described in the Github Plugin README.
3. Use the [RefDiff](./refdiff.md) plugin to calculate version diff, which will be stored in `refs_commits` table.

## Sample Request

```
curl --location --request POST 'localhost:8080/pipelines' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "name": "git repo extractor",
    "plan": [
        [
            {
                "Plugin": "gitextractor",
                "Options": {
                    "url": "https://github.com/merico-dev/lake.git",
                    "repoId": "github:GithubRepo:384111310"
                }
            }
        ]
    ]
}
'
```

- `url`: the location of the git repository. It should start with `http`/`https` for a remote git repository and with `/` for a local one.
- `repoId`: column `id` of `repos`.
  Note : For GitHub, to find the repo id run `$("meta[name=octolytics-dimension-repository_id]").getAttribute('content')` in browser console.
- `proxy`: optional, http proxy, e.g. `http://your-proxy-server.com:1080`.
- `user`: optional, for cloning private repository using HTTP/HTTPS
- `password`: optional, for cloning private repository using HTTP/HTTPS
- `privateKey`: optional, for SSH cloning, base64 encoded `PEM` file
- `passphrase`: optional, passphrase for the private key

## Standalone Mode

You call also run this plugin in a standalone mode without any DevLake service running using the following command:

```
go run plugins/gitextractor/main.go -url https://github.com/merico-dev/lake.git -id github:GithubRepo:384111310 -db "merico:merico@tcp(127.0.0.1:3306)/lake?charset=utf8mb4&parseTime=True"
```

For more options (e.g., saving to a csv file instead of a db), please read `plugins/gitextractor/main.go`.

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

> Q: # pkg-config --cflags -- libgit2 Package libgit2 was not found in the pkg-config search path.
> Perhaps you should add the directory containing `libgit2.pc` to the PKG_CONFIG_PATH environment variable
> No package 'libgit2' found pkg-config: exit status 1

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
>
> 1. Make sure you have pkg-config installed:
>
> `brew install pkg-config`
>
> 2. Make sure your pkg config path covers the installation:
>    `export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib:/usr/local/lib/pkgconfig`

<br/><br/><br/>
