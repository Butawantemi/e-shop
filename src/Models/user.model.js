const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    cart: {
        type: Array,
        default: []
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address'}],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    isBlocked: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true
}
);

// Encrypt the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare the user password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

// Export the model
module.exports = mongoose.model('User', userSchema);
