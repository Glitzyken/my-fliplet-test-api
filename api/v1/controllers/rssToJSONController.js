const axios = require('axios');

const catchAsync = require('../../../utils/catchAsync');
const AppError = require('../../../utils/appError');

exports.convertRSStoJSON = catchAsync(async (req, res, next) => {
  const { query } = req;

  if (!query.rss_url) {
    return next(new AppError('`rss_url` parameter is required.', 400));
  }

  const rss2jsonUrl = `${process.env.RSS2JSON_BASE_URL}?rss_url=${query.rss_url}`;

  const result = await axios.get(rss2jsonUrl);

  res.status(200).json(result.data);
});
