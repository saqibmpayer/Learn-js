// const  descripter = Object.getOwnPropertyDescriptor(Math ,"PI");

// // console.log(Math.PI);   math.pi = 5 ; not overridden

// console.log(descripter);

const saqib = {
     name: 'saqib',
     price : 250,
     isAvailable: true
}


console.log(Object.getOwnPropertyDescriptor(saqib , "name"));
// {
//   value: 'saqib',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }/


Object.defineProperty(saqib , "name" , {
     writable: false,
  enumerable: false,
})

console.log(Object.getOwnPropertyDescriptor(saqib , "name"));

// value: 'saqib',
//   writable: false,
//   enumerable: false,
//   configurable: true/