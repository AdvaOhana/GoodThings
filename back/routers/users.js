import { Router } from "express"

export const usersRouter = Router()
const tovitRouter = Router({ mergeParams: true })
const groupsRouter = Router({ mergeParams: true })

usersRouter.get('/all', async (req, res) => { })
usersRouter.get('/:id', async (req, res) => { })
usersRouter.get('/byName/:id', async (req, res) => { })
//התחברות
usersRouter.post('/sign-up', async (req, res) => { })
usersRouter.post('/login', async (req, res) => { })
usersRouter.post('/logout/:id', async (req, res) => { })
usersRouter.post('/forgot', async (req, res) => { })
usersRouter.patch('/:id', async (req, res) => { })
usersRouter.delete('/:id', async (req, res) => { })

usersRouter.use('/:usersId/tovit', tovitRouter)
tovitRouter.get('/all', async (req, res) => { })
tovitRouter.get('/:id', async (req, res) => { })
tovitRouter.post('/', async (req, res) => { })
tovitRouter.patch('/:id', async (req, res) => { })
tovitRouter.delete('/:id', async (req, res) => { })

usersRouter.use('/:usersId/group', groupsRouter)
groupsRouter.get('/all', async (req, res) => { })
groupsRouter.post('/', async (req, res) => { })
groupsRouter.patch('/:id', async (req, res) => { })
groupsRouter.delete('/:id', async (req, res) => { })
