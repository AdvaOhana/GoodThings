import { Router } from "express";
import { allGroups, createGroup, deleteGroup, getGroupById, getGroupByName } from "../db/models/groupModel.js";

export const groupsRouter = Router()
const userRouter = Router({ mergeParams: true })
const tovitRouter = Router({ mergeParams: true })

groupsRouter.get('/all', allGroups, (req, res) => {
    res.status(200).json({ message: "Found groups", data: req.allGroups })
})

groupsRouter.get('/:id', getGroupById, (req, res) => {
    res.status(200).json({ message: `Found group by id:${req.params.id}`, data: req.groupData })
})
groupsRouter.get('/byName/:name', getGroupByName, (req, res) => {
    res.status(200).json({ message: `Found group by name:${req.params.name}`, data: req.groupData })

})
groupsRouter.post('/', createGroup, (req, res) => {
    res.status(200).json({ message: `Created ${req.body.name} successfully` })
})
groupsRouter.delete('/:id', deleteGroup, (req, res) => {
    res.status(200).json({ message: `Deleted the group:'${req.groupName}' successfully` })
})

// groupsRouter.patch('/:id', (req, res) => { })

// // http://localhost:8000/groups/:groupId/tovit
// groupsRouter.use('/:groupId/tovit', tovitRouter)
// tovitRouter.get('/:tovitSubject', (req, res) => { })
// tovitRouter.post('/:tovitId', (req, res) => { })
// tovitRouter.delete('/:tovitId', (req, res) => { })
// tovitRouter.patch('/:tovitId/comment', (req, res) => { })

// // http://localhost:8000/groups/:groupId/user
// groupsRouter.use('/:groupId/user', userRouter)
// userRouter.post('/:id', (req, res) => { })
// userRouter.delete('/:id', (req, res) => { })







