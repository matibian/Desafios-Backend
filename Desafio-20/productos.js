export class Producto {
  constructor(id, { nombre, price, thumbnail }) {
    this.id = id;
    this.nombre = nombre;
    this.price = price;
    this.thumbnail = thumbnail;
  }
}

export const productosMap = {
  "8e6be401860262b51e7c": new Producto("8e6be401860262b51e7c", {
    nombre: "Remera",
    price: 3000,
    thumbnail:
      "https://newsport.vteximg.com.br/arquivos/ids/14017559-455-588/VLL2151-A.jpg",
  }),
  "1b7d161e83296c947e0a": new Producto("1b7d161e83296c947e0a", {
    nombre: "Pantalon",
    price: 5000,
    thumbnail:
      "https://www.cheeky.com.ar/uploads/picture/image/124121/V2300101_40_1.jpg",
  }),
  "9d2132ced96ba6080856": new Producto("9d2132ced96ba6080856", {
    nombre: "Jean",
    price: 5000,
    thumbnail: "https://static.dafiti.com.ar/images/1x1.gif",
  }),
  a2d3867720c94c17e096: new Producto("a2d3867720c94c17e096", {
    nombre: "Buzo",
    price: 5000,
    thumbnail:
      "https://topperarg.vtexassets.com/arquivos/ids/257590-800-800?width=800&height=800&aspect=true",
  }),
  db7c80dbd8d7e462584e: new Producto("db7c80dbd8d7e462584e", {
    nombre: "Pañuelo rojo",
    price: 1300,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_604426-MLA43655135531_102020-O.webp",
  }),
  e25ccd3f57a76f3806c8: new Producto("e25ccd3f57a76f3806c8", {
    nombre: "Bermuda",
    price: 2000,
    thumbnail:
      "https://www.panareha.com/772-large_default/bermuda-turtle-bh1801g02.jpg",
  }),
  a5fc3e966a8fe585f106: new Producto("a5fc3e966a8fe585f106", {
    nombre: "Gorro azul",
    price: 4000,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_605965-MLA44164688536_112020-O.webp",
  }),
};
