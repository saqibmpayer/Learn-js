// primitive datatypes

// 7 types:-> string ,   number , boolean , null
// undefined , symbol   , Bigint

// 
const id = Symbol("123");
const anotherId = Symbol("123") // both different 



// REFRENCE TYPE/ NON- PRIMITIVE

//  Arrays, Objects ,functions

const heros = [ "shaktiman " , 'naagraj ' , " doga"];

let obj = {
    name: "saqib", 
    age: 22,
}

let myfxn = function(){
    console.log("Hell0 world")
}

// +++++++++++++++++++++++++++++++++++++++++++

// Stack(primitive) , Heap(Non Primitive) 

let youtube = " official ";

let anotheryoutube = youtube;
console.log(anotheryoutube);

anotheryoutube = " offficial change"
console.log(anotheryoutube);
console.log(youtube);


let UserOne = {
    name: 'saqib',
    upiId: "aaa@ybl"
}

let Usertwo = UserOne;

Usertwo.name= "name_changed"

console.log(UserOne.name);
