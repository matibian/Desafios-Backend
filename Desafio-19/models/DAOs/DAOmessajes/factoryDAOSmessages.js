const DAOmessagesFS = require("./DAOmessagesFS");
const DAOmessagesMem = require("./DAOmessagesMem");
const DAOmessagesSQlite = require("./DAOmessagesSQlite");

let DAO;

modo = process.argv[3];

switch (modo) {
  case "dev":
    DAO = new DAOmessagesMem();
    break;
  case "test":
    DAO = new DAOmessagesSQlite();
    break;
  case "prod":
    DAO = new DAOmessagesFS();
    break;
  default:
    DAO = new DAOmessagesFS();
    break;
}

module.exports = DAO;
