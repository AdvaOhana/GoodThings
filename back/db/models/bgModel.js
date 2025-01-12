const { pool } = require("../dbConnection.js");

async function getAllBgs(req,res,next) {
    try {
        const [results] = await pool.query(`select url from tovit_backgrounds`)
        if (!results.length) throw Error(`No backgrounds found.`)

        req.allBgs = results.map(el=> el.url);
        next();
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` });
    }
    
}

module.exports = {getAllBgs}