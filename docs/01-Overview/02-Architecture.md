---
title: "Architecture"
linkTitle: "Architecture"
description: >
  Understand the architecture of Apache DevLake.
---


<p align="center"><img src="/img/arch-dataflow.svg" /></p>
<p align="center">Architecture Diagram (data-flow perspective)</p>

<p align="center"><img src="/img/arch-component.svg" /></p>
<p align="center">Architecture Diagram (component perspective)</p>


## Stack (from low to high)

1. config
2. logger
3. models
4. plugins
5. services
6. api / cli

## Rules

1. Higher layers call lower layers, not the other way around
2. Whenever a lower layer needs something from a higher layer, an interface should be introduced for decoupling
3. Components should be initialized in a low to high order during bootstrapping
<br/>
