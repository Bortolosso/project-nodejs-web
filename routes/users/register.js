const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../../models/Usuario")
const controller = require("../../controllers/users/register");

router.get("/registro", (req, res) => {
    res.render("usuarios/registro");
});

router.post("/registro", controller.Register);

module.exports = router;