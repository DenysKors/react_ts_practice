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
console.log(cashInRegister);
