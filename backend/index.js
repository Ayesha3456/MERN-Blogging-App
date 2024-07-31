const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;
const BlogRouter = require('./Routes/BlogRouter');
const bodyParser = require('body-parser');
const cors = require('cors');

app.get('/', (req, res) => {
    res.send('Hello from the server');
});
app.use(cors());
app.use(bodyParser.json());
app.use('/blog', BlogRouter);
app.listen(PORT, () => {
    console.log(`Server is running on PORT=${PORT}`);
});