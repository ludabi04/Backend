import express from "express";
import { ProductManagerFiles } from "./persistence/productManagerFiles.js";
console.log(ProductManagerFiles)
import { productRouter } from "./routes/productos.routes.js";
import { cartsRouter } from "./routes/cart.routes.js";



const managerProductService = new ProductManagerFiles("./src/files/productos.json")
console.log(managerProductService)

const port = 8080;

const app = express();
app.use(express.urlencoded({extended:true})) // permite caracteres especiales
app.use(express.json());

app.listen(port, () => console.log("server funcionando"))

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);