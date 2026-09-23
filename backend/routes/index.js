const router = require('express').Router();

router.use('/users', require('./auth.routes'));
router.use('/books', require('./product.routes'));
router.use('/category', require('./category.routes'));
router.use('/carts', require('./cart.routes'));
router.use('/admin', require('./admin.routes'));

module.exports = router;
