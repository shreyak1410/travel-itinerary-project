const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Serve static files from the client directory
app.use(express.static('client'));

app.post('/webhook', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;

    if (intentName === 'PlanTrip') {
        const city = req.body.queryResult.parameters['geo-city'];
        const travelDate = req.body.queryResult.parameters['travel-date'];
        const numDays = req.body.queryResult.parameters['num-days'] || 3;

        const itinerary = generateItinerary(city, travelDate, numDays);

        res.json({
            fulfillmentText: `Here is your itinerary for ${city} from ${travelDate} for ${numDays} days:\n${itinerary}`
        });
    } else {
        res.json({ fulfillmentText: "I didn't understand that. Can you try again?" });
    }
});

function generateItinerary(city, travelDate, numDays) {
    // Placeholder function to generate an itinerary
    return `Day 1: Visit the main attractions of ${city}.\nDay 2: Explore local cuisine and culture.\nDay 3: Relax and enjoy the scenery.`;
}

app.post('/chatbot', async (req, res) => {
    const message = req.body.message;

    try {
        const dialogflowResponse = await axios.post(`https://dialogflow.googleapis.com/v2/projects/${process.env.GOOGLE_PROJECT_ID}/agent/sessions/${process.env.DIALOGFLOW_SESSION_ID}:detectIntent`, {
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'en'
                }
            }
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.DIALOGFLOW_ACCESS_TOKEN}`
            }
        });

        const reply = dialogflowResponse.data.queryResult.fulfillmentText;
        res.json({ reply });
    } catch (error) {
        console.error('Error communicating with Dialogflow:', error);
        res.status(500).json({ error: 'Error communicating with Dialogflow' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

