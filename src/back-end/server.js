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
    desc: {
        height: String,
        weight: String,
        habitat: String,
        diet: String
    }
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
    desc: {
        height: String,
        weight: String,
        color: String,
        animal: String
    }
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
app.get('/api/people', async (req, res) => {
    let people = await Person.find();
    res.send(people);
});


app.listen(3000, () => console.log('Server listening on port 3000!'));