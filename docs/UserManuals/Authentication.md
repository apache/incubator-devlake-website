---
title: "Security and Authentication"
description: How to secure your deployment and enable the Authentication
---

The document explains how you can set up Apache DevLake securely. 

First of all, there are 4 services included in the deployment:

- database: `postgress` and `mysql` are supported, you may choose one of them or any other compatible DBS like cloud-based systems. You should follow the document from the database to make it secure.
- grafana: You are likely to use it most of the time, browsing built-in dashboards, and creating your own customized metric. grafana supports [User Management](https://grafana.com/docs/grafana/latest/administration/user-management/), please follow the official document to set it up based on your need.
- devlake: This is the core service for Data Collection and Metric Calculation, all collected/calculated data would be stored to the database, and accessed by the `grafana` service. `devlake` itself doesn't support User Management of any kind, so we don't recommend that you expose its port to the outside world.
- config-ui: A web interface to set up `devlake` to do the work. You may set up an automated `blueprint` to collect data. `config-ui` supports `Basic Authentication`, by simply set up the Environment Variable `ADMIN_USER` and `ADMIN_PASS` for the container. There are commented lines in `config-ui.environment` section in our `docker-compose.yml` file for your convenience.
In General, we suggest that you reduce the Attack Surface as small as possible.


### Internal Deployment (Recommended)

- database: Remove the `ports` if you don't need to access the database directly
- devlake: Remove the `ports` section. If you want to call the API directly, do it via `config-ui/api` endpoint.
- grafana: We have no choice but to expose the `ports` for people to browse the dashboards. However, you may want to set up the User Management, and a read-only database account for `grafana`
- config-ui: Normally, exposing the `ports` with `Basic Authentication` is sufficient for Internal Deployment, you may choose to remove the `ports` and use techniques like `k8s port-forwarding` or `expose-port-when-needed` to enhance the security. Keep in mind config-ui is NOT designed to be used by many people, and it shouldn't be. Do NOT grant access if NOT necessary.


### Internet Deployment (NOT Recommended)

THIS IS DANGEROUS, DON'T DO IT. If you insist, here are some suggestions you may follow, please consult Security Advisor before everything:

- database: Same as above.
- grafana: Same as above. In addition, set up the `HTTPS` for the transportation.
- devlake: Same as above.
- config-ui: Same as above. In addition, use port-forward if you are using `k8s`, otherwise, set up `HTTPS` for the transportation.


## Disclaimer

Security is complicated, all suggestions listed above are based on what we learned so far. Apache Devlake makes no guarantee of any kind, please consult your Security Advisor before applying.
