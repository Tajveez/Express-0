const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger')
const users = require('./Users')

const app = express()

// Init middleware
// app.use(logger)

// Middleware for handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Handlebar views Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Users Application',
    users
}))

// Body parser middleware for API
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// // simple route handling
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'pub', 'index.html'), (err) => {
//         console.log('Getting Index file...')
//     })
// })

// Setting a static folder
app.use(express.static(path.join(__dirname,'pub')));

app.use('/api/users', require('./routes/api/users'))
// setting up default port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server started...'))