const axios = require("axios");

const people = require("./people.js");

const baseURL = "http://localhost:3000";

people.forEach(async (people) => {
  const response = await axios.post(`${baseURL}/api/products`, people);
  if (response.status != 200)
    console.log(`Error adding ${people.name}, code ${response.status}`);
});