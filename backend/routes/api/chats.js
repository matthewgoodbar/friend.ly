const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Message = mongoose.model('Message');

router.get('/', async (req, res) => {
    res.json({
        message: 'GET /api/chats'
    });
});

router.get('/:id', async (req, res) => {
    res.json({
        message: 'GET /api/chats/:id'
    });
});

router.post('/', async (req, res, next) => {
    res.json({
        message: 'POST /api/chats'
    });
});

module.exports = router;