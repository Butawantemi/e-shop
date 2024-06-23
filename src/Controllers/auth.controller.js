const User = require('../Models/user.model'); // Correct path
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const existingUser = await User.findOne({ email });
    
    if (!existingUser) {
        const user = await User.create(req.body); // Await the user creation
        res.status(201).send(user);
    } else {
        res.status(400); // Set the response status for client error
        throw new Error('The user already exists. Please login.');
    }
});

module.exports = { createUser }
