const logger = require('../config/logger');

module.exports = (err, req, res, next) => {
  logger.error('Unhandled application error:', err);
  if (res.headersSent) return next(err);
  const statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500;
  return res.status(statusCode).json({ message: statusCode >= 500 ? 'Internal server error' : err.message });
};
