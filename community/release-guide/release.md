---
sidebar_position: 01
title: "Release Guide"
---
# Release Guide

## Check Your Environment

To make sure you could successfully complete the release for incubator-devlake, you should check your environment and make sure
all conditions are met, if any or them are missing, you should install them and make sure them work.

```shell
# Golang v1.17 above is requests
go version
```

## GPG Settings

### Install GPG

Download installation package on [official GnuPG website](https://www.gnupg.org/download/index.html).
The command of GnuPG 1.x version can differ a little from that of 2.x version.
The following instructions take `GnuPG-2.1.23` version for example.

After the installation, execute the following command to check the version number.

```shell
gpg --version
```

### Create Key

After the installation, execute the following command to create key.

This command indicates `GnuPG-2.x` can be used:

```shell
gpg --full-gen-key
```

This command indicates `GnuPG-1.x` can be used:

```shell
gpg --gen-key
```

Finish the key creation according to instructions, **Notice: Please use Apache mails and its password for key creation.**

```shell
gpg (GnuPG) 2.0.12; Copyright (C) 2009 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
  (1) RSA and RSA (default)
  (2) DSA and Elgamal
  (3) DSA (sign only)
  (4) RSA (sign only)
Your selection? 1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048) 4096
Requested keysize is 4096 bits
Please specify how long the key should be valid.
        0 = key does not expire
     <n>  = key expires in n days
     <n>w = key expires in n weeks
     <n>m = key expires in n months
     <n>y = key expires in n years
Key is valid for? (0)
Key does not expire at all
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: ${Input username}
Email address: ${Input email}
Comment: ${Input comment}
You selected this USER-ID:
   "${Inputed username} (${Inputed comment}) <${Inputed email}>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key. # Input your Apache mail passwords
```

### Check Generated Key

```shell
gpg --list-keys
```

Execution Result:

```shell
pub   4096R/85E11560 2022-04-15
uid                  ${Username} (${Comment}) <{Email}>
sub   4096R/A63BC462 2022-04-15
```

Among them, 85E11560 is public key ID.

### Upload the Public Key to Key Server

The command is as follow:

```shell
gpg --keyserver hkp://pool.sks-keyservers.net --send-key 85E11560
```

`pool.sks-keyservers.net` is randomly chosen from [public key server](https://sks-keyservers.net/status/).
Each server will automatically synchronize with one another, so it would be okay to choose any one, a backup keys servers
is `gpg --keyserver hkp://keyserver.ubuntu.com --send-key <YOUR_KEY_ID>`

### Create Release Branch

In this section, we download source code from github and create new branch to release

```shell
git clone -b "${VERSION}"-prepare https://github.com/apache/incubator-devlake
cd ~/incubator-devlake/
git pull
git checkout -b "${VERSION}"-release
git push origin "${VERSION}"-release
```

### Pre-Release Check

```shell

```

### Prepare for the Release

```shell
```

### Deploy the Release

```shell
```

### Add gpg Public Key

Only the account in its first deployment needs to add that.
It is alright for `KEYS` to only include the public key of the deployed account.

```shell
gpg -a --export <YOUR-GPG-KEY-ID> >> KEYS
```

### Generate sign files

```shell
shasum -a 512 apache-incubator-devlake-"${VERSION}"-src.tar.gz >> apache-incubator-devlake-"${VERSION}"-src.tar.gz.sha512
shasum -b -a 512 apache-incubator-devlake-"${VERSION}"-bin.tar.gz >> apache-incubator-devlake-"${VERSION}"-bin.tar.gz.sha512
cd python
shasum -a 512 apache-incubator-devlake-python-"${VERSION}".tar.gz >> apache-incubator-devlake-python-"${VERSION}".tar.gz.sha512
shasum -b -a 512 apache_incubator-devlake-python-"${VERSION}"-py3-none-any.whl >> apache_incubator-devlake-python-"${VERSION}"-py3-none-any.whl.sha512
cd ../
```

## Check Release

### Check sha512 hash

```shell
shasum -c apache-incubator-devlake-"${VERSION}"-src.tar.gz.sha512
shasum -c apache-incubator-devlake-"${VERSION}"-bin.tar.gz.sha512
cd python
shasum -c apache-incubator-devlake-python-"${VERSION}".tar.gz.sha512
shasum -c apache_incubator-devlake-python-"${VERSION}"-py3-none-any.whl.sha512
cd ../
```

### Check gpg Signature

First, import releaser's public key.
Import KEYS from SVN repository to local. (The releaser does not need to import again; the checking assistant needs to import it, with the user name filled as the releaser's. )

```shell
curl https://dist.apache.org/repos/dist/dev/incubator-devlake/KEYS >> KEYS
gpg --import KEYS
gpg --edit-key "${A_USERNAME}"
  > trust

Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu

Your decision? 5

  > save
```

Then, check the gpg signature.

```shell
gpg --verify apache-incubator-devlake-"${VERSION}"-src.tar.gz.asc
gpg --verify apache-incubator-devlake-"${VERSION}"-bin.tar.gz.asc
cd ../
```

> Note: You have to create gpg signature manually when you can not find your `asc` file, the command
> `gpg --armor --detach-sign --digest-algo=SHA512 apache-incubator-devlaker-"${VERSION}"-src.tar.gz` will create them

### Check Released Files

#### Check source package

Decompress `apache-incubator-devlake-<VERSION>-src.tar.gz` then check the following items:

*   Check whether source tarball is oversized for including nonessential files
*   `LICENSE` files exist
*   There is only text files but no binary files
*   All source files have ASF headers
*   Codes can be compiled and pass the unit tests 
*   The contents of the release match with what's tagged in version control (diff -r a verify_dir tag_dir)
*   Check if there is any extra files or folders, empty folders for example

## Call for a Vote

### Update Release Notes

You should create a release note in GitHub by [new release note](https://github.com/apache/incubator-devlake/releases/new).
It should be done before vote mail because we need the release note in the mail. You could use command
`git log --pretty="- %s" <PREVIOUS-RELEASE-SHA>..<CURRENT-RELEASE-SHA> > changelog.md` to creat the changelog(some log
maybe not correct, you should filter them by yourself) and classify them and paste them to GitHub release note page

### Vote procedure

1. Apache DevLake community vote: send the vote e-mail to `dev@devlake.apache.org`.
PMC needs to check the rightness of the version according to the document before they vote.
After at least 72 hours and with at least 3 `+1 and no -1 PMC member` votes, it can come to the next stage of the vote.

2. Announce the vote result: send the result vote e-mail to `dev@devlake.apache.org`。

### Vote Templates

#### Apache DevLake Community Vote Template

Title：

```txt
[VOTE] Release Apache DevLake <VERSION>
```

Body：

```txt
Hello Apache DevLake Community,

This is a call for vote to release Apache DevLake version <VERSION>

Release notes: https://github.com/apache/incubator-devlake/releases/tag/<VERSION>

The release candidates: https://dist.apache.org/repos/dist/dev/incubator-devlake/<VERSION>/

Git tag for the release: https://github.com/apache/incubator-devlake/tree/<VERSION>

Release Commit ID: https://github.com/apache/incubator-devlake/commit/<SHA-VALUE>

Keys to verify the Release Candidate: https://dist.apache.org/repos/dist/dev/incubator-devlake/KEYS

Look at here for how to verify this release candidate: https://incubator-devlake.apache.org/en-us/community/release.html

The vote will be open for at least 72 hours or until necessary number of votes are reached.

Please vote accordingly:

[ ] +1 approve
[ ] +0 no opinion
[ ] -1 disapprove with the reason

Checklist for reference:

[ ] Download links are valid.
[ ] Checksums and PGP signatures are valid.
[ ] Source code artifacts have correct names matching the current release.
[ ] LICENSE and NOTICE files are correct for each incubator-devlake repo.
[ ] All files have license headers if necessary.
[ ] No compiled archives bundled in source archive.
```

2. Announce the vote result:

Body：

```txt
The vote to release Apache incubator-devlake <VERSION> has passed.Here is the vote result,

4 PMC member +1 votes:

xxx
xxx
xxx
xxx

1 community +1 vote:
xxx

Thanks everyone for taking time to check this release and help us.
```

## Finish the Release

### Move source packages, binary packages and KEYS from the `dev` directory to `release` directory

```shell
```

### Update Document

Website should be present before you send the announce mail this section will tell you how to change the website. For example,
the release version is `<VERSION>`, the following updates are required(note it will take effect immediately when the PR is merged):


### Find incubator-devlake in apache staging repositories and click `Release`

### Send Announcement E-mail Community

You should send announcement E-mail after release process finished. The E-mail should send to `dev@incubator-devlake.apache.org`
and cc to `announce@apache.org`.

Announcement e-mail template as below：

Title：

```txt
[ANNOUNCE] Release Apache incubator-devlake <VERSION>
```

Body：

```txt
Hi all,

We are glad to announce the release of Apache incubator-devlake <VERSION>. Once again I would like to express my thanks to your help.

Apache DevLake is an open-source dev data platform that ingests, analyzes, and visualizes the fragmented data from DevOps tools to distill insights for engineering productivity.
Apache DevLake is designed for developer teams looking to make better sense of their development process and to bring a more data-driven approach to their own practices. You can ask Apache DevLake many questions regarding your development process. Just connect and query.

Download Links: https://devlake.apache.org/download/download.html

Release Notes: https://github.com/apache/incubator-devlake/releases/tag/<VERSION>

Website: https://devlake.apache.org/

incubator-devlake Resources:
- Issue: https://github.com/apache/incubator-devlake/issues/
- Mailing list: dev@incubator-devlake.apache.org
- Documents: https://devlake.apache.org/docs/Overview/WhatIsDevLake
```
