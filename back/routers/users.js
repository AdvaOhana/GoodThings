import { Router } from "express"

export const usersRouter = Router()

usersRouter.get('/:id', (req, res) => {
    const name = req.query.name

    const a = ['shmuel', 'adva', 'avi']

    a.includes(name) ?
        res.sendStatus(200) : res.sendStatus(404)
})