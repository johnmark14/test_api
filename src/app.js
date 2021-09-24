const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const portEnv = process.env.PORT || 300

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static engine and views location
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "John  Doe"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "John  Doe"
    })
})

app.get('/search', (req, res) => {
    if(!req.query.value) {
        return res.send({
            error: 'You must provide a value'
        })
    } else {
        res.send(`<h1>${req.query.value}</h1>`)
    }
})

app.get('*', (req, res) => {
    res.send('404 not found')
})

app.listen(portEnv, () => {
    console.log(`Server is up on port ${portENV}`)
})