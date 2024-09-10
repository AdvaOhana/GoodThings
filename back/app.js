import express from 'express';
import dotenv from 'dotenv'
import { createType, createUser, freeQuery } from './db/dbConnection.js'
import { usersRouter } from './routers/users.js';
import { groupsRouter } from './routers/groups.js';

dotenv.config()
const { PORT } = process.env

const app = express();
app.use(express.json())
app.use('/users', usersRouter)
app.use('/groups', groupsRouter)

// await createUser()
// createType()
// await freeQuery(`select * from users`)





app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})