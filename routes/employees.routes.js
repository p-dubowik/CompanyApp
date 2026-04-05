const express = require('express');
const router = express.Router();
const Employee = require('../models/employees.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find());
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const random = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(random);
    if(!emp) res.status(404).json({ message: 'Not found...' });
    else res.json(emp);
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(!emp) res.status(404).json({ message: 'Not found...' });
    else res.json(emp);
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName});
    newEmployee.save();
    res.json({ message: 'OK'});
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const emp = await Employee.findById(req.params.id);
    if(emp){
      await Employee.updateOne({ _id: req.params.id }, { firstName: firstName, lastName: lastName });
      res.json({message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(emp){
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.json({ message: 'OK' })
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
