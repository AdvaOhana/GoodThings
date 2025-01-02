
function setCookie(req, res, next) {   
    res.cookie('sId', req.userData.id, {
        maxAge: 3600000, // 1 hour
        httpOnly: true,  // For security, prevents client-side access
        secure: process.env.NODE_ENV === 'production', // Send only over HTTPS
        sameSite: 'Strict' // To restrict cross-site requests
    });
    next()
}

function getCookie(req, res, next) {
    const { sId } = req.cookies;
    req.sId = sId
    next()
}
module.exports = { setCookie, getCookie };
