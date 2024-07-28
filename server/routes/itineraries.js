// routes/itineraries.js
const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

// Get all itineraries
router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new itinerary
router.post('/', async (req, res) => {
  const itinerary = new Itinerary({
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    destinations: req.body.destinations
  });

  try {
    const newItinerary = await itinerary.save();
    res.status(201).json(newItinerary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single itinerary
router.get('/:id', getItinerary, (req, res) => {
  res.json(res.itinerary);
});

// Middleware to get a single itinerary by ID
async function getItinerary(req, res, next) {
  let itinerary;
  try {
    itinerary = await Itinerary.findById(req.params.id);
    if (itinerary == null) {
      return res.status(404).json({ message: 'Cannot find itinerary' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.itinerary = itinerary;
  next();
}

module.exports = router;
