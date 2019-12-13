const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const users = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/home');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/todoapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const app = express();


app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cookieParser());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));