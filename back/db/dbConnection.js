import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config()
const { DB_PASSWORD } = process.env


const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: `${DB_PASSWORD}`,
    database: "tov_yomi",
})

export async function freeQuery(query) {
    try {
        const [results, fields] = await connection.query(query)
        console.log(results);
        console.log(fields);
    } catch (error) {
        console.log(error);

    }

}
export async function createUser() {
    try {
        const [results, fields] = await connection.query(`
            insert into users (user_type,email,password, first_name, last_name,phone,country,img_path,bio,last_login_date,login_cnt,last_post_time) 
            values (1,'shmuelatar@gmail.com','Shmuel050!','Shmuel','Atar','050-7984525','IL','https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png','Hey all',CURDATE(),1,CURDATE())
            `)
        console.log(results);
        console.log(fields);
    } catch (err) {
        console.log(err);

    }
}

export async function createType() {
    try {
        const [results, fields] = await connection.query(`
            insert into user_types (type) values ('Admin')
            `)
        console.log(results);
        console.log(fields);
    } catch (err) {
        console.log(err);

    }
}

