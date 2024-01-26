const asyncHandler = require('express-async-handler');
const Product = require('../models/product');
const Category = require('../models/category');

exports.index = asyncHandler(async (req, res) => {
  const [numProducts, numCategories] = await Promise.all([
    Product.countDocuments().exec(),
    Category.countDocuments().exec(),
  ]);

  res.render('index', {
    title: 'Record counts',
    numProducts,
    numCategories,
  });
});

exports.product_list = asyncHandler(async (req, res) => {
  const allProducts = await Product.find({}, 'name price').exec();

  res.render('product_list', { title: 'Product list', allProducts });
});

exports.product_details = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate('categories')
    .exec();

  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }

  res.render('product_details', { title: 'Product details', product });
});

exports.product_create_get = asyncHandler(async (req, res) => {
  const allCategories = await Category.find({}, 'name').exec();

  res.render('product_form', {
    title: 'Create product',
    categories: allCategories,
  });
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
