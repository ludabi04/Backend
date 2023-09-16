import express from "express";
import { ProductManagerFiles } from "./persistence/productManagerFiles.js";
import { productRouter } from "./routes/productos.routes.js";
import { cartsRouter } from "./routes/cart.routes.js";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars"
import { viewsRouter } from "./routes/views.routes.js";


const managerProductService = new ProductManagerFiles("./src/files/productos.json")
console.log(managerProductService)

const port = 8080;

const app = express();
app.use(express.urlencoded({extended:true})) // permite caracteres especiales
app.use(express.json());


app.listen(port, () => console.log("server funcionando"))

app.use(express.static(path.join(__dirname, "/public")))


app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

// configuracion del motor de plantillas 

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "views"));




app.use(viewsRouter)