const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }],
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);