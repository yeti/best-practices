# Testing Philosophy

>>> This was originally written for React Native, but the same principles can be applied to the web.

Bugs come in many shapes and sizes. But in actuality, bugs can be broken down into a few categories.

## Table of Contents

- [Testing Philosophy](#Testing-Philosophy)
  - [Table of Contents](#Table-of-Contents)
  - [Bug Types](#Bug-Types)
  - [Testing Methodologies](#Testing-Methodologies)
    - [Testing for Style Bugs](#Testing-for-Style-Bugs)
    - [Testing for Business Requirements](#Testing-for-Business-Requirements)
    - [Testing for Data Flow](#Testing-for-Data-Flow)
    - [Testing for Accidental Code Changes](#Testing-for-Accidental-Code-Changes)
  - [Testing in Summary](#Testing-in-Summary)

<a name="bug-types"></a>

## Bug Types

**1. Style bugs**

When an implementation of a design does not match the design itself, it is a style bug. In mobile development, this usually happens when a certain screen size is not accounted for or when elements are not aligned properly. This also happens when developers need to interpret how designs should change when the screen size increases or decreases.

**2. Business Requirements**

When a flow is implemented, it usually determined by the requirements on the ticket itself. Sometimes these requirements are not explicitly written down or not followed to a T.

**3. Data Flow**

Coding is really just manipulating data. And on the front end, it's mostly just manipulating data that we either get from the backend or manipulating data structures that we create and store ourselves. Certain data problems that are fairly common are trying to manipulate data that is actually not the type we expect and trying to operate on data that is not defined.

**4. Accidental Code Changes**

Little hiccups get by us and others reviewing our code. We add a console.log or debugger, or even just change one line elsewhere in the application to make our local development easier and it somehow makes its way into production.

_So how do we address these bugs and more importantly prevent them? Let's look at what tools and methodologies are available to us._

<a name="testing-methodologies"></a>

## Testing Methodologies

Let's take a step back and look at what bugs we're trying to solve and prevent.

<a name="testing-for-style-bugs"></a>

### Testing for Style Bugs

There are a few ways we can address style bugs.

**1. Automated**

Automated visual testing is possible, but it is definitely difficult and costly. There are products out there that will run and build your tests, click on elements, and make sure that the screenshots that are taken match previous screenshots. This is usually very helpful for regressions, but not for seeing if implementations match designs to spec.

**2. Manual Through a Person**

In a typical review process, the code and its subsequent implementation go through a few different hands. One important thing we can do is make sure that it gets approval by either a designer or someone with design thinking a keen sense of whitespace and type. This is typically lower cost and less upkeep. If added as a part of the review process before code is even reviewed, it can act as a great means of QA, since design can let development know that there are style bugs / inconsistencies before it is even merged. Another person that can act as an enforcer here is the other developer reviewing the code. We can make it mandatory that the developer pull the branch down, interact with it, and ensure that the style meets that of the design.

**3. Onion Skinning**

Onion skinning is when the design is physically placed on top of the local instance of the feature itself, often done through a tool like Zeplin, which allows the transparency of an overlay to be changed. The limitation of onion skinning is that the implementation on other phones besides the one the mockup was designed for can look bad. This leads us to **4.**

**4. Design and Develop on Multiple Screens**

The less ambiguity, the better. Often times, developers make guesses about how things should move when the screen size decreases or increases - even a change of 100px can drastically alter a design. Should the container padding increase? Should the elements expand to fit the container?

When this isn't explicit, decisions on CSS can be made that aren't the greatest design wise. One way to make this explicit is to provide different screen sizes. This makes Design have to make this decision earlier on in the process. This causes less rework and makes CSS requirements for developers clearer, putting fewer implicit design decisions on development.

Due to time and budgetary constraints, not all 4 of these are always possible. However, we should always aim for 2 - Manual QA, and 3 - Onion Skinning. If more time permits, then focus on 4 - Multi Screen Development and Design, and then on 1 - Automatic Visual QA.

<a name="testing-for-business-requirements"></a>

### Testing for Business Requirements

The most important piece of this puzzle is the Product Manager. Writing explicit requirements that are approved by stakeholders is paramount to prevent these 'bugs'. When requirements change and more scope is added, these 'bugs' are really additional feature requirements, and should be treated as such.

However, there are times when code is refactored or business requirements are indeed not actually met. This is where some good tests can come in.

Since we are using react, best practice is to remove as much business logic as you can from the view layer - components in this case - and move them elsewhere. Since we're using redux and we have services, elsewhere is in a few places. The reducers, the thunks, and the services. Services are well isolated, so we should perform unit tests on those. Most reducers are fairly simple setters, so we don't need to test those frequently (We'll get back to how to make reducers defensively coded in a bit).

Thunks are where the majority of our business logic will lie. They dispatch actions that trigger reducers and call Services' methods. This makes them great targets for effective testing. Now, what type of tests are thunk tests? They're mostly **unit tests**, since we can directly test if a method has been dispatched, but they can also act as **integration tests** as well, guaranteeing that the state has changed to have desired data. This is why we make sure that each thunk we create has a test. It covers the majority of the business logic (e.g. Making sure that the correct actions and sequence of events happen when a certain api call fails, like logging in). It also helps prevent that business logic from accidentally changing.

Sometimes Business Logic also lives in the component itself. If a user has something enabled that causes the UI to show something different, this logic will need to live in the component, even if it is triggered by a single prop. This is where [**Snapshot Tests**](https://jestjs.io/docs/en/snapshot-testing) come into play. We can pass in different props and make sure that the json representation of the react tree rendered matches our expectations.

<a name="testing-for-data-flow"></a>

### Testing for Data Flow

The best way to ensure great and defensive data flows in the app are not tests, they're **types**. A great type system will prevent more data errors than any test suite. This is for a few reasons.

**Types** establish explicit contractual obligations between functions. If something is a `string` or `undefined`, it is known to both the developer and to the type system. If we try to do something dangerous when that `string` is possibly `undefined`, the type system will alert us, sometimes even preventing the code from compiling. This forces us to code defensively at every step of our application, preventing us from trying to manipulate data in a way that will cause errors.

It also forces us to think more critically about the data and functions we create. Eventually, making sure our code is defensive will become second nature since we will learn how to avoid all sorts of type errors. It will prevent spelling errors and errors like trying to access a variable of a parent object that is possibly `undefined`. It will also aid heavily in ensuring that our reducers are functioning as expected, since we can type reducers to always return a certain type of state - `HomeState` for example. Anything that is returned within that reducer will need to fit that existing type.

If any code is refactored, it will immediately point out errors with accessing incorrect or stale data. For example, if we were to refactor a slice of our state, any `mapStateToProps` function that pull from it will be aware of the new state and error if we are trying to pull state that does not exist. Similarly, any `prop` we pass will now have an updated signature, preventing any runtime errors, like converting an array into an object and trying to map over that object. Refactors like this are frequent once a project starts reaching a few dozen components.

<a name="testing-for-accidental-code-changes"></a>

### Testing for Accidental Code Changes

The two main defenses against accidental code changes are **Code Reviews** and [**Snapshot Tests**](https://jestjs.io/docs/en/snapshot-testing). Code Reviewers can spot accidental changes, which is they are so important. **Snapshot Tests** can also point out to the developer that their code has changed in a file or module that they were not supposed to be editing. For example, if we change some of the login logic and a snapshot test fails in our search component, we've probably done something wrong or did a code change where we shouldn't have.

<a name="testing-in-summary"></a>

## Testing in Summary

Testing is always a tradeoff between time, money, and coverage. Using the above methods, we can ensure that we'll test for the majority of use cases that cause bugs to arrive. In the future, we will explore more E2E techniques, which can act as a safeguard for making sure that flows function correctly. As a heuristic, test coverage percentages should be taken with a grain of salt. It causes us to write feel-good tests, like simple setters in our reducers, and lowers our velocity. Aiming for 100% code coverage is too idealistic and will ensure false confidence in our codebase.
