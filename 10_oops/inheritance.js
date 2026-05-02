class User{
    constructor(username){

        this.username = username
    }

    LogMe(){
        console.log(`username is  by ${this.username}`)
    }
}


class Teacher  extends User{
     constructor(username , email , password){

        super(username);
        this.email = email;
        this.password = password ;
     }

      addCousrse(){
        console.log(`A new course was Added ${this.username}`);
        
      }


       
}
const chai = new Teacher("saqib" , "user@gmial" , "123")

      chai.addCousrse()