const { body } = require('express-validator');

module.exports = [
  body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('description').optional({ values: 'falsy' }).trim().escape(),
];
