import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config()
const { DB_PASSWORD, DB_HOST, DB_NAME, DB_USER } = process.env

const pool = mysql.createPool({
    host: `${DB_HOST}`,
    user: `${DB_USER}`,
    password: `${DB_PASSWORD}`,
    database: `${DB_NAME}`,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

export async function freeQuery(query) {
    try {
        const [results, fields] = await pool.query(query)
        console.log(results);
        console.log(fields);
    } catch (error) {
        console.log(error);

    }

}
export async function createUser() {
    try {
        const [results, fields] = await pool.query(`
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
        const [results, fields] = await pool.query(`
            insert into user_types (type) values ('Admin')
            `)
        console.log(results);
        console.log(fields);
    } catch (err) {
        console.log(err);

    }
}

