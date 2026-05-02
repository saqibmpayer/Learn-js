// ES 6


class user{
    constructor(username , email , password){
        this.username = username;

        this.email = email;
        this.password = password;

    }
    encryptPassword(){
        return `${this.password}abc`
    }
    changeusername(){
        return `${this.username.toUpperCase()}`
    }
}

const chai = new user('saqib' ,'user@gmail.com' , "123")


// console.log(chai.encryptPassword())
// console.log(chai.changeusername())



