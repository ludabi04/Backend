import express from "express";
import { ProductManagerFiles } from "./dao/productManagerFiles.js";
import { productRouter } from "./routes/productos.routes.js";
import { cartsRouter } from "./routes/cart.routes.js";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars"
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";
import { cartsService, chatService, productsService } from "./dao/index.js";
import { connectDB } from "./config/dbConnection.js";
import { productsManagerMongo } from "./dao/mongo/productsManagerMongo.js";
import { chatRouter } from "./routes/chat.routes.js";
import { messagesManagerMongo } from "./dao/mongo/chatManagerMongo.js";
import { cartsManagerMongo } from "./dao/mongo/cartsManagerMongo.js";


const managerProductService = new productsManagerMongo();
const managerChatService = new messagesManagerMongo();
const managerCartService = new cartsManagerMongo();
console.log(managerProductService)
console.log(managerChatService)
console.log(managerCartService) 


//servidor express
const port = 8080;
const app = express();
//servidor expres con el protocolo http
const httpServer = app.listen(port, () => console.log("server funcionando"))

// servidor socket

const socketServer = new Server(httpServer);

//conexion a bBDD




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
// app.use("/realtimeproducts", productRouter);
// app.use("/chat", chatRouter)
// app.use("/api/products", productRouter);
// app.use("/api/carts", cartsRouter);

//configuracion del socket server

socketServer.on("connection", async (socket) => {
    //se conecta un usuario y le manda los mensajes
        const mensajes = await chatService.getMessages();
        console.log("este es el mensaje", mensajes)
        socket.emit("reenvio", mensajes);
        // se conecta un usuario y le manda los productos
        const products = await productsService.getProducts()
        console.log("productos", products)
        const carritos = await cartsService.getCarts();
        socket.emit("carritostotales", carritos)
    //enviando los productos al cliente
    socket.emit(("productosGuardados", "productosActualizados"), products);
    // recibir los datos del producto desde el 
    socket.on("addProduct", async (data) => {
        await productsService.addProduct(data);
        const products = await productsService.getProducts();
        socket.emit("productosActualizados", products);
    });
    socket.on("eliminarElemento", async (data) => {
        console.log("data para eliminar", data)
        await productsService.deleteProducts(data);
        const products = await productsService.getProducts();
        socket.emit("productosActualizados", products);
    })
    socket.on("mensajeEnviado", async (data) => {
        await chatService.addMessages(data);
        const mensajes = await chatService.getMessages();
        console.log("este es el mensaje", mensajes)
        socket.emit("reenvio", mensajes)
    })
     socket.on("eliminarMsg", async (data) => {
        console.log("msg para eliminar", data)
        await chatService.delMessages(data);
        const chat = await chatService.getMessages();
        socket.emit("msgActualizados", chat);
     })
    socket.on("update", async (data) => {
        console.log("msg para update", data)
        chatService.updateMsg(data);
        const chat = await chatService.getMessages();
        socket.emit("msgActualizados", chat);
    });
    socket.on("productoAAgregar", async (data) => {
        console.log("producto a agregar", data)
        const productoAAgregar = await productsService.getProductsById(data)
        console.log("array", productoAAgregar);
        const agregarProd = await cartsService.addCart({products:productoAAgregar});
        const carritos = await cartsService.getCarts();
        let lastCart = await cartsService.getCartsById(carritos[carritos.length-1]._id)
        const lastCarrito = lastCart.products;
        console.log("carrito final", lastCarrito)
        socket.emit("productoAlCarrito", lastCarrito);
    })  
    socket.on("idPorCarrito", async (data, cartId)=> {
        const carritos = await cartsService.getCartsById(cartId)
        const productosCarts = await productsService.getProductsById(data);
        console.log("id en server", data)
        // socket.emit("carritosAmostrar", productosCarts)
    })

    }); 
 
connectDB(); 
