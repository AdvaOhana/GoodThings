const dateFns = require('date-fns')

async function threeDaysQuery(req, res, next) {
    req.query = { startDate: dateFns.addDays (new Date(),-3), endDate: new Date()};
    next()
}

module.exports = { threeDaysQuery}