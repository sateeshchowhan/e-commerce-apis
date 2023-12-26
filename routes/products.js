// products.js
const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');

// Add Product
router.post('/add', async (req, res) => {
  try {
    const { imgUrl, title, description, price } = req.body;
    const newProduct = new Product({ imgUrl, title, description, price });
    await newProduct.save();
    res.json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Get All Products API (/api/products):
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

 // Delete Product API (/api/products/delete/:productId):
router.delete('/delete/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      await Product.deleteOne({ _id: productId });
      res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

//Update Product API (/api/products/update/:productId):
router.put('/update/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const { imgUrl, title, description, price } = req.body;
      await Product.updateOne({ _id: productId }, { imgUrl, title, description, price });
      res.json({ success: true, message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

// Get Single Product API (/api/products/:productId):
router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
