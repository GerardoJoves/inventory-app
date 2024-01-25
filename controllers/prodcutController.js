const asyncHandler = require('express-async-handler');

exports.index = asyncHandler((req, res) => {
  res.send('Not implemented: home page');
});

exports.product_list = asyncHandler((req, res) => {
  res.send('Not implemented: product list');
});

exports.product_details = asyncHandler((req, res) => {
  res.send('Not implemented: product details');
});

exports.product_create_get = asyncHandler((req, res) => {
  res.send('Not implemented: product create get');
});

exports.product_create_post = asyncHandler((req, res) => {
  res.send('Not implemented: product create post');
});

exports.product_delete_get = asyncHandler((req, res) => {
  res.send('Not implemented: product delete get');
});

exports.product_delete_post = asyncHandler((req, res) => {
  res.send('Not implemented: product delete post');
});

exports.product_update_get = asyncHandler((req, res) => {
  res.send('Not implemented: product update get');
});

exports.product_update_post = asyncHandler((req, res) => {
  res.send('Not implemented: product update post');
});
