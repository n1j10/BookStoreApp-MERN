require('dotenv').config();

const required = ['SECRET_KEY'];
const missing = required.filter((name) => !process.env[name]?.trim());
if (missing.length) {
  console.warn(`Warning: Missing environment variable(s): ${missing.join(', ')}`);
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 3000,
  MONGO_URI: process.env.MONGO_URI,
  SECRET_KEY: process.env.SECRET_KEY,
};
