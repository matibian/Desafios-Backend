const express = require("express");
const { Router } = express;
const passport = require("passport");
const authPassport = require("../middlewares/authPassport");
const routerDatos = new Router();

const routes = require("../controller/data");

authPassport();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

routerDatos.get("/api/productos-test", async (req, res) => {
  const prodFake = prodFaker.getProd(5);
  res.render("productosFake", {
    title: "Test",
    prodFake,
    layout: "productosFake",
  });
  // res.json(prodFake);
});

routerDatos.get("/", checkAuthentication, routes.getRoot);

routerDatos.get("/api/products", routes.getProducts);

routerDatos.delete("/api/products/:id", routes.delProducts);

routerDatos.post("/api/products", routes.postProducts);

routerDatos.get("/showsession", routes.getShowsession);

routerDatos.get("/logout", routes.getLogout);

routerDatos.get("/login", routes.getLogin);

routerDatos.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  routes.postLogin
);

// routerDatos.get("/faillogin", routes.getFailLogin);

routerDatos.get("/faillogin", routes.getFailLogin);

routerDatos.get("/failsignup", routes.getFailSignup);

routerDatos.get("/registro", routes.getRegistro);

routerDatos.post(
  "/registro",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  routes.postRegistro
);

// routerDatos.get("/failregistro", routes.getFailRegistro);

routerDatos.get("/privado", checkAuthentication, routes.getPrivado);

routerDatos.get("/info", routes.getInfo);

routerDatos.get("/api/random", routes.getApirandom);

routerDatos.get("/*", routes.siteWrong);

module.exports = routerDatos;
