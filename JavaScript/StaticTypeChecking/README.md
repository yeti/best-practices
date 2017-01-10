# [Flow](https://flowtype.org/)
> Static type checking for javascript

Javascript is a language that does not need to have types specified. This creates numerous problems during development.

## Problem 1: Poor Variable Naming
No coder has the linguistic depth of shakespeare. Often, we are the exact opposite.

> 'PM, we need to do this refactor.'

>'Why?'

>'Because of other ambiguous terms.'

>'Oh, ok.'


For example, let's say we come across this function:

```javascript
function triage(data, context) {...}
```

Since we did not create this function, we have no clue what the hell is going on. What is the shape of `data`? is `context` nullable? We will wind up doing unnecessary digging to understand what the function does. One solution to this problem is to include jsdocs:

```javascript
/**
* Combines multiple user accounts
* @param {Object} data - user data hash. keys are ids
* @param {Object} context - extra data to merge into users' objects
*/
function triage(data, context) {...}
```

Better. However, jsdocs are not always the source of truth. Documentation - even function level inline documentation - gets stale. Let's say we refactor `triage` to operate on an `array` of `data`, instead of an `object`.

>Before we go further, this is a contrived and tad hyperbolic example. However, the essence of the problem will always exist. Not all developers within a team will follow best practices like jsdocs 100% of the time, especially given time constraints and constantly changing scope. Real functions will also look and be named much better than `triage`. However, there will still be ambiguity.

Because we're in a rush, we forget about changing the jsdocs. Now our `data` param is still _apparently_ an `object`. When a new dev goes to look at our method and just wants to get the jist of what's going on, they have the wrong idea of how `triage` works. That's no bueno. Even though the params are more transparent, they're really not that safe.

## Problem 2: No Type Safety
In our `triage` function, we have a `context` param, which is an object. What's in that object? We can search the application to find the attributes of that object based on what some other function is calling `triage` with, but that does not always clarify the identity of the object. What happens if one of its attrubutes is another object that's not defined in the callee function? We need to go searching for where that is defined as well. What happens if the object is complex, mirroring that of an object heirarchy produced by a back end api? What happens if one of those nested objects is `null`, `undefined`, or empty `{}`? Sure, we'll get to the bottom of the problem eventually, but **_only_** when data flows throughout our application and we get a runtime error.

These can be caught before production through qa and testing. However, software testing and bug catching is hard. Organizations with avaiable resources have qa teams and robust unit and end to end tests. But resources cost money and are not always available, especially with smaller teams and with tight and often unrealistic deadlines. Even adding more devs won't prevent these sorts of problems from happening.

## Benefits

This is where flow shines. Instead of `context` being ambiguous, we can define a single Type for it that encapsulates all of its attributes, creating other child Types when necessary. Now there are actual contractual obligations between parts of the app. If we type `context.company` to be a string and call upon it anywhere else in the application, `triage` will complain immediately if `company` is not a string. This is not just beneficial for nested objects. Code never even needs to be run to expose bugs. This gives developers more confidence in enacting changes quickly, since the function and context associated with it does not need to reach beyond what is necessary.

Flow can also be added iteratively to **any** project. This is accomplished by just adding a comment to the top of the file. On top of being flexible, flow improves the quality of the codebase. The identity of a solution is presented plainly in code in a readable manner. This makes it easer for any developer unfamiliar with a part of a codebase to form a mental model of how it works in less time. Refactors will also take less time, since the majority of problems caused by refactors in the first place are type errors.

There are numerous types that flow exposes that help better specify data. One of these is the `maybe` type, specified by adding a `?` to a type like `?string`. This is essentially saying that the boolean can either be `null` or a `string`. It also allows for union types `string | boolean` and generics `class GenericClass<T> {...}`. There are many more types that can be found in the docs.

## Drawbacks
If Flow is so great, why is this just a recommendation? The foundation of types rests on Category Theory, a rather abstract and hard theoretical framework. `Nullable` and `Union` types are easy enough to understand, but certain gotchas run deep. Take this recommended React pattern.

```Javascript
class BindingExample extends React.Component {
    static propTypes = {
        text: React.PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            active: true
        }

        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        this.setState{(active: false)};
    }

    render() {
        return (
            <button onClick={this.onToggle}>
                {this.props.text}
            </button>
        );
    }
}
```
 We bind the method `onButtonSelect` to `this` in the constructor. The benefit of binding in the constructor vs in the render method is we don't rebind `this` on every click.

 Let's add flow to the file.

 ```Javascript
// @flow
type Props = {
    text: string
}

class BindingExample extends React.Component {
    state: {mySafeSpace: boolean}

    constructor(props: Props) {
        super(props);
        this.state = {
            active: true
        }

        (this:any).onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        this.setState{(active: false)};
    }

    render() {
        return (
            <button onClick={this.onToggle}>
                {this.props.text}
            </button>
        );
    }
}
```

Sweet. Not too bad. but wait...
Why the need for `(this: any)` in the constructor now? I thought we were supposed to limit the instances of `any`? Without saying `this` can be anything, flow will throw an error referencing 'contravariance' and 'covariance' as the root of the type error. [Here](http://www.i-programmer.info/programming/theory/1632-covariance-and-contravariance-a-simple-guide.html) [are](http://tomasp.net/blog/variance-explained.aspx/) [some](https://msdn.microsoft.com/en-us/library/dd799517(v=vs.110).aspx) resources on contravariance and covariance in category theory. It's a really brilliant idea; the reason why flow typing is superior than the static typing of that in other languages like Java. But whether or not each dev should understand the theory necessary in order to fix the error in the codebase and understand _why_ is debatable.

Once you start introducing paradigms like Higher Order Components (in React) you'll start running into more complex types and will really need to understand more about type theory. Not a _bad_ thing, since we're devs and our whole career is learning. However, weighing the pros and cons of implementing this paradigm is something that should be done on a project to project basis based on the skill level of the team. If you have an understanding of type theory or want to learn it, and feel you can lead a team through these errors, then go for it. The real gotcha is that it has the possibility of both speeding up _or_ hindering your development.

## Conclusion

Flow is a new kid on the block. There are new pull requests being opened constantly which are fixing ailments like the one just mentioned. An application - even when perfectly and specifically typed - can still fail when used with third party libraries. There are typings for popular libraries like React [built in](http://www.saltycrane.com/blog/2016/06/flow-type-cheat-sheet/), but there is not a type safety guarantee when your application calls upon methods and apis from libraries without set types. You can create those yourself, but the tradeoff is that it takes time. However, there are immense benefits to making the application structure better defined with more contractual agreements.
