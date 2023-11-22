import express from "express";
import session from "express-session";
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
import { usersRouter } from "./routes/sessions.routes.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { UsersManagerMongo } from "./dao/mongo/usersManagerMongo.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import { config } from "./config/config.js";
import { transporter } from "./config/gmail.js";
import { twilioClient } from "./config/twilio.js";


const managerProductService = new productsManagerMongo();
const managerChatService = new messagesManagerMongo();
const managerCartService = new cartsManagerMongo();
const managerUserService = new UsersManagerMongo()




//servidor express
const port = config.server.port;
const app = express();
//servidor expres con el protocolo http
const httpServer = app.listen(port, () => console.log("server funcionando"))

// servidor socket

const socketServer = new Server(httpServer);

//configuracion de la session
app.use(session({
    //agregar el sistema de almacenamiento de sesiones de mongo
    store: MongoStore.create({
        ttl: 60,
        mongoUrl: (config.mongo.url)
    }),
    secret: config.server.secretSession,
    resave: true,
    saveUninitialized: true
}));
//configurando passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//conexion a bBDD

app.use(express.urlencoded({extended:true})) // permite caracteres especiales
app.use(express.json());


//cookies
app.use(cookieParser("claveCookieCoder"))


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
app.use("/", usersRouter);


const emailTemplate = `<div>
        <h1>Bienvenido!!</h1>
        <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
        <p>Ya puedes empezar a usar nuestros servicios</p>
        <a href="https://www.google.com/">Explorar</a>
</div>`

app.get("/send-mail", async (req, res) => {
    try {
        const result = await transporter.sendMail({
            from: config.gmail.account,
            to: "ludabi@live.com",
            subject: "Tu registro",
            html: `<div>
        <h1>Bienvenido!!</h1>
        <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
        <p>Ya puedes empezar a usar nuestros servicios</p>
        <a href="http://localhost:8080/">Explorar</a>
</div>`,
        });
        console.log(result)
        res.json({ status: "success", message: "Envio correcto" })
    } catch (error) {
        console.log(error);
        res.json({ status: "error", message: "Hubo un error al enviar el correo" })
    }
    
});

app.post("/send-sms", async (req, res) => {
    try {
        const result = await twilioClient.messages.create({
            from: config.twilio.phone,
            to: "+541168598612",
            body: "Su pedido fue realizado con éxito"
        });
        res.json({status:"succes", message:"Envio exitoso"})
    } catch (error) {
        console.log(error)
        res.json({ status: "error", message: "Hubo un error al enviar el SMS" })
    }
})






//configuracion del socket server

socketServer.on("connection", async (socket) => {
    //se conecta un usuario y le manda los mensajes
    const mensajes = await chatService.getMessages();
    const totalProd = await productsService.getProducts()
    const limitTotal = totalProd.length
    const products = await productsService.getProductsLimit(limitTotal, 1)
    const carritos = await cartsService.getCarts();
    socket.emit("reenvio", mensajes);
    socket.emit(("productosGuardados"), products.docs);
    // se conecta un usuario y le manda los productos

    socket.emit("carritostotales", carritos)
    //enviando los productos al cliente
    socket.on("limiteElegido", async (limit)=>{
        const productsLimit = await productsService.getProductsLimit(limit)
        socket.emit("dataFilter", productsLimit.docs)
    })
    socket.emit(("productosActualizados"), products.docs);
    // recibir los datos del producto desde el 
    socket.on("addProduct", async (data) => {
        await productsService.addProduct(data);
        const products = await productsService.getProducts();
        socket.emit("productosActualizados", products);
    });
    socket.on("eliminarElemento", async (data) => {
        await productsService.deleteProducts(data);
        const products = await productsService.getProducts();
        socket.emit("productosActualizados", products);
    })
    socket.on("mensajeEnviado", async (data) => {
        await chatService.addMessages(data);
        const mensajes = await chatService.getMessages();
        socket.emit("reenvio", mensajes)
    })
     socket.on("eliminarMsg", async (data) => {
        await chatService.delMessages(data);
        const chat = await chatService.getMessages();
        socket.emit("msgActualizados", chat);
     })
    socket.on("updMsg", async (id, newMsg) => {
        const updMessages = await chatService.updateMsg(id, newMsg);
        const chat = await chatService.getMessages();
        socket.emit("msgActualizados", chat);
    });

    //Agregando productos al carrito 

    socket.on("productoAAgregar", async (data) => {
        const productaAgregar = await productsService.getProductsById(data);
        const carritos = await cartsService.getCarts()
        const carritoFinal = carritos.length - 1;
        if(carritos < 1){
            const newCarro = await cartsService.addCart() 
            const idNewCart = newCarro._id
            const prodIncart = await cartsService.prodInCarts(idNewCart, data)
        } else {
            const carritoFinalId = carritos[carritoFinal].id
            const prodInCart = await cartsService.prodInCarts(carritoFinalId, data)
        }
        
    }); 

    socket.on("eliminarCart", async (data) => {
        await cartsService.deleteCart(data);
        const carritos = await cartsService.getCarts();
        socket.emit("carritostotales", carritos)
    }); 

    socket.on("masDetalles", async (id) => {
        const cartDetails = await cartsService.getCartsById(id)
        const prodCarts = cartDetails.products;
        socket.emit("cartDetails", prodCarts)
    });
    socket.on("filtro", async (data)=>{
        const filtrado = await productsService.getProductsPaginate(data);
        socketServer.emit("dataFilter", filtrado)
    }) 
    


}); 

connectDB(); 
