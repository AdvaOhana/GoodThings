const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { getCountries } = require('./helpers/helper.js');

const { usersRouter } = require('./routers/users.js');
const { usersApiRouter } = require('./routers/usersApi.js');
const { groupsRouter } = require('./routers/groups.js');
const { groupsApiRouter } = require('./routers/groupsApi.js');
const { tovitsApiRouter } = require('./routers/tovitsApi.js');

const path = require('path');
const { getUserByEmail, getUserPosts } = require('./helpers/userHelpers.js');

dotenv.config()
const { PORT, S_KEY } = process.env

const app = express();
app.use(express.json())
app.set('view engine', 'ejs');
app.set("views", __dirname + '/views')
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', usersRouter)
app.use('/api/users', usersApiRouter)
app.use('/groups', groupsRouter)
app.use('/api/groups', groupsApiRouter)
// app.use('/tovit', groupsApiRouter)
app.use('/api/tovits', tovitsApiRouter)


console.log(S_KEY);

app.use(session({
    secret: S_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', async (req, res) => {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

    global.user = await getUserByEmail("test1@test1.com")
    global.todayPost = await getUserPosts(global.user.id, new Date()) || {}

    if (!global.user.auth) return res.redirect('/login')

    res.render('homePage', {
        user: global.user,
        threeDaysPosts: await getUserPosts(global.user.id, threeDaysAgo, new Date())
    })
})

app.get('/login', async (req, res) => {
    if (global?.user.auth) return res.redirect('/')
    res.render('loginPage')
})
app.get('/forgotPassword', async (req, res) => {
    if (global?.user.auth) return res.redirect('/')
    res.render('forgotPage')
})

app.get('/signup', async (req, res) => {
    if (global?.user.auth) return res.redirect('/')
    res.render('signupPage', {
        countries: await getCountries(),
        genders: ['נקבה', 'זכר', 'אחר'],
        days: Array.from({ length: 31 }, (el, i) => i + 1),
        months: Array.from({ length: 12 }, (el, i) => i + 1),
        years: Array.from({ length: 120 }, (el, i) => new Date().getFullYear() - i),
    })
})
app.get("*", (req, res) => {
    res.render('errorPage', {
        user: global?.user
    })
})


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})