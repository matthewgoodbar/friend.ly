const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const debug = require('debug')('backend:server');
const { loginUser, restoreUser } = require('../../config/passport');
const { addUserToQueue, removeUserFromQueue, fakeQueue } = require('../../config/chatGeneration');
const { isProduction } = require('../../config/keys');
const validateLoginInput = require('../../validations/login');
const validateRegisterInput = require('../../validations/register');
const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');
const User = mongoose.model('User');

//Get current user
router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  // console.log(req.user)
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    location: req.user.location,
    image: req.user.image,
    pings: req.user.pings
  });
});

//Creates new user
router.post('/register', validateRegisterInput, async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    location: {
      zip: req.body.zipCode,
      city: req.body.city
    }
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

//Logs in user
router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async (err, user) => {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

//Puts current user in queue
router.get('/enqueue', restoreUser, async (req, res) => {
  const user = req.user;
  // await addUserToQueue(user._id);
  // await fakeQueue(user._id);
  return res.json({ message: 'success' });
});

//Removes current user from queue
router.get('/dequeue', restoreUser, async (req, res) => {
  const user = req.user;
  // await removeUserFromQueue(user._id);
  return res.json({ message: 'success' });
});

router.patch('/chatswap', restoreUser, async (req, res) => {
  let user = req.user;
  const chatId = req.body.chatId;
  if (user.daily) {
    await Chat.updateOne({ _id: user.daily },
      { $pull: { users: user._id } });
  }
  if (chatId) {
    await Chat.updateOne({ _id: chatId },
      { $push: { users: user._id } });
  }
  await User.updateOne({ _id: user._id },
    { daily: chatId });
  user = await User.findById(user._id)
  .populate({
    path: 'daily',
    select: 'users topic daily',
    populate: [{
      path: 'users',
      select: '_id username image pings'
    },
    {
      path: 'topic',
      select: '_id name description background thumbnail'
    }]
  })
  .populate({
    path: 'chats',
      select: 'users daily',
      populate: {
        path: 'users',
        select: '_id username image'
      }
  });
  const chats = user.chats;
  const daily = user.daily;
  return res.json({
    chats, daily
  });
});

router.patch('/:id', restoreUser, async (req, res) => {
  const user = req.user;
  let username = req.body.username || user.username;
  let password = req.body.password || user.hashedPassword;
  let email = req.body.email || user.email;
  let image = req.body.image || user.image;
  let location = req.body.location || user.location;
  try {
    if (req.body.password) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
          if (err) throw err;
          password = hashedPassword;
        });
      });
    }
    const editedUser = await User.findById(req.params.id);
    editedUser.username = username;
    editedUser.hashedPassword = password;
    editedUser.email = email;
    editedUser.image = image;
    editedUser.location = location;
    await editedUser.save();
    const userInfo = {
      _id: editedUser._id,
      username: editedUser.username,
      email: editedUser.email,
      location: editedUser.location,
      image: editedUser.image,
      pings: editedUser.pings
  };
    return res.json(userInfo);
  } catch(err) {
    debug(err);
  }
});

router.post('/request/:contactId', restoreUser, async (req, res) => {
  const user = req.user;
  if (!user) return res.status(400).send({ error: "No user logged in" });
  const contact = await User.findById(req.params.contactId);
  if (!contact) return res.status(404).send({ error: "No user exists with that ID" });
  if (user.pings.includes(contact._id)) res.status(400).send({ error: "You have already pinged this user" });
  try {
    await User.updateOne({ _id: user._id },
      { $push: { pings: contact._id } });
    if (contact.pings.includes(user._id)) {
      const newDM = new Chat({
        users: [user, contact],
        messages: [],
        daily: false
      });
      await newDM.save();
      await User.updateMany({ _id: [user._id, contact._id] },
        { $push: { chats: newDM._id } });
    }
    return res.json({ message: "success" });
  } catch(err) {
    return res.status(400).send({ message: "Unable to add ping/create DM" });
  }
});

router.delete('/request/:contactId', restoreUser, async (req, res) => {
  const user = req.user;
  // debug(user)
  if (!user) return res.status(400).send({ message: "No user logged in" });
  const contact = await User.findById(req.params.contactId);
  // debug(contact)
  if (!contact) return res.status(400).send({ message: "No user exists with that ID" });
  if (!user.pings.includes(contact._id)) return res.status(400).send({ message: "You have not pinged this user" });
  try {
    await User.updateOne({ _id: user._id },
      { $pull: { pings: contact._id } });
    const dm = await Chat.findOne({ daily: false, users: { $all: [user._id, contact._id] } });
    if (dm){
      await User.updateMany({ _id: [user._id, contact._id] },
        { $pull: { chats: dm._id } });
      await Chat.remove(dm)
    }
    return res.json({ message: "success" });
  } catch(err) {
    debug(err)
    return res.status(400).send({  message: "Unable to remove ping/delete DM" });
  }
});

//Gets user by id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    return res.json(user);
  } catch (err) {
    return res.json([]);
  }
});

//Gets all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    return res.json([]);
  }
});

module.exports = router;
