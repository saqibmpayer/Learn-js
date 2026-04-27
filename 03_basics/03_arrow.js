const user = {
    username: "saqib",
    price : 999,

    welcomemessage:function(){
     console.log(`${this.username} ,welcome to website`);
      console.log(this)
    }

    
}
// user.welcomemessage()

// user.username = "sam"
// user.welcomemessage()

// console.log(this);


// function chai(){
//     let username = "saqib"
//     console.log(this); //this.username =>undefined
    
// }
// chai()


// const chai=()=>{
//     let username = "saqib"
//     console.log(this);
    
// }
// chai();

// const addTwo = (num1 , num2)=>{
//     return num1+num2
// }
// const addTwo = (num1 , num2) => (num1 + num2);


const addTwo = (num1 , num2) => ({user:"saqib"});

console.log(addTwo(3 , 4));
