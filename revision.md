# JavaScript Deep Dive

## 1. Object References

Objects are compared by reference, not by their content.

```js
const a = { name: "Alex" };
const b = { name: "Alex" };

console.log(a === b); // false
```

Even though both objects have the same content, they are different objects.

```text
a ───→ Object #1
b ───→ Object #2
```

But:

```js
const a = { name: "Alex" };
const b = a;

console.log(a === b); // true
```

Both variables point to the same object.

---

## 2. Hoisting

Hoisting is the JavaScript engine's behavior of processing declarations before executing the code.

```js
console.log(x);

var x = 10;
```

Output:

```text
undefined
```

Conceptually:

```js
var x;

console.log(x);

x = 10;
```

### `var`

`var` is function-scoped.

### `let` and `const`

`let` and `const` are block-scoped.

---

## 3. Temporal Dead Zone (TDZ)

`let` and `const` are hoisted, but they are not initialized immediately.

```js
console.log(x);

let x = 10;
```

This gives:

```text
ReferenceError
```

The period between entering the scope and reaching the declaration is called the **Temporal Dead Zone**.

```text
Scope starts
     ↓
x exists but is uninitialized
     ↓
     TDZ
     ↓
let x = 10
     ↓
x initialized
```

---

## 4. Execution Context

Whenever JavaScript starts executing code, it creates an execution context.

For example:

```js
let x = 10;

function test() {
    let y = 20;
}

test();
```

There is a global execution context.

When `test()` is called, a new function execution context is created.

```text
Global Execution Context
        ↓
     test()
        ↓
Function Execution Context
```

---

## 5. Lexical Environment

A lexical environment stores variables and has a reference to its outer environment.

```js
let x = 10;

function test() {
    let y = 20;

    console.log(x);
}
```

Inside `test`, JavaScript first looks for `x` locally.

It doesn't find it, so it goes to the outer lexical environment.

```text
test Lexical Environment
 ├── y → 20
 │
 └── outer
       ↓
Global Lexical Environment
 └── x → 10
```

---

## 6. Closures

A closure happens when a function remembers variables from its surrounding lexical environment.

```js
function createCounter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

Even though `createCounter()` has finished executing, the returned function still has access to `count`.

```text
counter function
       ↓
remembers
       ↓
createCounter's lexical environment
       ↓
count
```

---

## 7. `this`

For a regular function, `this` depends mainly on how the function is called.

```js
const user = {
    name: "Alex",

    greet() {
        console.log(this.name);
    }
};

user.greet();
```

Here:

```text
this → user
```

So the output is:

```text
Alex
```

Remember:

> For regular functions, look at the call to determine `this`.

---

## 8. Arrow Function `this`

Arrow functions do not have their own `this`.

They take `this` from their surrounding lexical scope.

```js
const user = {
    name: "Alex",

    greet: () => {
        console.log(this.name);
    }
};
```

This does not behave like a normal method.

Remember:

> Regular function → `this` depends on the call.

> Arrow function → `this` comes from the surrounding scope.

---

# Prototype Deep Dive

## 9. Prototype

A prototype is an object that another object can inherit properties and methods from.

```js
const parent = {
    x: 10
};

const child = Object.create(parent);

console.log(child.x); // 10
```

`child` does not have its own `x`.

JavaScript searches its prototype and finds `x`.

---

## 10. `[[Prototype]]`

`[[Prototype]]` is the internal link between an object and its prototype.

```text
child
  ↓ [[Prototype]]
parent
  ↓ [[Prototype]]
Object.prototype
  ↓
null
```

---

## 11. `__proto__`

`__proto__` provides access to an object's prototype.

```js
const parent = {};

const child = Object.create(parent);

console.log(child.__proto__ === parent); // true
```

Modern code usually prefers:

```js
Object.getPrototypeOf(child);
```

---

## 12. `.prototype` vs `[[Prototype]]`

This is one of the most important concepts.

```js
function User() {}
```

Conceptually:

```text
User
 ├── .prototype ─────→ User.prototype
 │
 └── [[Prototype]] ──→ Function.prototype
```

`.prototype` is a property.

`[[Prototype]]` is the internal inheritance link.

They are NOT the same thing.

---

## 13. Functions Are Objects

Functions are objects too.

```js
function User() {}

console.log(User.name);
console.log(User.length);
console.log(User.prototype);
```

Therefore the function itself also has a prototype chain.

```text
User
 ↓ [[Prototype]]
Function.prototype
 ↓
Object.prototype
 ↓
null
```

---

## 14. Prototype Chain

When JavaScript cannot find a property on an object, it searches its prototype chain.

```js
const grandParent = {
    x: 10
};

const parent = Object.create(grandParent);

parent.y = 20;

const child = Object.create(parent);

child.z = 30;
```

The chain:

```text
child
 ↓
parent
 ↓
grandParent
 ↓
Object.prototype
 ↓
null
```

Therefore:

```js
console.log(child.x); // 10
console.log(child.y); // 20
console.log(child.z); // 30
```

For:

```js
child.x
```

JavaScript searches:

```text
child
 ↓
x found? No
 ↓
parent
 ↓
x found? No
 ↓
grandParent
 ↓
x found? Yes → 10
```

### Important rule

> JavaScript stops at the first matching property.

---

## 15. Property Shadowing

If the child and parent have the same property, the child's property wins.

```js
const parent = {
    name: "Parent"
};

const child = Object.create(parent);

console.log(child.name); // Parent

child.name = "Child";

console.log(child.name);  // Child
console.log(parent.name); // Parent
```

Conceptually:

```text
child
 ├── name → "Child"
 │
 ↓ [[Prototype]]
parent
 └── name → "Parent"
```

The child's property **shadows** the parent's property.

---

## 16. Methods and `this`

A method can be found on the prototype while `this` still refers to the object that called it.

```js
const parent = {
    name: "Parent",

    greet() {
        console.log(this.name);
    }
};

const child = Object.create(parent);

child.name = "Child";

child.greet();
```

JavaScript finds `greet` here:

```text
child
 ↓
parent
 ↓
greet found
```

But the call is:

```js
child.greet();
```

Therefore:

```text
this → child
```

Output:

```text
Child
```

---

## 17. `Object.create()`

```js
const child = Object.create(parent);
```

creates a new object whose `[[Prototype]]` is `parent`.

```text
child
 ↓ [[Prototype]]
parent
```

---

## 18. `Object.create(null)`

You can create an object with no prototype.

```js
const obj = Object.create(null);

obj.name = "Alex";

console.log(obj.name);     // Alex
console.log(obj.toString); // undefined
```

The chain is:

```text
obj
 ↓
null
```

---

# Constructor Functions

## 19. Constructor Function

Before classes, JavaScript commonly used constructor functions.

```js
function User(name) {
    this.name = name;
}

const user = new User("Alex");
```

The instance's prototype becomes:

```text
user
 ↓ [[Prototype]]
User.prototype
 ↓
Object.prototype
 ↓
null
```

---

## 20. Prototype Methods

Methods can be stored on the prototype.

```js
function User(name) {
    this.name = name;
}

User.prototype.sayHello = function () {
    console.log("Hello " + this.name);
};

const a = new User("Alex");
const b = new User("Bob");
```

Both instances share the same method.

```js
console.log(a.sayHello === b.sayHello); // true
```

Conceptually:

```text
a ─────────┐
           ↓
     User.prototype
           │
           └── sayHello → SAME FUNCTION
           ↑
b ─────────┘
```

---

## 21. Prototype Inheritance

```js
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function () {
    console.log(this.name + " makes a sound");
};

function Dog(name) {
    this.name = name;
}

Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.bark = function () {
    console.log("Woof!");
};

const dog = new Dog("Bruno");
```

The chain becomes:

```text
dog
 ↓
Dog.prototype
 ↓
Animal.prototype
 ↓
Object.prototype
 ↓
null
```

Therefore:

```js
dog.bark();  // Woof!
dog.speak(); // Bruno makes a sound
```

---

## 22. Method Overriding

A child can define its own method with the same name.

```js
Dog.prototype.speak = function () {
    console.log("Woof!");
};
```

Now:

```text
dog
 ↓
Dog.prototype
 └── speak() ← found first
 ↓
Animal.prototype
 └── speak()
```

The Dog method wins because it is found first.

This is related to property shadowing.

---

## 23. `constructor` Property

Normally:

```js
function Dog() {}
```

has:

```js
Dog.prototype.constructor === Dog; // true
```

Conceptually:

```text
Dog.prototype
 └── constructor → Dog
```

But if we replace the prototype:

```js
Dog.prototype = Object.create(Animal.prototype);
```

the new prototype does not have its own `constructor`.

JavaScript searches upward:

```text
Dog.prototype
 ↓
Animal.prototype
 ↓
constructor → Animal
```

Therefore:

```js
console.log(Dog.prototype.constructor === Animal); // true
```

You can restore it:

```js
Dog.prototype.constructor = Dog;
```

Now:

```js
console.log(Dog.prototype.constructor === Dog); // true
```

### Important

`constructor` is just a property.

It does not guarantee that it tells you the actual function that created an object.

---

# Classes

## 24. `class`

JavaScript classes are built on top of prototypes.

```js
class User {
    constructor(name) {
        this.name = name;
    }

    sayHello() {
        console.log("Hello " + this.name);
    }
}

const user = new User("Alex");
```

The method is on:

```text
User.prototype
```

The instance connects to it:

```text
user
 ↓
User.prototype
```

---

## 25. Class Methods Are Shared

```js
class User {
    sayHello() {
        console.log("Hello");
    }
}

const a = new User();
const b = new User();

console.log(a.sayHello === b.sayHello); // true
```

The method is shared through the prototype.

---

## 26. `extends`

```js
class Animal {
    speak() {
        console.log("Animal sound");
    }
}

class Dog extends Animal {
    bark() {
        console.log("Woof");
    }
}
```

Conceptually:

```text
Dog.prototype
 ↓
Animal.prototype
 ↓
Object.prototype
 ↓
null
```

Therefore:

```js
const dog = new Dog();

dog.bark();  // Woof
dog.speak(); // Animal sound
```

---

## 27. `super`

`super` can access the parent implementation.

```js
class Animal {
    speak() {
        console.log("animal");
    }
}

class Dog extends Animal {
    speak() {
        console.log("dog");
        super.speak();
    }
}

const d = new Dog();

d.speak();
```

Output:

```text
dog
animal
```

Execution:

```text
d.speak()
   ↓
Dog.speak()
   ↓
"dog"
   ↓
super.speak()
   ↓
Animal.speak()
   ↓
"animal"
```

---

## 28. `super()` in Constructors

`super()` can call the parent constructor.

```js
class Animal {
    constructor(name) {
        this.name = name;
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }
}
```

Execution:

```text
new Dog("Bruno")
      ↓
Dog constructor
      ↓
super("Bruno")
      ↓
Animal constructor
      ↓
this.name = "Bruno"
```

In a derived class constructor, you generally cannot use `this` before calling `super()`.

Incorrect:

```js
class Dog extends Animal {
    constructor(name) {
        this.name = name;
        super(name);
    }
}
```

---

# Important Prototype Comparisons

Given:

```js
function User() {}

const a = new User();
```

These are true:

```js
a.__proto__ === User.prototype;

User.__proto__ === Function.prototype;

User.prototype.__proto__ === Object.prototype;
```

But:

```js
User.prototype === Function.prototype; // false
```

---

# Instance vs Function Prototype Chain

## Instance

```text
a
 ↓ [[Prototype]]
User.prototype
 ↓ [[Prototype]]
Object.prototype
 ↓
null
```

## Constructor Function

```text
User
 ↓ [[Prototype]]
Function.prototype
 ↓ [[Prototype]]
Object.prototype
 ↓
null
```

These are different chains.

---

# Final Mental Model

Remember these four things:

```text
1. Object
   ↓
   Stores properties.

2. [[Prototype]]
   ↓
   Internal inheritance link.

3. .prototype
   ↓
   A property commonly found on constructor functions.

4. Prototype chain
   ↓
   The chain JavaScript searches during property lookup.
```

The most important distinction:

```text
User.prototype
      ≠
User.[[Prototype]]
```

For:

```js
function User() {}

const user = new User();
```

think:

```text
User
 ├── .prototype ─────→ User.prototype
 │                         ↑
 │                         │
 │                    user inherits
 │
 └── [[Prototype]] ──→ Function.prototype
```

---

# Next Topic: Asynchronous JavaScript

The next section of the deep dive will be:

```text
Synchronous JavaScript
        ↓
Call Stack
        ↓
JavaScript Runtime
        ↓
Web APIs
        ↓
Task / Callback Queue
        ↓
Event Loop
        ↓
Microtask Queue
        ↓
Promises
        ↓
async / await
```

Starting example:

```js
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");
```

The goal is to understand **why the output order happens**, not just memorize it.
