import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
    console.log(req.session);
    const loginForm = req.body;
    req.session.email = loginForm.userEmail;
    console.log("sesion final", req.session)
    res.send("Login exitoso")
    
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
