const serverless = require('serverless-http');
const app = require('../api/index.js'); // Correct the path to index.js

module.exports = serverless(app);