import { Router } from "express";
import { productsService } from "../persistence/index.js";

const router = Router();


//http://localhost:8080/api/carts
router.get("/", (req, res) => {
    res.json({ message: "listado de carritos" })
});

export { router as cartsRouter }; 