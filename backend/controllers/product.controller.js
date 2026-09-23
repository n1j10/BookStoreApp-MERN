const productService = require('../services/product.service');
module.exports = { list: async (req, res) => res.json(await productService.list()) };
