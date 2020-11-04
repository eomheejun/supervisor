const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const methodOverride = require('method-override');
 
const app = express(); 
const usersRoutes  = require('./routes/api/users');
const mainRoutes = require('./routes/api/main');
const port = 3000;


app.locals.pretty =true;
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(passport.initialize());
require('./config/passport')(passport);

app.set('view engine', 'jade');
app.set('views','./views');

const db = require("./config/keys").mongoURI;

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB connectes..'))
    .catch(err => console.log(err));

app.use('/users', usersRoutes);
app.use('/main', mainRoutes);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});