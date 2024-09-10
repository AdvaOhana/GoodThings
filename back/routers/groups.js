import { Router } from "express";

export const groupsRouter = Router()

groupsRouter.get('/', (req, res) => {
    res.status(200).json("Groups")
})

