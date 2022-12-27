const { optionsSQLite } = require("./options/sqlite.js");

const knex = require("knex")(optionsSQLite);


knex.schema
    .createTable("mensajes", (table) => {
        table.increments("id"), table.string("socketid"), table.integer("timestamp"), table.integer("email"), table.integer("mensaje");
      })
  .then(() => {
    console.log("Tabla creada");
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    knex.destroy();
  });


knex("mensajes")
    .insert([
        {
           "socketid": "M-cr7iojbIBkvmCQAAAB",
           "timestamp": "Nov 18, 2022 12:30 PM",
           "email": "mati@gmail.com",
           "mensaje": "Hola",
           "id": 1
        },
        {
           "socketid": "rd4XIFGpdIDKiPRZAAAB",
           "timestamp": "Nov 18, 2022 12:30 PM",
           "email": "mati@gmail.com",
           "mensaje": "Como andas?",
           "id": 2
        },
        {
           "socketid": "-LH3am-CKxblEJ5uAAAB",
           "timestamp": "Nov 18, 2022 12:31 PM",
           "email": "bla@gmail.com",
           "mensaje": "Todo bien",
           "id": 3
        }
     ])
    .then(() => {
    console.log("Tabla cargada");
    })
    .catch((err) => {
    console.log(err);
    })
    .finally(() => {
    knex.destroy();
    });

