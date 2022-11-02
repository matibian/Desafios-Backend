import { Container } from "./Container.js";
import express from "express";

const app = express();
const port = process.env.PORT || 8080;

const contenedor = new Container();

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});


app.get("/productos", async (req, res) => {
  const productos = JSON.stringify(await contenedor.getAll());
  res.send(`${productos}`);
});

app.get("/productorandom", async (req, res) => {
  const random = Math.floor(Math.random() * 8);
  res.send(JSON.stringify(await contenedor.getById(random)));
});

app.listen(port, () => {
  console.log(`Example app listening on port hhtp://localhost:${port}`);
});
