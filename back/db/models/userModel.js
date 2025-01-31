const { pool } = require("../dbConnection.js");
const { lettersReg, generateCode, transporter } = require("../../helpers/helper.js");
const {query} = require("express");
const { EMAIL_USER } = process.env

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
        let query = `select u.id,u.user_type,u.email,u.password, u.first_name,u.last_name,u.phone,u.country, u.img_path,u.last_login_date,u.login_cnt, u.last_post_time,u.user_name,u.defIsPublic, u.defTheme, u.bio,tb.url as tovit_template from users as u join tovit_backgrounds as tb on u.tovit_template = tb.id `  
        if(req.session?.sId){
            query += `where u.id=?`
            const [user] = await pool.query(query, [req.session.sId])
            req.userData = { ...user[0], password: '' };
        } else {
            const userNameOrEmail = req.body.userEmail
            const userPassword = req.body.userPassword
            query += `where email=? or user_name=?`
            if (!userNameOrEmail || !userPassword) throw new Error('Some information is missing!')
            const [user] = await pool.query(query, [userNameOrEmail.trim(), userNameOrEmail.trim()])
            if (!user.length || user[0].password !== userPassword.trim()) throw Error(`login faild`)
            req.userData = { ...user[0], password: '' };
            req.session.sId = user[0]?.id
        }
        query = `update users SET last_login_date = ? WHERE id = ?`
        const [user] = await pool.query(query,[new Date(),req.userData.id])
        console.log(req.userData)
        next()
    } catch (error) {
        console.log(error);
        res.redirect(302, '/login?success=false')
    }
}

    async function forgotPassword(req, res, next) {
    try {
        const userNameOrEmail = req.body.NameOrEmail;
        console.log(userNameOrEmail)
        if (!userNameOrEmail.length) throw new Error('User name or email is not valid!')
        let code = generateCode()

        let query = `select * from users where email = ? or user_name = ?`
        const [user] = await pool.query(query, [userNameOrEmail, userNameOrEmail])
        if (!user.length) throw new Error('User name or email is not valid!')

        query = `update users SET forget_password = ? WHERE email = ?`
        const [updated] = await pool.query(query, [code, user[0].email])

        const info = await transporter.sendMail({
            from: `טוב יומי <${process.env.EMAIL_USER}>`,
            to: `${user[0].email}`,
            subject: "Reset Password",
            text: `Your code: ${code}`,
            html: `<b>Hello world? Your code: ${code}</b>`,
        });
        //תספור לאחור 180 שניות ואז תיגש חזרה לDB ותמחק את המספר
  setTimeout(async () => {
            console.log('This password deleted after 3 minutes');
            query = ` update users SET forget_password = NULL WHERE email = ?`
            const [deleted] = await pool.query(query, [user[0].email])

            },180000)
        next()

    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}

async function getUserByEmail(email) {

    const [user] = await pool.query(`select * from users where email=?`, [email])
    return user.at(0)
}
module.exports =
    { allUsers, createUser, forgotPassword, getUserById, getUserByName, loginUser, getUserByEmail }


