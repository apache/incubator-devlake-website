---
sidebar_position: 02
title: "Release Preparation"
---
# Release Preparation

## Check release-docs

Compared with the last release, the `release-docs` of the current release needs to be updated to the latest, if there are dependencies and versions changes

- `incubator-devlake/release-docs/LICENSE`

## Update Version

For example, to release `x.y.z`, the following updates are required:

- Version in the code:
  - `version`:
    - `version.go`: `Version` needs to be updated to x.y.z
  - `deployment/helm`:
    - `Chart.yaml`: `appVersion` needs to be updated to x.y.z (`version` is helm chart version，incremented and different from x.y.z)
    - `values.yaml`: `image.tag` needs to be updated to x.y.z

