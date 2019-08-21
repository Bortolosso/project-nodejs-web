const express = require("express");
const router = express.Router();
require("../../models/Usuario")
const controller = require("../../controllers/users/login");

router.get("/login", (req, res) =>{
    res.render("usuarios/login");
});

router.post("/login", controller.Login);

router.get("/logout", controller.Logout);

module.exports = router;