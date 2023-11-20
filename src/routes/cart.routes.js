import { Router } from "express";
import { cartsService, productsService } from "../dao/index.js";

const router = Router();

//http://localhost:8080/api/carts
router.get("/", async (req, res) => {
    const carritos = await cartsService.getCarts();
     res.json({message: "carrito agregado", data: carritos });
});

router.post("/", async (req, res) => {
    try {
        const cartInfo = req.body;
        const carritoAgregado = await cartsService.addCart({products: cartInfo});
        res.json({ message: "agregado correctamente", data: carritoAgregado });
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


router.put("/:cartId/products/:prodId", async (req, res) => {
       try {
        let cartId = parseInt(req.params.cartId);
        const prodId = parseInt(req.params.prodId);
        const carts = await cartsService.getCartsById(cartId);
        const idExists = carts.find(cid => cid.id === cartId)
        const product = await productsService.getProductsById(prodId)
        const productExists = product.find(pid => pid.id === prodId);
            if(!idExists){
                cartId = await cartsService.addCart({products : []});
            }
           if (productExists) {
            const productoEnId = await cartsService.updateCartsById(cartId, prodId, productExists)
            
        } else {
        }

        res.json({message: "peticion recibida", cartId, prodId});
    } catch (error) {
        res.send(error.message)

    }}
)
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