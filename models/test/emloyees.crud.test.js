const Employee = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    before(async () => {

        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
            console.error(err);
        }

    });

    describe('Reading data', () => {

        before(async () => {
            const testEmployeeOne = new Employee({ 
                firstName: 'John',
                lastName: 'Doe',
                department: 'Department #1'
            });
            await testEmployeeOne.save();

            const testEmployeeTwo = new Employee({ 
                firstName: 'Amanda',
                lastName: 'Smith',
                department: 'Department #2'
            });
            await testEmployeeTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;

            expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return a proper document by params with "findOne" method', async () => {
            const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe' });
            
            expect(employee).to.not.be.null;
            expect(employee.firstName).to.be.equal('John');
            expect(employee.lastName).to.be.equal('Doe');
        });

        after(async () => {
            await Employee.deleteMany();
        });

    });

    describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ 
                firstName: 'John',
                lastName: 'Doe',
                department: 'Department #1'
            });
            await employee.save();

            expect(employee.isNew).to.be.false;
        });

        after(async () => {
            await Employee.deleteMany();
        });

    });

    describe('Updating data', () => {

        beforeEach(async () => {
            const testEmployeeOne = new Employee({ 
                firstName: 'John',
                lastName: 'Doe',
                department: 'Department #1'
            });
            await testEmployeeOne.save();

            const testEmployeeTwo = new Employee({ 
                firstName: 'Amanda',
                lastName: 'Smith',
                department: 'Department #2'
            });
            await testEmployeeTwo.save();
        });


        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'John' }, { $set: { firstName: 'Albert' }});
            const updatedEmployee = await Employee.findOne({ firstName: 'Albert' });

            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'John' });
            employee.firstName = 'Albert';
            await employee.save();

            const updatedEmployee = await Employee.findOne({ firstName: 'Albert' });
            
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { department: 'Updated!' }});
            const employees = await Employee.find({ department: 'Updated!' });

            expect(employees.length).to.be.equal(2);
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

    });

    describe('Removing data', () => {

        beforeEach(async () => {
            const testEmployeeOne = new Employee({ 
                firstName: 'John',
                lastName: 'Doe',
                department: 'Department #1'
            });
            await testEmployeeOne.save();

            const testEmployeeTwo = new Employee({ 
                firstName: 'Amanda',
                lastName: 'Smith',
                department: 'Department #2'
            });
            await testEmployeeTwo.save();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'John'});
            const removedEmployee = await Employee.findOne({ firstName: 'John' });

            expect(removedEmployee).to.be.null;
        });

        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employees = await Employee.find();

            expect(employees.length).to.be.equal(0);
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

    });


});