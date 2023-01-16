const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');

router.get('/', async (req, res) => {
    res.json({
        message: 'GET /api/messages'
    });
});

router.get('/:id', async (req, res) => {
    res.json({
        message: 'GET /api/messages/:id'
    });
});

router.post('/', async (req, res, next) => {
    res.json({
        message: 'POST /api/messages'
    });
});

module.exports = router;