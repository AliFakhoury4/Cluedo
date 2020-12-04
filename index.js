const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const gameRoute = require('./routes/game');
const playerRoute = require('./routes/player');
const logger = require('./middleware/logger');

const app = express();

app.use(bodyParser.json());
app.use('/game', gameRoute);
app.use('/player', playerRoute);

// Connect to DB
mongoose.connect("mongodb+srv://AliFakhoury:cluedo123@cluster0.xlk01.mongodb.net/Cluedo?retryWrites=true&w=majority", {useNewUrlParser: true}, () => {
	console.log("Connected!");
});

//init middleware
// app.use(logger);



// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: __dirname+'/views/layouts/'}));
app.set('view engine', 'handlebars');

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/images', express.static(__dirname + '/views/images'));

app.get('/', (req, res) => {
	res.redirect('/authentication');
});

app.get('/authentication', (req, res) => {
	res.render('authentication');
})

app.get('/homepage', (req, res) => {
	res.render('homepage');
});

//setting static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));