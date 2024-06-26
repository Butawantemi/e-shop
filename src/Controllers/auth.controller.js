const { genereteToken } = require('../Config/jwtToken');
const User = require('../Models/user.model');
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

// Get a single user and return the user object
const getsingleUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    }
    catch (err) {
        throw new Error(error)
    }
})

// Update a user and return the updated user object
const updateUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            user.firstname = req.body.firstname
            user.lastname = req.body.lastname
            user.email = req.body.email
            user.mobile = req.body.mobile
            user.password = req.body.password   
        }else{
            res.json({message: 'User not found'})
        }
        const updatedUser = await user.save()
        res.json(updatedUser)
    }
    catch (err) {
        throw new Error(error)
    }
})

// Deleta a user if the user exists
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
     const deleteUser = await User.findByIdAndDelete(id);
      res.json({ deleteUser }); 
    }
    catch (err) {
        throw new Error(error)
    }
})




module.exports = { createUser, loginUser, getallUsers, getsingleUser, updateUser, deleteUser };
