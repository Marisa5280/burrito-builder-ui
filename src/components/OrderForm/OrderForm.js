import { useState } from "react";

function OrderForm({ orders, setOrders, postNewOrder }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (name && ingredients.length) {
      const newOrder = {
        name: name,
        ingredients: ingredients,
      };
      postNewOrder(newOrder);
      setOrders([...orders, newOrder]);
      clearInputs();
      setErrorMsg("");
    } else {
      setErrorMsg("Please enter a name and select ingredient(s) to order.");
    }
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  }

  function addIngredient(ingredient) {
    if (!ingredients.length) {
      setIngredients([ingredient]);
    } else if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient, index) => {
    return (
      <button
        key={`${ingredient}-${index}`}
        name={ingredient}
        value={ingredient}
        onClick={(e) => {
          e.preventDefault();
          addIngredient(ingredient);
        }}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      {errorMsg && <p>{errorMsg}</p>}

      <button className="submit-button" onClick={(e) => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  );
}

export default OrderForm;
