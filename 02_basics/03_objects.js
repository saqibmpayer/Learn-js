// singleton

// object literals
//object.create  


const mySym = Symbol("key1");
const mySym2 = Symbol("key2");
const jsUser = {
    Name: "Saqib",  // Name as string
    age : "18",
    [mySym]: "myKey1", // shiould be decleared before
    location:"sgr",
    email: "user@gmail.com",
    isLoggedIn: false,
    
}

// console.log(jsUser.email);
// console.log(jsUser["email]);

// console.log(jsUser[mysym]);
// console.log(jsUser[mySym]); 

// jsUser.email = 'user@google.com'

// Object.freeze(jsUser);
// jsUser.email = 'user@scaler.com'

// console.log(jsUser);

jsUser.greeting = function(){
    console.log("hello Js User");
    
}
jsUser.greetingTwo = function(){
    console.log(`hello Js User,${this.Name}`);
    
}


console.log(jsUser.greeting());
console.log(jsUser.greetingTwo());