const socketClient = io();
console.log("socket js para el front");

const carts = document.getElementById("carritos")

function eliminarCart(id) {
    socketClient.emit("eliminarCart", id)
}

socketClient.on("carritostotales", (data) => {
    carritos = "";
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        console.log(element);
        
        carritos +=
        `<div class="card" style="width: 18rem; border: 2px solid">
        
        <div class="card-body">
        <p>ID: #${element._id}</p>
        <button onclick=eliminarCart("${element._id}")>Eliminar</button>
        
        </div> 
        </div>`
        
        
    }
    carts.innerHTML = carritos;
})