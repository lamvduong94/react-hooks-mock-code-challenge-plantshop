import React, { useState } from 'react';

function PlantCard({ plant, onDelete, onUpdate }) {
  const { id, name, image, price } = plant;

  const [isInStock, setIsInStock] = useState(true);
  const [updatedPrice, setUpdatedPrice] = useState(price);

  function handleToggleStock() {
    setIsInStock(isInStock => !isInStock);
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })

    onDelete(id);
  }

  function handlePriceFormSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ price: updatedPrice }),
    })

      .then(res => res.json())
      .then(data => {
        onUpdate(data);
      })
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button className="primary" onClick={handleToggleStock}>In Stock</button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
      <button onClick={handleDelete}>Delete</button>
      <form onSubmit={handlePriceFormSubmit}>
        <input 
          type="number"
          step="0.01"
          placeholder="New price..."
          value={updatedPrice}
          onChange={e => setUpdatedPrice(parseFloat(e.target.value))}
        />
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
