import { Router } from "express";
import { userService } from "../dao/index.js";

const router = Router();

router.post("/signup", async (req, res) => {
    try {
        
    console.log(req.session);
    const loginForm = req.body;
    req.session.first_name = loginForm.first_name;
    req.session.last_name = loginForm.last_name;
    req.session.age = loginForm.age;
    req.session.email = loginForm.userEmail;
    req.session.password = loginForm.password;
    const newUser = await userService.addUser(req.session) 
    console.log("sesion final", req.session)
        res.render("loginView", { message : "usuario creado con exito" })
    } catch (error) {
        res.render("signupView", {error: "no se pudo registrar el usuario"} )
    }


    
});
router.post("/login", async (req, res) => {
    try {
        const loginForm = req.body;
    const searchUser = loginForm.userEmail;
    const passUser = loginForm.passUser;
    console.log("usuario buscado!", searchUser);
    console.log("pass buscado", passUser);
    const userExist = await userService.getUsers();
    const exist = userExist.find(email => email.email === searchUser);
    console.log("existe", exist)
    if (exist) {
        const passExist = userExist.find(p => p.password === passUser)
        if (passExist) {
            console.log("ambos existen");
            req.session.email = searchUser;
            res.redirect("/profile")
        } else {
            //pass incorrecto
            console.log("passwor incorrecto")
            res.render("loginView", { error: "el pass es incorrecto" })
        }
    } else {
        res.render("loginView", {error: "el usuario no existe"})
    }
} catch (error) {
    res.render("loginView", {error: "el usuario no existe"})
    }
    
})

router.post("/profile", async (req, res) => {
    try {
        console.log("daata", data)
    } catch (error) {
        res.send("necesitas iniciar session ya")
    }
})


    

//desloguear usuario
router.get("/logout", async (req, res) => {


    console.log("usuario conectado:", req.session);
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
