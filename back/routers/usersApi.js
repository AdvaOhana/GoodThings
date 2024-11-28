const { Router } = require("express")
const { allUsers, createUser, forgotPassword, getUserById, getUserByName, loginUser } = require("../db/models/userModel.js")

const usersApiRouter = Router()

const tovitRouter = Router({ mergeParams: true })
const groupsRouter = Router({ mergeParams: true })

usersApiRouter.get('/all', allUsers, (req, res) => {
    res.status(200).json({ message: 'Found users', data: req.allUsers })
})
usersApiRouter.get('/:id', getUserById, (req, res) => {
    res.status(200).json({ message: `Found user by id:${req.params.id}`, data: req.userData })
})
usersApiRouter.get('/byName/:id', getUserByName, (req, res) => {
    res.status(200).json({ message: `Found user by name:${req.params.name}`, data: req.userData })
})

usersApiRouter.post('/sign-up', createUser, (req, res) => {
    res.status(200).json({ message: `${req.body.fName} your account created successfully`, data: [] })
})
usersApiRouter.post('/login', loginUser, (req, res) => {
    res.status(200).json({ message: `logged in successfully`, data: req.userData })
})
// usersApiRouter.post('/logout/:id', (req, res) => { })

usersApiRouter.post('/forgot', forgotPassword, (req, res) => {
})

usersApiRouter.patch('/:id', (req, res) => { })
usersApiRouter.delete('/:id', (req, res) => { })

usersApiRouter.use('/:usersId/tovit', tovitRouter)
tovitRouter.get('/all', (req, res) => { })
tovitRouter.get('/:id', (req, res) => { })
tovitRouter.post('/', (req, res) => { })
tovitRouter.patch('/:id', (req, res) => { })
tovitRouter.delete('/:id', (req, res) => { })

usersApiRouter.use('/:usersId/group', groupsRouter)
groupsRouter.get('/all', (req, res) => { })
groupsRouter.post('/', (req, res) => { })
groupsRouter.patch('/:id', (req, res) => { })
groupsRouter.delete('/:id', (req, res) => { })

module.exports = {
    usersApiRouter
};