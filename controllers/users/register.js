const mongoose = require("mongoose");
const Usuario = mongoose.model("usuario");
const bcrypt = require("bcryptjs"); // Biblioteca de incriptação de dados

const CONST = require("../../constants/constants");

function Register(req, res){
    var erros = [];

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        erros.push({text: CONST.CONTROLLERS.USERS.REGISTER.MESSAGE.ERROR.INVALID.NAME}); //Todo array possui a função ".push" que serve para colocar um novo dado no array 
    };
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({text: CONST.CONTROLLERS.USERS.REGISTER.MESSAGE.ERROR.INVALID.EMAIL}); 
    };
    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
        erros.push({text: CONST.CONTROLLERS.USERS.REGISTER.MESSAGE.ERROR.INVALID.PASSWORD}); 
    };
    if(req.body.password.length < 2){
        erros.push({text: CONST.CONTROLLERS.USERS.REGISTER.MESSAGE.ERROR.INVALID.CONFIRM_PASSWORD});
    };
    if(req.body.password != req.body.password2){
        erros.push({text: CONST.CONTROLLERS.USERS.REGISTER.MESSAGE.ERROR.INVALID.DIFFERENT_PASSWORD});
    };

    if(erros.length > 0){
        res.render("usuarios/registro", {erros: erros});
    }else{
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if(usuario){
                req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.USERS.REGISTER.MESSAGE.ERROR.INVALID.NOTICE.EXIST_ACCOUNT);
                res.redirect("/usuarios/registro");
            }else{
                const novoUsuario = new Usuario({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.password, salt, (erro, hash) => {
                        if(erro){
                            req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.USERS.REGISTER.MESSAGE.ERROR.ERROR.ERROR_INTERNAL);
                            res.redirect("/");
                        };
                        novoUsuario.password = hash;
                        novoUsuario.save().then(() => {
                            req.flash(CONST.MIDDLEWARE.SUCCESS, CONST.CONTROLLERS.USERS.REGISTER.MESSAGE.SUCCESS.CREATE_USER);
                            res.redirect("/");
                        }).catch((erro) => {
                            req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.USERS.REGISTER.MESSAGE.ERROR.ERROR.ERROR_CREATE);
                            res.redirect("/usuarios/registro");
                        });
                    });
                });
            };
        }).catch((err) => {
            req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.USERS.REGISTER.MESSAGE.ERROR.ERROR.ERROR_INTERNAL);
            res.redirect("/");
        });
    };
};

module.exports = {
    Register,
};