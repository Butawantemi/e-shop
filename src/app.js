const express = require('express');
const { dbConnect } = require('./Config/dbConnection');
const authRoute = require('./Routes/auth.route');
const { protect, admin } = require('./middleware/auth.middleware')
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
app.use(`${api}/user`, authRoute, protect, admin);


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
