const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("../models/Usuario");
const Usuario = mongoose.model("usuario");

const CONST = require("../constants/constants");

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: CONST.CONFIG.AUTH.EMAIL, passwordField: CONST.CONFIG.AUTH.PASSWORD}, (email, password, done) =>{
        Usuario.findOne({email: email}).then((usuario) =>{
            if(!usuario){
                return done(null, false, {message: CONST.CONFIG.AUTH.MESSAGE.EXISTING_ACCOUNT}); 
            };

            bcrypt.compare(password, usuario.password, (erro, valid) => {
                if(valid){
                    return done(null, usuario);
                }else{
                    return done(null, false, {message: CONST.CONFIG.AUTH.MESSAGE.INVALID_PASSWORD});
                };
            });
        });
    }));

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id);
    });

    passport.deserializeUser((id, done) => {
        Usuario.findById(id,(err, usuario)=>{
            done(err, usuario);
        });
    });
};