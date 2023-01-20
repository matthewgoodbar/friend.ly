const mongoose = require('mongoose');
const Topic = mongoose.model('Topic');

const topics = [];

//SINGLE TOPIC EXAMPLE
// const TOPIC_NAME = new Topic({
//     name: "",
//     category: "",
//     description: "",
//     background: "",
//     thumbnail: "",
//     users: []
// });
// topics.push(TOPIC_NAME);

const hiking = new Topic ({
    name: "hiking",
    category: "outdoors",
    description: "Description for hiking",
    background: "",
    thumbnail: "",
    users: []
})


topics.push(hiking);

const cycling = new Topic ({
    name: "cycling",
    category: "outdoors",
    description: "Description for cycling",
    background: "",
    thumbnail: "",
    users: []
})
topics.push(cycling);

const rockClimbing = new Topic ({
    name: "rock climbing",
    category: "outdoors",
    description: "Description for rock climbing",
    background: "",
    thumbnail: "",
    users: []
})
topics.push(rockClimbing);

const burgers = new Topic ({
    name: "burgers",
    category: "food",
    description: "Description for burgers",
    background: "",
    thumbnail: "",
    users: []
})
topics.push(burgers);

//FINAL EXPORT
module.exports = topics;