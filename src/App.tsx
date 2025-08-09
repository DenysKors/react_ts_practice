import "./App.css";

function App() {
  return <h1>Typescript practice with Codewars katas</h1>;
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

// KATA #1
/* 
[]-- > "no one likes this"
 ["Peter"]-- > "Peter likes this"
 ["Jacob", "Alex"]-- > "Jacob and Alex like this"
 ["Max", "John", "Mark"]-- > "Max, John and Mark like this"
 ["Alex", "Jacob", "Mark", "Max"]-- > "Alex, Jacob and 2 others like this";
 */

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

// KATA #2
/* 
Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.

Example createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
*/

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

// KATA #3
/*
In this little assignment you are given a string of space separated numbers, and have to return the highest and lowest number.
All numbers are valid Int32, no need to validate them.
There will always be at least one number in the input string.
Output string must be two numbers separated by a single space, and highest number is first.

Kata.HighAndLow("1 2 3 4 5"); // return "5 1"
*/

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

//KATA #4
/*
Usually when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct.
However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it.
Your task is to write a function maskify, which changes all but the last four characters into '*'.

"4556364607935616"-- > "*************5616";
"64607935616"-- > "*********5616";
"1"-- > "1";
""-- > "";
*/

function maskify(secret: string): string {
  const secretLength = secret.length;
  if (secretLength <= 4) return secret;

  const unmasked = secret.slice(-4);
  const maskedSecret = unmasked.padStart(secretLength, "*");
  return maskedSecret;
}

console.log(maskify("4556364607935616"));
console.log(maskify("64607935616"));
console.log(maskify("1"));

//KATA #5
/*
Complete the method / function so that it converts dash / underscore delimited words into camel casing.
The first word within the output should be capitalized only if the original word was capitalized(known as Upper Camel Case, also often referred to as Pascal case).
The next words should be always capitalized.

"the-stealth-warrior" gets converted to "theStealthWarrior"
"The_Stealth_Warrior" gets converted to "TheStealthWarrior"
"The_Stealth-Warrior" gets converted to "TheStealthWarrior"
*/

function camelCaseConverter(text: string): string[] | string {
  if (typeof text !== "string") return "Only strings required";
  const re = /[_-]/;
  const splittedText = text.split(re);
  const capitalizedStrArr = splittedText.map((text, idx) => {
    if (idx === 0) return text;
    else {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  });
  const convertedText = capitalizedStrArr.join("");
  return convertedText;
}

console.log(camelCaseConverter("the-stealth-warrior"));
console.log(camelCaseConverter("The_Stealth-Warrior"));

//KATA #6
/*
Create a function nextVersion, that will take a string in parameter, and will return a string containing the next version number.
All numbers, except the first one, must be lower than 10: if there are, you have to set them to 0 and increment the next number in sequence.

Current           ->  Next version
"1.2.3"           ->  "1.2.4"
"0.9.9"           ->  "1.0.0"
"1"               ->  "2"
"1.2.3.4.5.6.7.8" ->  "1.2.3.4.5.6.7.9"
"9.9"             ->  "10.0"
*/

function nextVersion(version: string): string | string[] {
  if (typeof version !== "string") return "Only strings required";
  if (version.length === 1) {
    const updateVersion = Number(version) + 1;
    return updateVersion.toString();
  }
  const versionReversArr = version.split(".").reverse();

  let increment = 0;

  const newRevArr = versionReversArr.map((value, idx, arr) => {
    if (idx === 0 && Number(value) === 9) {
      increment = 1;
      return "0";
    } else if (idx === 0 && Number(value) !== 9) {
      const newValue = Number(value) + 1;
      return newValue.toString();
    } else if (idx === arr.length - 1) {
      const newValue = Number(value) + increment;
      return newValue.toString();
    } else if (idx !== 0 && Number(value) !== 9) {
      const newValue = Number(value) + increment;
      increment = 0;
      return newValue.toString();
    } else if (idx !== 0 && Number(value) === 9 && increment === 1) {
      return "0";
    } else if (idx !== 0 && Number(value) === 9 && increment === 0)
      return value;
  });

  const nextVersion = newRevArr.reverse().join(".");
  return nextVersion;
}

console.log(nextVersion("10.1.5.9.9"));

//KATA #7
/*
Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence,
which is the number of times you must multiply the digits in num until you reach a single digit.

39 --> 3 (because 3*9 = 27, 2*7 = 14, 1*4 = 4 and 4 has only one digit, there are 3 multiplications)
999 --> 4 (because 9*9*9 = 729, 7*2*9 = 126, 1*2*6 = 12, and finally 1*2 = 2, there are 4 multiplications)
4 --> 0 (because 4 is already a one-digit number, there is no multiplication)
*/

function persistence(num: number): string | number {
  let numStringArr = num.toString().split("");

  if (numStringArr.length === 1) return 0;
  let counter = 0;

  while (numStringArr.length > 1) {
    const multiply = numStringArr.reduce(
      (accum, num) => accum * Number(num),
      1
    );
    numStringArr = multiply.toString().split("");
    counter += 1;
  }
  return counter;
}

console.log(persistence(999));

// KATA #8
/*
Your task is to sort a given string. Each word in the string will contain a single number. This number is the position the word should have in the result.
Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).
If the input string is empty, return an empty string. The words in the input String will only contain valid consecutive numbers.

"is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"
"4of Fo1r pe6ople g3ood th5e the2"  -->  "Fo1r the2 g3ood 4of th5e pe6ople"
""  -->  ""
*/

function sortWords(sentence: string): string {
  if (sentence.length === 0) return "";

  const re = /[1-9]/g;
  const foundNumArr = sentence.match(re);
  const stringArr = sentence.split(" ");
  const sortedArr = [];

  for (let i = 1; i <= stringArr.length; i += 1) {
    const matchIdx = foundNumArr?.indexOf(i.toString());
    if (typeof matchIdx !== "undefined") sortedArr.push(stringArr[matchIdx]);
  }
  const sortedSentence = sortedArr.join(" ");

  return sortedSentence;
}

console.log(sortWords("is2 Thi1s T4est 3a"));
console.log(sortWords("4of Fo1r pe6ople g3ood th5e the2"));

// KATA #9
/*
You are given a secret message you need to decipher. Here are the things you need to know to decipher it:
For each word:
  the second and the last letter is switched (e.g. Hello becomes Holle)
  the first letter is replaced by its character code (e.g. H becomes 72)
  there are no special characters used, only letters and spaces
  words are separated by a single space
  there are no leading or trailing spaces

'72olle 103doo 100ya' --> 'Hello good day'
'82yade 115te 103o'   --> 'Ready set go'
*/

function decryptMsg(msg: string): string | string[] {
  const re = /[0-9]/g;

  const stringArr = msg.split(" ").map((char) => {
    const foundNumber = char.match(re)?.join("");
    const charFromCode = String.fromCharCode(Number(foundNumber));
    const numLength = foundNumber?.length;
    return charFromCode + char.slice(numLength);
  });

  const replacedCharArr = stringArr.map((word) => {
    const splittedWord = word.split("");
    const charToSplit1 = word.charAt(splittedWord.length - 1);
    const charToSplit2 = word.charAt(1);

    splittedWord.splice(1, 1, charToSplit1);
    splittedWord.splice(splittedWord.length - 1, 1, charToSplit2);
    const joined = splittedWord.join("");
    return joined;
  });

  const joinedMsg = replacedCharArr.join(" ");
  return joinedMsg;
}

console.log(decryptMsg("72olle 103doo 100ya"));
console.log(decryptMsg("82yade 115te 103o"));

// KATA #10
/*
Define a class called Lamp. It will have a string attribute for color and boolean attribute, on, that will refer to whether the lamp is on or not. 
Define your class constructor with a parameter for color and assign on as false on initialize.
Give the lamp an instance method called toggle_switch that will switch the value of the on attribute.
Define another instance method called state that will return "The lamp is on." if it's on and "The lamp is off." otherwise.
*/

class Lamp {
  color: string;
  on: boolean;

  constructor(color: string) {
    this.color = color;
    this.on = false;
  }

  toggleSwitch() {
    this.on = !this.on;
  }

  get state() {
    const { on } = this;
    return `The lamp is ${on ? "On" : "Off"} now`;
  }
}

const lamp = new Lamp("green");
console.log(lamp);
lamp.toggleSwitch();
console.log(lamp.state);
lamp.toggleSwitch();
console.log(lamp.state);

// KATA #11
/*
Here's the deal:
  It must start with a hashtag (#).
  All words must have their first letter capitalized.
  If the final result is longer than 140 chars it must return false.
  If the input or the result is an empty string it must return false.
  " Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata"
"   Hello     World   "  =>  "#HelloWorld"
""  =>  false
 */

function createHashtag(text: string): string | boolean {
  const trimmedText = text.trim();
  if (trimmedText === "") return false;

  const splittedTextArr = trimmedText.split(" ");
  const separatedWords: string[] = [];

  splittedTextArr.forEach((char) => {
    if (char === "") return;

    const upCaseChar = char.charAt(0).toUpperCase() + char.slice(1);
    separatedWords.push(upCaseChar);
  });

  const joinedText = separatedWords.join("");
  const hashTagText = joinedText.padStart(joinedText.length + 1, "#");

  if (hashTagText.length > 140) return false;

  return hashTagText;
}

console.log(createHashtag("   hello     world   "));
console.log(createHashtag(" Hello there thanks for trying my Kata"));

// KATA #12
/*
Write a function that when given a URL as a string, parses out just the domain name and returns it as a string.
url = "http://github.com/carbonfive/raygun" -> domain name = "github"
url = "http://www.zombie-bites.com"         -> domain name = "zombie-bites"
url = "https://www.cnet.com"                -> domain name = cnet"
*/

function extractDomain(url: string): string | void {
  let removedProtocol = "";
  let domainStart = "";

  if (url.startsWith("https://")) {
    removedProtocol = url.slice(8);
  } else if (url.startsWith("http://")) {
    removedProtocol = url.slice(7);
  } else return "Url must starts with protocol";

  if (removedProtocol.startsWith("www")) {
    domainStart = removedProtocol.slice(4);
  } else domainStart = removedProtocol;

  const dotIdx = domainStart.search(/[.]/);
  const domainUrl = domainStart.slice(0, dotIdx);
  return domainUrl;
}

console.log(extractDomain("https://www.cnet.com"));
