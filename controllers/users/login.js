const mongoose = require("mongoose");
const passport = require("passport");

const CONST = require("../../constants/constants");

function Login(req, res, next){
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/usuarios/login",
        failureFlash: true
    })(req, res, next);
};

function Logout(req, res){
    req.logout();
    req.flash(CONST.MIDDLEWARE.SUCCESS, CONST.CONTROLLERS.USERS.LOGIN.SUCCESS_LOGOUT);
    res.redirect("/");
};

module.exports = {
    Login,
    Logout
};