// Dates

let myDate = new Date();
 
// console.log(myDate.toString()); Sun Apr 26 2026 21:50:37 GMT+0000 (Coordinated Universal Time)
// console.log(myDate.toLocaleDateString()); 4/26/2026 

// console.log(myDate.toLocaleString()); 4/26/2026, 9:50:37 PM

// let myCreatedDate = new Date(2023 , 0 , 23);
// let myCreatedDate = new Date(2023 , 0 , 23 , 5 , 3);

let myCreatedDate = new Date("2023-01-14");
// console.log(myCreatedDate.toLocaleString());

let mytimeStamp = Date.now();

// console.log(mytimeStamp);
// console.log(myCreatedDate.getTime());

// console.log(Math.floor((Date.now()) / 1000));  // in seconds


const newDate = new Date();
newDate.toLocaleString('default', {
    weekday:"long",
   
})