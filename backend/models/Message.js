const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);