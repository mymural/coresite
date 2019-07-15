
// Middleware to check if the user is authenticated
isUserAuthenticated((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.send('You must login!');
    }
});

module.exports = isUserAuthenticated;