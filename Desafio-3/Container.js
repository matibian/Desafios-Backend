import * as fs from "fs";

export class Container {
  constructor() {}
  getAll = async () => {
    try {
      const archive = await fs.promises.readFile("./productos.json", "utf-8");
      const productos = JSON.parse(archive);
      return productos;
    } catch (e) {
      console.log(e);
    }
  };
  save = async (producto) => {
    try {
      const productos = await this.getAll();
      const id = productos.length + 1;
      producto.id = id;
      productos.push(producto);

      const productsString = JSON.stringify(productos);

      await fs.promises.writeFile("./productos.json", productsString);
    } catch (e) {
      console.log(e);
    }
  };
  getById = async (id) => {
    try {
      const readData = await fs.promises.readFile("./productos.json");
      const newData = JSON.parse(readData);
      const name = newData.find((name) => name.id == id);
      if (name) {
        return name;
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteById = async (id) => {
    try {
      const readData = await fs.promises.readFile("./productos.json");
      const newData = JSON.parse(readData);
      const name = newData.find((name) => name.id == id);
      if (!name) {
        console.log("ID no existe");
      } else {
        const filteredData = newData.filter((e) => e.id != id);
        const dataJSON = JSON.stringify(filteredData);
        await fs.promises.writeFile("./productos.json", dataJSON);

        console.log("Producto eliminado");
      }
    } catch (e) {
      console.log(e);
    }
  };

  deleteAll = async () => {
    try {
      await fs.promises.writeFile("./productos.json", JSON.stringify([]));
      console.log("Productos eliminados");
    } catch (e) {
      console.log(e);
    }
  };
}
