const express = require("express");
const { Router } = express;
const Container = require("./Container.js");
const ContenedorMsg = require("./ContainerMsj");
const { engine } = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 8080;

const contenedor = new Container();
const contenedorMsg = new ContenedorMsg()

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

const moment = require('moment');
const timestamp = moment().format('lll');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


httpServer.listen(PORT, () => console.log("SERVER ON http://localhost:" + PORT));



app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

app.get("/", async (req, res) => {
  res.render("inicio", {title: "E-commerce"});
});


// Corre cuando se conecta un clinte
io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  // Muestra la lista completa de productos al cliente
  socket.emit("product-list", await contenedor.getAll());

  // Muestra el historial completo de mensajes al cliente
  socket.emit("msg-list", await contenedorMsg.getAll());

  // Recibe prodcuto del cliente
  socket.on("product", async (data) => {
    console.log(data)

    // Guarda el producto nuevo en productos.json
    await contenedor.save(data);

    // Muestra el mensaje por consola
    console.log('Se recibio un producto nuevo', "producto:", data);

    // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
    io.emit("product-list", await contenedor.getAll());

  });

  socket.on("del-product", async (data) => {
    console.log(data)
  
    await contenedor.deleteById(data);
    io.emit("product-list", await contenedor.getAll());
  
    });

  // Recibe mensaje del cliente
  socket.on("msg", async (data) => {

    // Guarda en mensaje nuevo en mensajes.json
    await contenedorMsg.save({ socketid: socket.id, timestamp: timestamp, ...data });

    // Muestra el mensaje por consola
    console.log('Se recibio un msg nuevo', "msg:", data);

    // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
    io.emit("msg-list", await contenedorMsg.getAll());

  });
});
