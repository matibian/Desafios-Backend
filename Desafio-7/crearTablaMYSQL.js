const { optionsMYSQL } = require("./options/mysql.js");
const knex = require("knex")(optionsMYSQL);


knex.schema
    .createTable("productos", (table) => {
        table.increments("id"), table.string("name"), table.integer("price"), table.integer("thumbnail");
      })
  .then(() => {
    console.log("todo bien");
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    knex.destroy();
  });
knex("productos")
    .insert([
        {
            "name": "Remera",
            "price": 3000,
            "thumbnail": "https://newsport.vteximg.com.br/arquivos/ids/14017559-455-588/VLL2151-A.jpg"
          },
          {
            "name": "Pantalon",
            "price": 5000,
            "thumbnail": "https://www.cheeky.com.ar/uploads/picture/image/124121/V2300101_40_1.jpg"
          },
          {
            "name": "Jean",
            "price": 5000,
            "thumbnail": "https://www.tradeinn.com/f/13713/137133676/jack---jones-vaqueros-glenn-original-am-814-slim.jpg"
          },
          {
            "name": "Buzo",
            "price": 5000,
            "thumbnail": "https://topperarg.vtexassets.com/arquivos/ids/257590-800-800?width=800&height=800&aspect=true"
          },
          {
            "name": "Pañuelo rojo",
            "price": 1300,
            "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_604426-MLA43655135531_102020-O.webp"
          },
          {
            "name": "Bermuda",
            "price": "2000",
            "thumbnail": "https://www.panareha.com/772-large_default/bermuda-turtle-bh1801g02.jpg",
          },
          {
            "name": "Gorro azul",
            "price": "4000",
            "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_605965-MLA44164688536_112020-O.webp",
          },
          {
            "name": "Poncho",
            "price": "5000",
            "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_733220-MLA52048577955_102022-O.webp",
          },
          {
            "name": "Buzo verde",
            "price": "2000",
            "thumbnail": "https://static.dafiti.com.ar/p/fraction-net-4815-201079-4-product.jpg",
          }
    ])
    .then(() => {
    console.log("todo bien");
    })
    .catch((err) => {
    console.log(err);
    })
    .finally(() => {
    knex.destroy();
    });

