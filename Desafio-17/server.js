const express = require("express");
const passport = require("passport");
const { engine } = require("express-handlebars");
const app = express();
const config = require("./config/config");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const routerDatos = require("./routes/data.js");
const websocket = require("./service/io.js");
const { MongoSession } = require("./config/services");
const { MongoDBService } = require("./config/services");

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

MongoDBService();

app.use(MongoSession);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routerDatos);

websocket(io);

httpServer.listen(config.PORT, () =>
  console.log(`App listening on http://${config.HOST}:${config.PORT}`)
);
