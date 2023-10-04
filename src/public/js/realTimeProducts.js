
console.log("socket js para el front");

const socketClient = io();

const productList = document.getElementById("productList");
const createProductForm = document.getElementById("createProductForm");

// enviamos la info del form al socket del servidor
createProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(createProductForm);
    const jsonData = {};
    //itero cada campo del arreglo
    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    };
    jsonData.price = parseInt(jsonData.price);
    socketClient.emit("addProduct", jsonData);
    console.log("jsonData", jsonData);
    //envio el objeto de info del producto al servidor
    createProductForm.reset();
});

function eliminar(id) {
    socketClient.emit("eliminarElemento", id)
    console.log("elminando", id);
}

function addCart(id) {
    socketClient.emit("productoAAgregar", id)

    console.log("agregar al carrito", id)
}


// recibimos los productos del cliente 
socketClient.on("productosGuardados", (data) => { 
    let prodElem = "";
    data.forEach(elm => {
        prodElem +=
        `<div class="card" style="width: 18rem; border: 2px solid">
            <img src=${elm.thumbnail} class="card-img-top" alt="...">
        <div class="card-body">
        <p>ID: #${elm._id}</p>
        <h5 class="card-title" id="title">${elm.title}</h5>
        <p class="card-text">Disponibles: ${elm.stock}</p>
        <p class="card-text">Precio: $ ${elm.price}</p>
        <p class="card-text">Categoria: ${elm.category}</p>
        <button onclick=eliminar("${elm._id}")>Eliminar</button>
        <button onclick=addCart("${elm._id}")>Eliminar</button> 
        
</div> 
</div>` 
});
    productList.innerHTML = prodElem;
});

socketClient.on("productosActualizados", (data) => {
    console.log("productos actualizados", data)
     let prodElem = "";
    data.forEach(elm => {
        prodElem +=
        `<div class="card" style="width: 18rem; border: 2px solid">
            <img src=${elm.thumbnail} class="card-img-top" alt="...">
        <div class="card-body">
        <p>ID: #${elm._id}</p>
        <h5 class="card-title" id="title">${elm.title}</h5>
        <p class="card-text">Disponibles: ${elm.stock}</p>
        <p class="card-text">Precio: $ ${elm.price}</p>
        <p class="card-text">Categoria: ${elm.category}</p>
        <button onclick=eliminar("${elm._id}")>Eliminar</button>
        <button onclick=addCart("${elm._id}")>Agregar</button>
        
</div> 
</div>` 
});
    productList.innerHTML = prodElem;
});

const carts = document.getElementById("carritos")

socketClient.on("productoAlCarrito", (elem) => {
    let prodElem = "";
    elem.forEach((elm) => {
        prodElem +=
               
                `<div class="card" style="width: 18rem; border: 2px solid">
                    <img src=${elm.thumbnail} class="card-img-top" alt="...">
                <div class="card-body">
                <p>ID: #${elm._id}</p>
                <h5 class="card-title" id="title">${elm.title}</h5>
                <p class="card-text">Disponibles: ${elm.stock}</p>
                <p class="card-text">Precio: $ ${elm.price}</p>
                <p class="card-text">Categoria: ${elm.category}</p>
                <button onclick=eliminar("${elm._id}")>Eliminar</button>
                
        
        </div> 
        </div>`
        });
        carritos.innerHTML = prodElem;
    })


     

