const express = require("express");
const router = express.Router();
require("../../models/Categorie");
require("../../models/Post");
const {eAdmin} = require("../../helpers/eAdmin");
const controllers = require("../../controllers/admin/posts")

router.get("/posts", eAdmin, controllers.ListPosts);

router.get("/post/add", eAdmin, controllers.PostsAdd);

router.post("/posts/new", eAdmin, controllers.ValidatePostsAdd);

router.get("/post/edit/:id", eAdmin, controllers.EditPostsID);

router.post("/post/edit/", eAdmin, controllers.EditPosts);

router.get("/post/delete/:id", eAdmin, controllers.DeletePostsID);

router.get("/login", eAdmin, (req, res)=>{
    res.render("usuarios/login")
});

module.exports = router;