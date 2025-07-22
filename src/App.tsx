import "./App.css";

function App() {
  return <h1>Typescript practice</h1>;
}

export default App;

type Pizza = {
  id: number;
  name: string;
  price: number;
};

type PizzaOrder = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
};

let cashInRegister = 100;
let newPizzaId = 0;
let newOrderId = 0;
const orderQueue: PizzaOrder[] = [];

const menu: Pizza[] = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
].map((pizza) => {
  newPizzaId += 1;
  return { ...pizza, id: newPizzaId };
});

// const menu: Pizza[] = [
//   { id: (newPizzaId += 1), name: "Margherita", price: 8 },
//   { id: (newPizzaId += 1), name: "Pepperoni", price: 10 },
//   { id: (newPizzaId += 1), name: "Hawaiian", price: 10 },
//   { id: (newPizzaId += 1), name: "Veggie", price: 9 },
// ];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  newPizzaId += 1;
  const newPizza: Pizza = { id: newPizzaId, ...pizzaObj };
  menu.push(newPizza);
  console.log(menu);
  return newPizza;
}

function placeOrder(pizzaName: string): Pizza | void {
  const orderedPizza = menu.find((pizza) => pizza.name === pizzaName);

  if (!orderedPizza) return alert(`${pizzaName}  not found`);

  cashInRegister = cashInRegister + orderedPizza.price;
  newOrderId += 1;
  const newOrder: PizzaOrder = {
    id: newOrderId,
    pizza: orderedPizza,
    status: "ordered",
  };

  orderQueue.push(newOrder);
  console.log(orderQueue);
  return orderedPizza;
}

function completeOrder(orderId: number): PizzaOrder | void {
  const orderIdx = orderQueue.findIndex((order) => order.id === orderId);
  if (orderIdx === -1) return alert(`Order ${orderId} not found`);

  orderQueue[orderIdx].status = "completed";
  console.log(orderQueue[orderIdx]);
  return orderQueue[orderIdx];
}

function getPizzaDetail(identifier: string | number): Pizza | undefined | void {
  if (typeof identifier === "string") {
    const pizzaFromMenu = menu.find(
      (pizza) => pizza.name.toLowerCase() === identifier.toLowerCase()
    );
    return pizzaFromMenu;
  } else if (typeof identifier === "number") {
    const pizzaFromMenu = menu.find((pizza) => pizza.id === identifier);
    return pizzaFromMenu;
  } else return alert("You can find pizza only by name or id");
}

addNewPizza({ name: "Four cheeses", price: 15 });
placeOrder("Pepperoni");
placeOrder("Hawaiian");
placeOrder("Margherita");
completeOrder(2);
console.log(getPizzaDetail(3));
console.log(getPizzaDetail("Veggie"));
console.log(orderQueue);

// CODEWARS KATAS

// []-- > "no one likes this"
// ["Peter"]-- > "Peter likes this"
// ["Jacob", "Alex"]-- > "Jacob and Alex like this"
// ["Max", "John", "Mark"]-- > "Max, John and Mark like this"
// ["Alex", "Jacob", "Mark", "Max"]-- > "Alex, Jacob and 2 others like this";

function showWhoLiked(names: string[]): string {
  const namesLength = names.length;

  if (namesLength === 0) return "No one likes this";
  else if (namesLength === 1) return `${names[0]} likes this`;
  else if (namesLength === 2) return `${names[0]} and ${names[1]} like this`;
  else if (namesLength === 3)
    return `${names[0]}, ${names[1]} and ${names[2]} like this`;
  else {
    const othersLeft = namesLength - 2;
    return `${names[0]}, ${names[1]} and ${othersLeft} othres like this`;
  }
}

console.log(showWhoLiked([]));
console.log(showWhoLiked(["Peter"]));
console.log(showWhoLiked(["Jacob", "Alex"]));
console.log(showWhoLiked(["Max", "John", "Mark"]));
console.log(showWhoLiked(["Alex", "Jacob", "Mark", "Max"]));
console.log(
  showWhoLiked(["Alex", "Jacob", "Mark", "Max", "Max", "Max", "Max", "Max"])
);

// Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.
// Example createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"

function createPhoneNumber(digits: number[]): string | Error {
  const amountOfDigits = digits.length;
  if (amountOfDigits !== 10) return "Must contain 10 digits";

  for (let i = 0; i < amountOfDigits; i += 1) {
    if (!Number.isInteger(digits[i])) return "Must be an integer";
  }

  const phoneNumber = `(${digits[0]}${digits[1]}${digits[2]}) ${digits[3]}${digits[4]}${digits[5]}-${digits[6]}${digits[7]}${digits[8]}${digits[9]}`;
  return phoneNumber;
}

console.log(createPhoneNumber([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));
console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));

// In this little assignment you are given a string of space separated numbers, and have to return the highest and lowest number.
// Kata.HighAndLow("1 2 3 4 5"); // return "5 1"

// All numbers are valid Int32, no need to validate them.
// There will always be at least one number in the input string.
// Output string must be two numbers separated by a single space, and highest number is first.

function highAndLowNumber(numbers: string): string {
  const splittedArr = numbers.split(" ");
  const highNumber = splittedArr.reduce((prevNumber, number) => {
    if (Number(prevNumber) > Number(number)) return prevNumber;
    else return number;
  });

  const lowNumber = splittedArr.reduce((prevNumber, number) => {
    if (Number(prevNumber) < Number(number)) return prevNumber;
    else return number;
  });
  return `${highNumber} ${lowNumber}`;
}

console.log(highAndLowNumber("1 2 3 4 5"));
console.log(highAndLowNumber("1 9 3 4 -5"));
console.log(highAndLowNumber("1"));

// Usually when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct.
// However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it.
// Your task is to write a function maskify, which changes all but the last four characters into '#'.
// "4556364607935616"-- > "############5616";
// "64607935616"-- > "#######5616";
// "1"-- > "1";
// ""-- > "";
