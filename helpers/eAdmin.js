const CONST = require("../constants/constants");

module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.eAdmin == 0){
            return next();
        };
        req.flash(CONST.MIDDLEWARE.ERROR, CONST.HELPERS.EADMIN.MESSAGE);
        res.redirect("/");
    }
};