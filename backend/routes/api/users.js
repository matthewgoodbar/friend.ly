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
    email: req.user.email
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
