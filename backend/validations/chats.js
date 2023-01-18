const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateChatInput = [
    check('users')
        .exists({ checkFalsy: true })
        .withMessage('Chat must have at least 1 participant'),
    handleValidationErrors
];

module.exports = validateChatInput;