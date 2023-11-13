import { useEffect, useState } from "react";
import "./App.css";
import { getOrders, postNewOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState(null)

  useEffect(() => {
  getOrders().then((data) => setOrders(data.orders));
  }, []);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm orders={orders} setOrders={setOrders} postNewOrder={postNewOrder} />
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
