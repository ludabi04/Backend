import { Router } from "express";
import { userService } from "../dao/index.js";

const router = Router();

router.post("/login", async (req, res) => {
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

router.get("/profile", (req, res) => {
    console.log("usuario conectado:", req.session);
    if (req.session.email){
    res.send(`Bienvenido ${req.session.email}`)
    } else {
        res.send("necesitas iniciar session")
}})

//desloguear usuario
router.get("/logout", (req, res) => {
    console.log("usuario conectado:", req.session);
    req.session.destroy((err) => {
        if (err) return res.send("no se pudo eliminar sesion");
        res.send("sesion finalizada")
    })
})
export {router as usersRouter}
