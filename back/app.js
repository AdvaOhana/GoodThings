const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const dateFns = require('date-fns')
const { getCountries } = require('./helpers/helper.js');
const { usersRouter } = require('./routers/users.js');
const { usersApiRouter } = require('./routers/usersApi.js');
const { groupsRouter } = require('./routers/groups.js');
const { groupsApiRouter } = require('./routers/groupsApi.js');
const { tovitsApiRouter } = require('./routers/tovitsApi.js');
const { threeDaysQuery } = require('./middlewares/dataHelperMid.js')
const bcrypt = require('bcrypt');


const path = require('path');


const { loginUser } = require('./db/models/userModel.js');
const { getAllBgs } = require('./db/models/bgModel.js');
const { getTovByUId } = require('./db/models/tovitModel.js');

dotenv.config()
const { PORT, S_KEY } = process.env

const app = express();
app.use(express.json())
app.set('view engine', 'ejs');
app.set("views", __dirname + '/views')

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: S_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/users', usersRouter)
app.use('/api/users', usersApiRouter)
app.use('/groups', groupsRouter)
app.use('/api/groups', groupsApiRouter)
// app.use('/tovit', groupsApiRouter)
app.use('/api/tovits', tovitsApiRouter)




app.get('/', loginUser, getAllBgs, threeDaysQuery, getTovByUId, async (req, res) => {
    // if (!req.session.sId) return res.redirect('/login');

    let threeDaysPosts = req?.tovData ?? [];

    if (threeDaysPosts.length > 3) {
        threeDaysPosts = threeDaysPosts.slice(0, 3);
    }

    const firstPost = threeDaysPosts[0];
    let todaysPost = (firstPost?.post_date && dateFns.isSameDay(firstPost.post_date, new Date()))
        ? firstPost
        : {
            public: 0,
            post_content: [],
            background: req.userData.tovit_template,
        };

    if (req.tovData?.length > 3) {
        threeDaysPosts = req?.tovData?.slice(0, 3)
    }

    res.render('homePage', {
        user: req.userData,
        threeDaysPosts,
        todaysPost,
        bgOptArr: req.allBgs,
        isSameDay: dateFns.isSameDay,
    })
})

app.get('/login', async (req, res) => {
    if (req.session.sId) return res.redirect('/')
    res.render('loginPage', {
        querys: req?.query
    })
})

app.get('/forgotPassword', async (req, res) => {
    if (req.session.sId) return res.redirect('/')
    res.render('forgotPage')
})

app.get('/codeVerify', async (req, res) => {
    if (req.session.sId) return res.redirect('/')
    res.render('verifyCodePage')
})

app.get('/resetPassword', async (req, res) => {
    if (req.session.sId) return res.redirect('/')
    res.render('resetPassword')
})

app.get('/signup', async (req, res) => {
    if (req.session.sId) return res.redirect('/')
    res.render('signupPage', {
        querys: req.query
    })
})
app.get("*", (req, res) => {
    res.render('errorPage')
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})