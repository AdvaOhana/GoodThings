const { pool } = require("../dbConnection.js")
const dateFns = require('date-fns')
const { lettersReg } = require('../../helpers/helper.js')

module.exports = {
    getTovits, getTovitsById, createTovits, editTovit, deleteTovit, getTovByUId
}

async function createTovits(req, res, next) {
    try {

        console.log(req.body);

        const tovit = {
            user_id: +req.session.sId, //number user for tests
            post_date: new Date().toISOString().split("T").at(0),
            public: req.body.public,
            post_content: JSON.stringify(req.body.post_content),
            background: +req.body.background || 1
        }

        let query =
            `INSERT INTO posts (user_id, post_date, public, post_content,background) values (?,?,?,?,?)`


        const values = [
            tovit.user_id,
            tovit.post_date,
            tovit.public,
            tovit.post_content,
            tovit.background
        ];

        let [results] = await pool.query(query, values);
        req.tovitId = results.insertId

        query = `UPDATE users SET last_post_time = NOW() WHERE id = ?`;
        [results] = await pool.query(query, [req.session.sId || 7]); //number user for tests


        next()
    }
    catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}
async function getTovits(req, res, next) {
    try {
        const [results] = await pool.query(`select p.id,p.user_id,p.post_date,p.public,p.post_content,t.url as background_url from posts as p join tovit_backgrounds as t on p.background=t.id `)

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
        if (lettersReg.test(id)) throw Error(`Id is not valid, please check again`)

        const user_id = req.session.sId
        const isPublic = req.body.public
        const newPostContent = req.body.post_content
        const newBackground = +req.body.background

        const data = [JSON.stringify(newPostContent), isPublic, newBackground, id]
        const [user] = await pool.query(`select user_id from posts where id = ${id}`)

        if (user_id === user[0].user_id) {
            const [results] = await pool.query(`update posts set post_content = ?, public = ?, background = ? where id = ?`, data)

            if (results.affectedRows === 0) throw Error('Failed to update, please check the id.')
            req.editedContent = results;
            next()
        }
        else {
            throw new Error("Not allowed")
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}
async function deleteTovit(req, res, next) {
    try {
        const id = req.params.id

        if (lettersReg.test(id)) throw Error(`Id is not valid, please check again`)
        const [resUser] = await pool.query(`select user_id from posts where id = ${id}`)
        const [resDate] = await pool.query(`update users set last_post_time = '1111-01-01' where id = ${resUser.at(0).user_id}`)
        const [results] = await pool.query(`delete from posts where id = ${id}`)

        req.hasDeleted = results;
        next()
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}
async function getTovByUId(req, res, next) {
    try {
        const userId = req.session?.sId
        const tovDate = req.query;
        const queryParams = [];


        if (lettersReg.test(userId)) throw Error(`Id is not valid, please check again`)
        let sql = `Select p.id,p.user_id,p.post_date,p.public,p.post_content,tb.url as background_url, background from posts as p left join tovit_backgrounds as tb on p.background = tb.id WHERE `

        if (tovDate.startDate && tovDate.endDate) {
            if (dateFns.isBefore(tovDate.startDate, tovDate.endDate) || dateFns.isEqual(tovDate.startDate, tovDate.endDate)) {
                sql += 'post_date >= DATE(?) AND post_date <= DATE(?) and';
                queryParams.push(dateFns.setHours(tovDate.startDate, 0), dateFns.setHours(tovDate.endDate, 26));
            }
            else {
                throw Error(`First Date must be smaller then the second date`)
            }
        }
        queryParams.push(userId)
        sql += ' p.user_id = ? order by post_date desc'
        const [results] = await pool.query(sql, queryParams);

        results.forEach(r => {
            if (Array.isArray(r.post_content)) return
            r.post_content = JSON.parse(r.post_content)
        })
        req.tovData = results;
        next()

    } catch (error) {
        console.log(error);

        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}