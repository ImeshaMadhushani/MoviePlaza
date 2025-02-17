// Load environment variables from .env file
require('dotenv').config();

const apiKey = process.env.API_KEY;
console.log('API Key:', apiKey);

const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // Fix for node-fetch v3.x

const app = express();
const PORT = process.env.PORT || 3000; // Use the port provided by the hosting platform or default to 3000

// Middleware to parse JSON (if needed)
app.use(express.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '.')));

// Endpoint to fetch movie data
app.get('/api/movie', async (req, res) => {
    const { title } = req.query; // Get the movie title from query parameters
    const apiKey = process.env.API_KEY; // Load API key from environment variable

    if (!title) {
        return res.status(400).json({ error: 'Movie title is required' });
    }

    try {
        // Fetch data from OMDB API
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === "True") {
            res.json(data); // Return movie data to the frontend
        } else {
            res.status(404).json({ error: data.Error || 'Movie not found' });
        }
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'An error occurred while fetching the movie.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});