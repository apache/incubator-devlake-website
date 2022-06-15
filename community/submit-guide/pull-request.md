# pull request notice

## preface
pull request is a way of software cooperation, which is a process of bringing code involving different functions into the trunk. during this process, the code can be discussed, reviewed, and modified.

in pull request, we try not to discuss the implementation of the code. the general implementation of the code and its logic should be determined in issue. in the pull request, we only focus on the code format and code specification, so as to avoid wasting time caused by different opinions on implementation.

## specification

### pull request title

title format: [`pull request type`-`issue no`][`module name`] `pull request description`

the corresponding relationship between `pull request type` and `issue type` is as follows:

| issue type |   pull request type | example(suppose issue no is 3333) |
|:----:|:----:|:--|
| feature    |   feature | [feature-3333][plugin] implement xxx |
| bug        |   fix | [fix-3333][plugin] fix xxx |
| improvement| improvement | [improvement-3333][github] improve the performance of xxx |
| test       | test | [test-3333][api] add the e2e test of xxx |

`issue no` refers to the issue number corresponding to the current pull request to be resolved, `module name` is the same as the `module name` of issue.

### pull request branch

branch name format: `pull request type`-`issue number`. e.g. feature-3333

### pull request content

please refer to the commit message section.
