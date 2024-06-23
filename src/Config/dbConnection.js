const mongoose = require("mongoose");
require('dotenv/config')

// Connect to MongoDB
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
      .then(() =>{
          console.log("Database is seccessfully connected")
      })
      .catch((err) => {
          console.log({message: err.message})
      })
}

module.exports = { dbConnect };