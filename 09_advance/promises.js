// const promiseOne = new Promise(function(resolve , reject){
//     // Do an async task

//     setTimeout(()=>{
//         console.log("Async task is complete");
//          resolve()
//     },1000)
// })

// promiseOne.then(function(){
// console.log("Promise Consumed");

// })

// new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         console.log("Async task two");
//         resolve();
//     },1000)
// }).then(()=>{
//     console.log("Async 2 resolved");
    
// })

// const promiseThree = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//             resolve({
//         username : "saqib" ,
//         email : "saqib@gmail.com"

//     })
//     },1000)

// })

// promiseThree.then((user)=>{
//   console.log(user);
  
// })
// const promiseFour = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//             let error = false;
//             if (error) {
//                             resolve({
//         username : "saqib" ,
//         email : "saqib@gmail.com"

//     })
//             }

//             else{
//                 reject("Error someThing Went Wrong")
//             }

//     },1000)}
// )

// promiseFour.
// then((user) =>{
//    console.log(user);
//    return user.username;
   
// }).
// then((username)=>{
//     console.log(username)
// }).
// catch(function(error){
//     console.log(error)
// }).finally(()=>{
//     console.log("the promise is either rejected or resolved");
// })

// const promiseFive = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//             let error = true;
//             if (error) {
//                             resolve({
//         username : "js" ,
//         password : "123"

//     })
//             }

//             else{
//                 reject("Error: js Went Wrong")
//             }

//     },1000)}
// )

// async function consumePromiseFive(){

//  try {
//        const response = await promiseFive

//     console.log(response);
//  } catch (error) {
//       console.log(error)
      
//  }
    
    
// }

// consumePromiseFive()




// async function getAllUsers(){
//    try{
//      const response = await fetch('https://jsonplaceholder.typicode.com/users')

//     const data=  await response.json();

//     console.log(data);
    
//    }
//    catch(error){
//   console.log("error");
  
//    }

// }

//  getAllUsers()


fetch('https://jsonplaceholder.typicode.com/users')
.then( (res) => {
  return res.json()
})
.then((data) => {
    console.log(data)
})
.catch((error) => {

    console.log('ERROR');
    
})