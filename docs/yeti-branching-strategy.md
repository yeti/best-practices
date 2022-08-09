# Yeti Branching Strategy

This document describes Yeti's preferred strategy for organizing branches with Git.  

The exact pattern will vary from project to project, but this is what we do when the choice is up to us.  

This approach also assumes that we have both a deployed staging and production environment.  

## What's the Approach?

Our typical approach is essentially [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow), which was popularized [around 2010](https://nvie.com/posts/a-successful-git-branching-model/).

We have two main branches: `main` and `develop`.  

The `develop` branch is configured to automatically deploy to the staging environment. This branch is the most up-to-date version of the codebase, containing the most recent development commits.  

The `main` branch is configured to automatically deploy to the production environment, and should only contain merge commits from `develop` and any urgent production `hotfix` commits.  

When merging changes into `develop` we should always use the "squash and merge" option.  

This holds for all changes, unless the branch you are merging is a long-lived feature branch containing several PRs. In this case rebasing onto `develop` is more appropriate. We want to preserve the PR history of all changes going into `develop`, which we would lose if we were to squash in such a situation.

When merging changes into `main` we should always use the "merge" option, in order to preserve the PR history on the `develop` branch.  

## How Do We Create Feature Branches?

We create feature branches off of the `develop` branch.  

Feature branches should have a descriptive name. We tend to follow the [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/), which works quite well for branch names as well.  

For example, if we needed to add a widget generation service to a project we would create a new feature branch off of the `develop` branch:

```bash
git checkout -b feat/add-widget-generation-service
```

When the feature is ready for review we'd open a pull request against the `develop` branch. Once the feature is approved it is **squashed and merged** into `develop` and automatically deployed to staging.  

## How Do We Deploy to Production?

Deploying to production should be fairly simple. All we need to do is merge `develop` into `main` and the production deployment should start automatically.
