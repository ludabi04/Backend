const socketClient = io();


const createchatForm = document.getElementById("createMessage");
createchatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(createchatForm);
    const jsonData = {};
    //itero cada campo del arreglo
    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    };
    jsonData.price = parseInt(jsonData.price);
    socketClient.emit("mensajeEnviado", jsonData);
    //envio el objeto de info del producto al servidor
    createchatForm.reset();
});


const mensajes = document.getElementById("msgHistory")
socketClient.on("reenvio", (data) => {
    let chatElem = "";
    data.forEach(elm => {
        chatElem +=
            `<div class="globo">
            <p style="background-color: grey">Usuario: ${elm.user}</p>
            <p style="background-color: grey">Mensaje: ${elm.message}</p>
            <div class="chatBtn">
                <button onclick=eliminarMsg("${elm._id}")><img src="https://cdn-icons-png.flaticon.com/512/535/535246.png" style="width: 1.5rem" )/></button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" style="width: 1.5rem" />
                </button>
            </div>
            </div>
            
            <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      
      <div class="modal-body">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <p>Mensaje anterior:</p>
        <p>${elm.message}</p>
        <p>Nuevo Mensaje:</p>
        <input id=nuevoMensaje></input>
        <button type="button" onclick=updateMsg("${elm._id}") data-bs-toggle="modal" data-bs-target="#exampleModal">Confirmar</button>
      </div>
    </div>
  </div>
</div>
            
            `
        
    });
    msgHistory.innerHTML = chatElem
});

function eliminarMsg(id){
    socketClient.emit("eliminarMsg", id)
};


function updateMsg(id, newMessage) {
    const nuevoMsg = document.getElementById("nuevoMensaje")
    const nwMsgValor = nuevoMsg.value
    socketClient.emit("updMsg", id, nwMsgValor)
    
};
    



socketClient.on("msgActualizados", (data) => {
    let chatElem = "";
    data.forEach(elm => {
        chatElem +=
            `<div class="globo">
            <p style="background-color: grey">Usuario: ${elm.user}</p>
            <p style="background-color: grey">Mensaje: ${elm.message}</p>
            <div class="chatBtn">
                <button onclick=eliminarMsg("${elm._id}")><img src="https://cdn-icons-png.flaticon.com/512/535/535246.png" style="width: 1.5rem" )/></button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" style="width: 1.5rem" />
                </button>
            </div>
            </div>
            
            <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Mensaje anterior:</p>
        <p>${elm.message}</p>
        <p>Nuevo Mensaje:</p>
        <input id=nuevoMensaje></input>
        <button type="button" onclick=updateMsg("${elm._id}") data-bs-toggle="modal" data-bs-target="#exampleModal">Confirmar</button>
      </div>
      
    </div>
  </div>
</div>
            `
        
    });
    msgHistory.innerHTML = chatElem
});

