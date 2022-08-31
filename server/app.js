// Dependencies
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require("dotenv").config()

//mongodb connection
require('./config/db_connection').db_connection(process.env.MONGODB_URI);

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


// Production env
app.use(express.static("../client/build"));
app.get("*", (req,res) => {
  res.sendFile(path.resolve(__dirname, '../client', "build", "index.html"))
})


module.exports = app;
