// // let myName = "Saqib      ";




// // console.log((myName.length));


// let myHeros = ["thor" , "spiderman"];


// let heroPower = {

//     thor : "hammer",
//     spiderman : "sling",

//     getSpiderPower : function(){
//         console.log(`spider power is ${this.spiderman}`);
        
//     }
// }

// Object.prototype.hitesh = function(){
//     console.log(`Hitsh is present in all objects`);
    
// }

// // heroPower.hitesh( )


// // myHeros.hitesh()


// Array.prototype.heyHitesh = function(){
//     console.log(`Saqib says Hello `);
    
// }

// myHeros.hitesh();
// myHeros.heyHitesh();

// // heroPower.heyHitesh(); has not access 


// // INHERITACE 


// const User = {
//        name : "Saqib",
//        email : 'saqib@gmail.com'

// }

// const Teacher = {
//     makeVideo : true,
// }


// const TeachingSupport = {
//     isAvailable = false

// }

// const TASupport = {
//     makeAssignment : "Js Assignment",
//     fulltime : true,

//     __proto__:TeachingSupport
// }

// Teacher.__proto__ = User;


// Object.setPrototypeOf(TeachingSupport , Teacher)



 let anotherUsername = 'Chaiaurcode       '


String.prototype.trueLength = function(){
    console.log( `${this}`)
    
    console.log(`true Lenght is: ${this.trim().length}`);
    
}

// anotherUsername.trueLength();

"saqib".trueLength();