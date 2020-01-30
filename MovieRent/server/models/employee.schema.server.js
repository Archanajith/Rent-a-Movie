const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
                                           employeeKey: {
                                               type: String,
                                               required: true
                                           },
                                           startDate: {
                                               type: Date,
                                               required: true
                                           },
                                           manager: [this]
                                       }, {collection: 'employee'});
module.exports = employeeSchema;