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
    console.log(jsonData);
    //envio el objeto de info del producto al servidor
    socketClient.emit("addProduct", jsonData);
    createProductForm.reset();
})


    
// recibimos los productos del cliente
socketClient.on("productosGuardados", (data) => {
    let prodElem = "";
    data.forEach(elm => {
        prodElem +=
        `<div class="card" style="width: 18rem;">
            <img src=${elm.thumbnail} class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${elm.title}</h5>
        <p class="card-text">Disponibles: ${elm.stock}</p>
        <p class="card-text">Precio: $ ${elm.price}</p>
        <p class="card-text">Categoria: ${elm.category}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`  
    });
    productList.innerHTML = prodElem;
});

socketClient.on("productosActulizados", (data) => {
    prodElem = data;
})

