// Set up a simple web server that connects to MongoDB
// and provides a REST API for a car repair shop
// Modified to add SOAP client to get part info for proj2
// Written by John Ingram for CS453


const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const { createValidator } = require('express-joi-validation');
const Joi = require('joi');

// Create an Express application
const app = express();
const validator = createValidator();

// MongoDB connection URI
const uri = 'mongodb://mongo:27017/mydatabase';

// SOAP client
const getPartInfo = require('./client');

// Connect to MongoDB
async function dbConnect() {
  // Connect to MongoDB
  const client = await MongoClient.connect(uri);
  console.log('Connected to MongoDB');
  return client.db('mydatabase');
}

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// Define a schema for the Car object
const carSchema = Joi.object({
  vin: Joi.string().required(),
  plateno_state: Joi.string().required(),
  make_model: Joi.string().required(),
  year: Joi.number().integer().required(),
  owner_name: Joi.string().required(),
  owner_address: Joi.string().required(),
  owner_dlno: Joi.string().required(),
  problem: Joi.string(),
  time_in_out: Joi.string(),
  workers: Joi.array().items(Joi.string()),
});

// Define a route handler for the root path
app.get('/cars', async (req, res) => {
  const db = await dbConnect();
  const cars = await db.collection('cars').find().toArray();
  res.status(200).json(cars);
});


// Add a new car to the shop
app.post('/cars', validator.body(carSchema), async (req, res) => {
  // Validation (400) is handled by validator
  // Parse the request body
  const car = {
    vin: req.body.vin,
    plateno_state: req.body.plateno_state,
    make_model: req.body.make_model,
    year: req.body.year,
    owner_name: req.body.owner_name,
    owner_address: req.body.owner_address,
    owner_dlno: req.body.owner_dlno,
    problem: req.body.problem,
    time_in_out: req.body.time_in_out,
    workers: req.body.workers
  };

  const db = await dbConnect();

  db.collection('cars').insertOne(car, (err) => {
    if (err) {
      return res.status(500).send(err);
    } 
  });

  res.status(201).send({ success: true });
});

// Get a car from the shop by ID
app.get('/cars/:id', async (req, res) => {
  const db = await dbConnect();
  const searchId = new ObjectId(req.params.id);
  const car = await db.collection('cars').findOne({ _id: searchId });
  if (!car) {
    return res.status(404).send('Car not found');
  } else {
    return res.status(200).json(car);
  }
});

// Add a new endpoint to get the price and delivery date of a part from the Supplier SOAP Server
app.get('/parts/:partNumber', async (req, res) => {
  const partNumber = req.params.partNumber;
  const soapPartInfo = await getPartInfo({partNumber: '1234'});

  const price = soapPartInfo.price;
  const deliveryDate = soapPartInfo.deliveryDate;

  res.status(200).json({ price: price, deliveryDate: deliveryDate });
});

// Update a car in the shop
app.put('/cars/:id', validator.body(carSchema), async (req, res) => {
  // Validation (400) is handled by validator
  // Parse the request body
  const car = {
    vin: req.body.vin,
    plateno_state: req.body.plateno_state,
    make_model: req.body.make_model,
    year: req.body.year,
    owner_name: req.body.owner_name,
    owner_address: req.body.owner_address,
    owner_dlno: req.body.owner_dlno,
    problem: req.body.problem,
    time_in_out: req.body.time_in_out,
    workers: req.body.workers
  };

  const db = await dbConnect();
  const searchId = new ObjectId(req.params.id);
  const result = await db.collection('cars').updateOne({ _id: searchId }, { $set: req.body });
  if (result.modifiedCount === 0) {
    res.status(404).send('Car not found');
  } else {
    res.send({ success: true });
  }
});

// Delete a car from the shop
app.delete('/cars/:id', async (req, res) => {
  const db = await dbConnect();
  const searchId = new ObjectId(req.params.id);
  const result = await db.collection('cars').deleteOne({ _id: searchId });
  if (result.deletedCount === 0) {
    res.status(404).send('Car not found');
  } else {
    res.status(204).send();
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});