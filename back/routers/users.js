const { Router } = require("express")
const { todayPostQuery, threeDaysQuery } = require('../middlewares/dataHelperMid.js')
const { getAllBgs } = require('../db/models/bgModel.js');
const { loginUser } = require('../db/models/userModel.js');
const { getTovByUId } = require('../db/models/tovitModel.js');
const dateFns = require('date-fns');
const { getCountries } = require("../helpers/helper.js");


const usersRouter = Router()
usersRouter.get('/profile', loginUser, getAllBgs, threeDaysQuery, getTovByUId, async (req, res) => {

    let threeDaysPosts = req?.tovData
    let todaysPost = dateFns.isSameDay(threeDaysPosts[0]?.post_date, new Date()) ? threeDaysPosts[0] : {
        public: 0,
        post_content: [],
        background: req.userData.tovit_template,
    };

    console.log(todaysPost);

    res.render('userPages/profilePage',
        {
            user: req.userData,
            todaysPost,
            bgOptArr: req.allBgs,
            active: req.url,
            countries: await getCountries(),
            title: "פרופיל אישי"

        }
    )
})

usersRouter.get('/preferences', loginUser, getAllBgs, todayPostQuery, getTovByUId, async (req, res) => {

    let todaysPost = dateFns.isSameDay(req?.tovData[0]?.post_date, new Date()) ? req?.tovData[0] : null;

    res.render('userPages/preferencesPage',
        {
            user: req.userData,
            todaysPost,
            bgOptArr: req.allBgs,
            active: req.url,
            title: "עדכון העדפות"

        }
    )
})

usersRouter.get('/image', loginUser, getAllBgs, todayPostQuery, getTovByUId, async (req, res) => {

    let todaysPost = dateFns.isSameDay(req?.tovData[0]?.post_date, new Date()) ? req?.tovData[0] : null;

    res.render('userPages/imagePage',
        {
            user: req.userData,
            todaysPost,
            bgOptArr: req.allBgs,
            active: req.url,
            title: "עדכון תמונת פרופיל"

        }
    )
})

usersRouter.get('/password', loginUser, getAllBgs, todayPostQuery, getTovByUId, async (req, res) => {

    let todaysPost = dateFns.isSameDay(req?.tovData[0]?.post_date, new Date()) ? req?.tovData[0] : null;

    res.render('userPages/passwordPage',
        {
            user: req.userData,
            todaysPost,
            bgOptArr: req.allBgs,
            active: req.url,
            title: "שינוי סיסמה"


        }
    )
})

usersRouter.get('/groups', loginUser, getAllBgs, todayPostQuery, getTovByUId, async (req, res) => {

    let todaysPost = dateFns.isSameDay(req?.tovData[0]?.post_date, new Date()) ? req?.tovData[0] : null;

    res.render('userPages/groupsPage',
        {
            user: req.userData,
            todaysPost,
            bgOptArr: req.allBgs,
            active: req.url,
            title: "הקבוצות שלי"

        }
    )
})

usersRouter.get('/help', loginUser, getAllBgs, todayPostQuery, getTovByUId, async (req, res) => {

    let todaysPost = dateFns.isSameDay(req?.tovData[0]?.post_date, new Date()) ? req?.tovData[0] : null;

    res.render('userPages/helpPage',
        {
            user: req.userData,
            todaysPost,
            bgOptArr: req.allBgs,
            active: req.url,
            title: "תמיכה טכנית"

        }
    )
})

module.exports = {
    usersRouter
};