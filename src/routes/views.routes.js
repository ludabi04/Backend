import { Router } from "express";
import { productsService } from "../persistence/index.js";


const router = Router();


//routes 

router.get("/", async (req, res) => {
    try {
        const products = await productsService.getProducts();
        const data = { productos: products }
        res.render("home", {...data, style: "home.css"})
    } catch (error) {
        
    }
    

});



export {router as viewsRouter}