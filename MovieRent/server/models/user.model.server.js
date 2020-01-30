const mongoose = require('mongoose');
const userSchema = require('./user.schma.server');
const userModel = mongoose.model('UserModel', userSchema);
module.exports = userModel;