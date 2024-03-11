require('dotenv').config();

const app = require('./app');
const connectDB = require('./src/config/db');
const { setupSocketHandlers } = require('./src/sockets');
const socket = require('./src/config/socket');

(async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    const server = socket.init(app);

    const io = socket.getIO();
    setupSocketHandlers(io);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
})();
