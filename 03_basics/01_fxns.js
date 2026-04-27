 function sayMyname (){
    console.log('S');
    console.log('A');
    console.log('Q');
    console.log('I');
    console.log("B");
    
 }

//  sayMyname();


// function addTwoNumbers(Num1 , Num2){
//   console.log(  Num1 + Num2);  // parameters
  
// }
// function addTwoNumbers(Num1 , Num2){
//   let result = (  Num1 + Num2);  // parameters

//   return result;
  
// }

// const result = addTwoNumbers(3, "a") // Arguments

// console.log("Result:"  , result);


function loginUserMessage(username = "sam"){
    if( !username){
        console.log("Please enter username");
        return
    }

    return `${username} just logged in`
}

// console.log(loginUserMessage("Saqib"));
// console.log(loginUserMessage()); // undefined just logged in
  

function calculateCartPrice(val1 , val2 ,...num1){ // REST OPERATOR
    return num1;
}

// console.log(calculateCartPrice(200 , 500 , 700 , 20000));


const user={
 username: "Saqib",
 price: 199
}
function handleObject(anyobject){
  console.log(`UserName is ${anyobject.username} and price is ${anyobject.price}`);
  
}

// handleObject(user)

handleObject({
    username:'sam',
    price: 33
})