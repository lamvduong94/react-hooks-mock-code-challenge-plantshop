import React, { useState, useEffect } from 'react';
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(res => res.json())
      .then(data => {
        setPlants(data);
      })
  }, [])

  function handleAddPlant(newPlant) {
    const updatedPlants = [...plants, newPlant];
    setPlants(updatedPlants);
  }

  function handleDeletePlant(id) {
    const updatedPlants = plants.filter(plant => plant.id !== id);
    setPlants(updatedPlants);
  }

  function handleUpdatedPlants(updated) {
    const updatedPlants = plants.map(plant => {
      if (plant.id === updated.id) {
        return updated;
      } else {
        return plant;
      }
    })

    setPlants(updatedPlants);
  }

  const displayedPlants = plants.filter(plant => {
    return plant.name.toLowerCase().includes(search.toLowerCase());
  })

  return (
    <main>
      <NewPlantForm onAdd={handleAddPlant} />
      <Search search={search} onSearch={setSearch} />
      <PlantList 
        plants={displayedPlants}
        onDelete={handleDeletePlant}
        onUpdate={handleUpdatedPlants}
      />
    </main>
  );
}

export default PlantPage;
