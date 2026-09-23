const User = require('../models/User.model');
module.exports = { findById: (id) => User.findById(id).select('-password') };
