import React, { useState } from "react";

function ItemForm({onAddItem}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e){
    e.preventDefault()
    //console.log("name:", name)
    //console.log("category:", category)
    //create the object that holds a new item with appropriate keys
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    }
    //console.log(itemData)

    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
    .then((resp) => resp.json())
    //call the prop which initiates the functions that re-renders the page
    .then((newItem) => onAddItem(newItem)); 
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name} //taken when typed into the input field. This gets saved into handleSubmit
          onChange={(e) => setName(e.target.value)} 
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category} //taken from drop down. This gets saved into handleSubmit
          onChange={(e) => setCategory(e.target.value)} 
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
