const { Router } = require("express")
const { allUsers, createUser, forgotPassword, getUserById, getUserByName, loginUser, updateProfile, verifyCode
    , updatePassword, deleteAccount, recoveryAccount
} = require("../db/models/userModel.js")


const usersApiRouter = Router()

const tovitRouter = Router({ mergeParams: true })
const groupsRouter = Router({ mergeParams: true })

usersApiRouter.get('/all', allUsers, (req, res) => {
    res.status(200).json({ message: 'Found users', data: req.allUsers })
})
usersApiRouter.post('/sign-up', createUser, loginUser, (req, res) => {
    res.status(302).redirect('/')
})
usersApiRouter.post('/login', loginUser, (req, res) => {
    res.status(302).redirect('/')
})
usersApiRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout, please try again.' })
        }
        res.status(200).json({ redirectUrl: '/' })
    });
})
usersApiRouter.post('/forgot', forgotPassword, (req, res) => {
    res.status(302).redirect(`/codeVerify?UNOE=${req.userNameOrEmail}`);
})

usersApiRouter.post('/verifyCode', verifyCode, (req, res) => {
    res.status(200).json({ redirectUrl: '/resetPassword' })
})
usersApiRouter.post('/updateProfile', updateProfile, (req, res) => {
    res.status(200).json({ message: `success`, data: [] });
})
usersApiRouter.post('/updatePassword', updatePassword, (req, res) => {
    res.status(200).json({ redirectUrl: '/' })
})
usersApiRouter.post('/deleteAccount', deleteAccount, (req, res) => {
    res.status(200).json({ message: `success`, data: [] });
})
usersApiRouter.post('/recoveryAccount', recoveryAccount, (req, res) => {
    res.status(200).json({ message: `success`, data: [] });
})
usersApiRouter.get('/:id', getUserById, (req, res) => {
    res.status(200).json({ message: `Found user by id:${req.params.id}`, data: req.userData })
})
usersApiRouter.get('/byName/:id', getUserByName, (req, res) => {
    res.status(200).json({ message: `Found user by name:${req.params.name}`, data: req.userData })
})

usersApiRouter.patch('/:id', (req, res) => { })
usersApiRouter.delete('/:id', (req, res) => { })

usersApiRouter.use('/:usersId/group', groupsRouter)
groupsRouter.get('/all', (req, res) => { })
groupsRouter.post('/', (req, res) => { })
groupsRouter.patch('/:id', (req, res) => { })
groupsRouter.delete('/:id', (req, res) => { })

module.exports = {
    usersApiRouter
};