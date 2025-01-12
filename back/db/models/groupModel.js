const { pool } = require("../dbConnection.js")
const { lettersReg } = require('../../helpers/helper.js')

module.exports = {
    allGroups, getGroupById, getGroupByName, deleteGroup, createGroup, updateGroup, tovitToGroup, tovitByInfo, deleteGroupsTov
}

async function allGroups(req, res, next) {
    try {
        const [results] = await pool.query(`select * from all_groups`)
        if (!results.length) throw Error('No groups found.')
        req.allGroups = results;
        next();
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}

async function getGroupById(req, res, next) {
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

async function getGroupByName(req, res, next) {
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

async function deleteGroup(req, res, next) {
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

async function createGroup(req, res, next) {
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



async function updateGroup(req, res, next) {
    try {
        const id = req.params.id;
        if (lettersReg.test(id)) throw Error('Id is not valid, please check again')
        const name = req.body.name;
        const about = req.body.about;

        if (name) {
            const [foundGroupName] = await pool.query(`
                select * from all_groups where name = '${name}' and not (id=${id})
                `)
            if (foundGroupName.length) throw Error(`The group '${name}' already exist, Please choose another name !`)
        }

        const [results] = await pool.query(`
            update all_groups set 
            ${name ? `name = "${name}"` : ""}
            ${name && about ? ',' : ''}
            ${about ? `about = "${about}"` : ""}
            WHERE id = ${id}
            `)

        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}

async function tovitToGroup(req, res, next) {
    try {
        const tovitId = +req.tovitId
        const groupId = +req.params.groupId

        if (lettersReg.test(groupId)) throw Error('Id is not valid, please check again')

        const [results1] = await pool.query(`select * from groups_to_posts where group_id = ${groupId} and post_id = ${tovitId}`)

        if (results1.length > 0) throw new Error(`Tovit ${tovitId} already exist in group ${groupId}`);

        const [results] = await pool.query(`INSERT INTO groups_to_posts (post_id, group_id) VALUES(${tovitId}, ${groupId})`)

        req.groupPostId = results.insertId;
        next()

    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}

async function tovitByInfo(req, res, next) {
    try {
        const subject = req.query.subject
        if (subject.length < 3) throw Error(`Please enter 3 notes at least`);

        const [results] = await pool.query(`select * from posts where post_content LIKE '%${subject}%'`)

        if (!results.length) throw Error(`Couldn't find results`)


        req.allPosts = results

        next()
    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}

async function deleteGroupsTov(req, res, next) {
    try {
        const group_id = req.params.groupId
        const post_id = req.params.tovitId

        if (lettersReg.test(group_id) || lettersReg.test(group_id)) throw Error(`Id is not valid, please check again`)


        const [row] = await pool.query(`delete from groups_to_posts where group_id = ${group_id} and post_id = ${post_id}`)

        if (!row.affectedRows) throw Error(`tovit already deleted`)

        const [anotherRow] = await pool.query(`delete from posts where id = ${post_id}`)

        req.deletedTov = row

        next()

    } catch (error) {
        res.status(404).json({ message: `${error.sqlMessage || error.message}` })
    }
}