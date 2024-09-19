import { Router } from "express"
import { allUsers } from "../db/models/userModel.js"

export const usersRouter = Router()
const tovitRouter = Router({ mergeParams: true })
const groupsRouter = Router({ mergeParams: true })

usersRouter.get('/all', allUsers, (req, res) => {
    res.status(200).json({ message: 'Found users', data: req.allUsers })
})
usersRouter.get('/:id', getUserById, (req, res) => {
    res.status(200).json({ message: `Found user by id:${req.params.id}`, data: req.groupData })
})
usersRouter.get('/byName/:id', (req, res) => { })

usersRouter.post('/sign-up', (req, res) => { })
usersRouter.post('/login', (req, res) => { })
usersRouter.post('/logout/:id', (req, res) => { })
usersRouter.post('/forgot', (req, res) => { })
usersRouter.patch('/:id', (req, res) => { })
usersRouter.delete('/:id', (req, res) => { })

usersRouter.use('/:usersId/tovit', tovitRouter)
tovitRouter.get('/all', (req, res) => { })
tovitRouter.get('/:id', (req, res) => { })
tovitRouter.post('/', (req, res) => { })
tovitRouter.patch('/:id', (req, res) => { })
tovitRouter.delete('/:id', (req, res) => { })

usersRouter.use('/:usersId/group', groupsRouter)
groupsRouter.get('/all', (req, res) => { })
groupsRouter.post('/', (req, res) => { })
groupsRouter.patch('/:id', (req, res) => { })
groupsRouter.delete('/:id', (req, res) => { })
