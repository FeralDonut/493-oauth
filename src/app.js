// require('dotenv').config();
// var cors = require('cors');
// express library exposes a single fucntion used to create a new express application
const express = require('express');
const path = require('path');
const hbs = require('hbs');

console.log(__dirname);
console.log(path.join(__dirname, '../public/index.html'));

// express doesnt take in any arguements
// we configure our server by using various methods on the app itself.
const app = express();
const port = process.env.PORT || 3000;
// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions));

// app.options('*', cors());
// defines path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engin and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Sign In Page',
    name: 'Jose-Antonio D. Rubio',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Jose-Antonio'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Jose-Antonio D. Rubio',
    message: 'Help! I need somebody.',
  })
});


app.get('/help/*', (req, res) => {
  res.render('404',{
    title: '404 ERROR',
    name: "Jose-Antonio D. Rubio",
    errorMessage: 'Help Article Not Found!',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: "404 ERROR",
    name: "Jose-Antonio D. Rubio",
    errorMessage: "Page not found"
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port)
});