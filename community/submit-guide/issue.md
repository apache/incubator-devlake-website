# Issue Notice

## Preface
Issues function is used to track various Features, Bugs, Functions, etc. The project maintainer can organize the tasks to be completed through issues.

Issue is an important step in drawing out a feature or bug,
and the contents that can be discussed in an issue are not limited to the features, the causes of the existing bugs, the research on preliminary scheme, and the corresponding implementation design and code design.

And only when the Issue is approved, the corresponding Pull Request should be implemented.

If an issue corresponds to a large feature, it is recommended to divide it into multiple small issues according to the functional modules and other dimensions.

## Specification

### Issue title

Title Format: [`Issue Type`][`Module Name`] `Issue Description`
The `Issue Type` is as follows:

| issue type |   Description | Example |
|:----:|:----:|:--:|
| feature    |   Include expected new features and functions | [Feature][api] Add xxx api in xxx controller |
| bug        |   Bugs in the program | [Bug][api] Throw exception when xxx |
| improvement| Some improvements of the current program, not limited to code format, program performance, etc | [Improvement][plugin] Improve xxx |
| test       | Specifically for the test case | [Test][github] Add xxx e2e test |

The `Module Name` is as follows:

| Module Name |  Description |
|:----:|:----:|
| api    |   Application program interface layer module | 
| plugin |   Plugin module | 
| ui     | Front end module | 

### Issue content template

https://github.com/apache/incubator-devlake/tree/dev/.github/ISSUE_TEMPLATE

### Contributor

Except for some special cases, it is recommended to discuss under issue or mailing list to determine the design scheme or provide the design scheme,
as well as the code implementation design before completing the issue.

If there are many different solutions, it is suggested to make a decision through mailing list or voting under issue.
The issue can be implemented after final scheme and code implementation design being approved.
The main purpose of this is to avoid wasting time caused by different opinions on implementation design or reconstruction in the pull request review stage.

### Question

- How to deal with the user who raises an issue does not know the module corresponding to the issue.

    It is true that most users when raising issue do not know which module the issue belongs to.
    In fact, this is very common in many open source communities. In this case, the committer / contributor actually knows the module affected by the issue.
    If the issue is really valuable after being approved by committer and contributor, then the committer can modify the issue title according to the specific module involved in the issue,
    or leave a message to the user who raises the issue to modify it into the corresponding title.

