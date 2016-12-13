# Yeti JavaScript Recommendations

This guide will help you set up a new JavaScript project that:

- Is meant to be a f/e client - not a full fledged web application, no database, and not a lot of server logic.
- Redux to manages the User/Application State, and is the single-source of truth of app state.
- Supports Unit and Acceptance Testing out of the box.
- Stops most bugs in the IDE, before code is compiled, increasing Developer efficiency.
- Performance minded, production minification.
- Fresh, using latest ES2016, ES2017 standards, transpiled for modern browsers.

Rationale:
JavaScript is most fun after the initial configuration and setup  is done. Configuration/Scaffolding a new Application takes too much time and domain knowledge that isn’t very useful outside of this task, so don’t worry about it! Just follow this guide and you’ll be up and developing in as little time as possible. That being said, any techniques outlined here should be informed by the open source JS community, so lots of documentation exists just behind the curtain.

## Step 0 (Rules)
First thing’s first. This guide will assume familiarity with ES2016, and follow the rules laid out in the [Yeti JavaScript Best Practices](https://github.com/koleary94/javascript-best-practices) doc.

## Step 1 (Tools)
[Atom](https://atom.io/) is the recommended IDE for working with these sorts of projects. While [Webstorm/PyCharm is configurable with Flow](https://www.jetbrains.com/help/pycharm/2016.3/using-the-flow-type-checker.html), these tools are used by thousands of developers everyday in Atom. Theoretically, one could configure Sublime Text, Vim, Emacs, etc to work with these tools, but for sake of simplicity this guide will only focus on Atom.

[Install Atom for Mac](https://atom.io/download/mac).

## Step 2 (Setup)

The tools we want to use are:

- Build Tools
	- [Node](https://nodejs.org/en/) & [Yarn](https://github.com/yarnpkg/yarn)
	- [Babel](https://babeljs.io/)
	- [Browserify](http://browserify.org/)
- Core UI
	- [React](https://facebook.github.io/react/)
	- [Redux](http://redux.js.org/)
	- [SASS](https://github.com/sass/node-sass)
- Code Quality / Testing
	- [ESLinter](http://eslint.org/)
	- [AirBnB ESLinter Recommendations](https://github.com/airbnb/javascript/blob/master/linters/.eslintrc)
	- [Karma](https://karma-runner.github.io/1.0/index.html)
	- [Istanbul](https://github.com/gotwarlost/istanbul)
	- [Chai](http://chaijs.com/)
	- [Enzyme](https://github.com/airbnb/enzyme)
- Recommendations (optional)
	- [Flow](https://flowtype.org/)
	- [Immutable](https://facebook.github.io/immutable-js/)

### Starting a Project

Now, let’s start a project with the above tools.

#### Meeting the Requirements

`$ node -v` should print v.4.3.0 or higher
`$ npm -v` should print v.2.14.10 or higher
`$ yarn --version` should print v. or higher

If these fail, please see [Requirements](requirements.md).

#### A nice starting point

[redux-webpack-es6-boilerplate](https://github.com/nicksp/redux-webpack-es6-boilerplate) has most of what we’re looking for, so we’ll start with this as a base project and then white label it.

Replace `app-name` with the name of your project in the following code snippets .

```
$ git clone https://github.com/nicksp/redux-webpack-es6-boilerplate.git app-name
$ cd app-name
$ yarn install
```

First thing’s first, Let’s clear out the old project’s values in package.json and replace them with ours. Don’t forgot to change the following fields:

- name: name of your project
- version: 0.0.1
- description: a short description of your project.
- author: yeti llc, or your name (you may want to add this field)

Next, update the title tag in `src/index.html`.

Now, clear out the previous git history and update github remotes.

```
$ rm -rg .git
$ git init
$ git add .
$ git commit -m “Initial Commit”\
$ git remote add origin <github-url>
$ git push -u origin master
```


Missing.
Browserify
AirBnB ESLinter
Istanbul (Code Coverage)

## Step 3 (Build)

### Starting the server

Now you’re ready to start building, you can start the dev server with the command `npm dev`, however this project supports many more commands out of the box:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|


### Folder Structure

Keeping folder structure consistent across all JavaScript apps will greatly reduce developer ramp-up time on new projects. Therefore, follow the directory structure outline below.

```

```

Commit the Lockfile.