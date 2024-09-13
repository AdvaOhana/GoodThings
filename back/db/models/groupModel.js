import { pool } from "../dbConnection.js";
import { lettersReg } from '../helpers/helper.js'
export async function allGroups(req, res, next) {
    try {
        const [results] = await pool.query(`select * from all_groups`)
        if (!results.length) throw Error('No groups found.')
        req.allGroups = results;
        next();
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}

export async function getGroupById(req, res, next) {
    try {
        const id = req.params.id;
        if (lettersReg.test(id)) throw Error('Id is not valid, please check again')

        const [results] = await pool.query(`
            select * from all_groups where id = ${id}
            `)

        if (!results.length) throw Error('No groups found.')
        req.groupData = results;
        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })

    }
}

export async function getGroupByName(req, res, next) {
    try {
        const name = req.params.name;
        const [results] = await pool.query(`
            select * from all_groups where name like '%${name}%'
            `)
        if (!results.length) throw Error(`Group ${name} could not be found.`)
        req.groupData = results;
        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })

    }
}

export async function deleteGroup(req, res, next) {
    try {
        const id = req.params.id;
        if (lettersReg.test(id)) throw Error('Id is not valid, please check again')

        const [groupData] = await pool.query(`
            select name FROM all_groups WHERE id = ${id}
        `)

        if (!groupData.length) throw Error('This group id could not be found.')

        const [results] = await pool.query(`
            DELETE FROM all_groups WHERE id = ${id}
            `)

        req.groupName = groupData[0].name
        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}

export async function createGroup(req, res, next) {
    try {
        const name = req.body.name;
        const about = req.body.about;

        if (!name) throw Error('Group name missing, please fix the query')
        if (!about) throw Error('The about of the group is missing, please fix the query')

        const [foundGroupName] = await pool.query(`select * from all_groups where name = '${name}'`)

        if (foundGroupName.length) throw Error(`The group '${name}' already exist, Please choose another name !`)

        const [results] = await pool.query(`
            insert into all_groups (name,about) values ('${name}','${about}')
            `)

        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}



export async function updateGroup(req, res, next) {
    try {
        // const name = req.params.name;
        // const [results] = await pool.query(`
        //     select * from all_groups where name like '%${name}%'
        //     `)
        // if (!results.length) throw Error(`Group ${name} could not be found.`)
        // req.groupData = results;
        // next()
    } catch (error) {
        // res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}

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
