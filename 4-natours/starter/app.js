const express = require('express');
// const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.static(`${__dirname}/public`));
//MIDDLEWARES
// if ((process.env.NODE_ENV = 'development')) {
//   //logging middleware
//   app.use(morgan('dev'));
// }

//Modify the incoming request using express.json middleware
//Middlewares are used for modifying requests before it reaches the end response
app.use(express.json());
app.use(express.static(`${__dirname}/public/`));

//USER ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;
