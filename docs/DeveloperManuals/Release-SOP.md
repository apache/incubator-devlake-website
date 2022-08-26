# Devlake release guide

**Please make sure your public key was included in the https://downloads.apache.org/incubator/devlake/KEYS , if not, please update https://downloads.apache.org/incubator/devlake/KEYS first.**
## How to update KEYS
1. Clone the svn repository
    ```shell
    svn co https://dist.apache.org/repos/dist/dev/incubator/devlake
    ```
2. Append your public key to the KEYS file
    ```shell
    cd devlake
    (gpg --list-sigs <your name> && gpg --armor --export <your name>) >> KEYS
    ```
3. Upload
    ```shell
    svn add KEYS
    svn commit -m "update KEYS"
    svn cp https://dist.apache.org/repos/dist/dev/incubator/devlake/KEYS https://dist.apache.org/repos/dist/release/incubator/devlake/ -m "update KEYS"
    ```
We will use `v0.12.0` as an example to demonstrate the release process.

## ASF Release Policy
https://www.apache.org/legal/release-policy.html
https://incubator.apache.org/guides/releasemanagement.html

## Tools:
`gpg` creating and verifying the signature
`shasum` creating and verifying the checksum
`git` checkout  and pack the codebase
`svn` uploading the code to the Apache code hosting server

## Prepare
- Check against the Incubator Release Checklist
- Create folder `releases/lake-v0.12.0` and put the two files `docker-compose.yml` and `env.example` in there.
- Update the file `.github/ISSUE_TEMPLATE/bug-report.yml` to include the version `v0.12.0`


## Pack
- Checkout to the branch/commit
    ```shell
    git clone https://github.com/apache/incubator-devlake.git
    cd incubator-devlake
    git checkout 25b718a5cc0c6a782c441965e3cbbce6877747d0
    ```

- Tag the commit and push to origin
    ```shell
    git tag v0.12.0-rc2
    git push origin v0.12.0-rc2
    ```

- Pack the code
    ```shell
    git archive --format=tar.gz --output="<the-output-dir>/apache-devlake-0.12.0-incubating-src.tar.gz" --prefix="apache-devlake-0.12.0-incubating-src/" v0.12.0-rc2
    ```
- Before proceeding to the next step, please make sure your public key was included in the https://downloads.apache.org/incubator/devlake/KEYS
- Create signature and checksum
    ```shell
    cd <the-output-dir>
    gpg -s --armor --output apache-devlake-0.12.0-incubating-src.tar.gz.asc --detach-sig apache-devlake-0.12.0-incubating-src.tar.gz
    shasum -a 512  apache-devlake-0.12.0-incubating-src.tar.gz > apache-devlake-0.12.0-incubating-src.tar.gz.sha512
    ```
- Verify signature and checksum
    ```shell
    gpg --verify apache-devlake-0.12.0-incubating-src.tar.gz.asc apache-devlake-0.12.0-incubating-src.tar.gz
    shasum -a 512 --check apache-devlake-0.12.0-incubating-src.tar.gz.sha512
    ```
## Upload
- Clone the svn repository
    ```shell
    svn co https://dist.apache.org/repos/dist/dev/incubator/devlake
    ```
- Copy the files into the svn local directory
    ```shell
    cd devlake
    mkdir -p 0.12.0-incubating-rc2
    cp <the-output-dir>/apache-devlake-0.12.0-incubating-src.tar.gz* 0.12.0-incubating-rc2/
    - Upload local files
    svn add 0.12.0-incubating-rc2
    svn commit -m "add 0.12.0-incubating-rc2"
    ```
## Vote
1. Devlake community vote:
   - Start the vote by sending an email to <dev@devlake.apache.org>
     [[VOTE] Release Apache DevLake (Incubating) v0.12.0-rc2](https://lists.apache.org/thread/yxy3kokhhhxlkxcr4op0pwslts7d8tcy)
   - Announce the vote result
     [[RESULT][VOTE] Release Apache DevLake (Incubating) v0.12.0-rc2](https://lists.apache.org/thread/qr3fj42tmryztt919jsy5q8hbpmcztky)

2. Apache incubator community vote:
   - Start the vote by sending an email to general@incubator.apache.org
     [[VOTE] Release Apache DevLake (Incubating) v0.12.0-rc2](https://lists.apache.org/thread/0bjroykzcyoj7pnjt7gjh1v3yofm901o)
   - Announce the vote result
     [[RESULT][VOTE] Release Apache DevLake (Incubating) v0.12.0-rc2](https://lists.apache.org/thread/y2pqg0c2hhgp0pcqolv19s27db190xsh)

## Release
### Apache
- Move the release to the ASF content distribution system
    ```shell
    svn mv https://dist.apache.org/repos/dist/dev/incubator/devlake/0.12.0-incubating-rc2 https://dist.apache.org/repos/dist/release/incubator/devlake/0.12.0-incubating -m "transfer packages for 0.12.0-incubating-rc2"
    ```
- Wait until the directory 0.12.0-incubating in https://downloads.apache.org/incubator/devlake/  was created
- Announce release by sending an email to general@incubator.apache.org
   [[ANNOUNCE] Release Apache Devlake(incubating) 0.12.0-incubating](https://lists.apache.org/thread/7h6og1y6nhh4xr4r6rqbnswjoj3msxjk)
### GitHub
- Create tag v0.12.0 and push
    ```shell
    git checkout v0.12.0-rc2
    git tag v0.12.0
    git push origin v0.12.0
    ```
- Create release v0.12.0 https://github.com/apache/incubator-devlake/releases/tag/v0.12.0
