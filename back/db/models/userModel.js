import { pool } from "../dbConnection.js";
export async function allUsers(req, res, next) {
    try {
        const [results] = await pool.query(`select first_name,last_name,country,bio from users`)
        if (!results.length) throw Error(`No users found.`)
        req.allUsers = results;
        next();
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` });
    }
}
export async function getUserById(req, res, next) {

}