// const tinderUser = new Object();
const tinderUser= {}


tinderUser.id = "12abc";
tinderUser.name = 'sammy';

tinderUser.isLoggedIn = false;

// console.log(tinderUser);



const regularUser = {
    email: "some@gmail.com",
    fullName:{
        userfullName : {
            firstName:"saqib",
            lastName: "choudary"
        }
    }
}
// console.log(regularUser?.fullName.userfullName.firstName);

const obj1 = {
    1 : "a",
    2:'b',
}
const obj2 = {
    3 : "c",
    4:'d',
}

// const obj3 = {obj1, obj2}

// obj3 = Object.assign({} ,obj1 , obj2)
// console.log(obj3);

// const obj3 = {...obj1 , ...obj2}

// console.log(obj3);

const users=[
    {
        id: 1,
        email: "h@user.com"
    },{

    },{

    }
]
// users[1].email

// console.log(Object.keys(tinderUser));

// console.log(Object.values(tinderUser));
// console.log(Object.entries(tinderUser));

console.log(tinderUser.hasOwnProperty('isLoggedIn'));
