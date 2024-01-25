const asyncHandler = require('express-async-handler');
const Category = require('../models/category');

exports.category_list = asyncHandler(async (req, res) => {
  const allCategories = await Category.find({}, 'name').exec();

  res.render('category_list', { title: 'Category list', allCategories });
});

exports.category_details = asyncHandler(async (req, res) => {
  res.send('Not implemented: category details');
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
