const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express Config
const publicDIR = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDIR))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mads Borggaard'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mads Borggaard'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mads Borggaard'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({ error: 'You must provide an adress!' })
    }

    geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecast,
                adress: req.query.adress
            })
        })
    })

    // res.send({
    //     adress: req.query.adress,
    //     location: 'Ågade 14, Lemvig',
    //     Forecast: 'Regnbyger om aftenen og natten. The temp is 7.4 and there is 0.09% chance for rain'
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        title: 'Help 404',
        name: 'Mads Borggaard',
        errormsg: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Mads Borggaard',
        errormsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
