const express = require('express');
const { dbConnect } = require('./Config/dbConnection'); // Corrected file name
const authRoute = require('./Routes/auth.route');
const app = express();
require('dotenv').config();

// Connect to the database
dbConnect();

const port = process.env.PORT || 3000;
const api = process.env.API_URL;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
app.use(`${api}/user`, authRoute); // Corrected to use app.use for routes

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
