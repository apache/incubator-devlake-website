---
title: "UnitTest Test Guide"
description: >
  The steps to write UnitTest tests for plugins.
---

# Introduction of UnitTest 

A unit test is a type of software testing that tests individual units or components of a software application. The goal of unit testing is to validate that each unit of the software performs as expected. Unit tests are typically written by developers as they work on the code, to ensure that the code they are writing is correct and behaves as intended.

Unit tests are automated and are typically written in the same programming language as the code being tested. They are usually run as part of a continuous integration process, ensuring that changes to the codebase don't break existing functionality.

Unit tests are typically small and focus on a specific function or method of the code. They are usually designed to run quickly and in isolation, so that any issues that are discovered can be easily traced back to the specific code that is causing the problem.

# How to write UnitTest for golang

Here are some resources for writing UnitTest for golang:

- [Add a test - The Go Programming Language](https://go.dev/doc/tutorial/add-a-test)

- [How To Write Unit Tests in Go | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-write-unit-tests-in-go-using-go-test-and-the-testing-package)


# Test case examples 

- [Source code](https://github.com/apache/incubator-devlake/blob/243cc8a80aa5b37828e2a142ac9f7e3269b7e1dc/backend/core/migration/migrator_test.go)

# Recommended Libraries for writing UnitTest cases

- [Library-1](https://github.com/stretchr/testify/tree/master/assert)
- [Library-2](https://github.com/stretchr/testify/tree/master/mock)











