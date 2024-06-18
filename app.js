//app.js
const express = require('express');
const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const hpp = require('hpp');
const compression = require('compression');
const cookieParser = require('cookie-parser'); // Aggiunto il middleware cookie-parser x jwt
const dotenv = require('dotenv');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const testRouter = require('./routes/testRoutes');
const groupRouter = require('./routes/groupRoutes');
const reportRouter = require('./routes/reportRouter'); // Import the 'reportRouter' module

dotenv.config({ path: './config.env' });

const app = express();
//Abilita CORS per tutte le richieste
app.use(cors());

app.use(cookieParser()); // Middleware per il parsing dei cookie

// NOTE 1) GLOBAL MIDLLEWAREs
//Set security HTTP headers
app.use(helmet());
// Development loggin

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// momentaneamente disabilitato - da verificare
// const limiter = rateLimit({
//   max: 5000, //max request per hour
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many request from this IP, please try again in an hour',
// }); // 429 Error

// momentaneamente disabilitato - da verificare
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // Middleware add the data from the body to the request object

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitazation agains XSS
app.use(xss());

// Prevent parameter pollution

app.use(compression());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

//2) ROUTES

app.use('/test', testRouter);

// // app.use('/api/v1/users', userRouter);
app.use('/api/v1/groups', groupRouter);
app.use('/api/v1/reports', reportRouter);
// app.use('/api/v1/stats', statRouter);

// set route for all no match routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find${req.originalUrl} on this server `, 404));
});

//Global Error Handling Middleware - 4 argument express recognize is a error middleware
app.use(globalErrorHandler);

module.exports = { app }; //
