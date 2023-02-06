"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var Router = express.Router;

var Container = require("./contenedores/Container.js");

var ContenedorMsg = require("./contenedores/contenedorMsjArchivo");

var ContenedorFaker = require("./contenedores/ContainerFake");

var _require = require("normalizr"),
    normalize = _require.normalize,
    schema = _require.schema,
    denormalize = _require.denormalize;

var _require2 = require("express-handlebars"),
    engine = _require2.engine;

var app = express();

var mongoose = require("mongoose");

var log4js = require('log4js');

var config = require("./config/config");

console.log("NODE_ENV=".concat(config.NODE_ENV));

var httpServer = require("http").createServer(app);

var routes = require("./routes");

httpServer.listen(config.PORT, function () {
  return console.log("App listening on http://".concat(config.HOST, ":").concat(config.PORT));
});
var contenedor = new Container("productos");
var contenedorMsg = new ContenedorMsg("mensajes");
var prodFaker = new ContenedorFaker();

var io = require("socket.io")(httpServer);

var moment = require("moment");

var timestamp = moment().format("lll");

var MongoStore = require("connect-mongo");

var session = require("express-session");

var Usuarios = require("./models/usuarios");

app.use(express["static"](__dirname + "/public"));
app.set("view engine", "hbs");
app.set("views", "./views");
app.engine("hbs", engine({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials"
})); ///////passport/////////

var passport = require("passport");

var LocalStrategy = require("passport-local").Strategy;

var bcrypt = require("bcrypt");

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

mongoose.connect("mongodb+srv://tamara:123456Coder@cluster0.u37xyzn.mongodb.net/Proyecto-back").then(function () {
  return console.log("Connected to Mongo");
})["catch"](function (e) {
  console.error(e);
  throw "can not connect to the mongo!";
});
passport.use("login", new LocalStrategy(function (username, password, done) {
  Usuarios.findOne({
    username: username
  }, function (err, user) {
    if (err) return done(err);

    if (!user) {
      console.log("No existe el usuario " + username);
      return done(null, false);
    }

    if (!isValidPassword(user, password)) {
      console.log("Password inválido");
      return done(null, false);
    }

    return done(null, user);
  });
}));
passport.use("signup", new LocalStrategy({
  passReqToCallback: true
}, function (req, username, password, done) {
  Usuarios.findOne({
    username: username
  }, function (err, user) {
    if (err) {
      console.log("Error en el logueo: " + err);
      return done(err);
    }

    if (user) {
      console.log("Ya existe el usuario");
      return done(null, false);
    }

    var newUser = {
      username: username,
      password: createHash(password)
    };
    Usuarios.create(newUser, function (err, userWithId) {
      if (err) {
        console.log("Error al guardar el usuario: " + err);
        return done(err);
      }

      console.log(user);
      console.log("Registración exitosa");
      return done(null, userWithId);
    });
  });
}));
passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  Usuarios.findById(id, done);
}); /////////// SESION //////////

app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://tamara:123456Coder@cluster0.u37xyzn.mongodb.net/Proyecto-back",
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    ttl: 10 * 60
  }),
  secret: "secreto",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
})); // function auth(req, res, next) {
//   if (req.session.user) {
//     return next();
//   } else {
//     // res.status(401).send("error de autorización!")
//     return res.redirect("/login");
//   }
// }

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/api/productos-test", function _callee(req, res) {
  var prodFake;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          prodFake = prodFaker.getProd(5);
          res.render("productosFake", {
            title: "Test",
            prodFake: prodFake,
            layout: "productosFake"
          }); // res.json(prodFake);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}); // Normalizr

var authorSchema = new schema.Entity("authors", {}, {
  idAttribute: "email"
});
var messageSchema = new schema.Entity("messages", {
  author: authorSchema
});
var chatSchema = new schema.Entity("chats", {
  messages: [messageSchema]
});

var normalizarData = function normalizarData(data) {
  var dataNormalizada = normalize({
    id: "chatHistory",
    messages: data
  }, chatSchema);
  return dataNormalizada;
};

var normalizarMensajes = function normalizarMensajes() {
  var messages, normalizedMessages;
  return regeneratorRuntime.async(function normalizarMensajes$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(contenedorMsg.getAll());

        case 2:
          messages = _context2.sent;
          normalizedMessages = normalizarData(messages);
          return _context2.abrupt("return", normalizedMessages);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}; ///// Conexion socket


io.on("connection", function _callee5(socket) {
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          console.log("Nuevo cliente conectado ".concat(socket.id));
          _context6.t0 = socket;
          _context6.next = 4;
          return regeneratorRuntime.awrap(contenedor.getAll());

        case 4:
          _context6.t1 = _context6.sent;

          _context6.t0.emit.call(_context6.t0, "product-list", _context6.t1);

          _context6.t2 = socket;
          _context6.next = 9;
          return regeneratorRuntime.awrap(normalizarMensajes());

        case 9:
          _context6.t3 = _context6.sent;

          _context6.t2.emit.call(_context6.t2, "msg-list", _context6.t3);

          socket.on("product", function _callee2(data) {
            return regeneratorRuntime.async(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    console.log(data);
                    _context3.next = 3;
                    return regeneratorRuntime.awrap(contenedor.save(data));

                  case 3:
                    console.log("Se recibio un producto nuevo", "producto:", data);
                    _context3.t0 = io;
                    _context3.next = 7;
                    return regeneratorRuntime.awrap(contenedor.getAll());

                  case 7:
                    _context3.t1 = _context3.sent;

                    _context3.t0.emit.call(_context3.t0, "product-list", _context3.t1);

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          });
          socket.on("del-product", function _callee3(data) {
            return regeneratorRuntime.async(function _callee3$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    console.log(data);
                    _context4.next = 3;
                    return regeneratorRuntime.awrap(contenedor.deleteById(data));

                  case 3:
                    _context4.t0 = io;
                    _context4.next = 6;
                    return regeneratorRuntime.awrap(contenedor.getAll());

                  case 6:
                    _context4.t1 = _context4.sent;

                    _context4.t0.emit.call(_context4.t0, "product-list", _context4.t1);

                  case 8:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          });
          socket.on("msg", function _callee4(data) {
            return regeneratorRuntime.async(function _callee4$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return regeneratorRuntime.awrap(contenedorMsg.save(_objectSpread({
                      socketid: socket.id,
                      timestamp: timestamp
                    }, data)));

                  case 2:
                    console.log("Se recibio un msg nuevo", "msg:", data);
                    _context5.t0 = io;
                    _context5.next = 6;
                    return regeneratorRuntime.awrap(normalizarMensajes());

                  case 6:
                    _context5.t1 = _context5.sent;

                    _context5.t0.emit.call(_context5.t0, "msg-list", _context5.t1);

                  case 8:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  });
}); ////////////// LOGGER //////////////
// log4js.configure({
//     appenders: {
//       logConsole: { type: "console" },
//       logFile: { type: 'file', filename: 'warn.log' },
//       logFile2: { type: 'file', filename: 'error.log' }
//     },
//     categories: {
//       default: { appenders: ["logConsole"], level: "debug" },
//       archivo: { appenders: ["logFile", "logConsole" ], level: "warn" },
//       archivo2: { appenders: ["logFile2", "logConsole"], level: "info" },
//     }
//    })
// let logger = log4js.getLogger();
// let production = false
// if (production == true) { 
//     logger = log4js.getLogger("default");
// } else {
//     logger = log4js.getLogger("consola");
// }
// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");

app.get("/", checkAuthentication, routes.getRoot);
app.get("/showsession", routes.getShowsession);
app.get("/logout", routes.getLogout);
app.get("/login", routes.getLogin);
app.post("/login", passport.authenticate("login", {
  failureRedirect: "/faillogin"
}), routes.postLogin); // app.get("/faillogin", routes.getFailLogin);

app.get("/faillogin", routes.getFailLogin);
app.get("/failsignup", routes.getFailSignup);
app.get("/registro", routes.getRegistro);
app.post("/registro", passport.authenticate("signup", {
  failureRedirect: "/failsignup"
}), routes.postRegistro); // app.get("/failregistro", routes.getFailRegistro);

app.get("/privado", checkAuthentication, routes.getPrivado);
app.get("/info", routes.getInfo);
app.get("/api/random", routes.getApirandom);
app.get("/*", routes.siteWrong);