import { pool } from "../dbConnection.js";

export async function allGroups(req, res, next) {
    try {
        const [results] = await pool.query(`select * from all_groups`)
        if (!results.length) throw Error('No groups found.')
        req.allGroups = results;
        next();
    } catch (error) {
        res.status(404).send(`${error.sqlMessage || error}`)
    }
}

export async function getGroupById(id) {
    try {
        const [results, fields] = await pool.query(`select * from all_groups`)
        return results
        return null
    } catch (error) {
        console.log(error);

    }
}

// export async function createUser() {
//     try {
//         const [results, fields] = await pool.query(`
//             insert into users (user_type,email,password, first_name, last_name,phone,country,img_path,bio,last_login_date,login_cnt,last_post_time) 
//             values (1,'shmuelatar@gmail.com','Shmuel050!','Shmuel','Atar','050-7984525','IL','https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png','Hey all',CURDATE(),1,CURDATE())
//             `)
//         console.log(results);
//         console.log(fields);
//     } catch (err) {
//         console.log(err);

//     }
// }

// export async function createType() {
//     try {
//         const [results, fields] = await pool.query(`
//             insert into user_types (type) values ('Admin')
//             `)
//         console.log(results);
//         console.log(fields);
//     } catch (err) {
//         console.log(err);

//     }
// }

