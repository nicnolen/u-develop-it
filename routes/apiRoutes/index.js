/* index.js is a central hub to pull all the files together */
// Import dependencies
const express = require('express');
const router = express.Router();

router.use(require('./candidateRoutes'));

module.exports = router;
