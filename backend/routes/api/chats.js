const express = require('express');
const router = express.Router();
const debug = require('debug')('backend:server');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');
const Message = mongoose.model('Message');
const Topic = mongoose.model('Topic');
const { requireUser } = require('../../config/passport');
const validateChatInput = require('../../validations/chats');

//Gets all chats by specified user
router.get('/user/:userId', async (req, res) => {
    let user;
    try {
        user = await User.findById(req.params.userId)
        .populate({
            path: 'daily',
            select: 'users topic',
            populate: [{
                path: 'users',
                select: '_id username image'
            },
            {
                path: 'topic',
                select: '_id name description background thumbnail'
            }]
        })
        .populate({
            path: 'chats',
            select: 'users',
            populate: {
                path: 'users',
                select: '_id username image'
            }
        })
    } catch(err) {
        const error = new Error('User does not exist');
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        // return next(error);
    }
    try {
        const chats = user.chats;
        const daily = user.daily;
        return res.json({
            chats, daily
        });
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
        debug(error);
    }
});

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

//Post new chat
router.post('/', requireUser, validateChatInput, async (req, res, next) => {
    try {
        const newChat = new Chat({
            users: req.body.users,
            messages: [],
            topic: Topic.where({ name: req.body.topic })._id
        });
        let chat = await newChat.save();
        req.body.users.forEach(async (userId) => {
            await User.updateOne({ _id: userId },
                { $push: { chats: chat._id } });
        })
        return res.json(chat);
    } catch(err) {
        // next(err);
    }
});

module.exports = router;