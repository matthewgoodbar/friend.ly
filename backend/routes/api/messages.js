const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const debug = require('debug')('backend:server');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');
const Message = mongoose.model('Message');
const { requireUser } = require('../../config/passport');
const validateMessageInput = require('../../validations/messages');

//Gets all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find()
            .populate("author", "_id, username")
            .sort({ createdAt: -1 });
        return res.json(messages);
    }
    catch(err) {
        return res.json([]);
    }
});

//Gets all messages from specified chat
router.get('/chat/:chatId', async (req, res) => {
    let chat;
    try {
        chat = await Chat.findById(req.params.chatId);
    } catch(err) {
        const error = new Error('Chat does not exist');
        error.statusCode = 404;
        error.errors = { message: "No chat found with that id" };
        // return next(error);
    }
    try {
        const messages = await Message.find({ chat: chat._id })
            .sort({ createdAt: -1 })
            .populate("author", "_id, username");
        return res.json(messages);
    } catch(err) {
        return res.json([]);
    }
});

//Gets all messages from specified user
router.get('/user/:userId', async (req, res) => {
    let user;
    try {
        user = await User.findById(req.params.userId);
    } catch(err) {
        const error = new Error('User does not exist');
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        // return next(error);
    }
    try {
        const messages = await Message.find({ author: user._id })
            .sort({ createdAt: -1 })
            .populate("author", "_id, username");
        return res.json(messages);
    } catch(err) {
        return res.json([]);
    }
});

//gets specified message
router.get('/:id', async (req, res) => {
    try {
        const message = Message.findById(req.params.id);
        return res.json(message);
    } catch(err) {
        return res.json([]);
    }
});

//Posts message to specified chat
router.post('/chat/:chatId', requireUser, validateMessageInput, async (req, res, next) => {
    try {
        // debug(req.author)
        const newMessage = new Message({
            body: req.body.body,
            author: mongoose.Types.ObjectId(req.body.author),
            chat: mongoose.Types.ObjectId(req.params.chatId) 
        });
        // debug(newMessage)
        let message = await newMessage.save();
        message = await message.populate('author', '_id, username');
        return res.json(message);
    } catch(err) {
        // next(err);
    }
});

module.exports = router;