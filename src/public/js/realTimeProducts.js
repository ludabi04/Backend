console.log("socket js para el front");

const socketClient = io();

const prodTitle = document.getElementById("title");
const prodDescription = document.getElementById("description");
const prodPrice = document.getElementById("price");
const prodStatus = document.getElementById("status");
const prodStock = document.getElementById("stock");
const prodCategory = document.getElementById("category");

const btnEnviar = document.getElementById("btnEnviar")

const arrayProductos = {
    title: prodTitle,
    description: prodDescription,
    price: prodPrice,
    status: prodStatus,
    stock: prodStock,
    category: prodCategory
}

prodTitle.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        console.log("producto", prodTitle.value)
    }
})

//capturar el elemento


prodTitle.addEventListener("keydown", (e) => {
    const tecla = e.key;
    if (e.key === "Enter") {
        
        socketClient.emit("teclaApretada", prodTitle.value)
    }
})
socketClient.emit("ClientMessage", "mensaje del cliente");

socketClient.on("prueba", (data) => {
    console.log("msg del servidor", data)
})
// cliente recibe historial de mensajes
socketClient.on("conectado", (data) => {
    console.log("historial", data)
})

