const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Please enter your email'],
    },
    password: {
        type: String,
        require: [true, 'Please enter your password']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password with bcrypt
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// Sign JWT and return 
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign(
        {
            id: this._id
        },
        "abcdefghijklmopqrst",
        {
            expiresIn: '30d'
        }
    )
}


// Match user entered passwrod to hash password 
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('Users', UserSchema);