const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use(express.static('public'));


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//setting up mongo schemas
const animalSchema = new mongoose.Schema({
    name: String,
    height: String,
    weight: String,
    habitat: String,
    diet: String
});
animalSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
animalSchema.set('toJSON', {
  virtuals: true
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    height: String,
    weight: String,
    color: String,
    animal: String
});
personSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
personSchema.set('toJSON', {
  virtuals: true
});

const Animal = mongoose.model('Animal', animalSchema);
const Person = mongoose.model('Person', personSchema);

//api functions
//animals
app.get('/api/animals', async (req, res) => {
    try {
        let animals = await Animal.find();
        res.send(animals);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/api/animals', async (req,res) => {
   const animal = new Animal({
        name: req.body.name,
        height: req.body.height,
        weight: req.body.weight,
        habitat: req.body.habitat,
        diet: req.body.diet
   });
   try {
        await animal.save();
        res.send({animal:animal});
   } catch(err) {
        console.log(err);
        res.sendStatus(500);
   }
});
app.delete('/api/animals/:id', async (req, res) => {
   try {
       await Animal.deleteOne({
           _id: req.params.id
       });
       res.sendStatus(200);
   } catch(err) {
       console.log(err);
       res.sendStatus(500);
   }
});

//people
app.get('/api/people', async (req, res) => {
    try {
        let people = await Person.find();
        res.send(people);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/api/people', async (req, res) => {
   const person = new Person({
        name: req.body.name,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        color: req.body.color,
        animal: req.body.animal
   });
   try {
        await person.save();
        res.send({person:person});
   } catch(err) {
        console.log(err);
        res.sendStatus(500);
   }
});
app.delete('/api/people/:id', async (req, res) => {
   try {
       await Person.deleteOne({
           _id: req.params.id
       });
       res.sendStatus(200);
   } catch(err) {
       console.log(err);
       res.sendStatus(500);
   }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));