const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const Category = require('../models/category');
const Product = require('../models/product');
const categoryValidator = require('../utils/categoryValidator');

exports.category_list = asyncHandler(async (req, res) => {
  const allCategories = await Category.find({}, 'name').exec();

  res.render('category_list', { title: 'Category list', allCategories });
});

exports.category_details = asyncHandler(async (req, res, next) => {
  const [category, productsByCategory] = await Promise.all([
    Category.findById(req.params.id),
    Product.find({ categories: req.params.id }, 'name'),
  ]);

  if (!category) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  res.render('category_details', {
    title: 'Category details',
    category,
    products: productsByCategory,
  });
});

exports.category_create_get = (req, res) => {
  res.render('category_form', { title: 'Create category' });
};

exports.category_create_post = [
  categoryValidator,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create category',
        category,
        errors: errors.array(),
      });
      return;
    }

    await category.save();
    res.redirect(category.url);
  }),
];

exports.category_delete_get = asyncHandler(async (req, res) => {
  res.send('Not implemented: category delete get');
});

exports.category_delete_post = asyncHandler(async (req, res) => {
  res.send('Not implemented: category delete post');
});

exports.category_update_get = asyncHandler(async (req, res) => {
  res.send('Not implemented: category update get');
});

exports.category_update_post = asyncHandler(async (req, res) => {
  res.send('Not implemented: category update post');
});
