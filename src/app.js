import express from "express";
import { ProductManagerFiles } from "./persistence/productManagerFiles.js";
import { productRouter } from "./routes/productos.routes.js";
import { cartsRouter } from "./routes/cart.routes.js";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars"
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";

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


app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

// configuracion del motor de plantillas 

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "views"));

//routes
app.use(viewsRouter);

//crear arreglo de mensajes

let mensajesGuardados = []

//configuracion del socket server


socketServer.on("connection", (socket) => {
    console.log("cliente conectado", socket.id)


    //recibir mensaje del cliente

    socket.on("ClientMessage", (data) => {
        console.log("mensaje recibido  del cliente", data)
    })

    socket.emit("prueba", "mensaje desde el servidor");

    socket.on("teclaApretada", (data) => {
        const msgItem = { "ID": socket.id, "mensaje": data }
        mensajesGuardados.push(msgItem)
    })
    //enviar mensaje con el historial de mensajes
    socketServer.emit("conectado", mensajesGuardados)

});
