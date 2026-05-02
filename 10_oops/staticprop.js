class User {
     constructor(username){
     this.username = username;


     }

    logMe(){
        console.log(`username : ${this.username}`);
        
    }

     static createId(){
        return `123`;
        
     }
     
}

const saqib = new User('saqib')

console.log(saqib.createId())  // dont give access]