
const mongoose = require('mongoose');
const rolesSchema = require('./roles.schema.server');
const rolesModel = mongoose.model('RolesModel', rolesSchema);
module.exports = rolesModel;