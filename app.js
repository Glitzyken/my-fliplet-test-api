const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./api/shared/errorHandler');
const apiVersions = require('./api/index');

const app = express();

app.enable('trust proxy');

// GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
app.options('*', cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set security HTTP headers
app.use(helmet());

// Limit each IP to 100 requests per windowMs
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many requests from this IP, please try again in 15 minutes!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

// ROUTES
app.use('/api', apiVersions);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
