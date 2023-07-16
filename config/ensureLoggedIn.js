module.exports = function(req, res, next) {
    if (req.isAuthenticated()) next();
    res.redirect('/auth/google');
}