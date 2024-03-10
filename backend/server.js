require('dotenv').config();
const http = require('http');

const app = require('./app');
const connectDB = require('./src/config/db');

(async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
})();
