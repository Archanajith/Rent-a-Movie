const mongoose = require('mongoose');
const CustomerSchema = require('./customer.schema.server.js');
const EmployeeSchema = require('./employee.schema.server.js');
module.exports = mongoose.Schema({
                                     firstname: {
                                         type: String,
                                         required: true
                                     },
                                     lastname: {
                                         type: String,
                                         required: true
                                     },
                                     password: String,
                                     email: {
                                         type: String,
                                         required: true
                                     },
                                     dateofbirth: {
                                         type: Date,
                                         required: true
                                     },
                                     customer: CustomerSchema,
                                     employee: EmployeeSchema,
                                     phone: {
                                         type: mongoose.Schema.Types.ObjectId,
                                         ref: 'PhoneModel'
                                     },
                                     phone_Primary: {
                                         type: mongoose.Schema.Types.ObjectId,
                                         ref: 'PhoneModel'
                                     },
                                     address: {
                                         type: mongoose.Schema.Types.ObjectId,
                                         ref: 'AddressModel'
                                     },
                                 }, {collection: 'users'});