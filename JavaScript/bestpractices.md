# Javascript Best Practices

Thanks to Kevin for authoring [the initial version of this document](https://github.com/koleary94/javascript-best-practices).

- [Immutability](https://facebook.github.io/immutable-js/)
- [Composition over Inheritance](https://facebook.github.io/react/docs/composition-vs-inheritance.html)
- Unidirectional data flow / [single source of truth](http://redux.js.org/docs/introduction/Motivation.html)
- smaller component files (large components with multiple render methods conflates business logic and makes it hard to map imports / logic to corresponding view layers)
- globals are a spawn of satan
- use attributes instead of static getters. getters are good for hiding side effects and business logic, but unnecessary for returning strings. services should be close to back end apis; exposing explicit methods
- [Static Type Checking](https://flowtype.org/)

### Data retrieval
- fetch (downside is that they are not cancellable)

### es6
- [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- generators

### es7
- [async await](https://ponyfoo.com/articles/understanding-javascript-async-await)
- [observables](https://github.com/Reactive-Extensions/RxJS)
- decorators (as of right now there is no standard and they are in an early stage, so it's risky to use. HOCs are comparable and easier to test)

### Tooling

- Webpack (Tree shaking, code splitting, base64 image conversion, extensive plugins, community support, Hot module reloading, css class scoping emulates shadow dom)
- eslint
- Babel
- yarn for dependency management and intelligent module versioning

### CSS
- z-index scale
- reused components should recieve special styling through a wrapper div within a parent
- don't use scss `extend`. Use `mixins` [instead](https://www.sitepoint.com/avoid-sass-extend/).

## Influences
[React and Immutable](https://www.youtube.com/watch?v=I7IdS-PbEgI&feature=youtu.be) 

[The power of simplicity](https://www.youtube.com/watch?v=NdSD07U5uBs)

[Async Programming in ES7](https://www.youtube.com/watch?v=lil4YCCXRYc&t=2s&index=16&list=LLyC_vdEIR5HdKQy6p4Nh9nw)

### Further Reading

- [Why do we use browserify + NPM](https://www.leanpanda.com/blog/2015/06/28/amd-requirejs-commonjs-browserify/)?
- [Webpack vs Browserify](https://gist.github.com/substack/68f8d502be42d5cd4942).
