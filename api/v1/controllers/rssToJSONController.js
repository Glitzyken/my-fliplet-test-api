const axios = require('axios');

const { setCache, getCache } = require('../../shared/cacheHandler');

const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../utils/appError');

exports.convertRSStoJSON = catchAsync(async (req, res, next) => {
  const { query } = req;
  const cacheKey = req.originalUrl || req.url;

  if (!query.rss_url) {
    return next(new AppError('`rss_url` parameter is required.', 400));
  }

  const rss2jsonUrl = `${process.env.RSS2JSON_BASE_URL}?rss_url=${query.rss_url}`;

  // Get cache
  const cachedBody = getCache(cacheKey);

  if (!cachedBody) {
    const result = await axios.get(rss2jsonUrl);

    // Set cache
    const success = setCache(cacheKey, result.data);

    if (success) {
      console.log('SET CACHE! ✅');
    }

    res.status(200).json(result.data);
  } else {
    console.log('SENDING CACHED...🍫');
    res.status(200).json(cachedBody);
  }
});
