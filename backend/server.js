require('dotenv').config();
const http = require('http');

const app = require('./app');

(async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error occurred:', error);
    process.exit(1);
  }
})();
