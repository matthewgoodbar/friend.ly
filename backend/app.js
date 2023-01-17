//REQUIREMENTS
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');
const cors = require('cors');
const csurf = require('csurf');
require('./models/User');
require('./models/Chat');
require('./models/Message');
require('./models/Topic');
require('./config/passport');
const passport = require('passport');
const { isProduction } = require('./config/keys');

//USES
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

if (!isProduction) {
    app.use(cors());
}

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

//ROUTERS
const usersRouter = require('./routes/api/users');
const chatsRouter = require('./routes/api/chats');
const messagesRouter = require('./routes/api/messages');
const csrfRouter = require('./routes/api/csrf');
app.use('/api/users', usersRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/csrf', csrfRouter);


//SOCKET IO MANAGER
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001"
    }
});

io.on("connection", (socket) => {

    socket.on("setup", (userData) => {
        socket.join("chat");
        socket.emit("connected");
    });


    socket.on("new message", (msgObj) => {
        console.log("message arrived")
        socket.to("chat").emit("message recieved", msgObj);
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});


//ERROR LOGGING
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});

const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    })
});

module.exports = app;
