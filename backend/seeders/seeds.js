const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Topic = require('../models/Topic');
const Chat = require('../models/Chat');
const Message = require("../models/Message.js");
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const topics = require('./topicSeeds');
const _ = require('underscore');

const NUM_SEED_USERS = 10;

// Create users
const users = [];

const matthew = new User ({
    username: 'matthew',
    email: 'matthew@friend.ly',
    hashedPassword: bcrypt.hashSync('password', 10),
    image: "https://i.imgur.com/YiWuKeh.jpg",
    topics: [],
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
    topics: [],
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
    image: "https://i.imgur.com/DN8158s.jpg",
    topics: [],
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
    topics: [],
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
    topics: [],
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

const dailyGroup = new Chat({
    users: [
        matthew._id,
        marcos._id,
        vivian._id,
        evgenii._id,
        diego._id
    ],
    messages: [],
    daily: true,
    topic: topics[23]._id
});
chats.push(dailyGroup);
[matthew, marcos, vivian, evgenii, diego].forEach((user) => {
    user.daily = dailyGroup._id;
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
                .then(() => {
                    console.log("Done!");
                    mongoose.disconnect();
                })
                .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                });
}