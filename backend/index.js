const express = require('express'); // Import the express framework to create a web server
const app = express(); // Create an instance of an Express application
require('dotenv').config(); // Load environment variables from a .env file into process.env
require('./Models/db'); // Import and execute the database configuration and connection file
const PORT = process.env.PORT || 8080; // Set the port for the server, using the environment variable PORT or default to 8080
const BlogRouter = require('./Routes/BlogRouter'); // Import the router for handling Blog-related routes
const bodyParser = require('body-parser'); // Import body-parser middleware to parse incoming request bodies
const cors = require('cors'); // Import cors middleware to enable Cross-Origin Resource Sharing

app.get('/', (req, res) => { // Define a route handler for the root URL
    res.send('Hello from the server'); // Send a simple response when accessing the root URL
});
app.use(cors()); // Use the cors middleware to enable CORS
app.use(bodyParser.json()); // Use the body-parser middleware to parse JSON request bodies
app.use('/blog', BlogRouter); // Use the BlogRouter for handling routes starting with /blog

app.listen(PORT, () => { // Start the server and listen on the specified port
    console.log(`Server is running on PORT=${PORT}`); // Log a message indicating the server is running and the port it is listening on
});