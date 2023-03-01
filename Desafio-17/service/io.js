const { normalize, schema, denormalize } = require("normalizr");
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
// const io = require("socket.io")(httpServer);
const moment = require("moment");
const timestamp = moment().format("lll");

const Container = require("../data/contenedores/Container.js");
const ContenedorMsg = require("../data/contenedores/contenedorMsjArchivo");
const contenedor = new Container("productos");
const contenedorMsg = new ContenedorMsg("mensajes");

// Normalizr

const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
const messageSchema = new schema.Entity("messages", {
  author: authorSchema,
});

const chatSchema = new schema.Entity("chats", {
  messages: [messageSchema],
});

const normalizarData = (data) => {
  const dataNormalizada = normalize(
    { id: "chatHistory", messages: data },
    chatSchema
  );
  return dataNormalizada;
};

const normalizarMensajes = async () => {
  const messages = await contenedorMsg.getAll();
  const normalizedMessages = normalizarData(messages);
  return normalizedMessages;
};

///// Conexion socket

async function websocket(io) {
  io.on("connection", async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);

    socket.emit("product-list", await contenedor.getAll());

    socket.emit("msg-list", await normalizarMensajes());

    socket.on("product", async (data) => {
      console.log(data);

      await contenedor.save(data);

      console.log("Se recibio un producto nuevo", "producto:", data);

      io.emit("product-list", await contenedor.getAll());
    });

    socket.on("del-product", async (data) => {
      console.log(data);

      await contenedor.deleteById(data);
      io.emit("product-list", await contenedor.getAll());
    });

    socket.on("msg", async (data) => {
      await contenedorMsg.save({
        socketid: socket.id,
        timestamp: timestamp,
        ...data,
      });

      console.log("Se recibio un msg nuevo", "msg:", data);

      io.emit("msg-list", await normalizarMensajes());
    });
  });
}

module.exports = websocket;
