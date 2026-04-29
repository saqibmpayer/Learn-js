// const Mynums = [1 ,2 , 3, 4 , 5]

// const myTotal = Mynums.reduce((acc , curval) => (
//     console.log(acc),
//     acc + curval),0)

// console.log(myTotal);

const shoppingCart = [
    {
        itmeName: "js course",
        price: 299
    },
    {
        itmeName: "js course",
        price: 299
    },
    {
        itmeName: "python",
        price: 399
    },
    {
        itmeName: "mobile dev",
        price: 12999
    },
]

const priceTOPay = shoppingCart.reduce( (acc ,item) => (acc + item.price),0)

console.log(priceTOPay);
