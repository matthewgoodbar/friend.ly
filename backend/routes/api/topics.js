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
        const user = await User.findById(req.params.userId)
            .populate('topics');
        return res.json(user.topics);
    } catch(err) {
        debug(err);
        return res.json({ error: "Unable to fetch topics" });
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
        topic = await Topic.findById(req.body._id);
    } catch(err) {
        debug(err);
        return res.json({ error: "Unable to find topic" });
    }
    try {
        await User.updateOne({ _id: req.params.userId },
            { $push: { topics: topic._id } });
        return res.json(topic);
    } catch(err) {
        debug(err);
        return res.json({ error: "Unable to add topic to user object" })
    }
});

router.delete('/user/:userId', requireUser, async (req, res) => {
    try {
        debug(req.query)
        const topicId = req.query.topicId;
        await User.updateOne({ _id: req.params.userId },
            { $pullAll: { topics: [topicId] } });
        const user = await User.findById(req.params.userId)
            .populate('topics');
        return res.json(user.topics);
    } catch(err) {
        debug(err);
        return res.json({ error: "Unable to remove topic from user object" })
    }
});

module.exports = router;