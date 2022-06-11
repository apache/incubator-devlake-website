# Release Post

We still have some publish task to do after we send the announcement mail, currently we have to publish Docker images to
Docker Hub 

## Publish Docker Image

```bash

```

## Get All Contributors

You might need all contributors in current release when you want to publish the release news or announcement, you could
use the git command `git log --pretty="%an" <PREVIOUS-RELEASE-SHA>..<CURRENT-RELEASE-SHA> | sort | uniq` to auto generate
the git author name.
