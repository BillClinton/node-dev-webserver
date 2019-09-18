if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    location: 'Philadelphia'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About the app',
    location: 'Philadelphia'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    msg: 'This is a helpful help message'
  });
});

app.get('/weatherold', (req, res) => {
  res.send({
    forecast: 'sunny',
    location: 'Philadelphia'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }
  geocode(req.query.address, (error, { long, lat, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast({ long, lat }, (error, { msg } = {}) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        forecast: msg,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/help*', (req, res) => {
  res.render('404', {
    title: '404 Not found.',
    msg: 'The requested help article was not found.'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Not found.',
    msg: 'Check your address.'
  });
});

app.listen(port, () => {
  console.log('Webserver started on port :' + port);
});
