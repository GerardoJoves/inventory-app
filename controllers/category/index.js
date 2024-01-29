const asyncHandler = require('express-async-handler');
const { ObjectId } = require('mongoose').Types;
const { validationResult } = require('express-validator');
const Category = require('../../models/category');
const Product = require('../../models/product');
const categoryValidator = require('./validation');

exports.category_list = asyncHandler(async (req, res) => {
  const allCategories = await Category.find({}, 'name').exec();

  res.render('category_list', { title: 'Category list', allCategories });
});

exports.category_details = asyncHandler(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    // Prevent Category.findById from throwing if called with invalid id
    req.params.id = null;
  }

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
  if (!ObjectId.isValid(req.params.id)) {
    res.redirect('/catalog/categories');
    return;
  }

  const [category, productsByCategory] = await Promise.all([
    Category.findById(req.params.id, 'name').exec(),
    Product.find({ categories: req.params.id }, 'name').exec(),
  ]);

  if (!category) {
    res.redirect('/catalog/categories');
    return;
  }

  res.render('category_delete', {
    title: 'Delete category',
    category,
    products: productsByCategory,
  });
});

exports.category_delete_post = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.redirect('/catalog/categories');
    return;
  }

  const [category, productsByCategory] = await Promise.all([
    Category.findById(req.params.id),
    Product.find({ categories: req.params.id }),
  ]);

  if (productsByCategory.length > 0) {
    res.render('category_delete', {
      title: 'Delete category',
      category,
      products: productsByCategory,
    });
    return;
  }

  await Category.findByIdAndDelete(req.params.id);
  res.redirect('/catalog/categories');
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = ObjectId.isValid(req.params.id)
    ? await Category.findById(req.params.id)
    : null;

  if (!category) {
    const error = new Error('Category not found');
    error.status = 404;
    return next(error);
  }

  res.render('category_form', { title: 'Update category', category });
});

exports.category_update_post = [
  categoryValidator,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const categoryId = ObjectId.isValid(req.params.id) ? req.params.id : null;
    const category = new Category({
      _id: categoryId,
      name: req.body.name,
      description: req.body.description,
    });

    if (categoryId === null) {
      const error = new Error('Category not found');
      error.status = 404;
      return next(error);
    }

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Update category',
        category,
        errors: errors.array(),
      });
      return;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      category
    );
    res.redirect(updatedCategory.url);
  }),
];
