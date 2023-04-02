// deno-lint-ignore-file
import type { Product } from "../types/product.ts";

let products: Product[] = [
  {
    id: "34oh5oi34h",
    name: "Jean",
    price: 20000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lectus risus, auctor vel placerat et, convallis nec mauris. ",
  },
  {
    id: "9345oi2h5",
    name: "Remera",
    price: 5000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lectus risus, auctor vel placerat et, convallis nec mauris. ",
  },
  {
    id: "yrb0iv3er",
    name: "Camisa",
    price: 15000,
    description: "Description of Product 3",
  },
];

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const addProduct = (product: Product): Product => {
  product.id = Math.random().toString(36).substr(2, 9); // generate a random id
  products.push(product);
  return product;
};

export const updateProduct = (
  id: string,
  update: Partial<Product>
): Product | undefined => {
  const product = products.find((p) => p.id === id);
  if (product) {
    Object.assign(product, update);
    return product;
  } else {
    return undefined;
  }
};

export const deleteProduct = (id: string): boolean => {
  const productId = id;
  const initialLength = products.length;
  products = products.filter((p) => p.id !== productId);
  console.log(products.length < initialLength);
  return products.length < initialLength;
};
