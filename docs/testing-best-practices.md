# Yeti Testing Best Practices

This document is meant to serve as a guide to Yeti's approach to automated testing and outlines some best practices for implementing effective automated tests.

## Why Write Tests?

Yeti often works on projects that are prototypes, "greenfield," or in the early stages of development. In such cases, it may be tempting to forgo writing tests due to the feeling that it requires additional effort. However, writing tests can offer numerous benefits, even in these scenarios. It's worth considering the following factors when deciding whether to write tests for a project:

1. **Solidifying Application Behavior**: Writing tests tends to solidify an application's behavior by defining expected outcomes for various scenarios. While this can reduce flexibility, it also ensures that the application functions as intended.
2. **Regression Detection**: Automated tests help catch regressions, which are issues that arise when existing features break due to changes or additions made during development. By running tests during the build or review process, regressions can be identified and fixed early, helping with application stability.
3. **Communicating Expected Behavior**: Tests serve as living documentation by providing examples of expected behavior. They communicate the intended functionality of the system to other developers, making it easier to understand and maintain the codebase.
4. **Identification of Corner Cases**: Automated tests provide a mechanism to exercise and validate corner cases that may be difficult to test manually. By explicitly defining and testing edge cases, developers can ensure that their code handles various scenarios correctly.
5. **Improved Software Quality**: The cumulative effect of the above benefits is an overall increase in software quality. By increasing confidence in the software's behavior, catching regressions, and covering critical and edge cases, automated testing contributes to the delivery of robust and reliable software.

It is important to note that the specific costs and benefits of automated testing will vary depending on the project and its requirements. However, in general, adopting a comprehensive testing approach can significantly improve the quality and reliability of applications.

## What are Automated Tests?

Automated testing is the process of using software to exercise/test code. This is in contrast with manual testing, where a user uses a browser or other tool to manually verify software behavior.

- Increase confidence that your software does what you think
- Automatically catch regressions -- breaking existing features -- when building or maintaining a system
- Communicate expected behavior of a system by giving examples of expected behavior
- Make it easier to identify and exercise corner cases that could be difficult to test manually
- All of these tend to lead to an overall increase in software quality. -- **Is there a source that supports this?**

## Unit Tests

Unit tests focus on testing individual "units" of code, such as functions or components, in isolation. These tests should have minimal dependencies and verify that given a specific input, the expected output is produced. Unit tests are essential for validating the correctness of small, self-contained code units.

## Integration Tests

Tests that exercise a larger "slice" of an application, testing how several pieces interact given different situations/input.

Integration tests verify the behavior and interactions of multiple components or modules within an application. These tests ensure that the integrated system functions correctly when different components work together. Integration tests help identify issues that may arise due to the integration of various modules.

## End to End (e2e) Tests

Tests that exercise the system as a whole **from the perspective of the end user**. These tests often use a browser to interact with an application with the same interface that a user sees. These tests tend to be the most time-consuming, but can give a high level of confidence that a system is working as expected (at least for the features that the e2e test is focused on).

End-to-end tests provide a comprehensive evaluation of the entire system from the perspective of the end user. These tests simulate real user interactions with the application, often using a browser or some other user interface, to validate that the application works as expected. While e2e tests tend to be more time-consuming to implement and execute, they provide a high level of confidence in the overall functionality of the system.

Examples of scenarios that are typically worth writing e2e tests for include:

- Sign-up flow
- Log-in flow
- Purchase flows
- Main critical paths through the application
- Unique bugs that have affected real users

By covering these critical paths, e2e tests help ensure that the most important features and user interactions are thoroughly tested and dependable.

Implementing a combination of these different types of tests can provide a comprehensive testing strategy, enabling developers to catch issues early in the development process and deliver high-quality software to end users.
