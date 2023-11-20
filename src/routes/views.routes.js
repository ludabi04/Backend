import { Router } from "express";
import { productsService } from "../dao/index.js";
import { chatService } from "../dao/index.js";
import { cartsService } from "../dao/index.js";




const router = Router();


//routes 


router.get("/", async (req, res) => {
    try { 
        const prodTotal = await productsService.getProducts();
        const limitTotal = prodTotal.length
        const products = await productsService.getProductsLimit(5, 1);
        const dataR = { productos: products }
        const dataProducts = {
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.prevPage, // //Link directo a la página previa (null si hasPrevPage=false)
            nextLink: products.nextPage // // Link directo a la página siguiente (null si hasNextPage=false)

        }
        res.render("home", {dataProducts, style: "home.css"})
    } catch (error) {
        
    }
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productsService.getProducts();
        const data = { productos: products }
        res.render("realTimeProducts", {...data, style: "realtimeproducts.css"})
    } catch (error) {
        
    }
});
router.get("/chat", async (req, res) => {
    try {
        const messages = await chatService.getMessages();
        const data = { messages: messages }
        res.render("chat", { ...data, style: "realtimeproducts.css" })
    } catch (error) {
        
    }
});

router.get("/carts", async (req, res) => {
    try {
        const carts = await cartsService.getCarts();
        const data = { carts: carts }
        res.render("carts", { ...data, style: "realtimeproducts.css" })
    } catch (error) {
        res.send("no es posible acceder a los carritos")
    }
});

router.get("/signup", async (req, res) => {
    try {
        res.render("signupView")
    } catch (error) {
        res.send("no es posible registrarse")
    }
});
router.get("/fail-signup", async (req, res) => {
    try {
        res.render("signupView", {error: "no se pudo registrar al usuario"})
    } catch (error) {
        res.send("no es posible registrarse")
    }
});
router.get("/fail-login", async (req, res) => {
    try {
        res.render("loginView", {error: "no se pudo loguear al usuario"})
    } catch (error) {
        res.send({error:error})
    }
});

router.get("/profile", (req, res) => {
    if(req.user?.email){
        const userEmail = req.user.email;
        const userName = req.user.first_name;
        res.render("profileView",{userEmail});
    } else {
        //  res.send("no estas logyueado")
        res.redirect("/login?mensaje=PRIMERO DEBES INICIAR SESION");
    }
});


    

router.get("/login", async (req, res) => {
    try {
        const mensaje = req.query.mensaje;
  res.render("loginView", { message: mensaje});
    } catch (error) {
        
    }
});



export {router as viewsRouter}