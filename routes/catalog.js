const express = require('express');
const productController = require('../controllers/prodcutController');

const router = express.Router();

// Product routes

router.get('/products', productController.product_list);

router.get('/product/create', productController.product_create_get);

router.post('/product/create', productController.product_create_post);

router.get('/product/:id/delete', productController.product_delete_get);

router.post('/poduct/:id/delete', productController.product_delete_post);

router.get('/product/:id/update', productController.product_update_get);

router.post('/product/:id/update', productController.product_update_post);

router.get('/product/:id', productController.product_details);

module.exports = router;
