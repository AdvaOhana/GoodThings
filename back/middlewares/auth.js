async function setCookie(req, res, next) {
    console.log(req.userData);

    res.cookie('sId', req.userData.id, {
        maxAge: 3600000, // 1 hour
        httpOnly: true,  // For security, prevents client-side access
        secure: process.env.NODE_ENV === 'production', // Send only over HTTPS
        sameSite: 'Strict' // To restrict cross-site requests
    });

    next()
}

module.exports = { setCookie };
