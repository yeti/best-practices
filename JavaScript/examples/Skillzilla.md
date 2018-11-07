**This file was originally written for the frontend codebase of Skillzilla**

It combines **Typescript**, **Redux Observable**, **selectors** and a functional coding style

-----

### Libraries Used
| Library |  |
| ------ | ------ |
| [Antd](https://ant.design/docs/react/introduce) | React components for the Ant Design System |
| [Aphrodite](https://github.com/Khan/aphrodite) | CSS in JS |
| [Jest](https://jestjs.io/) | Efficient testing through snapshots |
| [Lodash](https://lodash.com/docs) | Javascript utility knife |
| [React](https://reactjs.org/) | Modular and extendable component based architecture |
| [Redux](https://redux.js.org/) | Unidirectional state container |
| [Redux Act](https://github.com/pauldijou/redux-act) | Eliminate boilerplate through action and reducer helpers |
| [React Router](https://reacttraining.com/react-router/) | Navigation through components |
| [Redux Observable](https://redux-observable.js.org/) | Powerful side effect handling middleware |
| [Redux Logger](https://github.com/evgenyrodionov/redux-logger) | Action and state logging |
| [Typescript](https://www.typescriptlang.org/) | Supercharged js with developer friendly static type checking |

### Folder Structure

| Folder | Purpose |
| ------ | ------ |
|**apis**| Any third party or Server stuff lives here. The `Server` folder handles all of the api calls made to the backend while `LocalStorage` folder covers storing the user session locally.|
| **constants** | Any constants that the app winds up needing that aren’t sensitive|
| **data** | Test data / dummy data |
| **global_styles** | Font imports and css for global resets, code highlighting, and the notebook |
| **libs**| Any third party libraries that are needed that aren’t forkworthy |
| **modules** | A high level abstraction representing a series of screens, state, side effects, and components that encapsulate a general theme or purpose. A good example of this is `auth`, which contains all of the logic for the user state and whatever screens or components largely lead to changes in said state. |
| **redux_setup** | Root reducer, store setup, and root epic. |
| **shared** | Anything that should be accessible by any component or side effect. Examples of what's in here are error logging actions and The `Notebook` component, which is used across multiple screens. |
| **types** | The source of truth for all typescript types. This folder will _mostly_ mirror the above folder structure. |
-------

### Philosophy
This codebase takes a feature first, functional, and declarative approach to React. Through combining redux, observables, and small, isolated components, we achieve high separation of concerns and a readable, modular infrastructure.

**Let's see this philosophy in action**
We're going to follow what it takes to create the homepage for the application. This will combine most of the touchpoints you will interact with in the codebase.

Let's take a look at the design.

![landing page](https://user-images.githubusercontent.com/3210490/45848616-0529f000-bce4-11e8-86e3-da55e12cdc11.png)

Based on our jira ticket, we are tasked with rendering everything but the tagging functionality.

First, let's determine what module this screen should live in. Since it is primarily concerned with the 'landing page' or 'home page', we're going to place the initial screen in `modules/home/screens`. Let's add a folder and call it `Home`.

> **Best Practice:** When creating new screens and components, start each name with a capital letter.

Let's make the the component for our Home screen by creating a `Home.tsx` file inside of the folder we just created.

> **Tip:** React components should be created with a `.tsx` extension, while any other files should be created with a `.ts` extension

After that, we're going to start building the component. This will create a really simple component.

```javascript
import * as React from 'react';

export default () => (
    <div>
        Hello
    </div>
);
```

We're going to need some styling. To keep the separation of concerns between the component itself and its styling, we're going to create a separate file for the styles and name it `styles.ts`.

> **Process:** When creating a new component that needs styling, add a file called `styles.ts` in the same folder and import it from the component.

We'll put this in the same folder as our component.

```javascript
import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({

});
```

Now let's add some styling to the component.

```javascript
// Home.tsx
import { css } from 'aphrodite/no-important';
import * as React from 'react';
import styles from './styles';

export default () => (
    <div className={css(styles.HomeScreenContainer)}>
        Hello
    </div>
);
```

```javascript
// styles.ts
import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
    HomeScreenContainer: {
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        padding: '40px 0 40px',
    },
});
```

> **Best Practice:** Name the classname of the outermost html element the *name of the component* + 'Container'. This keeps the naming convention of each component uniform and easy to sift through when looking at the elements in a tree view.

Great. Now that we have the foundation of our component in place let's add in the top section. One of our technical requirements is that this part of the home page will be removed once the user is logged in. Due to this and the difference in functionality between the bottom and top half, let's create two components within our `Home.tsx` component. The top section will be our **Hero** component and the bottom section will be our **Gallery** component. Similarly to how we created our **Home** component, let's create those two components the same way; add a folder with the title of the component, a `.tsx` file with the component name, and a `styles.ts`. We'll focus on the **Hero** section first.

After adding some html and styling, we need to focus on the dynamic nature of the Hero section. When the user is logged in, we're going to want hide the Hero section. In order to do this, we need access to state. To do this, we're going to have to connect our component to the Redux store. This will make our component subscribe to any updates in the redux state. Since we'll be using a higher order component to achieve this, we need to change our component to a named const instead of a default export.

```javascript
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux'; // import connect function
import * as React from 'react';
import styles from './styles';

// change to constant
const Hero = () => (
    <div className={css(styles.HeroContainer)}>
        {/* some more html */}
    </div>
);

export default connect()(Hero); // wrap component in connect HOC
```

Now that we're connected, we need a way to choose what data we're getting from the store. To do that, we're going to add a [selector](https://redux.js.org/recipes/computingderiveddata). We're not going to _fully_ follow the same paradigm outlined there and in reselect. We're still going to abstract our the `mapStateToProps` function and focus on derived data, but for now, we're not going to focus on adding shared selectors. We'll address that in the future if there are performance issues or a lack of DRY code. For now, each component will have its own selector.

> **Process:** When creating a new component that needs access to state, add a file called `selector.ts` in the same folder and import it from the component. This keeps the folder structure uniform  and easy to understand. It also separates the concern of choosing / deriving data from the component.

After we create the selector file, we need to export a function that will handle deriving state for us. The function that the redux connect function expects is a function that takes in the `store` at the current time and returns an object of values. Since we are only concerned with whether or not the user is logged in, which is in the `auth` slice of the store, we can just destructure the store to be just `{ auth }`. Since it's important that we don't try to get anything from the store that doesn't exist or mishandle a piece of state, we're going to add a type to the state.

After doing that, our selector will look like this:
```javascript
// selector.ts
import { StoreState } from 'types/state';

// the component itself really doesn't care what went into it being rendered or not,
// so just keeping the prop name simple will do the trick.
export default ({ auth }: StoreState) => ({
    visible: auth.loggedIn
});
```

And our component will look like this:
```javascript
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import * as React from 'react';
import select from './select';
import styles from './styles';

const Hero = () => (
    <div className={css(styles.HeroContainer)}>
        {/* some more html */}
    </div>
);

export default connect(select)(Hero);
```

The one problem is that we're still not passing any data into the component. Let's add some prop handling.

> **Process:** When adding props, create an interface called `Props`

> **Best Practice:** Destructure props in components for readability and conciseness

```javascript
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import * as React from 'react';
import CloudUpload from 'shared/icons/CloudUpload';
import select from './select';
import styles from './styles';

interface Props {
    visible,
}

const Hero = ({ visible }: Props) => {
    if (visible) {
        return (
            <div className={css(styles.HeroContainer)}>
                {/* some more html */}
            </div>
        );
    }

    return null;
};

export default connect(select)(Hero);
```

Our last requirement is that we'll prompt the user to sign up once they click on the upload CTA. To do this we'll access the `dispatch` prop, which is already given to the component as a prop once we `connect` it.

```javascript
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as authActions from 'modules/auth/dux';
import * as React from 'react';
import CloudUpload from 'shared/icons/CloudUpload';
import select from './select';
import styles from './styles';

interface Props {
    dispatch: Dispatch,
    visible: boolean,
}

const Hero = ({ dispatch, visible }: Props) => {
    if (visible) {
        return (
            <div className={css(styles.HeroContainer)}>
                {/* some more html */}
                <div
                    className={css(styles.rightSection)}
                    onClick={() => dispatch(authActions.showSignupModal(true))}
                >
                    <CloudUpload />
                    <p className={css(styles.uploaderLabel)}>
                        upload your jupyter notebook to get started
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

export default connect(select)(Hero);
```

> **Process:** When dispatching actions, import the actions as a module using es6 `import * as ...`. This keeps it readable and easy to see what module (folder structure `module`) the action is coming from.

Now we have a fully functional component that is styled and dynamically removes itself from the dom and view when it does not need to be seen. All of this occurs within the context of just the **Hero** component, since it is not the parent's responsibility to account for what the child needs from the store. By doing this, we have kept the separation of concerns between the child and the parent and kept both of the components concise and easy to understand.

Now that we have our **Hero** section nailed down, let's address the  **Gallery**.

We're going to approach this component a bit differently than the **Hero** since we have different data requirements. Since we're going to be rendering the Project Cards for each project, we need access to the projects from the backend. Since we do not currently have this data in our redux state anywhere, we're going to have to perform an api call to get it.

To achieve this we're going to dispatch an action to retrieve the gallery projects whenever the component is mounted.
>When we do this during the mount lifecyle, the byproduct is that every time we go back to this page from somewhere else in the app it will refresh the gallery. From a design perspective, this is intended, so we're not going to add anything else to prevent the api call from happening. If we didn't want that to happen, we might place the fetch gallery projects action in a higher level in the app, so it is only called once and does not rely on the Gallery to be mounted to be fired. Nevertheless, this is fine for now.

Since we need access to the React Component Lifecycle, we're going to create a class and extend `Component` from React. We're also going to need to create the action itself as well. Since we're in the **Home Module** and this action will directly impact the rendering of one of the screens in Home, we're going to create the action in the **Home Module**.

The actions, and subsequent reducer for each module will live under the `dux` folder.

> We use a slight modified version of [Ducks Modular Redux](https://github.com/erikras/ducks-modular-redux/blob/master/README.md) for actions and reducers, as well as [redux act](https://github.com/pauldijou/redux-act) to aid in eliminating boilerplate.

Since this is the first action we'll be creating in the **Home Module**, we'll need to create the initial state as well as the reducer itself. Let's start with the initial state. Since we'll want to make the state type safe and guarantee that we're not adding anything to the state or pulling anything from the state that doesn't exist, we need to create a `type`.

Let's place this in the `state` folder in the `types` folder.

>**Process:** Whenever creating a type, add it to one of the folders under the `types` folder, so types can be easily inferred and accessed. _note: this does not apply for `State` or `Props` types that are created within a component file_


The one thing that the gallery needs access to is the project, so let's add that into the state. Luckily for us, the `Project` model already exists.

```javascript
// types/state/home.ts
import { Project } from 'types/models';

export interface HomeState {
    projects: Project[],
}
```

Now let's create out initial state. We create a `const` so we can explicitly type it.

```javascript
// modules/home/dux/initialState.ts
import { HomeState } from 'types/state';

const initialHomeState: HomeState = {
    projects: [],
};

export default initialHomeState;
```

Now that we have our state set up, we can create some actions and a reducer.

```javascript
// modules/home/dux/index.ts
import { createAction, createReducer } from 'redux-act';
import { HomeState } from 'types/state';
import initialState from './initialState';

// actions
// -----------------------------------------------------------------------
export const fetchGalleryProjects = createAction('Fetch gallery projects');

// reducers
// -----------------------------------------------------------------------
const reducer = createReducer<HomeState>({}, initialState);

export default reducer;
```

We'll make the reducer the default export, while exporting all other actions individually.

> **Best Practice**: To aid readability, separate actions and reducers by comments

Now we have our action that will go out and fetch the gallery projects. The part that we're missing is how we're going to handle what happens when we get those projects from the server. Standard practice is to create `success` and `failure` actions to go along with any actions that trigger api calls. This accounts for the different return possibilities. Since we're on a bit of tight deadline, and since we don't have an error state design wise for when projects have failed to load, we're going to just create the `success` action. We'll handle the failure through generic error handling in our side effect.

```javascript
import { createAction, createReducer } from 'redux-act';
import { HomeState } from 'types/state';
import { Project } from 'types/models';
import initialState from './initialState';

// actions
// -----------------------------------------------------------------------
export const fetchGalleryProjects = createAction('Fetch gallery projects');
export const fetchGalleryProjectsSuccess = createAction<Project[]>('Successfully fetched gallery projects');


// reducers
// -----------------------------------------------------------------------
const reducer = createReducer<HomeState>({}, initialState);

reducer.on(fetchGalleryProjectsSuccess, (state, payload) => ({
    ...state,
    projects: payload,
}));

export default reducer;
```

This time around we're telling redux act exactly what payload it should expect, which is a list of projects. We're also adding a listener to the reducer to listen for when the success action is dispatched and modifying state accordingly.

Before we jump into the side effect and how the api call will actually get made, let's take a look at how we should set up our component. We'll take advantage of the `componentDidMount` method and dispatch the action to fetch the gallery projects.

```javascript
import { connect } from 'react-redux';
import { css } from 'aphrodite';
import { Dispatch } from 'redux';
import { Project } from 'types/models';
import * as homeActions from 'modules/home/dux';
import * as React from 'react';
import ProjectCard from 'shared/components/ProjectCard/ProjectCard';
import select from './select';
import styles from './styles';

interface Props {
    dispatch: Dispatch,
    projects: Project[],
}

class Gallery extends React.Component<Props> {
    public componentDidMount() {
        this.props.dispatch(homeActions.fetchGalleryProjects());
    }

    public render() {
        return (
            {/* some jsx */}
        );
    }
}

export default connect(select)(Gallery);
```

_How is managing those api calls and other odd things like managing the cascading effects of signing up or logging in handled?_

These types of events are referred to as side effects. They're parts of the application that do not exist within the standard cycle of a component or in the standard redux flow of action -> reducer. We'll handle these side effects through `redux observable`, which uses - you guessed it - observables.

Observables can get fairly self referential and complex. Luckily, we don't have to have an expert level understanding of their nuances to effectively use them within a react application. The easiest way to think of an observable is as a river and you - the observer - are pulled up right beside it fishing. Whenever you hook a fish on your line, you reel it up and check out what type of fish it is. Since you're on the lookout for bass, you throw back any fish that aren't bass. If you do catch one, you'll obviously want to prepare it by filleting it first. Afterwards, you'll want to bring it home, since you were tasked with going out to get bass by your family in the first place. After that, you'll want to cook it, add some spices, and serve it with some nice carbs and a veggie.

Yum.

On your drive home, you remember a nice conversation you had with a woman that was there fishing for rainbow trout. She was down the river by about 100 ft. Coincidentally, she was also there fishing for dinner tonight. The one difference was in the bait she was using: salmon eggs, a tasty delight for most rainbow trout. In doing so, she was able to easily pull up only the fish that she wanted. Since she only wanted a few fish to take home and was willing to spend the entire afternoon fishing, she would occasionally take her line out of the water and just look out beyond the river and feel the breeze.

What if I were to tell you that this entire sequence of actions could be easily modeled by observables? And that this sequence of events is exactly what happens with side effects on the front end?

In our application, we want to fetch some projects from the backend, so we tell the app, 'Hey, can you do me a favor and `fetchGalleryProjects`?' Once it fetches the data, we tell the app again, 'If you could just go ahead and listen to when we successfully fetched gallery projects, that would be great.'

So after we fetch our data, it's going to be in a format that we don't really want or need. Some keys are going to be snake_cased. Some fields are not going to be relevant to us. We might even want to default some data fields if they're `null`. So we'll add a serializer to convert the data structure returned by the backend to something a bit cleaner and more relevant to our needs.

After that our `reducer` will take the data returned by our serializer and add into state. Voila!

How does this relate?

Well, the family in our analogy is the same thing as the react application itself. The family is hungry (our application wants some project data), so it tells one of the parents (the side effect) to go get some fish. Once the parent goes fishing, it sets up camp next to the river (the observable stream of data that is being returned through `actions`) and throws their line in. Once they catch a fish (the `action`), they check to see if it's bass (the `fetchGalleryProjectsSuccess` action) and otherwise just throw it back in the river in case somebody else like the other women who was there wants to catch it (we ignore the `action` and allow any other listeners that might care about actions, like logging in or fetching other data, to handle it).

Once the parent catches the fish, they need to prepare it by filleting it (using a `serializer` to clean and modify the data), drive home, and then cook it with some spices and other goodies to make a meal that they will then serve to their family (the reducer takes in the data and modifies state as it needs to).

That part of the analogy is all we're going to need to get projects loaded into our app. However, there are some additional parts that relay the power of observables. The woman who was fishing had a few different things going on. Once of which was taking her pole out of the water for a bit once she caught a fish. This is equivalent to debouncing or throttling events that occur in the front end. For example, if we're listening to a click action that we only want to respond to once every n seconds, we can easily model that with observables.

And if we want to create an ocean that routes to three different rivers, have fishing poles in each one, and convert our fish into fire breathing dragons that then eat fish for us, we can model all of that behavior with the power of observables.

Now that we've talked about them so much on a high level, we should probably see them in action.

All of our epics are going to live in an `epics` folder under our **Home Module**. Our root epic expects and array of epics, so we'll create a barrel within our `epics` folder that exports an array of epics from that module.

Let's create a stripped down version of our epic and add in types later.

If we try to run this, it will fail, since it's expecting a return value. The way `redux-observable` operates is that it expects you to always return an action. `redux-observable` also expects that an epic itself is an `observable` that takes in one parameter: an observable of an action. Think of the '**observable** of an action' being some nice gift wrapping that we need in order to carry it around.

```javascript
import { ofType } from 'redux-observable';
import * as homeActions from 'modules/home/dux';

const fetchGalleryProjects (action$) =>
    action$
        .pipe(
            ofType(homeActions.fetchGalleryProjects)
        );

export default fetchGalleryProjects;
```

In our version above, we create an `observable` that _listens_ to the stream of actions being dispatched via the `action$` parameter.

We operate on the `action$` supplied to us by using the `pipe` operator. The `pipe` operator basically pipes our action into whatever transforms we pass it. The most important one is the `ofType` operator. This is our filter for only listening to actions that we care about.

Once we filter the action, we're going to want to act on it. Since we want data from the server, we're going to have to go to our `Server` api.

Luckily for us, we have a good example of a `get` request.

```javascript
// apis/Server/Server.ts
...
public static fetchUserInfo() {
    return this._get('users/me');
}
...
```

Let's create something similar, since we don't need to pass in any params.

```javascript
// apis/Server/Server.ts
...
public static fetchUserInfo() {
    return this._get('users/me');
}

public static fetchProjects() {
    return this._get('projects');
}
...
```

Simple enough.

> **Best Practice:** Always alphabetize methods within classes or attributes within objects

Let's go back to our epic. We're going to have to call that function we just made. To do that, we're going to utilize another operator called `mergeMap`, which essentially merges two observables. In our analogy, it's the equivalent of us wanting a fish that is foreign to our river. Instead of us traveling to get it, somebody else catches it in a different river and drops it off in our river. The one caveat for this to work is that that fish _needs_ to be in a river itself. It needs some gift wrapping. Due to that, we need our Server API to also return observables, which we have already done.

```javascript
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators'; // add mergeMap operator
import * as homeActions from 'modules/home/dux';
import Server from 'apis/Server/Server';

const fetchGalleryProjects(action$) =>
    action$
        .pipe(
            ofType(homeActions.fetchGalleryProjects),
            mergeMap(() => Server.fetchProjects()), // combine observable of the api call
        );

export default fetchGalleryProjects;
```

In this scenario, `mergeMap` expects a function that takes in the current action we're dealing with (since that is most recent thing we pulled from the stream) and returns an observable. Since we don't need anything that's in the payload of the action, we can just return `Server.fetchProjects()`, since that function returns an observable.

Now we can operate on what the return value from the api call will be. Keep in mind that `redux-observable` ultimately expects just an action to be returned. To close out the current observable and just return an action, we're going to use the `map` function, which, as you can probably guess, closes out an observable and returns a value.

```javascript
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators'; // add map operator
import * as homeActions from 'modules/home/dux'; // add homeActions so we can dispatch the success action
import Server from 'apis/Server/Server';

const fetchGalleryProjects(action$) =>
    action$
        .pipe(
            ofType(homeActions.fetchGalleryProjects),
            mergeMap(() => Server.fetchProjects()),
            // return action
            map(response => homeActions.fetchGalleryProjectsSuccess(response)),
        );

export default fetchGalleryProjects;
```

We `map` whatever the return value of the api call is to our action that we want to dispatch. There is one problem though. The response itself is prepped or serialized! Let's fix that by creating a serializer.

> **Process:** Serializer should be created in their own file under `apis/Server/serializers/[name of serializer]`.

```javascript
// apis/Server/serializers/projectsSerializer
import { userSerializer } from './userSerializer';
import { ServerProject, ServerProjectsResponse } from 'types/apis/server';
import { Project } from 'types/models';


export function projectsSerializer(response: ServerProjectsResponse): Project[] {
    return response.results.map(project => projectSerializer(project));
}

export function projectSerializer(serverProject: ServerProject): Project {
    return {
        description: serverProject.description,
        id: serverProject.id,
        image: serverProject.image,
        owner: userSerializer(serverProject.user),
        notebookUrl: serverProject.notebook,
        tags: serverProject.tags,
        title: serverProject.title,
    };
}
```

We've added a function that handles multiple projects, as well as a second serializer for individual projects. We've also added types for the response from the api and what we should be returning.

> **Process:** Make sure to serializer as an export from the `index.ts` file within `serializers`. This makes our imports cleaner.

Now that we have our serializer in place, let's call it.

```javascript
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { projectsSerializer } from 'apis/Server/serializers'; // import serializer
import * as homeActions from 'modules/home/dux';
import Server from 'apis/Server/Server';

const fetchGalleryProjects(action$) =>
    action$
        .pipe(
            ofType(homeActions.fetchGalleryProjects),
            mergeMap(() => Server.fetchProjects()),
            map(response => homeActions.fetchGalleryProjectsSuccess(
                projectsSerializer(response) // call it!
            )),
        );

export default fetchGalleryProjects;
```

Awesome. We're super close to getting our data in the app. However, sometimes fish go bad and our api throws an error. We're going to want a way to handle that. Let's add a `catchError` operator to the end of our `pipe` to account for when that happens.

```javascript
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { catchError, map, mergeMap } from 'rxjs/operators'; // import catchError serializer
import { projectsSerializer } from 'apis/Server/serializers';
import * as homeActions from 'modules/home/dux';
import Server from 'apis/Server/Server';

const fetchGalleryProjects(action$) =>
    action$
        .pipe(
            ofType(homeActions.fetchGalleryProjects),
            mergeMap(() => Server.fetchProjects()),
            map(response => homeActions.fetchGalleryProjectsSuccess(
                projectsSerializer(response) // call it!
            )),
            catchError(() => sharedActions.logErrorAsObservable('Error fetching gallery projects'))
        );

export default fetchGalleryProjects;
```

`catchError` expects you to return an observable. To account for this and for the common case of logging errors that should not explicitly be exposed to the user, we've already created a helper function `logErrorAsObservable` that converts the `logError` action into an observable.

Let's sprinkle on some types.

```javascript
import { Action } from 'redux';
import { ActionsObservable, ofType, Epic } from 'redux-observable';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { projectsSerializer } from 'apis/Server/serializers';
import * as homeActions from 'modules/home/dux';
import * as sharedActions from 'shared/dux';
import Server from 'apis/Server/Server';

const fetchGalleryProjects: Epic<Action> = (action$: ActionsObservable<Action>) =>
    action$
        .pipe(
            ofType(homeActions.fetchGalleryProjects),
            mergeMap(() => Server.fetchProjects()),
            map(response => homeActions.fetchGalleryProjectsSuccess(projectsSerializer(response))),
            catchError(() => sharedActions.logErrorAsObservable('Error fetching gallery projects'))
        );
```

Now we have a fully typed, defensively coded epic that fetches, serializes, and dispatches actions when it succeeds or fails.

_But why observables over another data structure?_

Observables, on top of being able to model complex behavior in a succinct fashion, also have high interoperability with other asynchronous methods like callbacks and promises. It allows us to handle everything that happens in the realm of side effects with a singular data structure and powerful operators, making our codebase backwards and forwards compatible with any sort of asynchronous behavior.

Let's go back to our Gallery component and add in the rest of the necessary components. Since we're going to reuse those Project Cards that we see in the mockup, we're going to add them to `shared/components`. With some additional js and css, we have our Landing Page!

<img width="1450" alt="screen shot 2018-09-20 at 7 41 56 pm" src="https://user-images.githubusercontent.com/3210490/45857412-61553a00-bd0d-11e8-8d79-c74ee87442db.png">
