const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Topic = require('../models/Topic');
const Chat = require('../models/Chat');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;

// Create users
const users = [];

users.push(
new User ({
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
        name: "hiking",
        category: "outdoors",
        users: []
    })
)

topics.push(
    new Topic ({
        name: "cycling",
        category: "outdoors",
        users: []
    })
)

topics.push(
    new Topic ({
        name: "rock climbing",
        category: "outdoors",
        users: []
    })
)

//Create Chatrooms
const chats = [];

chats.push(
    new Chat({
        
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
  console.log("Resetting db and seeding users and tweets...");

  User.collection.drop()
                 .then(() => Tweet.collection.drop())
                 .then(() => User.insertMany(users))
                 .then(() => Topic.insertMany(topics))
                 .then(() => {
                   console.log("Done!");
                   mongoose.disconnect();
                 })
                 .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                 });
}