const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Topic = require('../models/Topic');
const Chat = require('../models/Chat');
const Message = require("../models/Message.js");
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;

// Create users
const users = [];

users.push(
    new User ({
        _id: mongoose.Types.ObjectId(1),
        username: 'matthew',
        email: 'matthew@friend.ly',
        hashedPassword: bcrypt.hashSync('password', 10),
        topics: [],
        chats: [],
        friends: []
    })
)

users.push(
    new User ({
        _id: mongoose.Types.ObjectId(2),
        username: 'marcos',
        email: 'marcos@friend.ly',
        hashedPassword: bcrypt.hashSync('password', 10),
        topics: [],
        chats: [],
        friends: []
    })
)

users.push(
    new User ({
        _id: mongoose.Types.ObjectId(3),
        username: 'vivian',
        email: 'vivian@friend.ly',
        hashedPassword: bcrypt.hashSync('password', 10),
        topics: [],
        chats: [],
        friends: []
    })
)

users.push(
    new User ({
        _id: mongoose.Types.ObjectId(4),
        username: 'evgenii',
        email: 'evgenii@friend.ly',
        hashedPassword: bcrypt.hashSync('password', 10),
        topics: [],
        chats: [],
        friends: []
    })
)

users.push(
    new User ({
        _id: mongoose.Types.ObjectId(5),
        username: 'diego',
        email: 'diego@friend.ly',
        hashedPassword: bcrypt.hashSync('password', 10),
        topics: [],
        chats: [],
        friends: []
    })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
    users.push(
        new User ({
            username: faker.internet.userName(firstName, lastName),
            email: faker.internet.email(firstName, lastName),
            hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
            topics: [],
            chats: [],
            friends: []
        })
    )
}
  
// Create topics
const topics = [];

topics.push(
    new Topic ({
        _id: mongoose.Types.ObjectId(1),
        name: "hiking",
        category: "outdoors",
        description: "Description for hiking",
        users: []
    })
)

topics.push(
    new Topic ({
        _id: mongoose.Types.ObjectId(2),
        name: "cycling",
        category: "outdoors",
        description: "Description for cycling",
        users: []
    })
)

topics.push(
    new Topic ({
        _id: mongoose.Types.ObjectId(3),
        name: "rock climbing",
        category: "outdoors",
        description: "Description for rock climbing",
        users: []
    })
)

//Create Chatrooms
const chats = [];

chats.push(
    new Chat({
        _id: mongoose.Types.ObjectId(1),
        users: [
            mongoose.Types.ObjectId(1),
            mongoose.Types.ObjectId(2),
            mongoose.Types.ObjectId(3),
            mongoose.Types.ObjectId(4),
            mongoose.Types.ObjectId(5)
        ],
        messages: [],
        daily: false,
        topic: mongoose.Types.ObjectId(1)
    })
)
    
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