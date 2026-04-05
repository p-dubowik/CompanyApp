const express = require('express');
const router = express.Router();
const Product = require('../models/products.model');

router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const random = Math.floor(Math.random() * count);
    const prod = await Product.find().skip(random)
    if(prod) res.json(prod);
    else res.status(404).json({ message: 'Not found...'})
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if(!prod) res.status(404).json({ message: 'Not Found...' });
    else res.json(prod);
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/products', async (req, res) => {
  const { name, client } = req.body;

  try {
    const newProduct = await new Product({ name: name, client: client });
    newProduct.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;
  
  try {
    const prod = await Product.findById(req.params.id);
    if(prod){
      Product.updateOne({ _id: req.params.id }, { name: name, client: client });
      res.json({message: 'OK' });
    }
    else res.status(404).json({ message: 'Not Found...' });
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if(!prod) res.status(404).json({ message: 'Not Found...' });
    else {
      Product.deleteOne({ _id: req.params.id });
      res.json({message: 'OK' });
    };
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
