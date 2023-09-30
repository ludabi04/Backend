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
        `<div><p>Usuario: ${elm.user}</p><p>Mensaje: ${elm.message}</p></div>`
        
    });
    msgHistory.innerHTML = chatElem
})