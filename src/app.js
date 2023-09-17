import express from "express";
import { ProductManagerFiles } from "./persistence/productManagerFiles.js";
import { productRouter } from "./routes/productos.routes.js";
import { cartsRouter } from "./routes/cart.routes.js";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars"
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";
import { productsService } from "./persistence/index.js";

const managerProductService = new ProductManagerFiles("./src/files/productos.json")
console.log(managerProductService)


//servidor express
const port = 8080;
const app = express();
//servidor expres con el protocolo http
const httpServer = app.listen(port, () => console.log("server funcionando"))

// servidor socket

const socketServer = new Server(httpServer);


app.use(express.urlencoded({extended:true})) // permite caracteres especiales
app.use(express.json());

//agregando la carpeta public
app.use(express.static(path.join(__dirname, "/public")))

// configuracion del motor de plantillas 

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));

//routes
app.use(viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

//configuracion del socket server

socketServer.on("connection", async (socket) => {
    const products = await productsService.getProducts()
    //enviando los productos al cliente
    socket.emit("productosGuardados", products);
    // recibir los datos del producto desde el 
    socket.on("addProduct", async (data) => {
        const result = await productsService.addProduct(data);
        const products = await productsService.getProducts();
        socket.emit("productosActualizados", products);
    });
    socket.on("eliminarElemento", async (data) => {
        const prodEliminar = await productsService.deleteProducts(data)
        socket.emit("productosActualizados", data)
    })
})
