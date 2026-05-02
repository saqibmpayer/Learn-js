

function SetUserName(username){
 /// Complex Db calls
    this.username = username
}

function createUser(username ,email , password){

    SetUserName.call(this , username)

    
    this.email = email;

    this.password = password;
}


const chai = new createUser("saqib" , "user@gmail.com" ,"123")


console.log(chai);
