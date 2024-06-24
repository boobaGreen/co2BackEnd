const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const testRouter = require('./routes/testRoutes');
const groupRouter = require('./routes/groupRoutes');
const reportRouter = require('./routes/reportRouter');
const telegramRouter = require('./routes/telegramRouter'); // Importa il nuovo router
const userRouter = require('./routes/userRouter'); // Importa il nuovo router

dotenv.config({ path: './config.env' });

const app = express();

// Allow CORS for GET and POST requests on all routes
app.use(
  cors({
    methods: ['GET', 'POST'], // Aggiungi anche 'POST' per supportare la callback di Telegram
  }),
);

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

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
app.use('/api/v1/callback', telegramRouter); // Usa il router per le rotte di Telegram
app.use('/api/v1/user', userRouter); // Usa il router per le rotte di Telegram

// Gestione delle rotte non trovate
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Gestione degli errori globali
app.use(globalErrorHandler);

module.exports = { app };
