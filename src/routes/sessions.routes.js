import { Router } from "express";
import { userService } from "../dao/index.js";
// import { createHash, inValidPassword } from "../utils.js";
// import { usersModel } from "../dao/mongo/models/users.model.js";
import passport from "passport";
import { config } from "../config/config.js";

const router = Router();

router.post("/signup", passport.authenticate("signupLocalStrategy",{
    failureRedirect:"fail-signup"
}) , async(req,res)=>{
    res.render("loginView",{message:"Usuario registrado correctamente"});
});

router.post("/fail-signup", async (req, res) => {
    res.render("signupView", {error:" no se pudo registrar el usuario"})
})
router.post("/fail-login", async (req, res) => {
    res.render("loginView", {error:" no se pudo registrar el usuario"})
})
router.post("/login", passport.authenticate("loginLocalStrategy",{
    failureRedirect:"/fail-login"
}) , async(req,res)=>{
    res.redirect("/profile");
});

router.post("/profile", async (req, res) => {
    try {
        res.send({ message: "necesitas iniciar session ya" })
    } catch (error) {
        res.send({ message: "necesitas iniciar session ya" })
    }
});

//Ruta de registro con github
router.get("/signup-github", passport.authenticate("signupGithubStrategy"));


//Ruta del callback con github

router.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy",{
    failureRedirect:"/fail-signup"
}), (req,res)=>{
    res.redirect("/profile");
});

    

//desloguear usuario
router.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send("no se pudo eliminar sesion");
        res.send(`<body>
    <div class="menu">
        <a href="/" class="menuItem">Home</a><br>
        <a href="/realtimeproducts" class="menuItem">Productos Tiempo Real</a>
        <a href="/chat" class="menuItem">Chat</a>
        <a href="/carts" class="menuItem"> Carts</a>
        <a href="/signup" class="menuItem"> Registro</a>
        <a href="/login" class="menuItem"> Login</a>
        <a href="/profile" class="menuItem"> Perfil</a>
        
    </div>
    <div class="body">
        <div>
            <p class="endSessionMsg">Sesión Finalizada</p>
        </div>
        <div class="links">
            <a href="/" class="menuEnd">Ir al inicio</a>
            <a href="/login" class="menuEnd">Iniciar Sesión</a>
        </div>
        <link rel="stylesheet" href="/css/logout.css">
        <link rel="stylesheet" href="/css/{{style}}">
        <link rel="stylesheet" href="/css/home.css">
         <link rel="stylesheet" href="/css/index.css">
                 <link rel="stylesheet" href="/css/realtimeproducts.css">

        </div>`)
    })
})
export {router as usersRouter}
