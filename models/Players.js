const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            require: [true, 'Please enter player first name'],
            trim: true
        }, 
        last: {
            type: String,
            require: [true, 'Please enter player last name'],
            trim: true
        }
    }, 
    class: {
        type: String, 
        require: [true, 'Please enter player class'],
    },
    section:{
        type: String, 
        require: [true, 'Please enter player section'],
    },
    gender: {
        type: String, 
        require: [true, 'Please select the gender']
    },
    dob: {
        type: String, 
        require: [true, 'Please select player date of birth']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category'
    }, 
    team: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team'
    },
    school: {
        type: String, 
        require: [true, 'Please select school name']
    },
    guardian: {
        relation: {
            type: String, 
            require: true, 
            enum: ['Mother', 'Father', 'Other']
        },
        name: {
            type: String, 
            require: true
        },
        mobile: {
            type: String,
            require: [true, 'Please enter mobile number']
        }, 
        address: {
            type: String, 
            require: [true, 'Please enter the address']
        }
    }
});

module.exports = mongoose.model('Players', PlayerSchema);