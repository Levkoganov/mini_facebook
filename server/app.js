// Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

//mongodb connection
const { mongodb } = require('./config.json')
require('./config/db_connection').db_connection(mongodb);

// Import all routers
const registerRouter = require('./routes/register_router');
const loginRouter = require('./routes/login_router');
const postRouter = require('./routes/post_router');
const usersRouter = require('./routes/user_router');

// Middlewares
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Set routers
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/posts', postRouter);
app.use('/users', usersRouter);

module.exports = app;
