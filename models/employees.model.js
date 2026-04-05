const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    department: { type: ObjectId }
})

module.exports = mongoose.model('Employee', employeeSchema);