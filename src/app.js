import express from "express";
import { ProductManagerFiles } from "./persistence/productManagerFiles.js";
console.log(ProductManagerFiles)

const managerProductService = new ProductManagerFiles("../src/files/productos.json")
console.log(managerProductService)



const port = 8080;

const app = express();
app.use(express.urlencoded({extended:true})) // permite caracteres especiales

app.listen(port, () => console.log("server funcionando"))


//rutas del servidor
app.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        
        const limitNumber = parseInt(limit);
        const products = await managerProductService.getProducts();
        if (limit) {
            const productsLimit = products.slice(0, limitNumber);
            res.send(productsLimit)
        } else {
            res.send(products)
        }
    } catch (error) {
        res.send(error.message)
    }
});


app.get("/products/:userId", async (req, res) => {
    const products = await managerProductService.getProducts();
    const id = parseInt(req.params.userId);
    console.log(id)
    const searchProd = products.find(u => u.id === id);
    try {
        if (searchProd) {
            res.send(searchProd)
        } else {
            res.send("producto no encontrado")
        }
    } catch (error) {
        res.send(error.message)
    }
    
});

