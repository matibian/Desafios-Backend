const DAOproducts = require("../models/DAOs/DAOproducts");
// const { DAO } = require("");

async function getProducts() {
  return await DAOproducts.getAll();
}

async function delProducts(id) {
  return await DAOproducts.deleteById(id);
}

async function postProducts(product) {
  return await DAOproducts.save(product);
}

module.exports = {
  getProducts,
  postProducts,
  delProducts,
};
