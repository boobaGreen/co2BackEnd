// middlewares/checkOrigin.js

const allowedOrigins = ['https://telegrambottest-eacl.onrender.com'];

const checkOrigin = (req, res, next) => {
  if (req.method === 'POST') {
    const origin = req.get('Origin');
    if (!allowedOrigins.includes(origin)) {
      console.log('Forbidden-origin :', origin);
      return res.status(403).json({ status: 'fail', message: 'Forbidden' });
    }
  }
  next();
};

module.exports = checkOrigin;
