const socketClient = io();
console.log("socket js para el front");

const carts = document.getElementById("carritos")

function eliminarCart(id) {
    socketClient.emit("eliminarCart", id)
}
function consultarMas(id) {
    console.log(id)
    socketClient.emit("masDetalles", id)
}
const detallesCarrito = document.getElementById("cartDetails");

socketClient.on("cartDetails", (data) => {
    const products = data.products;
    let pageDetails = "";
    for (let index = 0; index < products.length; index++) {
        const element = products[index];
        
        console.log(element)      
    
    } 
    }
)

socketClient.on("carritostotales", (data) => {
    carritos = "";
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        
        carritos +=
        `<div class="card" style="width: 18rem; border: 2px solid">
        
        <div class="card-body">
        <p>ID: #${element._id}</p>
        <button onclick=eliminarCart("${element._id}")>Eliminar</button>
        <button onclick=consultarMas("${element._id}")>Detalles</button>
        
        </div> 
        </div>`
        
        
    }
    carts.innerHTML = carritos;
})