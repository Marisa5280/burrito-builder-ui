const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error("Error fetching:", err));
};

const postNewOrder = (order) => {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
};

export { getOrders, postNewOrder };
