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
import { productsModel } from "./dao/mongo/models/products.model.js";


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
        socket.emit("reenvio", mensajes);
        // se conecta un usuario y le manda los productos
        const products = await productsService.getProducts()
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

    //Agregando productos al carrito 

    socket.on("productoAAgregar", async (data) => {
        console.log("idProd", data)
        const productaAgregar = await productsService.getProductsById(data);
        // console.log("prod a agregaR", productaAgregar)
        const carritos = await cartsService.getCarts()
        const carritoFinal = carritos.length - 1;
        if(carritos < 1){
            const newCarro = await cartsService.addCart() 
            const idNewCart = newCarro._id
            console.log("nuevo id", idNewCart)
            const prodIncart = await cartsService.prodInCarts(idNewCart, data)
            console.log("ProdIncart", prodIncart)
        } else {
            const carritoFinalId = carritos[carritoFinal].id
            console.log("carrito final", carritoFinalId)
            const prodInCart = await cartsService.prodInCarts(carritoFinalId, data)
            console.log("ProdIncart", prodInCart)
        }
        
    }); 

    socket.on("eliminarCart", async (data) => {
        await cartsService.deleteCart(data);
        const carritos = await cartsService.getCarts();
        socket.emit("carritostotales", carritos)
    }); 

    socket.on("masDetalles", async (id) => {
        console.log("id carrito", id)
        const cartDetails = await cartsService.getCartsById(id);
        const prodCarts = cartDetails.products
        console.log("cart details", prodCarts[0].quantity)
        socket.emit("cartDetails", prodCarts)
    });
    socket.on("filtro", async (data)=>{
        console.log("data", data)
        const filtrado = await productsService.getProductsPaginate(data);
        socketServer.emit("dataFilter", filtrado)
        console.log("filtrado", filtrado)
    }) 
    


}); 




 

connectDB(); 
