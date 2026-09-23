const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.headers.origin) res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.get('/', (req, res) => res.json({ message: 'Server is live ...' }));
app.use(routes);
app.use(errorMiddleware);

module.exports = app;
