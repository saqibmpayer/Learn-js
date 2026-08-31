# JavaScript Deep-Dive Revision Notes

## 1. Object References

Primitive values are compared by value:

const a = 10;
const b = 10;

console.log(a === b); // true

Objects are compared by reference:

const a = { x: 10 };
const b = { x: 10 };

console.log(a === b); // false

They are two different objects.

But:

const a = { x: 10 };
const b = a;

console.log(a === b); // true

Both variables point to the same object.

### Key Rule

> Primitive → compared by value  
> Object → compared by reference


---

# 2. `const` with Objects

`const` prevents reassignment of the variable.

const user = {
    name: "Alex"
};

This is NOT allowed:

user = {}; // Error

But modifying the object is allowed:

user.name = "Bob";

Why?

Because the reference cannot change:

user ─────→ Object #1

But the contents of Object #1 can change.


---

# 3. Hoisting

Hoisting is the behavior where JavaScript processes declarations during the creation/setup phase of an execution context before executing the code.

It does NOT literally move the code to the top.

Example:

console.log(x);

var x = 10;

Output:

undefined

Conceptually:

var x;

console.log(x);

x = 10;

### Important

> Hoisting is handled by the JavaScript engine through execution-context creation.


---

# 4. `var`, `let`, and `const`

## `var`

`var` is function-scoped.

function test() {
    var x = 10;
}

console.log(x); // ReferenceError

But it is not block-scoped:

if (true) {
    var x = 10;
}

console.log(x); // 10


## `let`

`let` is block-scoped.

if (true) {
    let x = 10;
}

console.log(x); // ReferenceError


## `const`

`const` is also block-scoped.

if (true) {
    const x = 10;
}

console.log(x); // ReferenceError


---

# 5. Temporal Dead Zone (TDZ)

`let` and `const` are hoisted, but they are not initialized immediately.

Example:

console.log(x);

let x = 10;

Result:

ReferenceError

The time between entering the scope and initializing `x` is called the:

> Temporal Dead Zone (TDZ)

Conceptually:

Scope begins
    ↓
x exists but is uninitialized
    ↓
TDZ
    ↓
let x = 10
    ↓
x initialized


### Important

`var`:

var x;
console.log(x); // undefined

`let`:

console.log(x); // ReferenceError
let x = 10;


---

# 6. Execution Context

JavaScript creates an execution context when executing code.

There is a:

- Global Execution Context
- Function Execution Context

Example:

let x = 10;

function test() {
    let y = 20;
}

test();

Conceptually:

Global Execution Context
        ↓
calls test()
        ↓
Function Execution Context


Each function call gets its own execution context.


---

# 7. Lexical Environment

A lexical environment stores variables and has a connection to the outer environment.

Example:

let x = 10;

function test() {
    let y = 20;

    console.log(x);
}

Conceptually:

test Lexical Environment
    |
    ├── y → 20
    |
    └── outer
          ↓
    Global Lexical Environment
          |
          └── x → 10


If JavaScript cannot find a variable locally, it searches outward.


---

# 8. Closures

A closure happens when a function remembers/accesses variables from its surrounding lexical environment.

Example:

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


The inner function still has access to `count`.

Conceptually:

counter
   ↓
inner function
   ↓
remembers
   ↓
createCounter lexical environment
   ↓
count


### Important

The execution context itself is not simply "alive forever".

The important idea is:

> The returned function keeps the lexical environment it needs reachable.


---

# 9. `this`

For a regular function, `this` depends mainly on how the function is called.

Example:

const user = {

    name: "Alex",

    greet() {
        console.log(this.name);
    }
};

user.greet();

Here:

this → user

Output:

Alex


### Key Rule

> For a regular function, look at how it is called to determine `this`.


---

# 10. Method Call

Example:

const user = {

    name: "Alex",

    greet() {
        console.log(this.name);
    }
};

user.greet();

The object before the dot becomes `this`:

user.greet()
    ↑
    |
  this


So:

this → user


---

# 11. Arrow Functions and `this`

Arrow functions do not create their own `this`.

They inherit `this` from the surrounding lexical scope.

Example:

const user = {

    name: "Alex",

    greet: () => {
        console.log(this.name);
    }
};


### Key Rule

Regular function:

> `this` depends on the call.

Arrow function:

> `this` comes from the surrounding scope.


---

# 12. Prototype

A prototype is an object that another object can inherit properties and methods from.

Example:

const parent = {
    x: 10
};

const child = Object.create(parent);

console.log(child.x); // 10


`child` does not have its own `x`.

JavaScript looks at its prototype:

child
 ↓
parent
 └── x → 10


---

# 13. `[[Prototype]]`

`[[Prototype]]` is the internal prototype link of an object.

Example:

child
 ↓ [[Prototype]]
parent
 ↓ [[Prototype]]
Object.prototype
 ↓
null


When JavaScript doesn't find a property on an object, it follows this link.


---

# 14. `__proto__`

`__proto__` allows access to an object's prototype.

Example:

const parent = {};

const child = Object.create(parent);

console.log(child.__proto__ === parent); // true


Modern code generally prefers:

Object.getPrototypeOf(child);


---

# 15. `.prototype` vs `[[Prototype]]`

This is one of the MOST IMPORTANT concepts.

Given:

function User() {}


There are two different relationships:

User
 |
 ├── .prototype
 │       ↓
 │   User.prototype
 │
 └── [[Prototype]]
         ↓
    Function.prototype


### `.prototype`

`.prototype` is a property commonly found on constructor functions.

Example:

User.prototype


### `[[Prototype]]`

`[[Prototype]]` is the internal inheritance link of an object.


### Remember

> `.prototype` is a property.

> `[[Prototype]]` is the inheritance link.


---

# 16. Functions Are Objects

Functions are callable, but they are also objects.

Example:

function User() {}

User.name;
User.length;
User.prototype;


The function itself has a prototype chain:

User
 ↓ [[Prototype]]
Function.prototype
 ↓
Object.prototype
 ↓
null


---

# 17. Prototype Chain

The prototype chain is the sequence JavaScript searches when looking for a property.

Example:

const grandParent = {
    x: 10
};

const parent = Object.create(grandParent);

parent.y = 20;

const child = Object.create(parent);

child.z = 30;


Chain:

child
 ↓
parent
 ↓
grandParent
 ↓
Object.prototype
 ↓
null


Therefore:

child.x; // 10
child.y; // 20
child.z; // 30


For:

child.x

JavaScript searches:

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


### Key Rule

> JavaScript stops at the first matching property.


---

# 18. Property Shadowing

Shadowing occurs when an object has the same property as its prototype.

Example:

const parent = {
    name: "Parent"
};

const child = Object.create(parent);

console.log(child.name); // Parent

child.name = "Child";

console.log(child.name);  // Child
console.log(parent.name); // Parent


Now:

child
 ├── name → "Child"
 |
 ↓ [[Prototype]]
parent
 └── name → "Parent"


The child's property shadows the parent's property.


### Important

Reading:

child.name

searches the prototype chain.

Assigning:

child.name = "Child"

creates/updates the property on `child`.


---

# 19. Prototype Method + `this`

Example:

const parent = {

    name: "Parent",

    greet() {
        console.log(this.name);
    }
};

const child = Object.create(parent);

child.name = "Child";

child.greet();


JavaScript finds `greet` here:

child
 ↓
parent
 └── greet


But the call is:

child.greet();


Therefore:

this → child

Output:

Child


### Important

> Where the method is found does NOT determine `this`.

> How the method is called determines `this`.


---

# 20. `Object.create()`

Example:

const parent = {
    x: 10
};

const child = Object.create(parent);


This creates:

child
 ↓ [[Prototype]]
parent


It is a direct way to create prototype inheritance.


---

# 21. `Object.create(null)`

Example:

const obj = Object.create(null);

obj.name = "Alex";

console.log(obj.name);     // Alex
console.log(obj.toString); // undefined


Chain:

obj
 ↓
null


There is no `Object.prototype`.


---

# 22. Constructor Functions

Before classes, JavaScript commonly used constructor functions.

Example:

function User(name) {
    this.name = name;
}

const user = new User("Alex");


The instance gets this prototype:

user
 ↓ [[Prototype]]
User.prototype
 ↓
Object.prototype
 ↓
null


---

# 23. Prototype Methods

Methods can be stored on the prototype.

function User(name) {
    this.name = name;
}

User.prototype.sayHello = function () {
    console.log("Hello " + this.name);
};


Then:

const a = new User("Alex");
const b = new User("Bob");


Both instances use the same function:

a.sayHello === b.sayHello; // true


Conceptually:

a ─────────┐
           ↓
     User.prototype
           |
           └── sayHello → SAME FUNCTION
           ↑
b ─────────┘


This avoids creating a separate function for every object.


---

# 24. Prototype Inheritance

Example:

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


Chain:

dog
 ↓
Dog.prototype
 ↓
Animal.prototype
 ↓
Object.prototype
 ↓
null


Therefore:

dog.bark();  // Woof!
dog.speak(); // Bruno makes a sound


For `dog.speak()`:

dog
 ↓
Dog.prototype
 ↓
Animal.prototype
 └── speak → found


---

# 25. Method Overriding

A child can define a method with the same name as the parent.

Dog.prototype.speak = function () {
    console.log("Woof!");
};


Now:

dog
 ↓
Dog.prototype
 └── speak() → Dog version
 ↓
Animal.prototype
 └── speak() → Animal version


The Dog version is found first.

Therefore it is used.


---

# 26. `constructor` Property

Normally:

function Dog() {}


has:

Dog.prototype.constructor === Dog; // true


Conceptually:

Dog.prototype
 ├── constructor → Dog


But if we do:

Dog.prototype = Object.create(Animal.prototype);


The new prototype doesn't have its own constructor.

JavaScript searches upward:

Dog.prototype
 ↓
Animal.prototype
 └── constructor → Animal


Therefore:

Dog.prototype.constructor === Animal; // true


You can restore it:

Dog.prototype.constructor = Dog;


Then:

Dog.prototype.constructor === Dog; // true


### Important

> `constructor` is just a property.

It can be found through the prototype chain.

It does NOT guarantee the actual object was created by that constructor.


---

# 27. Instance vs Function Prototype Chains

Given:

function User() {}

const a = new User();


## Instance `a`

a
 ↓ [[Prototype]]
User.prototype
 ↓
Object.prototype
 ↓
null


## Function `User`

User
 ↓ [[Prototype]]
Function.prototype
 ↓
Object.prototype
 ↓
null


These are different chains.


---

# 28. `User.prototype` Is NOT `User`'s Prototype

This is a classic JavaScript trap.

function User() {}


Conceptually:

User
 |
 ├── .prototype ─────→ User.prototype
 |
 └── [[Prototype]] ──→ Function.prototype


Therefore:

User.prototype === Function.prototype; // false

User.__proto__ === Function.prototype;  // true


And:

User.prototype.__proto__ === Object.prototype; // true


---

# 29. `class`

JavaScript classes are built on top of the prototype system.

Example:

class User {

    constructor(name) {
        this.name = name;
    }

    sayHello() {
        console.log("Hello " + this.name);
    }
}

const user = new User("Alex");


Conceptually:

user
 ↓
User.prototype
 ├── constructor
 └── sayHello


The method is stored on the prototype.


---

# 30. Class Methods Are Shared

Example:

class User {

    sayHello() {
        console.log("Hello");
    }
}

const a = new User();
const b = new User();

console.log(a.sayHello === b.sayHello); // true


Both objects use the same prototype method.


---

# 31. `extends`

Example:

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


Conceptually:

Dog.prototype
 ↓
Animal.prototype
 ↓
Object.prototype
 ↓
null


Therefore:

const dog = new Dog();

dog.bark();  // Woof
dog.speak(); // Animal sound


---

# 32. `super`

`super` can access the parent implementation.

Example:

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


Output:

dog
animal


Why?

The Dog method runs first:

console.log("dog");


Then:

super.speak();


calls the parent method:

Animal.prototype.speak()


---

# 33. `super()` in Constructors

`super()` can call the parent constructor.

Example:

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


Execution:

new Dog("Bruno")
      ↓
Dog constructor
      ↓
super("Bruno")
      ↓
Animal constructor
      ↓
this.name = "Bruno"


In a derived constructor, you generally must call `super()` before using `this`.


---

# 34. Complete Prototype Mental Model

Remember these separately:

## Object

const a = {};


Stores properties.


## `[[Prototype]]`

The object's internal inheritance link.

a
 ↓
Object.prototype


## `.prototype`

A property commonly found on constructor functions.

User.prototype


Instances created using:

new User()

use:

User.prototype


## Prototype Chain

The sequence created by following `[[Prototype]`]:

instance
 ↓
Constructor.prototype
 ↓
Object.prototype
 ↓
null


---

# 35. Most Important Rules

1. Functions are objects.

2. `.prototype` is a property.

3. `[[Prototype]]` is an internal inheritance link.

4. JavaScript searches the prototype chain when a property isn't found.

5. The first matching property wins.

6. The prototype chain ends at `null`.

7. For regular functions, `this` depends on how the function is called.

8. `User.prototype` is NOT the same thing as `User.__proto__`.

9. Classes are built on top of prototypes.

10. `extends` creates inheritance between class prototypes.

11. `super` allows access to parent behavior.

12. Methods defined on a class are normally shared through the prototype.


---

# 36. Quick Prototype Diagram

For:

function User() {}

const user = new User();


The instance:

user
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null


The function:

User
 ↓
Function.prototype
 ↓
Object.prototype
 ↓
null


And:

User
 |
 ├── .prototype → User.prototype
 |
 └── [[Prototype]] → Function.prototype


---

# 37. JavaScript Topics Covered So Far

- Object references
- Primitive equality
- `===`
- `const`
- Object mutation
- Reassignment
- Hoisting
- `var`
- `let`
- `const`
- Function scope
- Block scope
- TDZ
- Execution context
- Lexical environment
- Closures
- `this`
- Regular functions
- Arrow functions
- Prototypes
- `[[Prototype]]`
- `__proto__`
- `.prototype`
- Prototype chain
- Property lookup
- Property shadowing
- `Object.create()`
- `Object.create(null)`
- Constructor functions
- `new`
- Prototype methods
- Prototype inheritance
- Method overriding
- `constructor`
- Classes
- `extends`
- `super`


---

# 38. Next Topic: Asynchronous JavaScript

Next we move into:

Synchronous JavaScript
        ↓
Call Stack
        ↓
JavaScript Runtime
        ↓
Web APIs
        ↓
Callback / Task Queue
        ↓
Event Loop
        ↓
Microtask Queue
        ↓
Promises
        ↓
async / await


Starting example:

console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");


The goal is not just to memorize the output.

We will understand exactly:

- What goes into the Call Stack
- What `setTimeout()` does
- Why `0ms` does NOT mean "execute immediately"
- What the Web APIs/runtime does
- What the callback queue is
- What the Event Loop does
- Why Promise callbacks behave differently
- Microtasks vs macrotasks/tasks
- How `async/await` works
