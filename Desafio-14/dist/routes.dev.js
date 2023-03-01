"use strict";

var parseArgs = require('minimist');

var _require = require("child_process"),
    fork = _require.fork;

var log4js = require('log4js');

log4js.configure({
  appenders: {
    logConsole: {
      type: "console"
    },
    logFile1: {
      type: 'file',
      filename: './Performance/logs/warn.log'
    },
    logFile2: {
      type: 'file',
      filename: './Performance/logs/error.log'
    }
  },
  categories: {
    "default": {
      appenders: ["logConsole"],
      level: "info"
    },
    fileWarn: {
      appenders: ["logFile1", "logConsole"],
      level: "warn"
    },
    fileError: {
      appenders: ["logFile2", "logConsole"],
      level: "error"
    }
  }
});
var logger = log4js.getLogger(); // let production = false
// if (production == true) { 
//   logger = log4js.getLogger("default");
// } else {
//   logger = log4js.getLogger("consola");
// }
// logger.trace("Entering cheese testing");
// // logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");
// function getRoot (req, res) {
//     logger.info("// Route : http://localhost/  || Method: GET // ");
//     res.render("inicio.hbs", {title: "E-commerce", username: req.session.user});
//   }

function getShowsession(req, res) {
  logger.info("// Route : http://localhost/showsession  || Method: GET // ");
  res.json(req.session);
}

function getLogout(req, res) {
  logger.info("// Route : http://localhost/logout  || Method: GET // ");
  var user = req.session.user;
  req.session.destroy(function (err) {
    if (err) {
      res.send("no pudo deslogear");
    } else {
      res.render("logout", {
        name: user,
        layout: "logout"
      });
    }
  });
} // function getLogin(req, res) {
//     res.render("login", {title: "Login", layout : "login"} )
//   }


function getLogin(req, res) {
  logger.info("// Route : http://localhost/login  || Method: GET // ");

  if (req.isAuthenticated()) {
    var _req$user = req.user,
        username = _req$user.username,
        password = _req$user.password; // const user = { username, password };

    res.render("inicio.hbs", {
      username: req.session.user
    });
  } else {
    res.render("login", {
      title: "Login",
      layout: "login"
    });
  }
}

function getRoot(req, res) {
  logger.info("// Route : http://localhost/  || Method: GET // ");
  res.render("inicio.hbs", {
    title: "E-commerce",
    username: req.session.user
  });
}

function getRegistro(req, res) {
  return regeneratorRuntime.async(function getRegistro$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          logger.info("// Route : http://localhost/registro  || Method: GET // ");
          res.render("login", {
            title: "Registro",
            layout: "registro"
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getFailLogin(req, res) {
  return regeneratorRuntime.async(function getFailLogin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          logger = log4js.getLogger("fileError");
          logger.error("// Route : http://localhost/filelogin  || Method: GET // ");
          res.render("faillogin", {
            layout: "faillogin"
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getFailSignup(req, res) {
  return regeneratorRuntime.async(function getFailSignup$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          logger = log4js.getLogger("fileError");
          logger.error("// Route : http://localhost/filesignup  || Method: GET // ");
          res.render("failsignup", {
            layout: "failsignup"
          });

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function postLogin(req, res) {
  var _ref, username, password;

  return regeneratorRuntime.async(function postLogin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          logger.info("// Route : http://localhost/login  || Method: POST // ");
          console.log(req.body);
          _context4.next = 4;
          return regeneratorRuntime.awrap(req.body);

        case 4:
          _ref = _context4.sent;
          username = _ref.username;
          password = _ref.password;
          req.session.user = username;
          req.session.admin = true;
          res.redirect("/");

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function postRegistro(req, res) {
  var _ref2, username, password;

  return regeneratorRuntime.async(function postRegistro$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          logger.info("// Route : http://localhost/registro  || Method: POST // ");
          console.log(req.body);
          _context5.next = 4;
          return regeneratorRuntime.awrap(req.body);

        case 4:
          _ref2 = _context5.sent;
          username = _ref2.username;
          password = _ref2.password;
          req.session.user = username;
          req.session.admin = true;
          res.redirect("/");

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function getPrivado(req, res) {
  logger.info("// Route : http://localhost/privado  || Method: GET // ");
  res.send("si estas viendo esto es porque ya te logueaste, sos admin y sos ".concat(req.session.user, "!"));
}

function getInfo(req, res) {
  logger.info("// Route : http://localhost/info  || Method: GET // "); //   Agregar una ruta '/info' que presente en una vista sencilla los siguientes datos:
  // - Argumentos de entrada

  var argumentos = JSON.stringify(parseArgs(process.argv.slice(2))._); // - Path de ejecución

  var path = JSON.stringify(process.env.PATH); // - Process id

  var PID = process.pid; // - Versión de node.js 

  var version = process.version; // - Carpeta del proyecto

  var carpeta = process.env.PWD; // - Nombre de la plataforma (sistema operativo)

  var OS = process.platform; // - Memoria total reservada (rss)

  var memoryUsage = process.memoryUsage().rss;
  var data = {
    argumentos: argumentos,
    path: path,
    PID: PID,
    version: version,
    carpeta: carpeta,
    OS: OS,
    memoryUsage: memoryUsage
  };
  console.log(data);
  res.render("info", {
    argumentos: argumentos,
    path: path,
    PID: PID,
    version: version,
    carpeta: carpeta,
    OS: OS,
    memoryUsage: memoryUsage,
    layout: "info"
  });
}

function getApirandom(req, res) {
  logger.info("// Route : http://localhost/:apirandom  || Method: GET // ");
  var cant;
  var cantidad = req.query.cant || 100000;
  var PORT = parseInt(process.argv[2]) || 8080;
  var proceso = fork("./proceso.js");
  console.log(PORT);
  proceso.send({
    cantidad: cantidad
  });
  proceso.on("message", function (msg) {
    var data = msg.data;
    res.json(data);
  });
}

function siteWrong(req, res) {
  var route = req.params[0];
  logger = log4js.getLogger("fileWarn");
  logger.warn("// Route : http://localhost/".concat(route, "  || Method: GET // "));
  res.send("Error 404. Page not found");
}

module.exports = {
  getRoot: getRoot,
  getShowsession: getShowsession,
  getLogout: getLogout,
  getLogin: getLogin,
  postLogin: postLogin,
  getPrivado: getPrivado,
  getRegistro: getRegistro,
  postRegistro: postRegistro,
  getFailLogin: getFailLogin,
  getFailSignup: getFailSignup,
  getInfo: getInfo,
  getApirandom: getApirandom,
  siteWrong: siteWrong
};