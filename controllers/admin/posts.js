const mongoose = require("mongoose");
const Categorie = mongoose.model("categories");
const Post = mongoose.model("posts");

const CONST = require("../../constants/constants");

function ListPosts(req, res){
    Post.find().populate("category").sort({data: "desc"}).then((post) => {
        res.render("admin/posts", {post: post});
    }).catch((err) => {
        console.log(err);
        req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.ERROR.ERROR.LIST_POSTS);
        res.redirect("/admin");
    });
};

function PostsAdd(req, res){
    Categorie.find().then((categorie) => {
        res.render("admin/addposts", {categorie: categorie});
    }).catch((err) => {
        req.flash(CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.ERROR.ERROR.ERROR_INTERNAL);
        res.redirect("/admin");
    });
};

function ValidatePostsAdd(req, res){
    var error = [];

    if(!req.body.tittle || typeof req.body.tittle == undefined || req.body.tittle == null){
        error.push({text: CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.ERROR.INVALID.TITTLE}); //Todo array possui a função ".push" que serve para colocar um novo dado no array 
    }

    if(!req.body.description || typeof req.body.description == undefined || req.body.description == null){
        error.push({text: CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.ERROR.INVALID.DESCRIPTION}); //Todo array possui a função ".push" que serve para colocar um novo dado no array 
    }

    if(req.body.categorie == "0"){
        error.push({text: CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.ERROR.INVALID.CATEGORY});
    }

    if(error.length > 0){
        res.render("admin/addposts", {error: error});
    }else{
        
        const newPost = {
            tittle: req.body.tittle,
            description: req.body.description,
            content: req.body.content,
            category: req.body.categories,
            slug: req.body.slug,
            date: req.body.date
        }

        new Post(newPost).save().then(() => {
            req.flash(CONST.MIDDLEWARE.SUCCESS, CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.SUCCESS.CREATE);
            res.redirect("/admin/posts");
        }).catch((err) => {
            req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.ERROR.ERROR.ERROR_INTERNAL, "create");
            res.redirect("/admin/posts");
        });
    }
};

function EditPostsID(req, res){
    Post.findOne({_id: req.params.id}).then((post) => {
        Categorie.find().then((categorie) => {
            res.render("admin/editpost", {categorie: categorie, post: post});
        }).catch((err) => {
            console.log(err)
            req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.ERROR.ERROR.ERROR_INTERNAL, "post");
            res.redirect("/admin/posts");
        });
    }).catch((err) => {
        req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.ERROR.ERROR.ERROR_INTERNAL, "post_list");
        res.redirect("/admin/posts");
    });
};

function EditPosts(req, res){
    Post.findOne({_id: req.body.id}).then((post) => {

        post.tittle = req.body.tittle;
        post.description = req.body.description;
        post.content = req.body.content;
        post.category = req.body.categorie;
        post.slug = req.body.slug;
        post.date = req.body.date;

        post.save().then(() => {
            req.flash(CONST.MIDDLEWARE.SUCCESS, CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.SUCCESS.EDIT);
            res.redirect("/admin/posts");
        }).catch((err) => {
            req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.ERROR.ERROR.ERROR_INTERNAL, "save_edit");
        res.redirect("/admin/posts");
        });

    }).catch((err) => {
        console.log(err);
        req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.ERROR.ERROR.ERROR_INTERNAL, "edit");
        res.redirect("/admin/posts");
    });

};

function DeletePostsID(req, res){
    Post.remove({_id: req.params.id}).then(() => {
        req.flash(CONST.MIDDLEWARE.SUCCESS, CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.SUCCESS.DELETE);
        res.redirect("/admin/posts/")

    }).catch((err) => {
        req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.POSTS.MESSAGE.ERROR.ERROR.ERROR_INTERNAL, "delete");
        res.redirect("/admin/posts/");
    });
};

module.exports = {
    ListPosts,
    PostsAdd,
    ValidatePostsAdd,
    EditPostsID,
    EditPosts,
    DeletePostsID,
};