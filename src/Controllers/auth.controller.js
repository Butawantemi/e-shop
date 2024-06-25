const { genereteToken } = require('../Config/jwtToken');
const User = require('../Models/user.model'); // Correct path
const asyncHandler = require('express-async-handler');


// Create a new user and return the user object
const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400).json({ message: 'The user already exists. Please login.' });
    } else {
        const user = await User.create(req.body); // Await the user creation
        res.status(201).json(user); // Use .json() for structured response
    }
});

// Login a user and return the user object with a token
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.comparePassword(password))) {
        res.json({
            _id: findUser._id,
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            mobile: findUser.mobile,
            token: genereteToken(findUser._id)
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


// Get all users and return the user object
const getallUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    }
    catch (err) {
        throw new Error(error)
    }
})






module.exports = { createUser, loginUser, getallUsers, getsingleUser };
