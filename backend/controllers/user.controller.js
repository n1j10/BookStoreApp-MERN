const userService = require('../services/user.service');
module.exports = { getById: async (req, res) => { const user = await userService.findById(req.params.id); return user ? res.json({ user }) : res.status(404).json({ message: 'User Not Found' }); } };
