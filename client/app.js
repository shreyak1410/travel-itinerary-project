document.getElementById('itinerary-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const travelDate = document.getElementById('travel-date').value;
    const numDays = document.getElementById('num-days').value;

    const response = await fetch('/webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            queryResult: {
                parameters: {
                    'geo-city': city,
                    'travel-date': travelDate,
                    'num-days': numDays,
                },
                intent: {
                    displayName: 'PlanTrip',
                },
            },
        }),
    });

    const data = await response.json();
    document.getElementById('itinerary-result').textContent = data.fulfillmentText;
});
