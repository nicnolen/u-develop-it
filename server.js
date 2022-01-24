// Import npm packages
// Import Express.js
const express = require('express');

// Add the PORT designation
const PORT = process.env.PORT || 3001;
// Make app expression for express.js
const app = express();

// Express.js middleware
// Recognize incoming Request Objects as strings or arrays
app.use(express.urlencoded({ extended: false }));
// Recognize incoming Request Object as a JSON Object
app.use(express.json());

// Add a route to handle user requests that aren't supported by the app
app.use((req, res) => {
  res.status(404).end();
});

// Start the express server on port 3001 (connection function)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
