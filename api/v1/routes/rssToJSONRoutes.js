const express = require('express');
const rssToJSONController = require('../controllers/rssToJSONController');

const router = express.Router();

router.route('/').get(rssToJSONController.convertRSStoJSON);

module.exports = router;
