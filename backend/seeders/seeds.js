const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Topic = require('../models/Topic');
const Chat = require('../models/Chat');
const Message = require("../models/Message.js");
const debug = require('debug')('backend:server');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const topics = require('./topicSeeds');
const _ = require('underscore');
const { addUserToQueue } = require('../config/chatGeneration')

const NUM_SEED_USERS = 120;

// Create users
const users = [];

const matthew = new User ({
    username: 'matthew',
    email: 'matthew@friend.ly',
    hashedPassword: bcrypt.hashSync('password', 10),
    image: "https://i.imgur.com/YiWuKeh.jpg",
    topics: [topics[5]],
    daily: null,
    chats: [],
    pings: [],
    location: {
        zip: 94108,
        city: "San Francisco"
    }
});

const marcos = new User ({
    username: 'marcos',
    email: 'marcos@friend.ly',
    hashedPassword: bcrypt.hashSync('password', 10),
    image: "https://i.imgur.com/zxiytKs.jpg",
    topics: [topics[5]],
    daily: null,
    chats: [],
    pings: [],
    location: {
        zip: 94108,
        city: "San Francisco"
    }
});

const vivian = new User ({
    username: 'vivian',
    email: 'vivian@friend.ly',
    hashedPassword: bcrypt.hashSync('password', 10),
    // image: "https://i.imgur.com/DN8158s.jpg",
    topics: [topics[5]],
    daily: null,
    chats: [],
    pings: [],
    location: {
        zip: 94108,
        city: "San Francisco"
    }
});

const evgenii = new User ({
    username: 'evgenii',
    email: 'evgenii@friend.ly',
    hashedPassword: bcrypt.hashSync('password', 10),
    image: "https://i.imgur.com/XNPUclU.jpg",
    topics: [topics[5]],
    daily: null,
    chats: [],
    pings: [],
    location: {
        zip: 94108,
        city: "San Francisco"
    }
});

const diego = new User ({
    username: 'diego',
    email: 'diego@friend.ly',
    hashedPassword: bcrypt.hashSync('password', 10),
    image: "https://i.imgur.com/sClpoq6.jpg",
    topics: [topics[5]],
    daily: null,
    chats: [],
    pings: [],
    location: {
        zip: 94108,
        city: "San Francisco"
    }
});

const demo1 = new User ({
    username: 'demo-user-1',
    email: 'demo-user-1@friend.ly',
    hashedPassword: bcrypt.hashSync('password', 10),
    topics: [topics[6], topics[7], topics[8], topics[16], topics[17]],
    daily: null,
    chats: [],
    pings: [],
    location: {
        zip: 94108,
        city: "San Francisco"
    }
});

const demo2 = new User ({
    username: 'demo-user-2',
    email: 'demo-user-2@friend.ly',
    hashedPassword: bcrypt.hashSync('password', 10),
    topics: [topics[6], topics[7], topics[8], topics[30], topics[31]],
    daily: null,
    chats: [],
    pings: [],
    location: {
        zip: 94108,
        city: "San Francisco"
    }
});

marcos.pings = [diego._id, matthew._id];
diego.pings = [marcos._id];
evgenii.pings = [marcos._id];

users.push(matthew);
users.push(marcos);
users.push(vivian);
users.push(evgenii);
users.push(diego);
users.push(demo1);
users.push(demo2);

for (let i = 1; i < NUM_SEED_USERS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    users.push(
        new User ({
            username: faker.internet.userName(firstName, lastName),
            email: faker.internet.email(firstName, lastName),
            hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
            topics: _.sample(topics, 4),
            daily: null,
            chats: [],
            pings: [],
            location: {
                zip: 94108,
                city: "San Francisco"
            }
        })
    )
}

//Create Chatrooms
const chats = [];

let topicChat;
for (let i = 0; i < topics.length; i++) {
    topicChat = new Chat({
        users: [],
        messages: [],
        daily: true,
        topic: topics[i]._id
    });
    chats.push(topicChat);
    topics[i].chat = topicChat._id;
}

users.forEach(user => {
    let userTopic = _.sample(user.topics);
    let userChat = chats.find(element => element.topic === userTopic._id);
    userChat.users.push(user._id);
    user.daily = userChat._id;
});

let demoTopic = topics[6];
let demoChat = chats.find(element => element.topic === demoTopic._id);
[demo1, demo2].forEach(demoUser => {
    demoChat.users.push(demoUser._id);
    demoUser.daily = demoChat._id;
});

const marcosDiegoChat = new Chat({
    users: [
        marcos._id,
        diego._id
    ],
    messages: [],
    daily: false
});
chats.push(marcosDiegoChat);
marcos.chats.push(marcosDiegoChat._id);
diego.chats.push(marcosDiegoChat._id);
    
// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Reset and seed db
const insertSeeds = () => {
  console.log("Resetting db and seeding...");

  User.collection.drop()
                .then(() => Topic.collection.drop())
                .then(() => Chat.collection.drop())
                .then(() => Message.collection.drop())
                .then(() => User.insertMany(users))
                .then(() => Topic.insertMany(topics))
                .then(() => Chat.insertMany(chats))
                .then(async () => {
                    // await addSeedsToQueue();
                    console.log("Done!");
                    mongoose.disconnect();
                })
                .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                });
}

const addSeedsToQueue = async () => {
    for (let i = 0; i < users.length; i++) {
        await addUserToQueue(users[i]._id);
        debug(i);
    }
};