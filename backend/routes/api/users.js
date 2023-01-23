const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const debug = require('debug')('backend:server');
const { loginUser, restoreUser } = require('../../config/passport');
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

router.patch('/:id', validateRegisterInput, async (req, res) => {
  try {
    let newHashedPass;
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
        if (err) throw err;
        newHashedPass = hashedPassword;
      });
    });
    User.updateOne({ _id: req.params.id },
      {
        username: req.body.username,
        hashedPassword: newHashedPass,
        email: req.body.email,
        image: req.body.image,
        location: req.body.location
      });
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
