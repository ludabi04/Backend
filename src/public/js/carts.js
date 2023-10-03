const socketClient = io();
console.log("socket js para el front");

const carts = document.getElementById("carritos")

socketClient.on("carritostotales", (elem) => {
    for (let index = 0; index < elem.length; index++) {
        const element = elem[index];
        const prodId= element.products[0]._id;
        socketClient.emit("idPorCarrito", prodId, element._id)
        console.log("id de prod por carrito", prodId)
        console.log("id de carrito", element._id)
    }
})
socketClient.on("carritosAmostrar", (data)=> {
    console.log(data)
    //     let prodElem = "";
    // data.forEach(elm => {
    //     prodElem +=
               
    //             `<div class="card" style="width: 18rem; border: 2px solid">
    //                 <img src=${elm.thumbnail} class="card-img-top" alt="...">
    //             <div class="card-body">
    //             <p>ID: #${elm._id}</p>
    //             <h5 class="card-title" id="title">${elm.title}</h5>
    //             <p class="card-text">Disponibles: ${elm.stock}</p>
    //             <p class="card-text">Precio: $ ${elm.price}</p>
    //             <p class="card-text">Categoria: ${elm.category}</p>
    //             <button onclick=eliminar("${elm._id}")>Eliminar</button>
                
        
    //     </div> 
    //     </div>`
    //     });
    //     carritos.innerHTML = prodElem;
})
        
    
    // let prodElem = "";
    // elem.forEach(elm => {
    //     prodElem +=
               
    //             `<div class="card" style="width: 18rem; border: 2px solid">
    //                 <img src=${elm.thumbnail} class="card-img-top" alt="...">
    //             <div class="card-body">
    //             <p>ID: #${elm._id}</p>
    //             <h5 class="card-title" id="title">${elm.title}</h5>
    //             <p class="card-text">Disponibles: ${elm.stock}</p>
    //             <p class="card-text">Precio: $ ${elm.price}</p>
    //             <p class="card-text">Categoria: ${elm.category}</p>
    //             <button onclick=eliminar("${elm._id}")>Eliminar</button>
                
        
    //     </div> 
    //     </div>`
    //     });
    //     carritos.innerHTML = prodElem;
    


     