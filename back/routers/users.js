const { Router } = require("express")

const usersRouter = Router()
usersRouter.get('/', (req, res) => {
    res.render('user',
        global.user
    )
})

module.exports = {
    usersRouter
};