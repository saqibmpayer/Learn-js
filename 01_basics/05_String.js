const Name = "saqib";

const repoCount = 50 ;

// console.log(Name + repoCount);

// console.log(`Hello my name is ${Name}  and my 
//     repo count is ${repoCount}` );


const gameName = new String("official-01"); // object

// console.log(gameName[0]); // o

// console.log(gameName.__proto__); //{}


// console.log(gameName.length);
// console.log(gameName.toLocaleUpperCase());

// console.log(gameName.charAt(7)); // l
// console.log(gameName.indexOf("l")); // 7

// console.log(gameName.substring(1,4)); // last not included


const anotherString = gameName.slice(-8, 5)

console.log(anotherString);

const newStringOne = " saqib     "
console.log(newStringOne);
console.log(newStringOne.trim());


const url = "saqib%20manzoor"

console.log(url.replace("%20","-"));


