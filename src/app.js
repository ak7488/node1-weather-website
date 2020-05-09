const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geolocation = require('./util/geocode.js')
const forecast = require('./util/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define path for express confin
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../tamplates/views')
const partialPath = path.join(__dirname, '../tamplates/partials')

//setup handelbar engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Kunal.com',
        name: 'Kunal Kumar',
        developer: 'kunal kumar'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Kunal Kumar',
        developer: 'Anubhav anand'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        contact: 'contact: 7488599080',
        helpLine: 'helpline: 7371856763',
        developer: 'Kunal Kumar'
    })
})

app.get('/product', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.adress){
        return res.send({
            error: 'adress must be provided'
        })
    }
    geolocation(req.query.adress, (error,{latitude,longitude,location} = {}) => {
        if(error){
           return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error,forecastdata) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                weather_descriptions: forecastdata.weather_descriptions,
                temperature: forecastdata.temperature,
                feelslike: forecastdata.feelslike,
                location: location
            })
        })
    })
    // res.send({
    //     place: 'supaul',
    //     temperature: 5000,
    //     adress: req.query.adress
    // })
})

app.get('/help/*', (req,res)=> {
    res.render('helpError', {
        error: 'Help artical not found'
    })
})

app.get('*', (req,res) => {
    res.render('gerror',{
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})