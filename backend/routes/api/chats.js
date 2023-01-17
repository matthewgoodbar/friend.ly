const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');
const Message = mongoose.model('Message');
const { requireUser } = require('../../config/passport');
const validateChatInput = require('../../validations/chats');

//Gets all chats
router.get('/', async (req, res) => {
    try {
        const chats = await Chat.find()
            .sort({ createdAt: -1 });
        return res.json(chats);
    } catch(err) {
        return res.json([]);
    }
});

//Gets specified chat
router.get('/:id', async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        return res.json(chat);
    } catch(err) {
        const error = new Error('Chat not found');
        error.statusCode = 404;
        error.errors = { message: "No chat found with that id" };
        return next(error);
    }
});

//Post new chat
router.post('/', requireUser, validateChatInput, async (req, res, next) => {
    try {
        const newChat = new Chat({
            users: req.users,
            messages: []
        });
        let chat = await newChat.save();
        return res.json(chat);
    } catch(err) {
        next(err);
    }
});

module.exports = router;