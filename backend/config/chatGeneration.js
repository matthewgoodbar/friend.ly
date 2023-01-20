const debug = require('debug')('backend:server');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');
const Topic = mongoose.model('Topic');
const _ = require('underscore');

exports.addUserToQueue = async (user) => {
    const userObj = await User.findById(user._id);
    await Topic.updateMany({ _id: userObj.topics },
        { $push: { users: userObj._id } });
    checkQueue();
};

const checkQueue = async () => {
    await Topic.find({ 'users.3': { $exists: true } }, (err, topics) => {
        if (err) debug(err);
        if (topics.length) {
            const topic = _.sample(topics);
            const users = _.sample(topic.users, 4);
            createChat(topic, users);
        }
    });
};

const createChat = (topic, users) => {
    const newChat = new Chat({
        users,
        topic,
        messages: [],
        daily: true
    });
    users.forEach(async user => {
        await User.updateOne({ _id: user._id },
            { daily: newChat });
    });
};