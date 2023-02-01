const debug = require('debug')('backend:server');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');
const Topic = mongoose.model('Topic');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const _ = require('underscore');

exports.addUserToQueue = async (userId) => {
    const userObj = await User.findById(userId);
    if (!userObj.daily && userObj.topics.length >= 3){
        await Topic.updateMany({ _id: { $in: userObj.topics } },
            { $push: { users: userObj._id } });
        await checkQueue();
    }
};

const checkQueue = async () => {
    debug('Checking queue...');
    const topics = await Topic.find({ 'users.3': { $exists: true } });
    if (topics.length) {
        const topic = _.sample(topics);
        const users = _.sample(topic.users, 4);
        await createChat(topic, users);
    }
};

const createChat = async (topic, users) => {
    debug('Creating chat...');
    const newChat = new Chat({
        users,
        topic,
        messages: [],
        daily: true
    });
    newChat.save();
    await User.updateMany({ _id: { $in: users } },
        { daily: newChat });
    await Topic.updateMany({},
        { $pullAll: { users: users } });
};

exports.removeUserFromQueue = async (userId) => {
    const userObj = await User.findById(userId);
    await Topic.updateMany({},
        { $pull: { users: userObj } });
};

exports.fakeQueue = async (userId) => {
    debug('Faking chat queue...');
    const userObj = await User.findById(userId);
    const topic = _.sample(userObj.topics);
    const users = [userObj];
    for (let i = 0; i < 3; i++) {
        users.push(
            new User ({
                username: faker.internet.userName(firstName, lastName),
                email: faker.internet.email(firstName, lastName),
                hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
                topics: [topic],
                daily: null,
                chats: [],
                pings: [userObj._id],
                location: userObj.location
            })
        );
    }
    User.insertMany(users);
    const newChat = new Chat({
        users,
        topic,
        messages: [],
        daily: true
    });
    newChat.save();
    await User.updateMany({ _id: { $in: users } },
        { daily: newChat });
};