const express = require("express");
const { Router } = express;
const Container = require("./contenedores/Container.js");
const ContenedorMsg = require("./contenedores/contenedorMsjArchivo");
const ContenedorFaker = require("./contenedores/ContainerFake");
const { normalize, schema, denormalize } = require('normalizr');
const { engine } = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 8080;

const routes = require("./routes")

const MongoStore = require("connect-mongo")
const session = require("express-session");

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

function auth(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    // res.status(401).send("error de autorización!")
    return res.redirect("/login");
    
  }
}



app.get("/api/productos-test", async (req, res) => {
  const prodFake = prodFaker.getProd(5)
  res.render("productosFake", {title: "Test", prodFake, layout : "productosFake"} )
  // res.json(prodFake);
});




// Normalizr

const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' })
const messageSchema = new schema.Entity('messages', {
  author: authorSchema
})

const chatSchema = new schema.Entity("chats", {
  messages: [messageSchema]
})

const normalizarData = (data) => {
  const dataNormalizada = normalize({ id: "chatHistory", messages: data }, chatSchema);
  return dataNormalizada;
}


const normalizarMensajes = async () => {
  const messages = await contenedorMsg.getAll();
  const normalizedMessages = normalizarData(messages);
  return normalizedMessages;

}

///// Conexion socket

io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  socket.emit("product-list", await contenedor.getAll());

  socket.emit("msg-list", await normalizarMensajes());

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

    io.emit("msg-list", await normalizarMensajes());

  });
});



/////////// SESION //////////


app.use(
  session({
    store: MongoStore.create({
      mongoUrl:        "mongodb+srv://tamara:123456Coder@cluster0.u37xyzn.mongodb.net/Proyecto-back",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 60,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,

  })
);



app.get("/", auth, routes.getRoot);

app.get("/showsession", routes.getShowsession);

app.get("/logout", routes.getLogout);

app.get("/login", routes.getLogin);

app.post("/login", routes.postLogin);

app.get("/privado", auth, routes.getPrivado);
