console.log("archivo js para la vista home")  

const socketClient = io();

const botonFiltro = document.getElementById("botonFiltro")


// function changePage() {
//     const verPage = document.getElementById("pagina").value
//     const verQuantity = document.getElementById("resultados").value
//     socketClient.emit("paginado", verPage, verQuantity)
//     console.log(verPage, verQuantity)
// }


function filtrar(filtro) {
    socketClient.emit("filtro", filtro);
    console.log("filtro", filtro)
}


socketClient.on("productosGuardados", (data) => { 
    let prodElem = "";
    data.forEach(elm => {
        prodElem +=
        `<div class="homeProd">
                <div class="card homeProd" style="width: 18rem; border: 2px solid">
                    <img src=${elm.thumbnail} class="card-img-top" alt="...">
                    <div class="card-body">
                        <p>ID: #${elm._id}</p>
                        <h5 class="card-title" id="title">${elm.title}</h5>
                        <p class="card-text">Disponibles: ${elm.stock}</p>
                        <p class="card-text">Precio: $ ${elm.price}</p>
                        <p class="card-text">Categoria: ${elm.category}</p>
                        <button onclick=eliminar("${elm._id}")>Eliminar</button> 
                        <button onclick=addCart("${elm._id}")>Agregar al carrito</button>
                    </div> 
                </div>
        </div>`
});
    productList.innerHTML = prodElem;
});



socketClient.on("dataFilter", (data) => { 
    let prodElem = "";
    data.forEach(elm => {
        prodElem +=
        `<div class="homeProd">
                <div class="card homeProd" style="width: 18rem; border: 2px solid">
                    <img src=${elm.thumbnail} class="card-img-top" alt="...">
                    <div class="card-body">
                        <p>ID: #${elm._id}</p>
                        <h5 class="card-title" id="title">${elm.title}</h5>
                        <p class="card-text">Disponibles: ${elm.stock}</p>
                        <p class="card-text">Precio: $ ${elm.price}</p>
                        <p class="card-text">Categoria: ${elm.category}</p>
                        <button onclick=eliminar("${elm._id}")>Eliminar</button> 
                        <button onclick=addCart("${elm._id}")>Agregar al carrito</button>
                    </div> 
                </div>
        </div>`
});
    productList.innerHTML = prodElem;
});

