# DevLake Release Guide

**Please make sure your public key was included in the https://downloads.apache.org/incubator/devlake/KEYS , if not, please update this file first.**

## How to update KEYS

1. Clone the svn repository
   ```shell
   svn co https://dist.apache.org/repos/dist/dev/incubator/devlake
   ```
2. Append your public key to the KEYS file
   cd devlake
   - Judging that your key is already in the file
   ```shell
    gpg --list-sigs <your name>
   ```
   - If not, append your publick key
   ```shell
       gpg --armor --export <your name> >> KEYS
   ```
3. Upload
   ```shell
   svn add KEYS
   svn commit -m "update KEYS"
   svn cp https://dist.apache.org/repos/dist/dev/incubator/devlake/KEYS https://dist.apache.org/repos/dist/release/incubator/devlake/ -m "update KEYS"
   ```
   We will use `v0.14.0` as an example to demonstrate the release process.

## ASF Release Policy

- https://www.apache.org/legal/release-policy.html
- https://incubator.apache.org/guides/releasemanagement.html

## Tools:

- `gpg` creating and verifying the signature
- `shasum` creating and verifying the checksum
- `git` checkout and pack the codebase
- `svn` uploading the code to the Apache code hosting server

## Prepare

- Check against the Incubator Release Checklist
- Create folder `releases/lake-v0.14.0` and put the two files `docker-compose.yml` and `env.example` in there.
- Update the file `.github/ISSUE_TEMPLATE/bug-report.yml` to include the version `v0.14.0`

## Pack

- Checkout to the branch/commit

```shell
git clone https://github.com/apache/incubator-devlake.git
cd incubator-devlake
git checkout b268d53a48edb26d3c9b73b782798703f068f655
```

- Tag the commit and push to origin

  ```shell
  git tag v0.14.0-rc1
  git push origin v0.14.0-rc1
  ```

- Pack the code
  ```shell
  git archive --format=tar.gz --output="<the-output-dir>/apache-devlake-0.14.0-incubating-src.tar.gz" --prefix="apache-devlake-0.14.0-incubating-src/" v0.14.0-rc1
  ```
- Before proceeding to the next step, please make sure your public key was included in the https://downloads.apache.org/incubator/devlake/KEYS
- Create signature and checksum
  ```shell
  cd <the-output-dir>
  gpg -s --armor --output apache-devlake-0.14.0-incubating-src.tar.gz.asc --detach-sig apache-devlake-0.14.0-incubating-src.tar.gz
  shasum -a 512  apache-devlake-0.14.0-incubating-src.tar.gz > apache-devlake-0.14.0-incubating-src.tar.gz.sha512
  ```
- Verify signature and checksum
  ```shell
  gpg --verify apache-devlake-0.14.0-incubating-src.tar.gz.asc apache-devlake-0.14.0-incubating-src.tar.gz
  shasum -a 512 --check apache-devlake-0.14.0-incubating-src.tar.gz.sha512
  ```

## Upload

- Clone the svn repository
  ```shell
  svn co https://dist.apache.org/repos/dist/dev/incubator/devlake
  ```
- Copy the files into the svn local directory
  ```shell
  cd devlake
  mkdir -p 0.14.0-incubating-rc1
  cp <the-output-dir>/apache-devlake-0.14.0-incubating-src.tar.gz* 0.14.0-incubating-rc1/
  ```
- Upload local files
  ```shell
  svn add 0.14.0-incubating-rc1
  svn commit -m "add 0.14.0-incubating-rc1"
  ```

## Vote

You can check [Incubator Release Checklist](https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist) before voting.

1. Devlake community vote:

   - Start the vote by sending an email to <dev@devlake.apache.org>
     [[VOTE] Release Apache DevLake (Incubating) v0.14.0-rc1](https://lists.apache.org/thread/s6jj2tl5mlyb8jpdd88jmo5woydzhp54)
   - Announce the vote result:
     [[RESULT][VOTE] Release Apache DevLake (Incubating) v0.14.0-rc1](https://lists.apache.org/thread/mb5sxdopprqksf1ppfggkvkwxs6110zk)

2. Apache incubator community vote:
   - Start the vote by sending an email to general@incubator.apache.org
     [[VOTE] Release Apache DevLake (Incubating) v0.14.0-rc1](https://lists.apache.org/thread/lgfrsv0ymfk1c19ngnkkn46cspkf76lg)
   - Announce the vote result:
     [[RESULT][VOTE] Release Apache DevLake (Incubating) v0.14.0-rc1](https://lists.apache.org/thread/2xoqzymgvnrvrbn9dwsby39olotvt6oj)

## Release

### Apache

- Move the release to the ASF content distribution system
  ```shell
  svn mv https://dist.apache.org/repos/dist/dev/incubator/devlake/0.14.0-incubating-rc1 https://dist.apache.org/repos/dist/release/incubator/devlake/0.14.0-incubating -m "transfer packages for 0.14.0-incubating-rc1"
  ```
- Wait until the directory `https://downloads.apache.org/incubator/devlake/0.14.0-incubating/` was created
- Remove the last release from `https://downloads.apache.org/` (according the Apache release policy, this link should be pointing to the current release)
  ```shell
  svn rm https://dist.apache.org/repos/dist/release/incubator/devlake/0.11.0-incubating -m "remove 0.11.0-incubating"
  ```
- Announce release by sending an email to general@incubator.apache.org
  [[ANNOUNCE] Release Apache Devlake(incubating) 0.14.0-incubating](https://lists.apache.org/thread/401p8xm8tcp9tplh2sdht7dnrbs03rht)

### GitHub

- Create tag v0.14.0 and push
  ```shell
  git checkout v0.14.0-rc1
  git tag v0.14.0
  git push origin v0.14.0
  ```
- Open the URL `https://github.com/apache/incubator-devlake/releases/`, draft a new release, fill in the form and upload two files `docker-compose.yml` and `env.example`
