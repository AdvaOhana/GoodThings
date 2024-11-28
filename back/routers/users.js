const { Router } = require("express")

const usersRouter = Router()
usersRouter.get('/', (req, res) => {
    res.render('user', {
        name: 'shmuel'
    })
})

module.exports = {
    usersRouter
};