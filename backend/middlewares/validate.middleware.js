module.exports = (validator) => (req, res, next) => {
  const { error, value } = validator(req.body);
  if (error) return res.status(400).json({ message: error.message });
  req.body = value;
  next();
};
