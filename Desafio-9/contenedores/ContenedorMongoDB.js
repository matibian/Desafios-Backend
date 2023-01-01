const mongoose = require("mongoose");
const MongoDBService = require ("../services/services.js");


class ContenedorMongoDB {
  constructor( {name, schema} ) {
    this.model = mongoose.model(name, schema);
    MongoDBService.init();
  }

  async getAll(id) {
    if (id){
      const carrito = await this.model.find({carrito_id: id});
      console.log(carrito)

      return carrito
    } else {
    const productos = await this.model.find({});
      
    return productos
  }
  }

  async save(element) {
    const response = await this.model.create(element);

    return response;
  }

  async getById(id) {
    const response = await this.model.findById(id);

    return response;
  }

  async updateById(id, newData) {
    const response = await this.model.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return response;
  }

  async deleteById(id) {
    const response = await this.collection.findByIdAndDelete(id);
    return response;
  }
}

export default ContenedorMongoDB;


