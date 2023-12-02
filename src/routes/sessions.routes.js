import { Router } from "express";
import { userService } from "../dao/index.js";
import { createHash, inValidPassword } from "../utils.js";
import { usersModel } from "../dao/mongo/models/users.model.js";
import passport from "passport";
import { config } from "../config/config.js";
import { generateToken } from "../utils.js";

const router = Router();

router.post("/signup", passport.authenticate("signupLocalStrategy", {
    session: false,
    failureRedirect:"fail-signup"
}) , (req,res)=>{
    res.redirect("/login");
});

router.post("/fail-signup", async (req, res) => {
    res.render("signupView", {error:" no se pudo registrar el usuario"})
})
router.get("/fail-login", (req,res)=>{
    res.render("login",{error:"No se pudo iniciar sesion para el usuario"});
});
router.post("/login", passport.authenticate("loginLocalStrategy", {
    session: false,
    failureRedirect:"/fail-login"
}), (req, res) => {
    console.log("login-user", req.user);
    //generamos el token del usuario
    const token = generateToken(req.user);
    //enviamos el token al cliente
    res.cookie("cookiesToken",token).json({status:"success", message:"login exitoso"});
    // res.redirect("/profile")
});

router.post("/profile", passport.authenticate("jwtAuth", {
    session: false,
    failureRedirect: "/fail-auth"
}), (req, res) => {
    res.json({message:"peticion recibida"})
});

router.get("/fail-auth", (req, res) => {
    res.json({status:"error", message:"token invalido"})
})

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
