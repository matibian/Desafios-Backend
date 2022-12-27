const express = require("express");
const { Router } = express;
const Container = require("./Container.js");
const ContenedorMsg = require("./ContainerMsj");
const ContenedorFaker = require("./ContainerFake");
const { engine } = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 8080;

const contenedor = new Container("productos");
const contenedorMsg = new ContenedorMsg("mensajes")
const prodFaker = new ContenedorFaker()

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
  res.render("inicio.hbs", {title: "E-commerce"});
});

app.get("/api/productos-test", async (req, res) => {
  const prodFake = prodFaker.getProd(5)
  res.render("productosFake", {title: "Test", prodFake, layout : "productosFake"} )
  // res.json(prodFake);
});


io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  socket.emit("product-list", await contenedor.getAll());

  socket.emit("msg-list", await contenedorMsg.getAll());

  socket.on("product", async (data) => {
    console.log(data)

    await contenedor.save(data);

    console.log('Se recibio un producto nuevo', "producto:", data);

    io.emit("product-list", await contenedor.getAll());

  });

  socket.on("del-product", async (data) => {
    console.log(data)
  
    await contenedor.deleteById(data);
    io.emit("product-list", await contenedor.getAll());
  
    });

  socket.on("msg", async (data) => {

    await contenedorMsg.save({ socketid: socket.id, timestamp: timestamp, ...data });

    console.log('Se recibio un msg nuevo', "msg:", data);

    io.emit("msg-list", await contenedorMsg.getAll());

  });
});
