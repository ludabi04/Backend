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
    res.send(`Bienvenido ${req.session.email}`)
})

export {router as usersRouter}
