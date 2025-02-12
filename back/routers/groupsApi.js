const { Router } = require("express")
const { allGroups, createGroup, deleteGroup, getGroupById, getGroupByName, updateGroup, tovitToGroup, tovitByInfo, deleteGroupsTov, addComment } = require("../db/models/groupModel.js")
const { createTovits } = require("../db/models/tovitModel.js")
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

tovitRouter.get('/', tovitByInfo, (req, res) => {
    res.status(200).json({ message: `Found tovits`, data: req.allPosts })
})

tovitRouter.post('/', createTovits, tovitToGroup, (req, res) => {
    res.status(200).json({ message: `Created tovit successfully`, data: req.groupPostId })
})

tovitRouter.delete('/:tovitId', deleteGroupsTov, (req, res) => {
    res.status(200).json({ message: `Deleted tovit successfully`, data: req.deletedTov })
})
tovitRouter.post('/:tovitId/comment', addComment, (req, res) => {
    res.status(200).json({ message: `Created comment successfully`, data: req.createdComment })
})
tovitRouter.delete('/:tovitId/:commentId', deleteComment, (req, res) => {
    res.status(200).json({ message: `Deleted comment successfully`, data: [] })
})



module.exports = { groupsApiRouter }
