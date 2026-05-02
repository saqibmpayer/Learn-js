const user = {
    username : "saqib",
    loginCount : 8,
    signedin : true,


    getUserDetails: function(){
    console.log( `got ${this.username} Details From DataBase`);
      console.log(this)
    }
}

// console.log(user.username);

//console.log(user.getUserDetails());


// this => current context 


// const promiseOne = new Promise()

// const date = new Date();

function User(username , loginCount ,isLoggedIn){
    
    this.username = username;
    this.loginCount = loginCount;
    this.isLoggedIn = isLoggedIn;
    
    return this;
}


const userOne = new User("saqib" , 12 , true)

const userTwo = new User("BhaktRaj" ,11 , false )

console.log(userTwo);
