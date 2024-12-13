const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const { getCountries } = require('./helpers/helper.js');

const { usersRouter } = require('./routers/users.js');
const { usersApiRouter } = require('./routers/usersApi.js');
const { groupsRouter } = require('./routers/groups.js');
const { groupsApiRouter } = require('./routers/groupsApi.js');
const { tovitsApiRouter } = require('./routers/tovitsApi.js');

const path = require('path');


dotenv.config()
const { PORT } = process.env

const app = express();
app.use(express.json())
app.set('view engine', 'ejs');
app.set("views", __dirname + '/views')

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', usersRouter)
app.use('/api/users', usersApiRouter)
app.use('/groups', groupsRouter)
app.use('/api/groups', groupsApiRouter)
// app.use('/tovit', groupsApiRouter)
app.use('/api/tovits', tovitsApiRouter)


app.get('/', (req, res) => {
    res.render('homePage', { auth: true })
})

app.get('/login', (req, res) => {
    res.render('loginPage', { auth: false })
})
app.get('/forgotPassword', (req, res) => {
    res.render('forgotPage', { auth: false })
})

app.get('/signup', async (req, res) => {
    res.render('signupPage', {
        auth: false,
        countries: await getCountries() ,
        genders: ['נקבה', 'זכר', 'אחר'],
        days: Array.from({ length: 31 }, (el, i) => i + 1),
        months: Array.from({ length: 12 }, (el, i) => i + 1),
        years: Array.from({ length: 120 }, (el, i) => new Date().getFullYear() - i),
    })
})


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})