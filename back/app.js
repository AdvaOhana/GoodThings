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




app.get('/',loginUser,getAllBgs,threeDaysQuery,getTovByUId, async (req, res) => {
    if(!req.session.sId) return res.redirect('/login')
    let threeDaysPosts= req?.tovData
console.log(threeDaysPosts);

    let todaysPost = dateFns.isSameDay(threeDaysPosts[0].post_date,new Date()) ? threeDaysPosts[0] :{
        public: 0,
        post_content: [],
        background: req.userData.tovit_template,
    };

   if(req.tovData?.length > 3){
       threeDaysPosts =  req?.tovData?.slice(0,3)
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

app.get('/signup', async (req, res) => {
    if (req.session.sId) return res.redirect('/')
    // res.render('signupPage', {
    //     countries: await getCountries(),
    //     genders: ['נקבה', 'זכר', 'אחר'],
    //     days: Array.from({ length: 31 }, (el, i) => i + 1),
    //     months: Array.from({ length: 12 }, (el, i) => i + 1),
    //     years: Array.from({ length: 120 }, (el, i) => new Date().getFullYear() - i),
    // })
    res.render('signupPage')
})
app.get("*", (req, res) => {
    res.render('errorPage')
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})