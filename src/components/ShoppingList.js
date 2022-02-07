import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  //added so that data added into JSON will auto render in the shopping list area. This
  //function as a prop to an event listener to the ItemForm component (which is where the 
  //POST request is located)
  function handleAddItem(newItem) {
    //console.log("In ShoppingList:", newItem); //test to see that the item is added
    setItems([...items, newItem])
  }

  //added so that data patched in JSON will auto render in the shopping list area (for Add
  //item to cart section). This gets assigned to an event listener and will be passed as a
  //prop to Item component
function handleUpdateItem(updatedItem) {
  const updatedItems = items.map((item) => {
    if (item.id === updatedItem.id) {
      return updatedItem;
    } else {
      return item;
    }
  });
  setItems(updatedItems);
}

//added so that when a data is deleted in JSON, will re-render in the shopping list area of
//latest JSON
function handleDeleteItem(deletedItem) {
  //console.log("In ShoppingCart:", deletedItem);
  const updatedItems = items.filter((item) => item.id !== deletedItem.id);
  setItems(updatedItems)
}

  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then((resp) => resp.json())
    .then((data) => setItems(data)) //sets items state to equal the fetched data
  }, [])


  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
