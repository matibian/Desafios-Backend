const socket = io();

// Envia mensajes al backend

function enviarMsg() {
    const msgParaEnvio = document.getElementById("inputMsg").value;
    
    const email = document.getElementById("input-email").value;
    socket.emit("msg", { email: email, mensaje: msgParaEnvio });
    return false
}

// Recibe mensajes del back y los renderiza en el DOM

socket.on("msg-list", (data) => {
    let html = '';
    data.forEach(item => {
        html +=
            `
        <div class="msj-container" >
        <p class="p-email"><span style="font-weight: bolder; color: blue">${item.email} </span> <span style="color: red"> [${item.timestamp}] : <br> <span style= "color:green"> ${item.mensaje}</span> </p>
        </div> 
        `
    })
    document.getElementById("mgs-area").innerHTML = html;

});


// Funcion para enviar productos el backend

async function postProducto() {
    const producto = await document.getElementById("productos").value;
    const precio = await document.getElementById("precio").value;
    const imagen = await document.getElementById("imagen").value;
    await socket.emit("product", { name: producto, price: precio, thumbnail: imagen });
    console.log(producto);
    return false;
}   

async function eliminar(id) {
    await socket.emit("del-product", id );
    return false;
}   

socket.on("product-list", (data) => {
    let html = '';
	
    data.forEach(item => {
        html +=
            `
            <tr>
            <td>${item.id} </th>
            <td>${item.name} </td>
            <td>$${item.price} </td>
            <td><img src="${item.thumbnail}" class="product-img"/></td>
            <td class="trash"><i class="fa-solid fa-trash" onclick="eliminar(${item.id})"></i> </td>
        `
    })
    document.getElementById("tbodyProd").innerHTML = html;

});


function botonProd(){
        postProducto();
        e.preventDefault()

}