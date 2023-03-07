const { optionsSQLite } = require("../../options/sqlite");

const knex = require("knex")(optionsSQLite);

class DAOmessagesSQlite {
  constructor() {
    this.table = "mensajes";
  }

  getAll = async () => {
    try {
      const mensajes = await knex(this.table).select("*");
      if (mensajes.length > 0) {
        console.log(mensajes);
        return mensajes;
      } else {
        return [];
      }
    } catch (error) {
      console.log(`Ocurrio un error: ${error}`);
    }
  };

  save = async (mensaje) => {
    try {
      await knex(this.table).insert(mensaje);
      console.log("registro creado:", mensaje);
    } catch (error) {
      console.log(`Ocurrio un error: ${error}`);
    }
  };
}

// const DAOmessagesSQlite = new ContenedorMsg("mensajes");

module.exports = DAOmessagesSQlite;
