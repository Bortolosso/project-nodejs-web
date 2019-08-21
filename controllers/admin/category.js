const mongoose = require("mongoose");
const Categorie = mongoose.model("categories");

const CONST = require("../../constants/constants");

function ValidateCreateCategory(req, res){
    //Validates
    var error = [];

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        error.push({text: CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.ERROR.INVALID.NAME}); //Todo array possui a função ".push" que serve para colocar um novo dado no array 
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        error.push({text: CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.ERROR.INVALID.CLIENT}); 
    }

    // if(!req.body.name.length < 2){
    //     error.push({text: "Invalid name !"});
    // }

    if(error.length > 0){
        res.render("admin/addcategories", {error: error});
    }else{
        const newCategorie = {
            name: req.body.name,
            slug: req.body.slug
        }
        new Categorie(newCategorie).save().then(() => {
            req.flash(CONST.MIDDLEWARE.SUCCESS ,CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.SUCCESS.REGISTER);
            res.redirect("/admin/categories");
        }).catch((err) =>{
            req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.ERROR.ERROR.REGISTER);
            res.redirect("/admin");
        });
    }
};

function ListCategory(req, res){
    Categorie.find().sort({date: "desc"}).then((categorie) => {
        res.render("admin/categories", {categorie: categorie});
    }).catch((err) => {
        req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.ERROR.INVALID.ERROR_INTERNAL);
        res.redirect("/admin");
    });
};

function EditCategoryID(req, res){
    Categorie.findOne({_id: req.params.id}).then((categorie) =>{
        res.render("admin/editcategorie", {categorie: categorie});
    }).catch((err) => {
        req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.ERROR.INVALID.ERROR_INTERNAL);
        res.redirect("/admin/categories")
    });
};

function ValidateEditCategory(req, res){
    var error = [];

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        error.push({text: CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.ERROR.INVALID.NAME}); //Todo array possui a função ".push" que serve para colocar um novo dado no array 
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        error.push({text: CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.ERROR.INVALID.CLIENT}); 
    }

    if(error.length > 0){
        res.render("admin/addcategories", {error: error});
    }else{
        Categorie.findOne({_id: req.body.id}).then((categorie) =>{
        
            categorie.name = req.body.name;
            categorie.slug = req.body.slug;
    
            categorie.save().then(() =>{
                req.flash(CONST.MIDDLEWARE.SUCCESS, CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.SUCCESS.EDIT);
                res.redirect("/admin/categories");
            }).catch((err) =>{
                req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.ERROR.INVALID.ERROR_INTERNAL);
                res.redirect("/admin/categories");
            })
        }).catch((err) =>{
            req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.ERROR.ERROR.EDIT);
            res.redirect("/admin/categories")  
        });
    }
};

function DeleteCategory(req, res){
    Categorie.remove({_id:req.body.id}).then(() => {
        req.flash(CONST.MIDDLEWARE.SUCCESS, CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.SUCCESS.DELETE);
        res.redirect("/admin/categories");
    }).catch((err) => {
        req.flash(CONST.MIDDLEWARE.ERROR, CONST.CONTROLLERS.ADMIN.CATEGORY.MESSAGE.ERROR.ERROR.DELETE);
        res.redirect("/admin");
    });
};

module.exports = {
    ValidateCreateCategory,
    ListCategory,
    EditCategoryID,
    ValidateEditCategory,
    DeleteCategory
};