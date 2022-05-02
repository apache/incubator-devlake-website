---
title: "Architecture"
linkTitle: "Architecture"
tags: []
categories: []
weight: 2
description: >
  Understand the architecture of DevLake.
---


![devlake-architecture](https://user-images.githubusercontent.com/14050754/143292041-a4839bf1-ca46-462d-96da-2381c8aa0fed.png)
<p align="center">Architecture Diagram</p>

## Stack (from low to high)

1. config
2. logger
3. models
4. plugins
5. services
6. api / cli

## Rules

1. Higher layer calls lower layer, not the other way around
2. Whenever lower layer neeeds something from higher layer, a interface should be introduced for decoupling
3. Components should be initialized in a low to high order during bootstraping
<br/><br/><br/>
