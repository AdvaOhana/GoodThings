const { pool } = require("../db/dbConnection.js");


async function  getUserByEmail(email) {
    const [user] = await pool.query(`select * from users where email=?`, [email])
    //   return {...user.at(0),auth:true}
      return {...user.at(0),auth:false}
    }

async function getUserPosts(id,startDate,endDate) {    
    const queryParams = [id]
    let sql = 'SELECT id,public,post_content,background,post_date FROM posts WHERE user_id = ?';

    if (startDate && endDate) {
        sql += ' AND post_date BETWEEN ? AND ? ';
        queryParams.push(startDate, endDate);
    }
    if(startDate && !endDate){
        sql += ' AND DATE(post_date) = CURDATE()';
    }

    sql += ' ORDER BY post_date desc LIMIT 3'
    
    try {
        const [results] = await pool.query(sql, queryParams);
        if (!results?.length) throw Error(`No tovits found.`)
            return results
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUserByEmail,getUserPosts }
           
