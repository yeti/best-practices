# Yeti Testing Best Practices

This document is meant to serve as a guide to Yeti's approach to automated testing and outlines some best practices for implementing effective automated tests, as well as the tools we use for automated testing.

## What are Automated Tests?

Automated testing is the process of using software to exercise/test code. This is in contrast with manual testing, where a user uses a browser or other tool to manually verify software behavior.

## Why Write Tests?

Yeti often works on projects that are prototypes, "greenfield," or in the early stages of development. In such cases, it may be tempting to forgo writing tests due to the feeling that it requires additional effort. However, writing tests can offer numerous benefits, even in these scenarios. It's worth considering the following factors when deciding whether to write tests for a project:

1. **Solidifying Application Behavior**: Writing tests tends to solidify an application's behavior by defining expected outcomes for various scenarios. While this can reduce flexibility, it also ensures that the application functions as intended.
2. **Regression Detection**: Automated tests help catch regressions, which are issues that arise when existing features break due to changes or additions made during development. By running tests during the build or review process, regressions can be identified and fixed early, helping with application stability.
3. **Communicating Expected Behavior**: Tests serve as living documentation by providing examples of expected behavior. They communicate the intended functionality of the system to other developers, making it easier to understand and maintain the codebase.
4. **Identification of Corner Cases**: Automated tests provide a mechanism to exercise and validate corner cases that may be difficult to test manually. By explicitly defining and testing edge cases, developers can ensure that their code handles various scenarios correctly.
5. **Improved Software Quality**: The cumulative effect of the above benefits is an overall increase in software quality. By increasing confidence in the software's behavior, catching regressions, and covering critical and edge cases, automated testing contributes to the delivery of robust and reliable software.

It is important to note that the specific costs and benefits of automated testing will vary depending on the project and its requirements. However, in general, adopting a comprehensive testing approach can significantly improve the quality and reliability of applications.

## Unit Tests

Unit tests focus on testing individual "units" of code, such as functions or components, in isolation. These tests should have minimal dependencies and verify that given a specific input, the expected output is produced. Unit tests are essential for validating the correctness of small, self-contained code units.

### Unit Testing Tools

**[Jest](https://jestjs.io/)** is a popular JavaScript testing framework maintained by Facebook. It works well for unit testing React components and other JavaScript/TypeScript code. Some key features include:

- Automatic mock generation for modules
- Built-in assertion libraries like expect()
- Easy to setup and run tests

**[Vitest](https://vitest.dev/)** is another popular JavaScript unit testing framework in the Vite ecosystem. It aims to be very fast and lightweight. Some key features include:

- Built for modern JavaScript/TypeScript
- Near-instant feedback while developing
- Tight integration with Vite

## Integration Tests

Tests that exercise a larger "slice" of an application, testing how several pieces interact given different situations/input.

Integration tests verify the behavior and interactions of multiple components or modules within an application. These tests ensure that the integrated system functions correctly when different components work together. Integration tests help identify issues that may arise due to the integration of various modules.

### Integration Testing Tools

**[MSW (mock-service-worker)](https://mswjs.io/)** is a popular library for mocking network requests in integration tests. It allows simulating API responses, delays, errors, and other conditions to test how your code behaves under different scenarios.

**[Supertest](https://github.com/ladjs/supertest)** is a library for testing HTTP requests in Node.js applications. It allows making requests against your Express/Fastify/Koa app and asserting expectations on the response. Supertest works well for integration testing endpoints and APIs.

## End to End (e2e) Tests

End to end tests simulate real user interactions with the application, often using a browser, to validate that the application works as expected.  
While e2e tests tend to be more time-consuming to implement and execute, they provide a high level of confidence in the overall functionality of the system.

Examples of scenarios that are typically worth writing e2e tests for include:

- Sign-up flow
- Log-in flow
- Purchase flows
- Main critical paths through the application
- Unique bugs that have affected real users

By covering these critical paths, e2e tests help ensure that the most important features and user interactions are thoroughly tested and dependable.

Implementing a combination of these different types of tests can provide a comprehensive testing strategy, helping to catch issues early in the development process and deliver high-quality software to end users.

### End to End Testing Tools

#### Web

[Cypress](https://docs.cypress.io/guides/overview/why-cypress)  
[Playwright](https://playwright.dev/)

#### Mobile

[Detox](https://wix.github.io/Detox/)

## Mobile App Testing

While the general goals in automated testing are the same for mobile apps, projects would often need to use specialized tools to conduct tests. Mobile specific testing tools for integration tests and end to end tests requires a mobile device simulator to create a suitable testing environment. Because of this, mobile testing tends to be more time-consuming, and more resource intensive to execute.

Yeti has setup end to end testing in some mobile project, however, it is still a work in progress due to constraints related to automated remote testing. Further end to end tests with mobile will need further research and experimentation using these platforms:

[Github Actions](https://github.com/features/actions)

[CircleCI](https://circleci.com/)
