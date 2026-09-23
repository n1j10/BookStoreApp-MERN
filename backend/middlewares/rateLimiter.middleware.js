const requests = new Map();
module.exports = ({ windowMs = 60_000, max = 120 } = {}) => (req, res, next) => {
  const key = req.ip || 'unknown'; const item = requests.get(key) || { count: 0, startedAt: Date.now() };
  if (Date.now() - item.startedAt > windowMs) Object.assign(item, { count: 0, startedAt: Date.now() });
  item.count += 1; requests.set(key, item);
  return item.count > max ? res.status(429).json({ message: 'Too many requests' }) : next();
};
