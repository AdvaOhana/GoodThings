import express from 'express';
import dotenv from 'dotenv'
import { createType, createUser, freeQuery } from './db/dbConnection.js'
dotenv.config()
const { PORT } = process.env

const app = express();
app.use(express.json())

// await createUser()


// createType()
// await freeQuery(`select * from users`)





app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})