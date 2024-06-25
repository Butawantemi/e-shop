const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        default: 'user'
    }
});


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

// compare the user password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}
/* userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(this.password, salt)
}) */

//Export the model
module.exports = mongoose.model('User', userSchema);