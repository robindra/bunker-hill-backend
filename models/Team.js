const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter the team name']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    }
}, {
    timestamps: {
        createdAt: 'cratedAt',
        updatedAt: 'updatedAt'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

TeamSchema.virtual('players', {
    ref: 'Players',
    localField: '_id',
    foreignField: 'team',
    justOne: false
});

module.exports = mongoose.model('Team', TeamSchema);