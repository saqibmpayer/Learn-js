const User = {
    _email : "s@sc.com",
    _password : "1234",
   
    get email(){
      return this._email.toUpperCase()
    },
    set email(value){
        this._email = value;
    }


}

const saqib = Object.create(User)

console.log(saqib.email);
