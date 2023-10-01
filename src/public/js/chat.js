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
    console.log("jsonData", jsonData);
    //envio el objeto de info del producto al servidor
    createchatForm.reset();
});

const mensajes = document.getElementById("msgHistory")
socketClient.on("reenvio", (data) => {
    console.log("data recibida", data)
    let chatElem = "";
    data.forEach(elm => {
        chatElem +=
            `<div class="globo">
            <p style="background-color: grey">Usuario: ${elm.user}</p>
            <p style="background-color: grey">Mensaje: ${elm.message}</p>
            <button onclick=eliminarMsg("${elm._id}")><img src="https://cdn-icons-png.flaticon.com/512/535/535246.png" style="width: 1rem" )/></button>
            <button onclick=eliminarMsg("${elm._id}")><img src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" style="width: 1rem" /></button>
            </div>`
        
    });
    msgHistory.innerHTML = chatElem
});

function eliminarMsg(id){
    console.log("elminando", id);
    socketClient.emit("eliminarMsg", id)
};

socketClient.on("msgActualizados", (data) => {
    console.log("data recibida", data)
    let chatElem = "";
    data.forEach(elm => {
        chatElem +=
            `<div class="globo">
            <p style="background-color: grey">Usuario: ${elm.user}</p>
            <p style="background-color: grey">Mensaje: ${elm.message}</p>
            <button onclick=eliminarMsg("${elm._id}")><img src="https://cdn-icons-png.flaticon.com/512/535/535246.png" style="width: 1rem" )/></button>
            <button onclick=eliminarMsg("${elm._id}")><img src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" style="width: 1rem" /></button>
            </div>`
        
    });
    msgHistory.innerHTML = chatElem
});