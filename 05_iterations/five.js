const coding = ["js" , "ruby","java" ]


// coding.forEach( function  (item) {
//     console.log(item);
// })

// coding.forEach((item) => {
//     console.log(item)})

// function printMe(item){
//     console.log(item);
// }

// coding.forEach(printMe) // Use refrence only

// coding.forEach((item , index , arr) => {
//     console.log(item , index, arr)})

const mycoding = [
    {
        langName : "javaScript",
        langFileName : "js"

    },
    {
        langName : "java",
        langFileName : "java"

    },
    {
        langName : "c++",
        langFileName : "cpp"

    }
]

mycoding.forEach((item) =>{
    console.log(item.langName)
})