import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

type PizzaType = {
  name: string;
  price: number;
};

type PizzaOrderType = {
  id: number;
  pizza: PizzaType;
  status: "ordered" | "completed";
};

const menu: PizzaType[] = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
];

let cashInRegister = 100;
let newOrderId = 0;
const orderQueue: PizzaOrderType[] = [];

function addNewPizza(name: string, price: number): void {
  const newPizza = { name, price };
  menu.push(newPizza);
  console.log(menu);
}

function placeOrder(pizzaName: string): PizzaType | void {
  const orderedPizza = menu.find((pizza) => pizza.name === pizzaName);

  if (!orderedPizza) return alert(`${pizzaName}  not found`);

  cashInRegister = cashInRegister + orderedPizza.price;
  newOrderId += 1;
  const newOrder: PizzaOrderType = {
    id: newOrderId,
    pizza: orderedPizza,
    status: "ordered",
  };

  orderQueue.push(newOrder);
  console.log(orderQueue);
  return orderedPizza;
}

function completeOrder(orderId: number): PizzaOrderType | void {
  const orderIdx = orderQueue.findIndex((order) => order.id === orderId);
  if (orderIdx === -1) return alert(`Order ${orderId} not found`);

  orderQueue[orderIdx].status = "completed";
  console.log(orderQueue[orderIdx]);
  return orderQueue[orderIdx];
}

addNewPizza("Four cheeses", 15);
placeOrder("Pepperoni");
placeOrder("Hawaiian");
placeOrder("Margherita");
completeOrder(2);
console.log(orderQueue);
console.log(cashInRegister);
