const Employee = require('../employees.model.js');
const mogoose = require('mongoose');
const expect = require('chai').expect;

describe('Employee', () => {

    it('should throw an error if no firstname arg', () => {
        const employee = new Employee({});

        employee.validateSync(err => {
            expect(err.errors.firstName).to.exist;
        });
    });

    it('should throw an error if "firstname" is not a string', () => {

        const cases = [{}, []];
        for(let name of cases) {
            const employee = new Employee({ name });

            employee.validateSync(err => {
            expect(err.errors.firstName).to.exist;
            });
        }
    });

    it('should throw an error if no lastname arg', () => {
        const employee = new Employee({});

        employee.validateSync(err => {
            expect(err.errors.lastName).to.exist;
        });
    });

    it('should throw an error if "lastname" is not a string', () => {

        const cases = [{}, []];
        for(let name of cases) {
            const employee = new Employee({ name });

            employee.validateSync(err => {
            expect(err.errors.lastName).to.exist;
            });
        }
    });

    it('should throw an error if no department arg', () => {
        const employee = new Employee({});

        employee.validateSync(err => {
            expect(err.errors.department).to.exist;
        });
    });

    it('should throw an error if "department" is not a string', () => {

        const cases = [{}, []];

        for(let department of cases) {
            const employee = new Employee({ department });

            employee.validateSync(err => {
            expect(err.errors.department).to.exist;
            });
        }
    });

    it('should not throw an error if data is correct', () => {

        const cases = [
            {
                firstName: 'John',
                lastName: 'Doe',
                department: 'Management'
            },
            {
                firstName: 'Jane',
                lastName: 'Doe',
                department: 'IT'
            }
        ];

        for(let empData of cases) {
            const employee = new Employee({ empData });

            employee.validateSync(err => {
                expect(err).to.exist;
            });
        }
    });
    
});