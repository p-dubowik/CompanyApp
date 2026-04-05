const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const cors = require('cors');


const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');



mongoClient.connect('mongodb://0.0.0.0:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err){
    console.log(err);
  }
  else {
    console.log('Successfully connected to the database');
    const db = client.db('companyDB');

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    //Establish db connection in all endpoints
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use('/api', employeesRoutes);
    app.use('/api', departmentsRoutes);
    app.use('/api', productsRoutes);

    app.use((req, res) => {
      res.status(404).send({ message: 'Not found...' });
    })

    app.listen('8000', () => {
      console.log('Server is running on port: 8000');
    });

    //test 1
    db.collection('employees')
      .find({ department: 'IT' })
      .toArray()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //test 2
    db.collection('employees')
      .findOne({ department: 'IT' })
      .then((item) => {
        console.log(item);
      })
      .catch((err) => {
        console.log(err);
      });

    //test 3
    db.collection('departments')
      .insertOne({ name: 'Menagement' })
      .catch((err) => {
        console.log(err);
      });

    //test 4
    db.collection('employees')
      .updateOne({ department: 'IT' }, { $set: { salary: 6000 }})
      .catch((err) => {
        console.log(err);
      });

    //test 5
    db.collection('departments')
      .deleteOne({ name: 'Menagement' })
      .catch((err) => {
        console.log(err);
      });



  }
});