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





export {router as viewsRouter}