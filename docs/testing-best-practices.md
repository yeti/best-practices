# Yeti Testing Best Practices

This document is meant to serve as a guide to Yeti's approach to automated testing...

Yeti often works on projects that are "green field" (sp?), early stage, or prototypes. In many instances it may not be worth the effort to write tests. Especially because the _act_ of writing tests tends to ossify an application's behavior -- reducing flexibility and making it more difficult to make subsequent changes.

## What are Automated Tests?

Automated testing is the process of using software to exercise/test code. This is in contrast with manual testing, where a user uses a browser or other tool to manually test a software system.

## Why Write Tests?

- Increase confidence that your software does what you think
- Automatically catch regressions -- breaking existing features -- when building or maintaining a system
- Communicate expected behavior of a system by giving examples of expected behavior
- Make it easier to identify and exercise corner cases that could be difficult to test manually
- All of these tend to lead to an overall increase in software quality. -- **Is there a source that supports this?**

## Unit Tests

Tests that exercise a single "unit" of code. This could be an individual function or component, and should have little to no dependencies. For functions: we're testing that given a specific input, we receive the correct expected output.

## Integration Tests

Tests that exercise a larger "slice" of an application, testing how several pieces interact given different situations/input.

## End to End (e2e) Tests

Tests that exercise the system as a whole **from the perspective of the end user**. These tests often use a browser to interact with an application with the same interface that a user sees. These tests tend to be the most time-consuming, but can give a high level of confidence that a system is working as expected (at least for the features that the e2e test is focused on).

Some examples of parts of an application that could be worth writing e2e tests for:

- Sign up flow
- Log in flow
- Any purchase flows
- Main, critical paths through the application
- Unique bugs that have affected real users
