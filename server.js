// Import Express
const express = require("express");

// Create an express app
const app = express();

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>")
// });
// Define routes here

// 1. Be polite, Greet the User

app.get("/greetings", (req, res) => {
  res.send(`<h1>Oh my goodness, it's you! It has been ages since we have
     seen each other!</h1?`);
});

app.get("/greetings/:userName", (req, res) => {
  let upperCaseLetter = req.params.userName.substring(0, 1).toUpperCase();
  let lowerCaseLetters = req.params.userName.substring(1, req.params.userName.length);
  let capitalizedName = upperCaseLetter + lowerCaseLetters; 
  res.send(`<h1>Hola ${capitalizedName}! It has been so long since we 
    last saw each other!</h1>`);
});



// 2. Rolling the direction: 

app.get("/roll/:number", (req, res) => {
  let number = parseInt(req.params.number);
  if (isNaN(number)) {
    res.send("<h1>You must specify a number!</h1>")
  } else {
    let randomNumber = Math.floor(Math.random() * (number));
    res.send(`<h1>You rolled a(n) ${randomNumber}.</h1>`);
  }
});

// 3. I Want THAT One!

// data array
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get("/collectibles/:index", (req, res) => {
  let index = parseInt(req.params.index);
  if (index >= 0 && index <= 2) {
  let item = collectibles[index].name;
  let price = collectibles[index].price;
    res.send(`<h1>So, you want the ${item}? For ${price},
      it can be yours!</h1>`)
  } else {
    res.send("<h1>This item is not yet in stock. Check back soon!</h1>")
  }
  
  console.log(req.params.index);
  res.send(`<h1>${req.params.index}</h1>`)
})

// 4. Filter Shoes by Query Parameters

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get("/shoes", (req, res) => {
  
  let minPrice = req.query.minprice;
  let maxPrice = req.query.maxprice;
  let type = req.query.type

  let filteredShoes = shoes;

  if (minPrice) {
    minPrice = parseFloat(minPrice);
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }

  if (maxPrice) {
    maxPrice = parseFloat(maxPrice);
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }

  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }

  res.json(filteredShoes);


});


// Listen for requests on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000")
});

