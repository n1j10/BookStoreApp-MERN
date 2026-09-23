const User = require('../models/User.model');
module.exports = { findByEmail: (email) => User.findOne({ email }), findPublicById: (id) => User.findById(id).select('-password'), create: (attributes) => new User(attributes).save() };
