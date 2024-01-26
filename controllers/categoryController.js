const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const Product = require('../models/product');

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

exports.category_create_get = asyncHandler(async (req, res) => {
  res.send('Not implemented: category create get');
});

exports.category_create_post = asyncHandler(async (req, res) => {
  res.send('Not implemented: category create post');
});

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
