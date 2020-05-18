const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectory))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Nick Wohnhas'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Nick Wohnhas'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: 'This is some helpful content.',
    title: 'Help Page',
    name: 'Nick Wohnhas'
  })
})

app.get('/help/*', (req, res) => {
  res.render('error-page', {
    errorMessage: 'Help article not found!',
    title: 404
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send('Please provide an address')
  }
  const address = req.query.address
  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error: "Address not found." })
    }
    forecast(longitude, latitude, (error, data) => {
      res.send({ result: data, location: location })
    })
  })
})

app.get('/*', (req, res) => {
  res.render('error-page', {
    errorMessage: 'Page Not found.',
    title: 404
  })
})

app.listen(3000, () => {
  console.log('The webserver is up.')
})