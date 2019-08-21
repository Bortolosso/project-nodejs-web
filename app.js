//Carregar modulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const category = require("./routes/admin/category");
const posts = require("./routes/admin/posts");//Sempre passar o nome do aquivo para a const 
const path = require("path")//Modulo padrão do Node, modulo responsavel por manipular pastas/diretorios
const session = require("express-session");
const flash = require("connect-flash"); // O "flash" é um tipo de sessão que aparece apena uma vez. Ao atualizar a pagina a mensagem desaparece
require("./models/Post");
const Post = mongoose.model("posts");
require ("./models/Categorie");
// const usuarios = require("./routes/usuario");
const register = require("./routes/users/register");
const login = require("./routes/users/login");
const passport = require("passport"); 
require("./config/auth")(passport);
const Categoria = mongoose.model("categories");
// const db = require("./config/db");
const CONST = require("./constants/constants");

//Config
    //Sessions
        app.use(session({
            secret: CONST.APP.PASSWORD_SECRET,
            resave: true,
            saveUninitialized: true
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        app.use(flash());
    //Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash(CONST.MIDDLEWARE.SUCCESS);// "locals" serve para criar variaveis globais
            res.locals.error_msg = req.flash(CONST.MIDDLEWARE.ERROR);
            res.locals.error = req.flash("error");
            res.locals.user = req.user || null;
            next();
        });

    //Body Parser
        const urlencodedParse = bodyParser.urlencoded({extended:false}); 
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

    //Handlebars
        app.engine("handlebars", handlebars({defaultLayout: "main"}));
        app.set("view engine", "handlebars");        
 
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect(CONST.CONFIG.DB.MONGOURI.CONNECT_CLUSTER, {
            useNewUrlParser: true
        }).then(() => {
            console.log(CONST.APP.MONGODB.MESSAGE.CONNECT);
        }).catch((err) => {
            console.log(CONST.APP.MONGODB.MESSAGE.ERROR_CONNECT + err);
        });

    //Public
        //Configurar express para arquivos estáticos
        app.use(express.static(path.join(__dirname, "public"))); //Pegar caminho absoluto. 
        // app.use((req, res, next) =>{
        //     console.log("Hello, I'm Middleware !");
        //     next();
        // });


//Routes
    //Boa pratica é chamar as rotas depois das configurações
    app.get("/", (req, res) => {
        Post.find().populate("category").sort({data: "desc"}).then().then((post) => {
            res.render("index", {post: post});
        }).catch((err) => {
            req.flash(CONST.MIDDLEWARE.ERROR, CONST.APP.ERROR.MESSAGE.ERROR_INTERNAL);
            res.redirect("/404");
        });
    });

    app.get("/clientes", (req, res) => {
        Categoria.find().then((categorie) => {
            res.render("admin/clientes/index", {categorie: categorie})

        }).catch((erro) => {
            req.flash(CONST.MIDDLEWARE.ERROR, CONST.APP.ERROR.MESSAGE.LOAD_CLIENTS);
            res.redirect("/");
        });

    });

    app.get("/404", (req, res) => {
        res.send("Error 404 !");
    });

    app.use("/admin", urlencodedParse, posts);
    app.use("/admin", urlencodedParse, category);
    app.use("/usuarios", register);
    app.use("/usuarios", login);

//Others 
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(CONST.APP.SERVER_RUNNING + PORT);
});