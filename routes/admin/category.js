//Routes for admin
const express = require("express");
const router = express.Router();
require("../../models/Categorie");
require("../../models/Post");
const {eAdmin} = require("../../helpers/eAdmin");
const controller = require("../../controllers/admin/category")

router.get("/", eAdmin, (req, res) => {
    res.render("admin/index");
});

router.get("/categories", eAdmin, controller.ListCategory);

router.get("/categories/add", eAdmin, (req, res) => {
    res.render("admin/addcategories")
});

router.post("/categories/add", eAdmin, controller.ValidateCreateCategory);

router.get("/categories/edit/:id",  eAdmin, controller.EditCategoryID);

router.post("/categorie/edit", eAdmin, controller.ValidateEditCategory);

router.post("/categorie/delete", eAdmin, controller.DeleteCategory)

module.exports = router;