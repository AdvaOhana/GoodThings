import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { usersRouter } from './routers/users.js';
import { groupsRouter } from './routers/groups.js';

dotenv.config()
const { PORT } = process.env

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/users', usersRouter)
app.use('/groups', groupsRouter)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})