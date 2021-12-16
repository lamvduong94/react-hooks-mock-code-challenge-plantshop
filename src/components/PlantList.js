import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDelete, onUpdate }) {
  return (
    <ul className="cards">
      {plants.map(plant => {
        return (
          <PlantCard
            key={plant.id}
            plant={plant}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        )
      })}
    </ul>
  );
}

export default PlantList;
