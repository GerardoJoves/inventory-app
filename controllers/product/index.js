const path = require('path');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { ObjectId } = require('mongoose').Types;
const productValidation = require('./validation');
const upload = require('../../middleware/upload');
const imageKit = require('../../config/imageKit');
const Product = require('../../models/product');
const Category = require('../../models/category');

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
  if (!ObjectId.isValid(req.params.id)) {
    // Prevent Product.findById from throwing when called with invalid id
    req.params.id = null;
  }

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

exports.product_create_post = [
  upload.single('product_image'),

  productValidation,

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      categories: req.body.categories,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find({}, 'name').exec();

      allCategories.forEach((category) => {
        if (!product.categories.includes(category._id)) return;
        category.checked = true;
      });

      res.render('product_form', {
        title: 'Create product',
        categories: allCategories,
        product,
        errors: errors.array(),
      });
      return;
    }

    if (req.file) {
      const fileResponse = await imageKit.upload({
        file: req.file.buffer.toString('base64'),
        fileName: Date.now() + path.extname(req.file.originalname),
        folder: 'inventory_app',
      });

      product.image = {
        file_id: fileResponse.fileId,
        url: fileResponse.url,
      };
    }

    await product.save();
    res.redirect(product.url);
  }),
];

exports.product_delete_get = async (req, res) => {
  const product = ObjectId.isValid(req.params.id)
    ? await Product.findById(req.params.id, 'name').exec()
    : null;

  if (!product) {
    res.redirect('/catalog/products');
    return;
  }

  res.render('product_delete', {
    title: 'Delete product',
    product,
  });
};

exports.product_delete_post = asyncHandler(async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct && deletedProduct.image.file_id) {
      await imageKit.deleteFile(deletedProduct.image.file_id);
    }
  }

  return res.redirect('/catalog/products');
});

exports.product_update_get = asyncHandler(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    // Prevent Product.findById from throwing when called with invalid id
    req.params.id = null;
  }

  const [product, categories] = await Promise.all([
    Product.findById(req.params.id).exec(),
    Category.find({}, 'name').exec(),
  ]);

  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    return next(error);
  }

  categories.forEach((category) => {
    if (!product.categories.includes(category._id)) return;
    category.checked = true;
  });

  res.render('product_form', {
    title: 'Upadate product',
    product,
    categories,
  });
});

exports.product_update_post = [
  productValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const productId = ObjectId.isValid(req.params.id) ? req.params.id : null;
    const product = new Product({
      _id: productId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      categories: req.body.categories,
    });

    if (productId === null) {
      const error = new Error('Product not found');
      error.status = 404;
      return next(error);
    }

    if (!errors.isEmpty()) {
      const allCategories = await Category.find({}, 'name');

      res.render('product_form', {
        title: 'Update product',
        product,
        categories: allCategories,
        errors: errors.array(),
      });
      return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, product);
    res.redirect(updatedProduct.url);
  }),
];
