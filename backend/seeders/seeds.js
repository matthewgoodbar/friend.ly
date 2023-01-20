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
    topics: [],
    daily: null,
    chats: [],
    friends: [],
    location: {
        zip: 94108,
        city: "San Francisco"
    },
    image: ""
});
users.push(matthew);

const marcos = new User ({
    username: 'marcos',
    email: 'marcos@friend.ly',
    hashedPassword: bcrypt.hashSync('password', 10),
    topics: [],
    daily: null,
    chats: [],
    friends: [],
    location: {
        zip: 94108,
        city: "San Francisco"
    },
    image: ""
});
users.push(marcos);

const vivian = new User ({
    username: 'vivian',
    email: 'vivian@friend.ly',
    hashedPassword: bcrypt.hashSync('password', 10),
    topics: [],
    daily: null,
    chats: [],
    friends: [],
    location: {
        zip: 94108,
        city: "San Francisco"
    },
    image: ""
});
users.push(vivian);

const evgenii = new User ({
    username: 'evgenii',
    email: 'evgenii@friend.ly',
    hashedPassword: bcrypt.hashSync('password', 10),
    topics: [],
    daily: null,
    chats: [],
    friends: [],
    location: {
        zip: 94108,
        city: "San Francisco"
    },
    image: ""
});
users.push(evgenii);

const diego = new User ({
    username: 'diego',
    email: 'diego@friend.ly',
    hashedPassword: bcrypt.hashSync('password', 10),
    topics: [],
    daily: null,
    chats: [],
    friends: [],
    location: {
        zip: 94108,
        city: "San Francisco"
    },
    image: ""
});
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
            friends: [],
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
    topic: topics[1]._id
});
chats.push(dailyGroup);
[matthew, marcos, vivian, evgenii, diego].forEach((user) => {
    user.daily = dailyGroup._id;
});

const marcosEvgeniiChat = new Chat({
    users: [
        marcos._id,
        evgenii._id
    ],
    messages: [],
    daily: false
});
chats.push(marcosEvgeniiChat);
marcos.chats.push(marcosEvgeniiChat._id);
evgenii.chats.push(marcosEvgeniiChat._id);

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