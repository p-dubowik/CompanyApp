const Product = require('../models/products.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRandom = async (req, res) => {
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
};

exports.getById = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if(!prod) res.status(404).json({ message: 'Not Found...' });
    else res.json(prod);
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.post = async (req, res) => {
  const { name, client } = req.body;

  try {
    const newProduct = await new Product({ name: name, client: client });
    newProduct.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
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
};

exports.delete = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if(!prod) res.status(404).json({ message: 'Not Found...' });
    else {
      await Product.deleteOne({ _id: req.params.id });
      res.json({message: 'OK' });
    };
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
};
