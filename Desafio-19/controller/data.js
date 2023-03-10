const data = require("../service/data");
const log4js = require("log4js");
const DAOproducts = require("../models/DAOs/DAOproducts");
log4js.configure({
  appenders: {
    logConsole: { type: "console" },
    logFile1: { type: "file", filename: "./Performance/logs/warn.log" },
    logFile2: { type: "file", filename: "./Performance/logs/error.log" },
  },
  categories: {
    default: { appenders: ["logConsole"], level: "info" },
    fileWarn: { appenders: ["logFile1", "logConsole"], level: "warn" },
    fileError: { appenders: ["logFile2", "logConsole"], level: "error" },
  },
});

let logger = log4js.getLogger();

function getShowsession(req, res) {
  logger.info("// Route : http://localhost/showsession  || Method: GET // ");

  res.json(req.session);
}

function getLogout(req, res) {
  logger.info("// Route : http://localhost/logout  || Method: GET // ");
  const user = req.session.user;
  req.session.destroy((err) => {
    if (err) {
      res.send("no pudo deslogear");
    } else {
      res.render("logout", { name: user, layout: "logout" });
    }
  });
}

// function getLogin(req, res) {

//     res.render("login", {title: "Login", layout : "login"} )

//   }
function getLogin(req, res) {
  logger.info("// Route : http://localhost/login  || Method: GET // ");
  if (req.isAuthenticated()) {
    // const { username, password } = req.user;
    // // const user = { username, password };
    res.render("inicio.hbs", { username: req.session.user });
  } else {
    res.render("login", { title: "Login", layout: "login" });
  }
}

function getRoot(req, res) {
  logger.info("// Route : http://localhost/  || Method: GET // ");
  res.render("inicio.hbs", { username: req.session.user });
}

async function getProducts(req, res) {
  logger.info("// Route : http://localhost/api/productos  || Method: GET // ");
  try {
    const products = await data.getProducts();
    // const products = await DAOproducts.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.log("Error: " + error);
  }
}

async function delProducts(req, res) {
  logger.info(
    "// Route : http://localhost/api/productos/id  || Method: DELETE // "
  );
  try {
    const id = req.params.id;
    await data.delProducts(id);
    res.status(202).send("Producto borrado");
  } catch (error) {
    console.log("Error: " + error);
  }
}

async function postProducts(req, res) {
  logger.info(
    "// Route : http://localhost/api/productos/  || Method: POST // "
  );
  try {
    const product = req.body;
    await data.postProducts(product);

    res.status(201).json(product);
  } catch (error) {
    console.log("Error: " + error);
  }
}

async function getRegistro(req, res) {
  logger.info("// Route : http://localhost/registro  || Method: GET // ");
  res.render("login", { title: "Registro", layout: "registro" });
}
async function getFailLogin(req, res) {
  logger = log4js.getLogger("fileError");
  logger.error(`// Route : http://localhost/filelogin  || Method: GET // `);
  res.render("faillogin", { layout: "faillogin" });
}
async function getFailSignup(req, res) {
  logger = log4js.getLogger("fileError");
  logger.error(`// Route : http://localhost/filesignup  || Method: GET // `);
  res.render("failsignup", { layout: "failsignup" });
}

async function postLogin(req, res) {
  logger.info("// Route : http://localhost/login  || Method: POST // ");
  console.log(req.body);
  const { username, password } = await req.body;
  req.session.user = username;
  req.session.admin = true;
  res.redirect("/");
}

async function postRegistro(req, res) {
  logger.info("// Route : http://localhost/registro  || Method: POST // ");
  console.log(req.body);
  const { username, password } = await req.body;
  req.session.user = username;
  req.session.admin = true;
  res.redirect("/");
}

function getPrivado(req, res) {
  logger.info("// Route : http://localhost/privado  || Method: GET // ");

  res.send(
    `si estas viendo esto es porque ya te logueaste, sos admin y sos ${req.session.user}!`
  );
}

function getInfo(req, res) {
  logger.info("// Route : http://localhost/info  || Method: GET // ");

  //   Agregar una ruta '/info' que presente en una vista sencilla los siguientes datos:
  // - Argumentos de entrada
  const argumentos = JSON.stringify(parseArgs(process.argv.slice(2))._);
  // - Path de ejecución
  const path = JSON.stringify(process.env.PATH);
  // - Process id
  const PID = process.pid;
  // - Versión de node.js
  const version = process.version;
  // - Carpeta del proyecto
  const carpeta = process.env.PWD;
  // - Nombre de la plataforma (sistema operativo)
  const OS = process.platform;
  // - Memoria total reservada (rss)
  const memoryUsage = process.memoryUsage().rss;

  const data = {
    argumentos: argumentos,
    path: path,
    PID: PID,
    version: version,
    carpeta: carpeta,
    OS: OS,
    memoryUsage: memoryUsage,
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
    layout: "info",
  });
}
function getApirandom(req, res) {
  logger.info("// Route : http://localhost/apirandom  || Method: GET // ");

  let cantidad = req.query.cant || 100000;
  const PORT = parseInt(process.argv[2]) || 8080;

  let proceso = fork("./proceso.js");
  console.log(PORT);
  proceso.send({ cantidad });

  proceso.on("message", (msg) => {
    const { data } = msg;
    res.json(data);
  });
}

function siteWrong(req, res) {
  let route = req.params[0];
  logger = log4js.getLogger("fileWarn");
  logger.warn(`// Route : http://localhost/${route}  || Method: GET // `);
  res.send("Error 404. Page not found");
}

module.exports = {
  getRoot,
  getShowsession,
  getLogout,
  getLogin,
  postLogin,
  getPrivado,
  getRegistro,
  postRegistro,
  getFailLogin,
  getFailSignup,
  getInfo,
  getApirandom,
  siteWrong,
  getProducts,
  postProducts,
  delProducts,
};
