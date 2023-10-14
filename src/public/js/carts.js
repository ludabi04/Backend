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
    const products = data;
    let pageDetails = "";
    for (let index = 0; index < products.length; index++) {
        const element = products[index];
        console.log("elementos", element)
        pageDetails +=
            
            ` <div class="card">
                <div class="card-body">
                <h3>Producto ${index + 1}</h3>
                
                <h5 class="card-title" id="title">${element.productId.title}</h5>
                <p class="card-text">Cantidad: ${element.quantity}</p>
                <p class="card-text">Precio: $ ${element.productId.price}</p>
                <p class="card-text">Stock:${element.productId.stock}</p>
                <a href="${element.productId.thumbnail}"><img src="${element.productId.thumbnail}" class="imgCartDetail"/></a>
            </div>
       </div>
      ` 
            
            
            
            
            
    } detallesCarrito.innerHTML = pageDetails
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
        <button onclick=consultarMas("${element._id}") type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Detalles</button>
        
        </div> 
        </div>`
        
        
    }
    carts.innerHTML = carritos;
})