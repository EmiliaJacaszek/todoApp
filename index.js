// SETUP
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;

// ROUTES
const users = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/home');
const todo_list = require('./routes/todo-list');

dotenv.config();

// CHECK JWT KEY
if (!process.env.jwtPrivateKey) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err));


// APP SET/USE
app.set('view engine', 'ejs');

app.use(express.static('public'))

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/todo-list', todo_list);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);

// RUN SERVER
app.listen(port, () => console.log(`Listening on port ${port}`));