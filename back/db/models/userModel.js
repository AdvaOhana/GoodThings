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
        if(req.session?.sId){
            const [user] = await pool.query(`select * from users where id=${req.session.sId}`)
            req.userData = { ...user[0],auth:true, password: '' };
            global.user = { ...user[0],auth:true, password: '' };     
        }else{
            const userNameOrEmail = req.body.userEmail
            const userPassword = req.body.userPassword

            if(!userNameOrEmail || !userPassword) throw new Error('Some information is missing!')
                const [user] = await pool.query(`select * from users where email=? or user_name=?`, [userNameOrEmail,userNameOrEmail])
            
            if (!user.length || user[0].password !== userPassword) throw Error(`login faild`)
            req.userData = { ...user[0],auth:true, password: '' };
            global.user = { ...user[0],auth:true, password: '' };
            req.session.sId = user[0].id
        }
        next()
    } catch (error) {                
        res.redirect(302,'/login?success=false')
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

async function  getUserByEmail(email) {

        const [user] = await pool.query(`select * from users where email=?`, [email])
          return user.at(0)
}
module.exports =
    { allUsers, createUser, forgotPassword, getUserById, getUserByName, loginUser,getUserByEmail }
           

