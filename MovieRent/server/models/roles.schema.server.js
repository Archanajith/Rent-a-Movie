const mongoose = require('mongoose');

const rolesSchema = mongoose.Schema({
                                           role: {
                                               type: String,
                                               required: true
                                           }
                                       }, {collection: 'roles'});
module.exports = rolesSchema;