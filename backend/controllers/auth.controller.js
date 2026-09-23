const authService = require('../services/auth.service');
module.exports = { getById: async (req, res) => { const user = await authService.findPublicById(req.params.id); return user ? res.json({ user }) : res.status(404).json({ message: 'User Not Found' }); } };
