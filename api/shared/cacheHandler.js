const NodeCache = require('node-cache');

const cache = new NodeCache();

exports.getCache = (key) => cache.get(key);

exports.setCache = (key, val) => cache.set(key, val, 10000);
