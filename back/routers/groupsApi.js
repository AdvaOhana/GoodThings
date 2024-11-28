const { Router } = require("express")
const { allGroups, createGroup, deleteGroup, getGroupById, getGroupByName, updateGroup } = require("../db/models/groupModel.js")

const groupsApiRouter = Router()

const userRouter = Router({ mergeParams: true })
const tovitRouter = Router({ mergeParams: true })

groupsApiRouter.get('/all', allGroups, (req, res) => {
    res.status(200).json({ message: "Found groups", data: req.allGroups })
})

groupsApiRouter.get('/:id', getGroupById, (req, res) => {
    res.status(200).json({ message: `Found group by id:${req.params.id}`, data: req.groupData })
})
groupsApiRouter.get('/byName/:name', getGroupByName, (req, res) => {
    res.status(200).json({ message: `Found group by name:${req.params.name}`, data: req.groupData })

})
groupsApiRouter.post('/', createGroup, (req, res) => {
    res.status(200).json({ message: `Created ${req.body.name} successfully`, data: [] })
})
groupsApiRouter.delete('/:id', deleteGroup, (req, res) => {
    res.status(200).json({ message: `Deleted the group:'${req.groupName}' successfully`, data: [] })
})

groupsApiRouter.patch('/:id', updateGroup, (req, res) => {
    res.status(200).json({ message: `Updated the group successfully`, data: [] })
})

// // http://localhost:8000/api/groups/:groupId/tovit
groupsApiRouter.use('/:groupId/tovit', tovitRouter)
tovitRouter.get('/:tovitSubject', (req, res) => { })
tovitRouter.post('/:tovitId', (req, res) => { })
tovitRouter.delete('/:tovitId', (req, res) => { })
tovitRouter.patch('/:tovitId/comment', (req, res) => { })

// // http://localhost:8000/api/groups/:groupId/user
groupsApiRouter.use('/:groupId/user', userRouter)
userRouter.post('/:id', (req, res) => { })
userRouter.delete('/:id', (req, res) => { })




module.exports = { groupsApiRouter }
