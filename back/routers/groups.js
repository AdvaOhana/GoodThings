import { Router } from "express";

export const groupsRouter = Router()
const userRouter = Router({ mergeParams: true })
const tovitRouter = Router({ mergeParams: true })
// http://localhost:8000/groups/
groupsRouter.get('/all', async (req, res) => { })
groupsRouter.get('/:id', async (req, res) => { })
groupsRouter.get('/byName/:name', async (req, res) => { })
groupsRouter.post('/', async (req, res) => { })
groupsRouter.patch('/:id', async (req, res) => { })
groupsRouter.delete('/:id', async (req, res) => { })

// http://localhost:8000/groups/:groupId/tovit
groupsRouter.use('/:groupId/tovit', tovitRouter)
tovitRouter.get('/:tovitSubject', async (req, res) => { })
tovitRouter.post('/:tovitId', async (req, res) => { })
tovitRouter.delete('/:tovitId', async (req, res) => { })
tovitRouter.patch('/:tovitId/comment', async (req, res) => { })

// http://localhost:8000/groups/:groupId/user
groupsRouter.use('/:groupId/user', userRouter)
userRouter.post('/:id', async (req, res) => { })
userRouter.delete('/:id', async (req, res) => { })







