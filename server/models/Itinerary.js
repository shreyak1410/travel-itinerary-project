// models/Itinerary.js
const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  startDate: Date,
  endDate: Date,
  destinations: [{
    location: String,
    activities: [String]
  }]
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;

const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  city: String,
  travelDate: String,
  numDays: Number,
  itinerary: String
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
