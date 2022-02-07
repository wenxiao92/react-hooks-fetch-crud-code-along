import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {

  //Add function to handle event (button click)
  function handleAddToCartClick() {
    //console.log("clicked item:", item)
    fetch(`http://localhost:4000/items/${item.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart:  !item.isInCart,
      }),
    })
    .then((resp) => resp.json())
    //need to call the updated state because the page will still have the look of the current
    //state even when the data in the JSON is actually changed. Use the prop passed down to re-render
    .then((updatedItem) => onUpdateItem(updatedItem))
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
    //need to call the updated state because the page will still have the look of the current
    //state even when the data in the JSON is deleted. Use the prop passed down to re-render
      .then(() => onDeleteItem(item));
  }
  
  //returning every item in the JSON into a list
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
