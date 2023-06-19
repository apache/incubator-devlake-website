---
title: "References"
description: >
  References
sidebar_position: 6
---


## RESTful API Reference

For users/developers who wish to interact with the Apache DevLake by using the RESTful APIs,
the Swagger Document would very useful for you. The `devlake` docker image has it packaged, you may access it from:
If you are using the `devlake` container alone without `config-ui`:
```
http://<DEVLAKE_CONTAINER_HOST>:<PORT>/swagger/index.html
```
or
```
http://<CONFIG_UI_CONTAINER_HOST>:<PORT>/api/swagger/index.html
```

## Source Code Reference

For developers who wish to contribute to or develop based on the Apache DevLake, the 
[pkg.go.dev](https://pkg.go.dev/github.com/apache/incubator-devlake#section-documentation)
is a good resource for reference, you can learn the overall structure of the code base or 
the definition of a specific function.

