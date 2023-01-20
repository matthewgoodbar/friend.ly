const mongoose = require('mongoose');
const Topic = mongoose.model('Topic');

const topics = [];

topics.push({
    name: "Fishing",
    category: "Outdoor Activities",
    description: "Fishing is a popular leisure activity in which an individual uses a fishing rod or line to catch fish from bodies of water. It can be done for sport or for food.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/fishing.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/fishing.jpg",
    users: []
})

topics.push({
    name: "Hiking",
    category: "Outdoor Activities",
    description: "Hiking is a fun outdoor activity that involves walking on trails in nature, usually in the mountains or countryside, often for the purpose of exercise or exploring.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/hiking.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/hiking.jpg",
    users: []
})

topics.push({
    name: "Kayaking",
    category: "Outdoor Activities",
    description: "Kayaking is an outdoor water activity that involves propelling oneself through bodies of water using a kayak typically with a double-bladed paddle. It is a fun way to explore nature and get exercise.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/kayaking.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/kayaking.jpg",
    users: []
})

topics.push({
    name: "Rock Climbing",
    category: "Outdoor Activities",
    description: "Rock climbing is physically demanding, it involves climbing up, across, and down natural rock formations or artificial rock walls, using special equipment and techniques for safety and progress.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/rockclimbing.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/rockclimbing.jpg",
    users: []
})

topics.push({
    name: "Mounting Biking",
    category: "Outdoor Activities",
    description: "Mountain biking is a sport that involves riding bicycles off-road, usually over rough terrain, using specially designed mountain bikes. It can be a fun, challenging way to explore nature and exercise.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/mountainbiking.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/mountainbiking.jpg",
    users: []
})

topics.push({
    name: "Camping",
    category: "Outdoor Activities",
    description: "Camping is an outdoor activity where individuals spend the night in a tent or camper, usually in remote or wilderness areas. It's a great way to enjoy nature and escape the bustle of everyday life.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/camping.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/camping.jpg",
    users: []
})

topics.push({
    name: "Skiing/Snowboarding",
    category: "Outdoor Activities",
    description: "Skiing and snowboarding are winter sports that involve sliding down snow-covered slopes. Both can be enjoyed by people of all ages and can be done in places like resorts, backcountry, and parks.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/skiing.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/skiing.jpg",
    users: []
})

topics.push({
    name: "Sailing",
    category: "Outdoor Activities",
    description: "Sailing is a recreational activity that involves using wind power to propel a boat or ship through the water. It’s a great way to enjoy nature, get some exercise, and spend time with others.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/sailing.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/sailing.jpg",
    users: []
})

topics.push({
    name: "Scuba Diving",
    category: "Outdoor Activities",
    description: "Scuba diving is an underwater sport where individuals dive under the surface of the water. Divers can see a variety of marine life and underwater landscapes. It’s an exciting way to explore the ocean.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/scubadiving.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/scubadiving.jpg",
    users: []
})

topics.push({
    name: "Skateboarding",
    category: "Outdoor Activities",
    description: "Skateboarding is a sport that involves riding on a skateboard, a board with four wheels, using various tricks to perform stunts and navigate urban and suburban environments.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/skateboarding.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/skateboarding.jpg",
    users: []
})

topics.push({
    name: "Surfing",
    category: "Outdoor Activities",
    description: "Surfing is a water sport in which the participant rides a board on the crest, face, and tube of a wave. It is considered a challenging sport that requires skill, balance and strength.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/surfing.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/surfing.jpg",
    users: []
})

topics.push({
    name: "Races & Competitions",
    category: "Outdoor Activities",
    description: "Races and competitions are organized events where individuals or teams compete against each other, using various skills and techniques to determine a winner.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/race.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/race.jpg",
    users: []
})

topics.push({
    name: "Picnic areas",
    category: "Outdoor Activities",
    description: "A picnic area is a designated outdoor area with tables and facilities designed for people to eat, relax and enjoy nature. They can be found in parks, forests, beaches and other recreational areas.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/picnic.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/picnic.jpg",
    users: []
})

topics.push({
    name: "Viewpoints",
    category: "Outdoor Activities",
    description: "Viewpoints are scenic locations that offer panoramic views of the surrounding landscapes. They are a great place to take in the natural beauty of an area, and are a popular destination.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/viewpoint.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/viewpoint.jpg",
    users: []
})

topics.push({
    name: "Archery",
    category: "Sports and Hobbies",
    description: "Archery is a sport that involves using a bow and arrow to shoot at a target. It requires skill, focus and precision. Archery has a long history and is a traditional skill in some cultures.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/archery.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/archery.jpg",
    users: []
})

topics.push({
    name: "Billiards",
    category: "Sports and Hobbies",
    description: "Billiards is a collection of games played on a table with a cue stick and balls, the most popular being pool, snooker, and carom. It can be played for fun or as a competitive sport.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/billiards.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/billiards.jpg",
    users: []
})

topics.push({
    name: "Bowling",
    category: "Sports and Hobbies",
    description: "Bowling is a sport in which players roll a ball along a flat surface, trying to knock down as many pins as possible. It can be played as a recreational activity or as a competitive sport.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/bowling.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/bowling.jpg",
    users: []
})

topics.push({
    name: "birdwatching",
    category: "Sports and Hobbies",
    description: "Birdwatching, aka birding, is an activity that involves finding and identifying birds in their natural habitats. It can be done in many different environments, from your backyard to the wilderness.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/birdwatching.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/birdwatching.jpg",
    users: []
})

topics.push({
    name: "Cycling",
    category: "Sports and Hobbies",
    description: "Cycling is a form of transportation as well as a sport that involves riding a bicycle for leisure, exercise, or competition. It is a great way to explore the outdoors and stay active.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/cycling.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/cycling.jpg",
    users: []
})

topics.push({
    name: "Golfing",
    category: "Sports and Hobbies",
    description: "Golf is a sport in which players use various clubs to hit a small ball into a series of holes on a course, using as few strokes as possible. It can be played individually or with a group.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/golfing.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/golfing.jpg",
    users: []
})

topics.push({
    name: "Pottery",
    category: "Sports and Hobbies",
    description: "Pottery is an art form that involves shaping clay into objects by using various techniques like pinching, coiling, and slab-building, that are then fired in a kiln. It is a form of sculpture.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/pottery.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/pottery.jpg",
    users: []
})

topics.push({
    name: "Swimming",
    category: "Sports and Hobbies",
    description: "Swimming is a physical activity that involves propelling oneself through water using the arms and legs. It can be done for exercise, recreation or competition. ",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/swimming.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/swimming.jpg",
    users: []
})

topics.push({
    name: "Running",
    category: "Sports and Hobbies",
    description: "Running is a form of exercise and a sport that involves moving rapidly on foot, either for fitness, competition or transportation. It can be done on roads, tracks, trails, or treadmill.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/running.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/running.jpg",
    users: []
})

topics.push({
    name: "Yoga",
    category: "Sports and Hobbies",
    description: "Yoga is an ancient practice that combines physical postures, breathing techniques, meditation, and philosophy to promote physical and mental well-being.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/yoga.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/yoga.jpg",
    users: []
})

topics.push({
    name: "Meditation",
    category: "Sports and Hobbies",
    description: "Meditation is a practice of training the mind to focus and achieve a mentally clear and emotionally calm state. It can be used for relaxation, stress-relief, or spiritual development.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/meditation.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/meditation.jpg",
    users: []
})

topics.push({
    name: "Mini Golf",
    category: "Sports and Hobbies",
    description: "Mini golf, also known as miniature golf or putt-putt golf, is a sport that involves hitting a small ball into a series of holes on a miniature golf course, using as few strokes as possible.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/minigolf.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/minigolf.jpg",
    users: []
})

topics.push({
    name: "Dancing",
    category: "Art",
    description: "Dancing is a form of expression that involves moving the body to the rhythm of music. It's a great way to express emotions, stay active, and can be enjoyed by people of all ages and abilities.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/dancing.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/dancing.jpg",
    users: []
})

topics.push({
    name: "Painting",
    category: "Art",
    description: "Painting is an art form that involves applying pigment to a surface to create an image, design or pattern. It can be done on various materials such as canvas, paper, or walls.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/painting.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/painting.jpg",
    users: []
})

topics.push({
    name: "Photography",
    category: "Art",
    description: "Photography is the art and practice of creating images using a camera. It captures moments, emotions and memories through the lens, whether it be through portraiture, landscape, or street photography.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/photography.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/photography.jpg",
    users: []
})

topics.push({
    name: "Music",
    category: "Art",
    description: "Music is a form of art that uses sound and rhythm to create aural and emotional experiences. It can be composed and performed in various styles and genres.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/music.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/music.jpg",
    users: []
})

topics.push({
    name: "Burgers",
    category: "Food and Cooking",
    description: "Burgers are a type of sandwich typically made of ground beef, placed between two buns. They can be cooked and served in various styles, with various toppings and condiments.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/burgers.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/burgers.jpg",
    users: []
})

topics.push({
    name: "French Food",
    category: "Food and Cooking",
    description: "French cuisine is known for its rich flavors and classic dishes such as escargots, bouillabaisse and ratatouille, use of high-quality ingredients and emphasis on presentation.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/frenchfood.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/frenchfood.jpg",
    users: []
})

topics.push({
    name: "Japanese Food",
    category: "Food and Cooking",
    description: "Japanese cuisine is known for its emphasis on fresh ingredients, simplicity and harmony of flavors. Sushi, ramen, tempura and udon are some famous Japanese dishes",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/japanesesfood.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/japanesesfood.jpg",
    users: []
})

topics.push({
    name: "Chinese Food",
    category: "Food and Cooking",
    description: "Chinese cuisine is known for its diverse flavors and use of various cooking techniques such as stir-frying and steaming. Famous Chinese dishes include Kung Pao chicken, Peking duck, and dumplings.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/chinesefood.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/chinesefood.jpg",
    users: []
})

topics.push({
    name: "Mexican Food",
    category: "Food and Cooking",
    description: "Mexican cuisine is known for its bold and spicy flavors, use of fresh ingredients like cilantro, lime and peppers. Tacos, burritos, enchiladas and tamales are popular Mexican dishes. ",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/mexicanfood.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/mexicanfood.jpg",
    users: []
})

topics.push({
    name: "Italian Food",
    category: "Food and Cooking",
    description: "Italian cuisine is known for its simplicity, use of fresh ingredients and emphasis on regional specialties. Dishes such as pasta, pizza, risotto and tiramisu are well known.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/italianfood.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/italianfood.jpg",
    users: []
})

topics.push({
    name: "Thai Food",
    category: "Food and Cooking",
    description: "Thai cuisine is known for its balance of sweet, sour, salty and spicy flavors. Thai food features a variety of herbs and spices and includes ingredients like lemongrass, galangal and kaffir leaves.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/thaifood.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/thaifood.jpg",
    users: []
})

topics.push({
    name: "Wine Tasting",
    category: "Food and Cooking",
    description: "Wine tasting is the process of evaluating different wines by smelling, tasting and observing them. It involves analyzing the appearance, aroma, flavor, and texture of a wine.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/winetasting.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/winetasting.jpg",
    users: []
})

topics.push({
    name: "Baking",
    category: "Food and Cooking",
    description: "Baking is the method of cooking food using dry heat, typically in an oven. It includes a wide range of dishes such as bread, cakes, pastries, and desserts. Baking is both an art and a science.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/baking.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/baking.jpg",
    users: []
})

topics.push({
    name: "Board Games",
    category: "Games",
    description: "Board games are typically played on a board, with counters or pieces that are moved or placed according to a set of rules. These games can be strategy-based, luck-based, or a combination of both.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/boardgames.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/boardgames.jpg",
    users: []
})

topics.push({
    name: "Trivia Nights",
    category: "Games",
    description: "Trivia night is a competition where participants answer questions from various categories. These questions can be general knowledge, current events, pop culture or based on a specific topic.",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/triviagames.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/triviagames.jpg",
    users: []
})

topics.push({
    name: "Video Games",
    category: "Games",
    description: "Video games are interactive digital games that are played on a computer, console or mobile device. They come in a variety of genres, including action, adventure, sports, and puzzle. ",
    background: "https://friendly-aa.s3.us-west-1.amazonaws.com/videogames.jpg",
    thumbnail: "https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/videogames.jpg",
    users: []
})

//FINAL EXPORT
module.exports = topics;