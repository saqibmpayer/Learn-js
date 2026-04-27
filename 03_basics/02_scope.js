

// var c = 300;
// let a = 100;
// if (true) {
// let a = 10 ;
// const b = 30 ;
// c = 40;
// console.log("INNER: " , a); // 100
// }



// console.log(a); // 100

function one(){
    const username = "Saqib"

    function two(){
         const website = "youtube"
    
         console.log(username);
         
    }

    //  console.log(website);
     two()

}

// one();

// INTRESTING ++++++++++++++++++++++

console.log(addOne(5))
function addOne(num){
    return num+1;

}

//HOISTING
//  addTwo(5)  // ERROR
// const addTwo = function(num){
//     return num + 2;
// }
