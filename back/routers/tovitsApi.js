const { Router } = require("express")
const { getTovits, getTovitsById, createTovits, editTovit, deleteTovit } = require("../db/models/groupModel.js")

const tovitsApiRouter = Router()

const userRouter = Router({ mergeParams: true })
const groupsRouter = Router({ mergeParams: true })




tovitsApiRouter.get('/all', getTovits, (req, res) => {
    res.status(200).json({ message: 'Found tovits', data: req.getTovits })
})
tovitsApiRouter.get('/:id', getTovitsById, (req, res) => {
    res.status(200).json({ message: `Found tovit by id:${req.params.id}`, data: req.tovitData })
})
tovitsApiRouter.post('/', createTovits, (req, res) => {
    res.status(200).json({ message: `tovit created successfully`, data: req.createTovits })
})
tovitsApiRouter.patch('/:id', editTovit, (req, res) => {
    res.status(200).json({ message: `tovit updated successfully`, data: req.editTovit })
})
tovitsApiRouter.delete('/:id', deleteTovit, (req, res) => {
    res.status(200).json({ message: `tovit deleted successfully`, data: req.deleteTovit })
})



module.exports = { tovitsApiRouter }