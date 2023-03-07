let mensajes = [
  {
    author: { email: "mati@gmail.com", nombre: "matias", apellido: "bianchi" },
    mensaje: "Prueba 1",
    timestamp: "Nov 30, 2022 10.48 AM",
    id: 4,
  },
  {
    author: {
      email: "majo@gmail.com",
      nombre: "Maria Jose",
      apellido: "Luchino",
    },
    mensaje: "Prueba 2",
    timestamp: "Nov 30, 2022 10.49 AM",
    id: 5,
  },
  {
    author: {
      email: "majo@gmail.com",
      nombre: "Maria Jose",
      apellido: "Luchino",
    },
    mensaje: "Prueba 3",
    timestamp: "Nov 30, 2022 10.50 AM",
    id: 6,
  },
  {
    socketid: "ATZEcvP_-gxU09D4AAAM",
    timestamp: "Jan 1, 2023 6:54 PM",
    author: { email: "mati@gmail.com", nombre: "Matias", apellido: "Bianchi" },
    mensaje: "Prueba 4",
    id: 7,
  },
  {
    socketid: "lWmwtTuoFHFX-nJrAAAF",
    timestamp: "Jan 8, 2023 11:42 AM",
    author: { email: "mati@gmail.com", nombre: "Matias", apellido: "Bianchi" },
    mensaje: "Prueba 5",
    id: 8,
  },
];

class DAOmessagesMem {
  constructor() {}

  getAll = async () => {
    return mensajes;
  };

  save = async (mjs) => {
    try {
      const id =
        mensajes.length === 0 ? 1 : mensajes[mensajes.length - 1].id + 1;

      mjs.id = id;

      mensajes.push(mjs);

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(mensajes, null, 3)
      );

      console.log(`Se salvo el mensaje con el id ${id}`);
    } catch (error) {
      console.log(`Ocurrio un error: ${error}`);
    }
  };
}

// const DAOmessagesMem = new ContenedorMsjMem();

module.exports = DAOmessagesMem;
