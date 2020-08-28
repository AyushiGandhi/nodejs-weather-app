const express = require('express');
const hbs = require('hbs');
const weather = require('./utils/weather');
const app = express();
const port = process.env.PORT || 3000;

const path = require('path');
const directoryPath = path.join('__dirname', '../public');
const viewsPath = path.join('__dirname', '../templates/views');
const partialPath = path.join('__dirname', '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(directoryPath));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
  })
});


app.get('/weather', (req, res) => {
  weather(req.query.address, (reject, data = {}) => {
    if (reject) {
      return res.send(reject)
    } else {
      res.send(data)
    }
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About'
  })
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help'
  })
});

// ERROR404
app.get('/help/*', (req, res) => {
  res.render('error404', {message: '404 /HELP/*'})
});
app.get('/about/*', (req, res) => {
  res.render('error404', {message: '404 /ABOUT/*'})
});
app.get('/weather/*', (req, res) => {
  res.render('error404', {message: '404 /WEATHER/*'})
});
app.get('*', (req, res) => {
  res.render('error404', {message: '404 Invalid Address'})
});
app.listen(port, () => {
  console.log('Server is Working : ' +port)
});

