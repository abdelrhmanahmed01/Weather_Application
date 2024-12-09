const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;


app.use(cors());


app.get('/api/weather', async (req, res) => {
    const { city } = req.query; 
    const API_KEY = process.env.OPENWEATHERMAP_API_KEY || "0efa8a9e48a0c4413815a9112e343236";

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

   
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        
        const response = await axios.get(URL);
        res.json(response.data); 
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'City not found' });
        } else {
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
