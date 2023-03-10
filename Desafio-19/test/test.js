const request = require("supertest")(`http://localhost:8080`);
const expect = require("chai").expect;
const faker = require("@faker-js/faker").faker;
let idGen;

const generatePost = () => {
  post = {
    name: faker.commerce.product(),
    id: Number(faker.random.numeric() + 50),
    price: Math.random() * 1000,
    thumbnail: faker.image.fashion(),
  };
  idGen = post.id;
  return post;
};

describe("Prueba de los endpoints de Productos", () => {
  //GET
  describe("GET ALL", () => {
    it("Status 200. Muestra un array", async () => {
      console.log(`GET: /api/products/`);
      const res = await request.get("/api/products");
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("array");
    });
  });
  //POST;
  describe("POST ONE", () => {
    it("Status 201. Incorpora un producto nuevo", async () => {
      console.log(`POST: /api/products/`);
      const post = generatePost();
      const res = await request.post(`/api/products`).send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.keys("name", "price", "id", "thumbnail");
      expect(post.name).to.eql(res.body.name);
      expect(post.id).to.eql(res.body.id);
      expect(post.thumbnail).to.eql(res.body.thumbnail);
      expect(post.price).to.eql(res.body.price);
    });
  });
  //DELETE;
  describe("DELETE ONE", () => {
    it(`Status 202. Elimina el producto generado`, async () => {
      console.log(`DELETE: /api/products/${idGen}`);
      const res = await request.delete(`/api/products/${idGen}`);
      expect(res.status).to.eql(202);
    });
  });
});
