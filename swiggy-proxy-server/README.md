# Swiggy API Proxy Server

A simple Node.js proxy server for Swiggy's API to bypass CORS issues and use in frontend applications.

## Features

- Proxy for Swiggy's restaurant list API
- Proxy for Swiggy's restaurant menu API
- Proxy for Swiggy's mobile API
- CORS enabled for frontend access

## API Endpoints

- `/api/restaurants?lat={latitude}&lng={longitude}` - Get restaurant list
- `/api/menu?lat={latitude}&lng={longitude}&restaurantId={id}` - Get restaurant menu
- `/mapi/restaurants?lat={latitude}&lng={longitude}` - Get mobile API data

## Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to the project directory
cd swiggy-proxy-server

# Install dependencies
npm install

# Start the server
npm start
```

## Development

```bash
# Run in development mode with auto-reload
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
```

## Deployment

### Deploying to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Add `PORT` if you want to use a specific port

## Using the API

Example API call from a frontend application:

```javascript
// Fetch restaurant list
fetch('https://your-render-url.onrender.com/api/restaurants?lat=12.9716&lng=77.5946')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Fetch restaurant menu
fetch('https://your-render-url.onrender.com/api/menu?lat=12.9716&lng=77.5946&restaurantId=123456')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## License

ISC 