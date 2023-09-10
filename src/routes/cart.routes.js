import { Router } from "express";
import { cartsService, productsService } from "../persistence/index.js";

const router = Router();


//http://localhost:8080/api/carts
router.get("/", async (req, res) => {
    const carritos = await cartsService.getCarts();
    res.send(carritos)
});

router.post("/", async (req, res) => {
    try {
        const cartInfo = req.body;
        const carritoAgregado = await cartsService.addCart(cartInfo);
        res.json({ data: carritoAgregado });
    } catch (error) {
                res.send(error.message)

    }
})



export { router as cartsRouter }; 