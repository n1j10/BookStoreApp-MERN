const Product = require('../models/Product.model');
module.exports = { list: () => Product.find().populate('category', 'name'), findById: (id) => Product.findById(id).populate('category', 'name') };
