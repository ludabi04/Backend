import { Router } from "express";
import { productsService } from "../persistence/index.js";



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










export {router as viewsRouter}