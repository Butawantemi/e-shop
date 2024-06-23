const express = require('express')
const { dbConnect } = require('./Config/dbConnection')
const app = express()
require('dotenv').config();

// Connect to databases
dbConnect();


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

