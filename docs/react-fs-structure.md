# Yeti React File System Structure

This document describes Yeti's preferred strategy for organizing our React filesystem structure.

The exact pattern will vary from project to project, but this is what we do when the choice is up to us.

See examples of our filesystem structure [here](../react-fs-structure)

## High Level Structure

### Modules

The modules folder is used to logically and thematically separate parts of the app that have `components`, `utils` and potentially `tests` in common that are not used in other parts of the app. An example of a module could be an `Auth` module that contains our `Login` screen and `Register` screen along with their `components` and shared `utils`. Not only are these screens thematically similar, they also will likely share components and utils that we wouldn't find elsewhere in the app.

#### Why modules instead of screens?

Our thinking here is that if we can create a fs-strucuture that is logically and themaptically compartmentalized, it will be easier for new developers to onboard and navigate the throughout project. A flatter approach may leave a developer searching for longer than necessary if there is nothing pointing them in the right direction.

### Services

The `Services` folder is reserved for JS classes that provide utility in a thematically similar way. An example would be an HTTP service that handles all types of HTTP requests within the app.

### Shared

The `Shared` folder is intended for anything that will be consistently used across the app in more than one module. Two examples are the `Components` and `Types` directories. The `Components` directory will include components that will be consistently used across the app such as a `Text`, `Button` or `Modal` component. The `Types` directory will include any types that may be used across the app. This can include both `interfaces` as well as `enums`. If you find that there is anything else that you are using consistently across the app, it may make sense to include those here. Some examples might be, `StyledComponents`, `Utils`, or `Styles`.

### Static

The `Static` folder is intended for static files such as:

- Fonts
- Images
- SVGS
- Videos

## Tests

While we currently don't have an established pattern for how we would like to write tests, we are currently suggesting that you colocate test files next to the file they're testing (e.g. utils.test.ts living right next to utils.ts).
