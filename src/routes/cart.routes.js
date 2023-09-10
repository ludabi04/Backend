import { Router } from "express";
import { cartsService } from "../persistence/index.js";

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
});

//http://localhost:8080/api/carts/cartId
router.get("/:cartId", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cartId);
        const cart = await cartsService.getCartsById(cartId)
        res.json({ message: "carrito por id" , data:cart});
    } catch (error) {
        res.json({status: "error", message:error.message})
    }

    
});
// // / carritodId/products/.prodId
// app.post("/:cId/products/:prodId", (req, res) => {
//     const queryParam = req.query.cId;
//     console.log(queryParam)
//     const gender = queryParam.gender;
//     const age = parseInt(queryParam.age);
//     if (queryParam) {
//         const user = users.filter(u => u.age === age && u.gender === gender)
//         res.send(user)
//     } else {
//         res.send("no hay nadie con ese genero")
//     }
// });




export { router as cartsRouter }; 