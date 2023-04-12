import fs from "fs";

const path = "./files/carritos.json";

export default class CarritosManager {
  addProductInCart = async (idCart, idProd) => {
    const carritos = await this.getCarritos();
    const carritosFiltrados = carritos.find((cart) => cart.id == idCart);

    let prodcutosInCart = carritosFiltrados.products;

    const productoIndex = prodcutosInCart.findIndex((u) => u.id == idProd);

    if (productoIndex !== -1) {
      prodcutosInCart[productoIndex].quantity =
        prodcutosInCart[productoIndex].quantity + 1;
    } else {
      let producto = {
        id: idProd,
        quantity: 1,
      };
      prodcutosInCart.push(producto);
      console.log(prodcutosInCart);
    }
    await fs.promises.writeFile(path, JSON.stringify(carritos, null, "\t"));
    return carritosFiltrados;
  };

  getCarritos = async () => {
    if (fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, "utf-8");
      const carritos = JSON.parse(data);
      return carritos;
    } else {
      return [];
    }
  };

  getCarrito = async (idCart) => {
    const carritos = await this.getCarritos();
    const carrito = carritos.find((cart) => cart.id == idCart);

    return carrito;
  };

  addCarrito = async () => {
    const carritos = await this.getCarritos();
    let carrito = {
      products: [],
    };

    if (carritos.length === 0) {
      carrito.id = 1;
    } else {
      carrito.id = carritos[carritos.length - 1].id + 1;
    }

    carritos.push(carrito);

    await fs.promises.writeFile(path, JSON.stringify(carritos, null, "\t"));
    return carrito;
  };

  getCarritoById = async (id_producto) => {
    const products = await this.getCarritos();

    let producto = products.find((producto) => producto.id === id_producto);

    if (producto) {
      return producto;
    } else {
      return console.log("no existe");
    }
  };

  updateCarrito = async (
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
    const products = await this.getCarritos();
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

  deleteCarrito = async (id_producto) => {
    const products = await this.getCarritos();
    const index = products.findIndex((products) => products.id === id_producto);

    if (index !== -1) {
      const deletedProduct = products.splice(index, 1);
      await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
      return deletedProduct;
    }
  };
}
