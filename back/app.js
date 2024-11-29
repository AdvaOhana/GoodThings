const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const { usersRouter } = require('./routers/users.js');
const { usersApiRouter } = require('./routers/usersApi.js');
const { groupsRouter } = require('./routers/groups.js');
const { groupsApiRouter } = require('./routers/groupsApi.js');

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


app.get('/', (req, res) => {
    res.render('homePage', { auth: true })
})
app.get('/login', (req, res) => {
    res.render('loginPage', { auth: false })
})
app.get('/signup', (req, res) => {
    res.render('signupPage', { auth: false })
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})