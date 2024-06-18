const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const testRouter = require('./routes/testRoutes');
const groupRouter = require('./routes/groupRoutes');
const reportRouter = require('./routes/reportRouter');

dotenv.config({ path: './config.env' });

const app = express();

// Allow CORS for GET requests on all routes
app.use(
  cors({
    methods: ['GET'],
  }),
);

// Allow CORS for POST requests on /api/v1/reports only from specific origin
app.use(
  '/api/v1/reports',
  cors({
    origin: 'https://telegrambottest-eacl.onrender.com',
    methods: ['POST'],
    credentials: true,
  }),
);

// Allow CORS for specific origins and methods for other routes
app.use(
  cors({
    origin: [
      'https://gogreenapp.vercel.app',
      'https://58ad-37-161-174-167.ngrok-free.app',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(compression());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/test', testRouter);
app.use('/api/v1/groups', groupRouter);
app.use('/api/v1/reports', reportRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server `, 404));
});

app.use(globalErrorHandler);

module.exports = { app };

// momentaneamente disabilitato - da verificare
// const limiter = rateLimit({
//   max: 5000, //max request per hour
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many request from this IP, please try again in an hour',
// }); // 429 Error

// momentaneamente disabilitato - da verificare
// app.use('/api', limiter);
