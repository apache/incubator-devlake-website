# DevLake Release Guide

**Please make sure your public key was included in the https://downloads.apache.org/incubator/devlake/KEYS , if not, please update this file first.**

## How to update KEYS

1. Clone the svn repository
   ```shell
   svn co https://dist.apache.org/repos/dist/dev/incubator/devlake
   ```
2. Append your public key to the KEYS file
   cd devlake

   - Check if your public key is in the KEYS file
   - If it does not, create a new [GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key), and then run the following command to see if it was successful.

   ```shell
   gpg --list-sigs <your name>
   ```

   - Append your publick key

   ```shell
       gpg --armor --export <your name> >> KEYS
   ```

3. Upload
   ```shell
   svn add KEYS
   svn commit -m "update KEYS"
   svn cp https://dist.apache.org/repos/dist/dev/incubator/devlake/KEYS https://dist.apache.org/repos/dist/release/incubator/devlake/ -m "update KEYS"
   ```
   We will use `v0.16.0` as an example to demonstrate the release process.

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
- Create folder `releases/lake-v0.16.0` and put the two files `docker-compose.yml` and `env.example` in there.
- Update the file `.github/ISSUE_TEMPLATE/bug-report.yml` to include the version `v0.16.0`

## Pack

- Checkout to the branch/commit

```shell
git clone https://github.com/apache/incubator-devlake.git
cd incubator-devlake
git checkout b268d53a48edb26d3c9b73b782798703f068f655
```

- Tag the commit and push to origin

  ```shell
  git tag v0.16.0-rc2
  git push origin v0.16.0-rc2
  ```

- Pack the code
  ```shell
  git archive --format=tar.gz --output="<the-output-dir>/apache-devlake-0.16.0-incubating-src.tar.gz" --prefix="apache-devlake-0.16.0-incubating-src/" v0.16.0-rc2
  ```
- Before proceeding to the next step, please make sure your public key was included in the https://downloads.apache.org/incubator/devlake/KEYS
- Create signature and checksum
  ```shell
  cd <the-output-dir>
  gpg -s --armor --output apache-devlake-0.16.0-incubating-src.tar.gz.asc --detach-sig apache-devlake-0.16.0-incubating-src.tar.gz
  shasum -a 512  apache-devlake-0.16.0-incubating-src.tar.gz > apache-devlake-0.16.0-incubating-src.tar.gz.sha512
  ```
- Verify signature and checksum
  ```shell
  gpg --verify apache-devlake-0.16.0-incubating-src.tar.gz.asc apache-devlake-0.16.0-incubating-src.tar.gz
  shasum -a 512 --check apache-devlake-0.16.0-incubating-src.tar.gz.sha512
  ```

## Upload

- Clone the svn repository
  ```shell
  svn co https://dist.apache.org/repos/dist/dev/incubator/devlake
  ```
- Copy the files into the svn local directory
  ```shell
  cd devlake
  mkdir -p 0.16.0-incubating-rc2
  cp <the-output-dir>/apache-devlake-0.16.0-incubating-src.tar.gz* 0.16.0-incubating-rc2/
  ```
- Upload local files
  ```shell
  svn add 0.16.0-incubating-rc2
  svn commit -m "add 0.16.0-incubating-rc2"
  ```

## Vote

You can check [Incubator Release Checklist](https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist) before voting.

1. Devlake community vote:

   - Start the [vote](https://lists.apache.org/thread/2v2so22fj9mg5h7jck1opsqhjyc86k06) by sending an email to <dev@devlake.apache.org>
  
     Title: [VOTE] Release Apache DevLake (Incubating) v{{.Version}}-rc{{.RC}}

     Content:
     ```
      Hello everyone,

      This is a call for vote to release Apache DevLake (Incubating) v{{.Version}}-rc{{.RC}}

      The release candidates:
      https://dist.apache.org/repos/dist/dev/incubator/devlake/{{.Version}}-incubating-rc{{.RC}}/

      Git tag for the release:
      https://github.com/apache/incubator-devlake/releases/tag/v{{.Version}}-rc{{.RC}}

      Keys to verify the Release Candidate:
      https://downloads.apache.org/incubator/devlake/KEYS

      How to build:
      https://devlake.apache.org/docs/DeveloperManuals/DeveloperSetup

      The vote will be open for at least 72 hours or until the necessary number of votes are reached.
      If approved we will seek final release approval from the IPMC.

      Please vote accordingly:

      [ ] +1 approve
      [ ] +0 no opinion
      [ ] -1 disapprove with the reason

      Thanks
      {{.YourName}}
     ```
   - Announce the [vote](https://lists.apache.org/thread/wfzzjv53vfxml54098o6dt4913j47d4j) result:
    Title: [RESULT][VOTE] Release Apache DevLake (Incubating) v{{.Version}}-rc{{.RC}}

    Content:
     ```
     Hello everyone,

     The vote closes now with the following results:

     {{.TotalVotes}} (+1 binding) votes
     {{range .Votes}}- {{.Name}}{{end}}
 
     I will bring the vote results to general@incubator.apache.org

     Thanks
     {{.YourName}}

     ```

2. Apache incubator community vote:
   - Start the [vote]((https://lists.apache.org/thread/5dbqc3t2bq7kfqccobrh7j9vqopj030k)) by sending an email to general@incubator.apache.org
    Title: [VOTE] Release Apache DevLake (Incubating) v{{.Version}}-rc{{.RC}}

    Content:
    ```
    Hello everyone,

    This is a call for vote to release Apache DevLake (Incubating) v{{.Version}}-rc{{.RC}}.
    The Apache DevLake community has voted on and approved a proposal to release Apache DevLake (Incubating) version v{{.Version}}-rc{{.RC}}.

    Community vote thread:
    [Community Vote Thread]({{.VoteThreadURL}})

    Community vote result thread:
    [Community Vote Result Thread]({{.VoteResultThreadURL}})

    The release candidates:
    [Release Candidates]({{.RCURL}})

    Git tag for the release:
    [Git Tag]({{.GitTagURL}})

    Keys to verify the Release Candidate:
    https://downloads.apache.org/incubator/devlake/KEYS

    How to build:
    https://devlake.apache.org/docs/DeveloperManuals/DeveloperSetup/

    The vote will be open for at least 72 hours or until the necessary number of votes are reached.

    Please vote accordingly:
    [ ] +1 approve
    [ ] +0 no opinion
    [ ] -1 disapprove with the reason

    Thanks

    {{.YourName}}
    ```
   - Announce the [vote](https://lists.apache.org/thread/40ktrw42c7hpok7vj33ql6wgdq2mpg92) result:
    Title:
    [RESULT][VOTE] Release Apache DevLake (Incubating) v{{.Version}}-rc{{.RC}}

    Content:
    ```
    Hello everyone,

    I am pleased to announce that the vote for Apache DevLake (Incubating) v{{.Version}}-rc{{.RC}} has now concluded. Thank you all for your review and participation in the voting process.

    The release voting has passed with {{bindingVotes}} binding votes, {{nonBindingVotes}} non-binding vote and no +0 or -1 votes.

    The individuals who provided binding votes are:
    {{bindingVotesList}}

    The non-binding vote{{pluralNonBindingVotes}} is from:
    {{nonBindingVotesList}}

    You can find the voting thread at the following link: [Voting Thread](https://lists.apache.org/thread/{{votingThreadURL}})

    In closing, I want to express my gratitude to everyone who has offered us help, advice, and guidance throughout this process. We will proceed with completing the remaining tasks.

    Thank you all once again!

    Best Regards,
    {{.YourName}}
    ```


## Release

### Apache

- Move the release to the ASF content distribution system
  ```shell
  svn mv https://dist.apache.org/repos/dist/dev/incubator/devlake/0.16.0-incubating-rc2 https://dist.apache.org/repos/dist/release/incubator/devlake/0.16.0-incubating -m "transfer packages for 0.16.0-incubating-rc2"
  ```
- Wait until the directory `https://downloads.apache.org/incubator/devlake/0.16.0-incubating/` was created
- Remove the last release from `https://downloads.apache.org/` (according the Apache release policy, this link should be pointing to the current release)
  ```shell
  svn rm https://dist.apache.org/repos/dist/release/incubator/devlake/0.15.0-incubating -m "remove 0.15.0-incubating"
  ```
- Announce [release](https://lists.apache.org/thread/czf6p3xtlkq6t8g4q35blkbf2xclsl3p) by sending an email to general@incubator.apache.org
  Title: 
  [[ANNOUNCE] Release Apache Devlake(incubating) {{.Version}}-incubating

  Content:
  ```
  Hello everyone,

  The Apache DevLake (Incubating) {{.Version}}-incubating has been released!

  **Apache DevLake** is an open-source dev data platform that ingests, analyzes, and visualizes the fragmented data from DevOps tools to distill insights for engineering productivity.

  Download Links: https://downloads.apache.org/incubator/devlake/

  Changelogs:
  - xxx.
  - xxx.
  - xxx.

  Website: https://devlake.apache.org/

  Resources:
  - Issue:https://github.com/apache/incubator-devlake/issues
  - Mailing list: dev@devlake.apache.org

  Best Regards,
  {{.YourName}}

  ----
  Disclaimer: Apache DevLake(incubating) is an effort undergoing incubation at the Apache
  Software Foundation (ASF), sponsored by the Apache Incubator PMC.

  Incubation is required of all newly accepted projects until a further review
  indicates that the infrastructure, communications, and decision making process
  have stabilized in a manner consistent with other successful ASF projects.

  While incubation status is not necessarily a reflection of the completeness
  or stability of the code, it does indicate that the project has yet to be
  fully endorsed by the ASF.
  
  ```
### GitHub

- Create tag v0.16.0 and push
  ```shell
  git checkout v0.16.0-rc2
  git tag v0.16.0
  git push origin v0.16.0
  ```
- Open the URL `https://github.com/apache/incubator-devlake/releases/`, draft a new release, fill in the form and upload two files `docker-compose.yml` and `env.example`
