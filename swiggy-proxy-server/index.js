const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Swiggy API Proxy Server is running!');
});

// Restaurant list API endpoint
app.get('/api/restaurants', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Missing latitude or longitude parameters' });
    }
    
    const response = await axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}`, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Restaurant API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch restaurant data' });
  }
});

// Restaurant menu API endpoint
app.get('/api/menu', async (req, res) => {
  try {
    const { lat, lng, restaurantId } = req.query;
    
    if (!lat || !lng || !restaurantId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const response = await axios.get(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Menu API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch menu data' });
  }
});

// Mobile API endpoint
app.get('/mapi/restaurants', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Missing latitude or longitude parameters' });
    }
    
    const response = await axios.get(
      `https://www.swiggy.com/mapi/homepage/getCards?lat=${lat}&lng=${lng}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Mobile API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch mobile data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 