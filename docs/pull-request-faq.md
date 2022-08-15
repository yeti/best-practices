# Yeti Pull Request FAQ

This document addresses common questions that come up when you are ready to create a pull request and submit your work.

## What are the PR template sections for?

**Ticket**

- Provide a link to the relevant ticket so that the reviewer can easily see the task requirements.

**Changes**

- A high-level summary list of the changes helps the reviewer to quickly understand the purpose of the code.

**Notes (optional)**

- This is a place to add context if you feel it would be helpful. Some examples would be to outline any future related work that is still needed, describe why an important decision was made regarding the approach, or explain why a particular piece isn't working yet and what the plan is to resolve it.

**Visuals**

- Show that this is working as expected and meets the requirements by uploading a screenshot or demo video. In most cases, the reviewer should not need to test your branch locally to determine this.

## How should I organize or break up my PRs?

Different developers may have different preferences for this. In general, it's a good idea to group the contents of a PR into a set of changes that will achieve a specific verifiable functionality. This allows the reviewer to better understand how things are working since all of the changes that depend on each other are submitted together. This only holds to a certain point - if the diff becomes very large, you should consider breaking it up into more manageable pieces.

Note that it's best to create a separate PR if you are moving files, refactoring, updating syntax or making other changes that aren't directly tied to new UI or logic changes.

## Who should I tag as a reviewer?

For smaller projects, it's typically best to include all developers that are working in the repository. This is so that each person has visibility into other parts of the application that could affect their work directly or indirectly. If you are working on a project as a solo developer, you should arrange in advance to have another Yeti team member added to the repo who can provide at minimum a sanity check on your changes and preferably add useful feedback.

## How long should I wait for a review?

In most cases, it's best to allow a reviewer up to 24 hours to approve your work. You should check with the tech lead and/or project manager for when it is okay to merge your code.

## What if I need to keep working off of my changes before they are approved?

We recommend to create a new branch off of the previous one that is still in review. If you are ready to submit another PR before the previous branch is merged, open your PR against the previous branch. The idea here is that the diff is what is important to the reviewer. It's more difficult to review code that contains new changes as well as others that were already reviewed separately.
