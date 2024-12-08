const { pool } = require("../dbConnection.js");
const { lettersReg, generateCode } = require("../../helpers/helper.js");
async function allUsers(req, res, next) {
    try {
        const [results] = await pool.query(`select first_name,last_name,country,bio from users`)
        if (!results.length) throw Error(`No users found.`)
        req.allUsers = results;
        next();
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` });
    }
}
async function getUserById(req, res, next) {
    try {
        const id = req.params.id;
        if (lettersReg.test(id)) throw Error(`Id is not valid, please check again`)

        const [results] = await pool.query(`select first_name, last_name, country,bio from users where id = ${id}`)
        if (!results.length) throw Error(`No users found.`)
        req.userData = results;
        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}
async function getUserByName(req, res, next) {
    try {
        const name = req.params.name;
        const [results] = await pool.query(`select first_name, last_name, country,bio from users where (first_name like '%${name}%' or last_name like '%${name}%' or user_name like '%${name}%') `)
        if (!results.length) throw Error(`User ${name} could not be found.`)
        req.userData = results;
        next();
    } catch {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}
async function createUser(req, res, next) {
    try {
        const user = { fName: req.body.fName, lName: req.body.lName, email: req.body.email, password: req.body.password, phone: req.body.phone, country: req.body.country, bio: req.body.bio, image: req.body.image, userType: `3`, lastLoginDate: new Date(), loginCnt: `0`, lastPostTime: new Date(), tovitTemplate: `1`, userName: req.body.userName };

        const query = `
    INSERT INTO users (
        user_type, email, password, first_name, last_name, phone, 
        country, img_path, bio, last_login_date, login_cnt, 
        last_post_time, tovit_template, user_name
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            user.userType,
            user.email,
            user.password,
            user.fName,
            user.lName,
            user.phone,
            user.country,
            user.image,
            user.bio,
            user.lastLoginDate,
            user.loginCnt,
            user.lastPostTime,
            user.tovitTemplate,
            user.userName
        ];

        const [results] = await pool.query(query, values);
        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}
async function loginUser(req, res, next) {
    try {
        const userName = req.body.userName
        const userPassword = req.body.userPassword

        const [user] = await pool.query(`select * from users where user_name=?`, [userName])
        if (!user.length || user[0].password !== userPassword) throw Error(`login faild`)

        req.userData = { ...user[0], password: '' };
        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}

async function forgotPassword(req, res, next) {
    try {
        let code = generateCode(6)
        // const userName =
        // const email =



    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
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
        req.tovit_id = results.insertId
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
        req.getTovits = results;
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
module.exports =
    { allUsers, createUser, forgotPassword, getUserById, getUserByName, loginUser, createTovits, getTovits, getTovitsById }