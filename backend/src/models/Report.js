const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Físico', 'Verbal', 'Social', 'Cyberbullying', 'Outro'],
        required: true,
    },
    location: {
        type: String,
    },
    isAnonymous: {
        type: Boolean,
        default: true,
    },
    authorName: {
        type: String,
        default: 'Anônimo',
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Report', reportSchema);
