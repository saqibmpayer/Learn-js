const marvel_heros = ["thor" , "ironman" ,"spiderman"]
const dc = ['superman' , 'Batman' , "flash"]



// marvel_heros.push(dc)
// console.log(marvel_heros);
// console.log(marvel_heros[3][2]);

// const allHeros =marvel_heros.concat(dc);
//  console.log(allHeros);

const allNewHeros = [...marvel_heros , ...dc] // Spread operator



// console.log(allNewHeros);

const anotherArray = [1 , 2, [3, 4, 5] , 6 ,[ 7 , 8,[9 ,10]]];

const real_another_Array =  anotherArray.flat(Infinity);
// console.log(real_another_Array);

// console.log(Array.isArray("Saqib"));

// console.log(Array.from("Saqib"));


// console.log(Array.from({Name:"saqib",})) ;  // [ 'S', 'a', 'q', 'i', 'b' ]
// []intresting case
let s1 = 100;
let s2 = 200;
let s3 = 300;
 
let s4 = Array.of(s1 , s2 ,s3)
console.log(s4);
