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
    console.log("usuario buscado", searchUser);
    console.log("pass buscado", passUser);
    const userExist = await userService.getUsers();
    const exist = userExist.find(email => email.email === searchUser);
    console.log("existe", exist)
    if (exist) {
        const passExist = userExist.find(p => p.password === passUser)
        if (passExist) {
            console.log("ambos existen");
            res.render("home", { message : "usuario creado con exito" } )
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

router.get("/profile", (req, res) => {
    
    
    console.log("usuario buscado:", req.body);
    if (req.session.email){
    res.send(`Bienvenido ${req.session.email}`)
    } else {
        res.send("necesitas iniciar session")
}})

//desloguear usuario
router.get("/logout", async (req, res) => {


    console.log("usuario conectado:", req.session);
    req.session.destroy((err) => {
        if (err) return res.send("no se pudo eliminar sesion");
        res.send("sesion finalizada")
    })
})
export {router as usersRouter}
