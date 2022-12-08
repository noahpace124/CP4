import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  //setup statements
  const [animals, setAnimals] = useState([]);
  const [people, setPeople] =  useState([]);
  const [error, setError] = useState("");
  
  //api calls
  const fetchAnimals = async() => {
    try {
      const response = await axios.get("/api/animals");
      setAnimals(response.data);
    } catch(error) {
      setError("error retrieving animals: " + error);
    }
  }
  const fetchPeople = async() => {
    try {
      const response = await axios.get("/api/people");
      setPeople(response.data);
    } catch(error) {
      setError("error retrieving people: " + error);
    }
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
      <div id="people">
        <h1>People</h1>
        {people.map( person => (
        	<div key={person.id}>
    				<div>
    					{person.name}, {person.animal} 
    				</div>
			    </div>
			  ))}
      </div>
      <div id="animals">
      <h1>Animals</h1>
        {animals.map( animal => (
        	<div key={animal.id}>
    				<div>
    					{animal.name}, {animal.height} 
    				</div>
			    </div>
			  ))}
      </div>
    </div>
  );
}

export default App;
