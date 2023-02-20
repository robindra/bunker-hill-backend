const mongoose = require('mongoose');
const slugify = require('slugify');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        require: [true, 'Please add category title.']
    },
    slug: String, 
    description: {
        type: String,
        require: [true, 'Please enter description of the category']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

CategorySchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

CategorySchema.virtual('teams', {
    ref: 'Team',
    localField: '_id',
    foreignField: 'category',
    justOne: false
});

module.exports = mongoose.model('Category', CategorySchema);

