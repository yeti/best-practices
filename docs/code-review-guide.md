# Yeti Code Review Guide

This document is intended to be a reference for Yeti developers from the perspective of both the code reviewer and the person submitting code. We understand that there may be strong personal preferences on this topic, so please treat this document as a set of guidelines to follow rather than a strict set of rules.

## Purpose of Code Review

We always aim to deliver a high-quality product to our clients. Code reviews are a critical part of this process. Having our work reviewed by peers and superiors ensures that we maintain accountability amongst the team and this ultimately drives client satisfaction.

## Priorities for Code Reviewers

While code review mainly deals with product quality, it's also important that we deliver the product in a timely fashion. For this reason, reviewers should exercise their judgement on how to best prioritize the various considerations during review.

Regarding whether to request changes or to approve with feedback, we suggest that you request changes if items 1-2 are not satisfied. Otherwise, it is up to the reviewer. Keep in mind that if you approve with feedback, you are essentially leaving it up to the submitter whether and when to incorporate your suggestions.

**1. Working Code & Requirements Satisfied**

First and foremost, does this work as expected? The PR should contain visuals demonstrating that it works and looks as expected whenever applicable.

**2. Red Flags**

If there is anything in the changes that could lead to significant issues in the future, they should be addressed and fixed.

**3. Smart Design**

Is there a better way to implement this functionality? It's important to think about whether it will be easy to build upon these changes in the future.

**4. Simplicity & Readability**

Is the code easy to read and understand? It's important to always think about the potential for new developers that may join later and how quickly they'll be able to contribute.

**5. Teaching Opportunity**

Are there any other tips you could point out that may help the submitter level up? You may want to consider the repo location and project context when leaving teaching-oriented feedback on a pull request. Sometimes, it may be better to message them directly about it via Slack.
