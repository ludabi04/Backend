
const socketClient = io();

const productList = document.getElementById("productList");
const createProductForm = document.getElementById("createProductForm");

// enviamos la info del form al socket del servidor
createProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(createProductForm);
    const jsonData = {};
    const select = document.getElementById("optionSelected");
    
    //itero cada campo del arreglo
    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    };
    jsonData.price = parseInt(jsonData.price);
    socketClient.emit("addProduct", jsonData);
    //envio el objeto de info del producto al servidor
    createProductForm.reset();
});

function eliminar(id) {
    socketClient.emit("eliminarElemento", id)
}


// recibimos los productos del cliente 
socketClient.on("productosGuardados", (data) => { 
    let prodElem = "";
    data.forEach(elm => {
        prodElem +=
        `<div class="card" >
            <div class="img"><img src=${elm.thumbnail} class="card-img-top imagen" alt="..."/></div>
        <div class="card-body">
        <p>ID: #${elm._id}</p>
        <h5 class="card-title" id="title">${elm.title}</h5>
        <p class="card-text">Disponibles$: ${elm.stock}</p>
        <p class="card-text">Precio: $ ${elm.price}</p>
        <p class="card-text">Categoria: ${elm.category.value}</p>
        <button onclick=eliminar("${elm._id}")>Eliminar</button>
        <button onclick=addCart("${elm._id}")>Eliminar</button> 
        
</div> 
</div>` 
});
    productList.innerHTML = prodElem;
});



socketClient.on("productosActualizados", (data) => {
    let prodElem = "";
    data.forEach(elm => {
        prodElem +=
        `<div class="card" >
            <div class="img"><img src=${elm.thumbnail} class="card-img-top imagen" alt="..."/></div>
        <div class="card-body">
        <p>ID: #${elm._id}</p>
        <h5 class="card-title" id="title">${elm.title}</h5>
        <p class="card-text">Disponible: ${elm.stock}</p>
        <p class="card-text">Precio: $ ${elm.price}</p>
        <p class="card-text">Categoria: ${elm.category}</p>
        <button onclick=eliminar("${elm._id}")>Eliminar</button>
        <button onclick=addCart("${elm._id}")>Agregar</button>
        
</div> 
</div>` 
      
});
    productList.innerHTML = prodElem;
});

let totalCarrito = document.getElementById("totalCarritos");


function addCart(id) {
    socketClient.emit("productoAAgregar", id);
    Toastify({
  text: "Producto agregado. VER",
  duration: 3000,
  destination: "/carts",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
}).showToast();
    

}

const carts = document.getElementById("carritos")

socketClient.on("productoAlCarrito", (data) => {
    
        carts.innerHTML =
            `
            <div class="card" ; border: 2px solid">
            <div class="img"><img src=${data.thumbnail} class="card-img-top" alt="${data.title}"></div>
        <div class="card-body">
        <p>ID: #${data._id}</p>
        <h5 class="card-title" id="title">${[data.products].title}</h5>
        <p class="card-text">Disponibles!: ${data.stock}</p>
        <p class="card-text">Precio: $ ${data.price}</p>
        <p class="card-text">Categoria: ${data.category}</p>
        `}); 

        