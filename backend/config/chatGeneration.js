const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');
const Topic = mongoose.model('Topic');

exports.addUserToQueue = (user) => {
    const userObj = User.findById(user._id);
    userObj.topics.forEach((topicId) => {
        Topic.updateMany()
    })
};