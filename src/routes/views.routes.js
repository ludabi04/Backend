import { Router } from "express";
import { productsService } from "../dao/index.js";
import { chatService } from "../dao/index.js";
import { cartsService } from "../dao/index.js";




const router = Router();


//routes 

router.get("/", async (req, res) => {
    
        const products = await productsService.getProducts();
        const data = { productos: products }
        res.render("home", {...data, style: "index.css"})
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
        
    }
});


// //ruta para crear una cookie
// router.get("/set-cookie", (req, res) => {
//     // res.cookie("nombreCookie", "valorCookie", { maxAge: 5000 }).send("cookie creada");
//     res.cookie("nombreCookie", "valorCookie").send("cookie creada");

//     //cookie(nombreCookie, valoorCookie, options)
// });

// //ruta para leer las cookies que vienen del cliente

// router.get("/get-cookies", (req, res) => {
//     console.log(req.cookies);
//     res.send("cookies recibidas")
// });

// //ruta para eliminar las cookies

// router.get("/delete-cookies", (req, res) => {
//     res.clearCookie("nombreCookie").send("la cookie fue eliminada")
// })

// //ruta cookie firmada

// router.get("/set.signedCookie", (req, res) => {
//     res.cookie("userData", { email: "pepe@gmail.com", role: "user" }, { signed: true }).send("cookie creada")
// });

// //endpoint que lee las cookies firmadas
// router.get("/get.signedCookie", (req, res) => {
//     console.log(req.signedCookies)
//     res.send("cookies recibidas")
// });
// router.get("/create-cookie", (req, res) => {
//     console.log(req.cookies)
//     res.send("cookies recibidas!")
// });






export {router as viewsRouter}