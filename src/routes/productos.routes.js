import { Router } from "express";
import { productsService } from "../dao/index.js";

const router = Router();


//http://localhost:8080/api/products
router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const limitNumber = parseInt(limit);
        const products = await productsService.getProductsLimit(limit, page);
        if (limit) {
            const productsLimit = products.slice(0, limitNumber);
            res.json({status: "success", data: productsLimit})
        } else {
            res.json({status: "succes", data: products})
        }
    } catch (error) {
        res.json({ status: "error", message:error.message})
    }
});

//http://localhost:8080/api/products/prodId
router.get("/:prodId", async (req, res) => {
    try {
        const productId = parseInt(req.params.prodId);
        const product = await productsService.getProductsById(productId)
        res.json({ message: "producto por id" , data:product});
    } catch (error) {
        res.json({status: "error", message:error.message})
    }

    
});


router.post("/", async (req, res) => {
    try {
        const prodInfo = req.body;
        const prodInfoAdd = await productsService.addProduct(prodInfo);
        res.json({ message: "agregado correctamente", data: prodInfoAdd });
        } catch (error) {
        res.send(error.message)
        }
})
    
//http://localhost:8080/api/products/prodId
router.put("/:prodId", async (req, res) => {
    try {
        const productId = parseInt(req.params.prodId);
        const productUpdate = req.body;
        const product = await productsService.updateProductsById(productId, productUpdate)
        res.json({ message: "producto por id" , data:productUpdate});
    } catch (error) {
        res.json({status: "error", message:error.message})
    }

    
});

router.delete("/:prodId", async (req, res) => {
    try {
        const productId = parseInt(req.params.Id);
        const product = await productsService.deleteProducts(productId)
        res.json({ message: "id "+productId+" eliminado correctamente" , data:product});
    } catch (error) {
        res.json({status: "error", message:error.message})
    }

     
});






export { router as productRouter }; 

