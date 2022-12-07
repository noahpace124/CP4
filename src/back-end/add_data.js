const axios = require("axios");

const animals = require("./animals.js");
const people = require("./people.js");

const baseURL = "http://localhost:3000";

animals.forEach(async (animal) => {
  const response = await axios.post(`${baseURL}/api/animals`, animal);
  if (response.status != 200)
    console.log(`Error adding ${animal.name}, code ${response.status}`);
});

people.forEach(async (person) => {
  const response = await axios.post(`${baseURL}/api/people`, person);
  if (response.status != 200)
    console.log(`Error adding ${person.name}, code ${response.status}`);
});