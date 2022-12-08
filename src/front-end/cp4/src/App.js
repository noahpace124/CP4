import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  //setup statements
  const [animals, setAnimals] = useState([]);
  const [people, setPeople] =  useState([]);
  const [error, setError] = useState("");
  //animal
  const [aname, setAName] = useState("");
  const [aheight, setAHeight] = useState("");
  const [aweight, setAWeight] = useState("");
  const [ahabitat, setAHabitat] = useState("");
  const [adiet, setADiet] = useState("");
  //person
  const [pname, setPName] = useState("");
  const [page, setPAge] = useState("");
  const [pheight, setPHeight] = useState("");
  const [pweight, setPWeight] = useState("");
  const [pcolor, setPColor] = useState("");
  const [panimal, setPAnimal] = useState("");
  
  //api calls
  const fetchAnimals = async() => {
    try {
      const response = await axios.get("/api/animals");
      setAnimals(response.data);
    } catch(error) {
      setError("error retrieving animals: " + error);
    }
  };
  const createAnimal = async() => {
    try {
      await axios.post("/api/animals", {name: aname, height: aheight, weight: aweight, habitat: ahabitat, diet: adiet});
    } catch(err) {
      setError("error adding animal: " + err);
    }
  };
  const deleteAnimal = async(id) => {
    try {
      await axios.delete("/api/animals/" + id);
    } catch(err) {
      setError("error deleting animal: " + error);
    }
  };
  const fetchPeople = async() => {
    try {
      const response = await axios.get("/api/people");
      setPeople(response.data);
    } catch(error) {
      setError("error retrieving people: " + error);
    }
  };
  const createPerson = async() => {
    try {
      await axios.post("/api/people", {name: pname, age: page, height: pheight, weight: pweight, color: pcolor, animal: panimal});
    } catch(err) {
      setError("error adding person: " + err);
    }
  };
  const deletePerson = async(id) => {
    try {
      await axios.delete("/api/people/" + id);
    } catch(err) {
      setError("error deleting person: " + error);
    }
  };
  
  
  //helper functions
  const addAnimal = async(e) => {
    e.preventDefault();
    await createAnimal();
    fetchAnimals();
    setAName("");
    setAHeight("");
    setAWeight("");
    setAHabitat("");
    setADiet("");
  };
  const removeAnimal = async(id) => {
    await deleteAnimal(id);
    fetchAnimals();
  }
  
  const addPerson = async(e) => {
    e.preventDefault();
    await createPerson();
    fetchPeople();
    setPName("");
    setPAge("");
    setPHeight("");
    setPWeight("");
    setPColor("");
    setPAnimal("");
  };
  const removePerson = async(id) => {
    await deletePerson(id);
    fetchPeople();
  }
  
  useEffect(() =>  {
    fetchAnimals();
  },[]);

  useEffect(() =>  {
    fetchPeople();
  },[]);
  
  return (
    <div id="container">
    {error}
      <div id="info">
        <div id="people">
          <h1>People</h1>
          {people.map( person => (
          	<div key={person.id}>
    					<h3>{person.name} - {person.age}</h3>
    					Height: {person.height} - Weight: {person.weight}<br />
    					Favorite Color: {person.color} - Favorite Animal: {person.animal}<br />
    					<button onClick={e => removePerson(person.id)}>Delete</button>
    					<br />
  			    </div>
  			  ))}
        </div>
        <div id="animals">
        <h1>Animals</h1>
          {animals.map( animal => (
          	<div key={animal.id}>
    					<h3>{animal.name}</h3>
    					Height: {animal.height} - Weight: {animal.weight}<br />
    					Habitat: {animal.habitat} - Diet: {animal.diet}<br />
    					<button onClick={e => removeAnimal(animal.id)}>Delete</button>
    					<br />
  			    </div>
  			  ))}
        </div>
      </div>
      <div id="add">
        <div id="createPerson">
          <h3>Create Person</h3>
          <form onSubmit={addPerson}>
            <div>
              <label>
                Name: <input type="text" value={pname} onChange={e => setPName(e.target.value)} />
                &nbsp;
                Age: <input type="text" value={page} onChange={e => setPAge(e.target.value)} /><br />
                Height: <input type="text" value={pheight} onChange={e => setPHeight(e.target.value)} />
                &nbsp;
                Weight: <input type="text" value={pweight} onChange={e => setPWeight(e.target.value)} /><br />
                Favorite Color: <input type="text" value={pcolor} onChange={e => setPColor(e.target.value)} /><br />
                Favorite Animal: <input type="text" value={panimal} onChange={e => setPAnimal(e.target.value)} />
              </label>  
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div id="createAnimal">
        <h3>Create Animal</h3>
          <form onSubmit={addAnimal}>
            <div>
              <label>
                Name: <input type="text" value={aname} onChange={e => setAName(e.target.value)} /><br />
                Height: <input type="text" value={aheight} onChange={e => setAHeight(e.target.value)} />
                &nbsp;
                Weight: <input type="text" value={aweight} onChange={e => setAWeight(e.target.value)} /><br />
                Habitat: <input type="text" value={ahabitat} onChange={e => setAHabitat(e.target.value)} />
                &nbsp;
                Diet: <input type="text" value={adiet} onChange={e => setADiet(e.target.value)} />
              </label>  
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
        </div>
      <div id="github">https://github.com/noahpace124/CP4</div>
    </div>
  );
}

export default App;
