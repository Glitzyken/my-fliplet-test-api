const express = require('express');

const rssToJSONRouter = require('./rssToJSONRoutes');

const router = express.Router();

router.use('/rss-to-json', rssToJSONRouter);

module.exports = router;
