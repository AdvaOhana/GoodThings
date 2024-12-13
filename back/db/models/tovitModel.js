const { pool } = require("../dbConnection.js")
const { lettersReg } = require('../../helpers/helper.js')

module.exports = {
    getTovits, getTovitsById, createTovits, editTovit, deleteTovit
}

async function createTovits(req, res, next) {
    try {

        const tovit = {
            user_id: +req.params.usersId,
            post_date: new Date().toISOString().split("T").at(0),
            public: req.body.public,
            post_content: req.body.post_content,
            background: +req.body.background || null
        }

        const query =
            `INSERT INTO posts (user_id, post_date, public, post_content,background) values (?,?,?,?,?)`


        const values = [
            tovit.user_id,
            tovit.post_date,
            tovit.public,
            tovit.post_content,
            tovit.background
        ];

        const [results] = await pool.query(query, values);
        req.tovitId = results.insertId
        next()
    }
    catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}
async function getTovits(req, res, next) {
    try {
        const [results] = await pool.query(`select * from posts`)
        if (!results.length) throw Error(`No tovits found.`)
        req.tovits = results;
        next();
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` });
    }

}
async function getTovitsById(req, res, next) {
    try {
        const id = req.params.id;
        if (lettersReg.test(id)) throw Error(`Id is not valid, please check again`)

        const [results] = await pool.query(`select * from posts where id = ${id}`)
        if (!results.length) throw Error(`No tovits found.`)
        req.tovitData = results;
        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}
async function editTovit(req, res, next) {
    try {
        const id = req.params.id;
        const newPostContent = req.body.post_content

        if (lettersReg.test(id)) throw Error(`Id is not valid, please check again`)

        const [results] = await pool.query(`update posts set post_content = '${JSON.stringify(newPostContent)}' where id = ${id}`)

        req.editedContent = results;
        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}
async function deleteTovit(req, res, next) {
    try {
        const id = req.params.id

        if (lettersReg.test(id)) throw Error(`Id is not valid, please check again`)

        const [results] = await pool.query(`delete from posts where id = ${id}`)

        req.hasDeleted = results;
        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}