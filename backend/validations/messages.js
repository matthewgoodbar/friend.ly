const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateMessageInput = [
    check('author')
        .exists({ checkFalsy: true })
        .withMessage('Messagemust belong to an author'),
    check('body')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 400 })
        .withMessage('Message must be between 1 and 400 characters'),
    check('chat')
        .exists({ checkFalsy: true })
        .withMessage('Message must belong to a chat'),
    handleValidationErrors
];

module.exports = validateMessageInput;