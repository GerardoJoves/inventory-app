const { body } = require('express-validator');
const isValidImage = require('../../utils/isValidImage');

module.exports = [
  body('categories').customSanitizer((value) => {
    if (Array.isArray(value)) return value;
    return typeof value === 'undefined' ? [] : [value];
  }),

  body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),

  body('description', 'Description must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body('price', "Price can't be less than 0").isNumeric({ min: 0 }),

  body('number_in_stock')
    .isInt({ min: 0 })
    .withMessage('Number in stock must be an integer'),

  body('categories.*').escape(),

  body('product_image')
    .custom((value, { req }) => {
      if (!req.file) return true;
      return isValidImage(req.file);
    })
    .withMessage('Invalid product image'),
];
