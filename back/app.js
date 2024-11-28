const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { usersRouter } = require('./routers/users.js');
const { groupsRouter } = require('./routers/groups.js');
const path = require('path');

dotenv.config()
const { PORT } = process.env

const app = express();
app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/views')))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', usersRouter)
app.use('/api/users', usersRouter)
app.use('/groups', groupsRouter)
app.use('/api/groups', groupsRouter)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})