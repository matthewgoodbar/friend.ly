const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');
const Topic = mongoose.model('Topic');

exports.addUserToQueue = (user) => {
    const userObj = User.findById(user._id);
    Topic.updateMany({ _id: userObj.topics },
        { $push: { users: userObj._id } });
    checkQueue();
};

const checkQueue = () => {
    const topics = Topic.find();
};