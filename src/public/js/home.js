console.log("archivo js para la vista home")  

const socketClient = io();

socketClient.on("productosActualizados", (data) => { 
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
        
</div> 
</div>` 
});
    productList.innerHTML = prodElem;
});