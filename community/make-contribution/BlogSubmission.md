---
sidebar_position: 02
title: "Blog Submission"
description: >
  Instructions for how to submit a blog post to DevLake Blog
---

Thank you for contributing to DevLake blog! We can't wait to hear your voice! 

Because DevLake only accepts blog posts submitted through PRs, we want to make this process as painless as possible by putting together this instruction.

## Guidelines

The objective of creating blogs is to educate the community, we advise you to read the following guidelines:

1. Before writing the blog, we recommend that you install DevLake and build a practical use case.
2. **Recommended Topics** are listed in the table below.

 _[Updated on 20th March 2023]_
 
| No.| Objective | Type | Example Blogs / Topics | 
|---| ------ | --------------| ------------ |
| 1.| Walkthrough of setup in your own toolchains | Installation | E.g. "Setting Up DevLake with GitLab and Jenkins", "Getting started with DevLake using GitHub, Argo, etc." |
| 2.| Critical troubleshooting blogs while using DevLake | Troubleshooting | Check out the examples from [troubleshooting docs](https://devlake.apache.org/docs/Troubleshooting/) |
| 3.| Your own experience of using specific feature(s) and/ or plugin(s). | Use-cases | E.g. "How to use Jira, GitLab and Jenkins to measure DORA metrics", "How to get the team configured in Apache DevLake", "How to create your own dev-metrics with DevLake". | 



## Overview

The DevLake website maintains blog posts in two languages, English and Chinese(simplified), so **we prefer that you submit your blog posts in both languages**. However, if you are only familiar with one language, you can submit your blog posts in one language--either English or Chinese--but please put the same files in both directories of the two languages. We will help you with the translation based on our current work capacity. 

**English blog directory:** blog/your-blog-post


## Steps - English
1. If you are submitting for the first time please add your author info by going into the `blog` directory, find the file named `authors.yml` and add your author info in the format of:

```markdown
warren:
  name: Warren Chen
  title: DevLake Contributor
  url: https://github.com/warren830
  image_url: https://github.com/warren830.png
```
If you are not submitting for the first time, please skip this step and go to Step No.2.

2. In the `blog` directory, create a folder for a single blog post and name it in the format of `yyyy-mm-dd-your-blog-post-title`, so that all blog posts will be arranged in the order of time automatically.

3. Inside this folder, create a `markdown`file and name it `index.md`. All of your blog post content goes into this file. If you use any images in your blog post, please also place the image files in the same folder.

4. In the beginning of `index.md`, please add the following information to help with the SEO:

```markdown
---
slug: your-blog-post-title
title: Your Blog Post Title
authors: warren
tags: [DevLake, ants, deadlock]
---
```
Please make sure that the value for `authors` match the author info you entered in `authors.yml`.

5. For better viewing experience, only a truncated section of each blog post will be displayed as a summary on the Blog page's overview. So please place `<!--truncate-->` at an appropriate place in your `index.md`. (We recommend putting it after approximately 300 words, but it is flexible as long as you think it make sense.) For example:

```markdown
---
slug: truncation-example
title: Truncation Example
authors: yumeng
tags: [DevLake, blog]
---

All these will be part of the blog post summary.

Even this.

<!--truncate-->

But anything from here on down will not be.

Not this.

Or this.
```


After completing the above steps, please submit a PR to [apache/incubator-devlake-website](https://github.com/apache/incubator-devlake-website) for review. Happy blogging!
