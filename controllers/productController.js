const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res) => {
  res.send('Not implemented: home page');
});

exports.product_list = asyncHandler(async (req, res) => {
  res.send('Not implemented: product list');
});

exports.product_details = asyncHandler(async (req, res) => {
  res.send('Not implemented: product details');
});

exports.product_create_get = asyncHandler(async (req, res) => {
  res.send('Not implemented: product create get');
});

exports.product_create_post = asyncHandler(async (req, res) => {
  res.send('Not implemented: product create post');
});

exports.product_delete_get = asyncHandler(async (req, res) => {
  res.send('Not implemented: product delete get');
});

exports.product_delete_post = asyncHandler(async (req, res) => {
  res.send('Not implemented: product delete post');
});

exports.product_update_get = asyncHandler(async (req, res) => {
  res.send('Not implemented: product update get');
});

exports.product_update_post = asyncHandler(async (req, res) => {
  res.send('Not implemented: product update post');
});
