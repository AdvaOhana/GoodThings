const { pool } = require("../dbConnection.js");
const { lettersReg, generateCode, transporter } = require("../../helpers/helper.js");
const { query } = require("express");
const { phoneReg, passwordReg } = require("../../helpers/helper");
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
        const user = {
            fName: req.body.fName, lName: req.body.lName, email: req.body.email,
            password: req.body.password, phone: req.body.phone, country: req.body.country,
            bio: req.body.bio, image: req.body.image, userType: `3`, lastLoginDate: new Date(),
            loginCnt: `0`, lastPostTime: new Date(), tovitTemplate: `1`, userName: req.body.userName
        };

        let query = `SELECT COUNT(*) AS count FROM users WHERE user_name = ? OR phone = ? OR email = ?`;
        const [createUserCheck] = await pool.query(query, [user.userName, user.phone, user.email]);

        if (createUserCheck[0].count > 0) {
            return res.status(400).json({ message: 'Username, phone number or email already exists in the system.' });
        }

        query = `
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
        let query = `select u.id,u.user_type,u.email,u.password, u.first_name,u.last_name,u.phone,u.country, u.img_path,u.last_login_date,u.login_cnt, u.last_post_time,u.user_name,u.defIsPublic, u.defTheme,u.locked,tb.url as tovit_template from users as u join tovit_backgrounds as tb on u.tovit_template = tb.id `

        if (req.session?.sId) {
            query += `where u.id=?`
            const [user] = await pool.query(query, [req.session.sId])
            if (user[0]?.locked != 0) throw new Error('Account closed')
            req.userData = { ...user[0], password: '' };
        } else {
            const userNameOrEmail = req.body.userEmail
            const userPassword = req.body.userPassword
            query += `where email=? or user_name=?`
            if (!userNameOrEmail || !userPassword) throw new Error('Some information is missing!')
            const [user] = await pool.query(query, [userNameOrEmail.trim(), userNameOrEmail.trim()])
            if (!user.length || user[0].password !== userPassword.trim()) throw Error(`login faild`)
            if (user[0]?.locked != 0) throw new Error('Account closed')
            req.userData = { ...user[0], password: '' }
            req.session.userType = user[0]?.user_type
            req.session.sId = user[0]?.id
        }
        query = `update users SET last_login_date = ? WHERE id = ?`
        const [user] = await pool.query(query, [new Date(), req.userData.id])
        console.log(req.userData)
        next()
    } catch (error) {
        console.log(error);
        res.redirect(302, '/login?success=false')
    }
}

async function forgotPassword(req, res, next) {
    try {
        let query = `SELECT locked FROM users WHERE id = ?;`;
        const [checkLocked] = await pool.query(query, [req.session.sId]);
        if (checkLocked[0].locked != 0) throw new Error('Account closed')

        const userNameOrEmail = req.body.NameOrEmail;
        if (!userNameOrEmail.length) throw new Error('User name or email is not valid!')
        let code = generateCode()

        query = `select * from users where email = ? or user_name = ?;`
        const [user] = await pool.query(query, [userNameOrEmail, userNameOrEmail])
        if (!user.length) throw new Error('User name or email is not valid!')

        query = `update users SET forget_password = ? WHERE email = ?`
        const [updated] = await pool.query(query, [code, user[0].email])

        const info = await transporter.sendMail({
            from: `טוב יומי <${process.env.EMAIL_USER}>`,
            to: `${user[0].email}`,
            subject: "Reset Your Password",
            text: `Your code: ${code}`,
            html: `<b>Hello world? Your code: ${code}</b>`,
        });
        //תספור לאחור 180 שניות ואז תיגש חזרה לDB ותמחק את המספר
        setTimeout(async () => {
            console.log('This password deleted after 3 minutes');
            query = ` update users SET forget_password = NULL WHERE email = ?`
            html: `<html dir="rtl">
    <body style="direction: rtl; text-align: right;">
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; ">
        <h2>שחזור סיסמה</h2>
        <p>שלום ${user[0].first_name},</p>
        
        <p>קיבלנו בקשה לשחזור הסיסמה שלך. הקוד הזמני שלך מופיע למטה והוא יהיה בתוקף למשך 3 דקות:</p>
        <p style="font-size: 18px; font-weight: bold;">קוד: <strong>[${code}]</strong></p>
        
        <p>אם לא ביקשת לשחזר את הסיסמה, נא להתעלם מהודעה זו. למען אבטחת המידע שלך, אין לשתף את הקוד עם אף אחד.</p>
        
        <p>אם דרושה לך עזרה, ניתן לפנות לצוות התמיכה שלנו.</p>
        <p>תודה,<br>[טוב יומי]</p>
    </div>   
    </body>
    </html>`,});
        setTimeout(async () => {
            query = ` update users SET forget_password = NULL WHERE email = ?;`
            const [deleted] = await pool.query(query, [user[0].email])

        }, 180000)
    }, 180000)
    next()

} catch (error) {
    res.status(404).json({ message: `${error.sqlMessage || error.message}` })
}
}
async function verifyCode(req, res, next) {
    try {
        const userForgotCode = req.body.userForgotCode;
        const userNameOrEmail = req.body.NameOrEmail;
        let query = `select forget_password from users where email = ? or user_name = ?;`
        const [code] = await pool.query(query, [userNameOrEmail, userNameOrEmail])
        if (code[0].forget_password != userForgotCode) throw new Error('password incorrect')

        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}
async function updateProfile(req, res, next) {
    try {
        let query = `SELECT locked FROM users WHERE id = ?;`;
        const [checkLocked] = await pool.query(query, [req.session.sId]);
        if (checkLocked[0].locked != 0) throw new Error('Account closed')

        const userName = req.body.userName;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const phone = req.body.phone;
        const bio = req.body.bio;
        const userId = req.body.userId;
        const bioMaxLength = 800;

        if (
            userName.length < 2 ||
            firstName.length < 2 ||
            !lettersReg.test(firstName) ||
            lastName.length < 2 ||
            !lettersReg.test(lastName) ||
            !phoneReg.test(phone) ||
            bio.length > bioMaxLength ||
            userId !== req.session.sId
        ) {
            throw new Error('Invalid input data');
        }

        query = `SELECT COUNT(*) AS count FROM users WHERE (user_name = ? OR phone = ?) AND id != ?;`;
        const [checkDetails] = await pool.query(query, [userName, phone, userId]);
        if (checkDetails[0].count > 0) {
            throw new Error('Username or phone number already exists');
        }

        query = `UPDATE users SET user_name = ?, first_name = ?, last_name = ?, phone = ?, bio = ? WHERE id = ?`;
        const [update] = await pool.query(query, [userName, firstName, lastName, phone, bio, userId]);

        next();
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` });
    }
}
async function updatePassword(req, res, next) {
    try {
        const password = req.body.password;
        if (!passwordReg.test(password)) throw new Error('Weak Password');

        let query = `update users SET password = ${password} WHERE email = ? or user_name = ? or id = ?`
        const [changePassword] = await pool.query(query, [userNameOrEmail, userNameOrEmail, req.session.sId]);

        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}
async function deleteAccount(req, res, next) {
    try {
        let query = `UPDATE users SET locked = 1 WHERE id = ?;`
        const [recovery] = await pool.query(query, [req.session.sId]);

        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}
async function recoveryAccount(req, res, next) {
    try {
        let query = `UPDATE users SET locked = 0 WHERE id = ?;`
        const [recovery] = await pool.query(query, [req.session.sId]);

        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}

//פונקציה לעדכון תמונת פרופיל
async function getUserByEmail(email) {

    const [user] = await pool.query(`select * from users where email=?`, [email])
    return user.at(0)
}


module.exports =
{
    allUsers, createUser, forgotPassword, getUserById, getUserByName, loginUser, verifyCode, updateProfile,
    updatePassword, deleteAccount, recoveryAccount, getUserByEmail
}


