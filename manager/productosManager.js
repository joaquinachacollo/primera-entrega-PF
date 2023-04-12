import fs from "fs";

const path = "./files/productos.json";

export default class ProductosManager {
  getProducts = async () => {
    if (fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, "utf-8");
      const products = JSON.parse(data);
      return products;
    } else {
      return [];
    }
  };

  addProducts = async (producto) => {
    const products = await this.getProducts();

    if (products.length === 0) {
      producto.id = 1;
    } else {
      producto.id = products[products.length - 1].id + 1;
    }

    products.push(producto);

    await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
    return producto;
  };

  getProductById = async (id_producto) => {
    const products = await this.getProducts();

    let producto = products.find((producto) => producto.id === id_producto);

    if (producto) {
      return producto;
    } else {
      return console.log("no existe");
    }
  };

  updateProduct = async (
    id_producto,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  ) => {
    let producto = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      category: category,
      id: id_producto,
    };
    const products = await this.getProducts();
    const indexProducto = products.findIndex(
      (producto) => producto.id === id_producto
    );
    if (indexProducto !== -1) {
      if (Object.values(producto).includes("")) {
        return console.log("Todos los campos son obligatorios");
      }
      let codigo = products.find((ele) => ele.code === producto.code);
      if (codigo) {
        return console.log(
          "El 'code' del producto ya existe, intente cambiarlo."
        );
      } else {
        const deleteP = products.splice(indexProducto, 1)[0];
        await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
        deleteP;
        products.push(producto);
        await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
        console.log("El producto se modificó con exito");
        return producto;
      }
    } else {
      return "El producto que quiere modificar no existe";
    }
  };

  deleteProduct = async (id_producto) => {
    const products = await this.getProducts();
    const index = products.findIndex((products) => products.id === id_producto);

    if (index !== -1) {
      const deletedProduct = products.splice(index, 1);
      await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
      return deletedProduct;
    }
  };
}
