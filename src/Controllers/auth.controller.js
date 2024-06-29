const express = require('express');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../Models/user.model');
const { generateToken } = require('../Config/jwtToken');
const router = express.Router();
const api = process.env.API_URL;

// Create a new user, send verification email, and return the user object
const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: 'The user already exists. Please login.' });
    }

    // Create a new user
    const user = await User.create(req.body);

    // Generate verification token
    const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.verificationToken = verificationToken;
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken, req);

    res.status(201).json({ message: 'User created. Please check your email to verify your account.' });
});

// Helper function to send verification email
const sendVerificationEmail = async (email, token, req) => {
    // Construct the verification URL
    const verificationUrl = `${req.protocol}://${req.get('host')}${api}/user/verify-email?token=${token}`;

    // Setup email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    // Email options
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Email Verification',
        html: `<p>Please verify your email by clicking on the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
};

// Verify email using the token
const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;
    if (!token) {
        console.log('Verification token is missing');
        return res.status(400).json({ message: 'Verification token is missing' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        const user = await User.findById(decoded.id);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Mark the email as verified
        user.isEmailVerified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        console.log('Error verifying token:', err);
        res.status(400).json({ message: 'Invalid or expired verification token' });
    }
});


// Login a user and return the user object with a token
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.comparePassword(password))) {
        if (!findUser.isEmailVerified) {
            return res.status(400).json({ message: 'Please verify your email before logging in.' });
        }

        // Return user details along with token
        res.json({
            _id: findUser._id,
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            mobile: findUser.mobile,
            token: generateToken(findUser._id) // Ensure generateToken is correctly used here
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Get all users and return the user objects
const getallUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single user by ID and return the user object
const getsingleUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a user by ID and return the updated user object
const updateUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.firstname = req.body.firstname || user.firstname;
            user.lastname = req.body.lastname || user.lastname;
            user.email = req.body.email || user.email;
            user.mobile = req.body.mobile || user.mobile;
            if (req.body.password) {
                user.password = req.body.password;
            }
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a user by ID
const deleteUser = asyncHandler(async (req, res) =>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ message: 'User deleted successfully' });
        }else{
            res.status(404).json({ message: 'User not found' });
        }
    }catch(err) {
        throw new Error(err.message);
    }
})

// Change user role
const changeUserRole = asyncHandler(async (req, res) => {
   try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
        user.role = role;
        await user.save();
        res.status(200).json({ message: 'User role updated successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
   }catch{
    throw new Error(err.message)

   }
})


// Block a user
const blockUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.isBlocked = true;
        await user.save();
        res.status(200).json({ message: 'User blocked successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Unblock a user
const unblockUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.isBlocked = false;
        await user.save();
        res.status(200).json({ message: 'User unblocked successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = { createUser, loginUser, getallUsers, getsingleUser, updateUser, deleteUser, verifyEmail, blockUser, unblockUser, changeUserRole };
