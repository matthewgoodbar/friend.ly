const express = require('express');
const router = express.Router();
const debug = require('debug')('backend:server');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');
const Message = mongoose.model('Message');
const Topic = mongoose.model('Topic');
const { requireUser } = require('../../config/passport');

router.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        return res.json(user.topics);
    } catch(err) {
        debug(err);
        return res.json({ error: "Unable to fetch user's topics" });
    }
});

router.get('/', async (req, res) => {
    try {
        const topics = await Topic.find();
        return res.json(topics);
    } catch(err) {
        debug(err);
        return res.json({ error: "Unable to fetch topics" });
    }
});

router.post('/user/:userId', requireUser, async (req, res) => {
    let topic;
    try {
        topic = await Topic.findById(req.body.topic._id);
    } catch(err) {
        debug(err);
        return res.json({ error: "Unable to find topic" });
    }
    try {
        await User.updateOne({ _id: req.params.userId },
            { $push: { topics: topic._id } });
    } catch(err) {
        debug(err);
        return res.json({ error: "Unable to add topic to user object" })
    }
});

router.delete('/user/:userId', requireUser, async (req, res) => {
    try {
        const topicId = req.query.topicId;
        await User.updateOne({ _id: req.params.userId },
            { $pullAll: { topics: topicId } });
        return res.json({ message: "success" });
    } catch(err) {
        debug(err);
        return res.json({ error: "Unable to remove topic from user object" })
    }
});

module.exports = router;