const { pool } = require("../dbConnection.js")
const { lettersReg } = require('../../helpers/helper.js')

module.exports = {
    getTovits, getTovitsById, createTovits, editTovit, deleteTovit, getTovByUId
}

async function createTovits(req, res, next) {
    try {
        const tovit = {
            user_id: +req.query.userId || 7,
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
        //Adva: Need to make sure that only the creator of the post allow to change it.
        const id = req.params.id;
        if (lettersReg.test(id)) throw Error(`Id is not valid, please check again`)

        const isPublic = req.body.public
        const newPostContent = req.body.post_content

        const [results] = await pool.query(`update posts set post_content = '${newPostContent}', public = ${isPublic} where id = ${id}`)

        if (results.affectedRows === 0) throw Error('Failed to update, please check the id.')
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
async function getTovByUId(req, res, next) {
    try {
        const userId = req.sId || req.params.id
        const tovDate = req.query;
        const queryParams = [userId];

        if (lettersReg.test(userId)) throw Error(`Id is not valid, please check again`)

        let sql = 'SELECT * FROM posts WHERE user_id = ?';

        if (tovDate.startDate?.length && tovDate.endDate?.length) {
            const startDate = new Date(tovDate.startDate)
            const endDate = new Date(tovDate.endDate)
            if (startDate < endDate) {
                startDate.setHours(0, 0, 0)
                endDate.setHours(25, 59, 59)
                sql += ' AND post_date >= ? AND post_date <= ?';
                queryParams.push(startDate, endDate);
            }
            else {
                throw Error(`First Date must be smaller then the second date`)
            }
        }

        sql += 'order by post_date desc'
        const [results] = await pool.query(sql, queryParams);

        if (!results.length) throw Error(`No tovits found.`)
        req.tovData = results;
        next()

    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}