const env = require('./config/env');
const app = require('./app');
const { connectDB, closeDB } = require('./config/db');
const logger = require('./config/logger');

async function startServer() {
  await connectDB();
  const server = app.listen(env.PORT, () => logger.info(`Server is running on port ${env.PORT}`));
  const shutdown = async () => server.close(async () => { await closeDB(); process.exit(0); });
  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
}

if (require.main === module) startServer().catch((error) => { logger.error('Server startup failed:', error); process.exit(1); });
module.exports = app;

