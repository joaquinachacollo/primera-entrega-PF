import { Router } from "express";
import ProductosManager from "../../manager/productosManager.js";

const router = Router();
const manager = new ProductosManager();

let product = {
  titulo: "Lechuga",
  descripcion: "dadwedw",
  precio: 450,
  thumbnail:
    "https://as2.ftcdn.net/v2/jpg/01/00/90/87/1000_F_100908731_zfwGI9VbHURUUJ1vQ6unTxamkjzYNBDD.jpg",
  code: 1523,
  stock: 984,
  status: true,
  category: "vegetales",
};

router.get("/", async (req, res) => {
  let productos = await manager.getProducts();
  const products = req.query.products;

  if (!products) {
    res.send({ productos });
  }

  let productsFiltrados = productos.filter((produc) => produc.id <= products);

  res.send({ productsFiltrados });
});

router.get("/:pid", async (req, res) => {
  let productos = await manager.getProducts();
  const pid = parseInt(req.params.pid);

  let productoSolicitado = productos.find((produc) => produc.id === pid);

  res.send({ productoSolicitado });
});

router.post("/", async (req, res) => {
  if (
    product.titulo == "" ||
    product.descripcion == "" ||
    product.category == "" ||
    product.precio == 0 ||
    product.code == 0
  ) {
    console.log("Error todos los campos son obligatorios");
  } else if (product.stock == 0) {
    console.log("Error no hay stock");
  }

  let productNuevo = await manager.addProducts(product);

  res.send({ productNuevo });
});

router.put("/:pid", async (req, res) => {
  let productos = await manager.getProducts();
  const pid = parseInt(req.params.pid);

  let productoSolicitado = productos.find((produc) => produc.id === pid);
  let actualizarProducto = await manager.updateProduct(
    productoSolicitado.id,
    "tomates",
    "dadwedw",
    200,
    "https://www.shutterstock.com/image-photo/potatoes-market-260nw-769793572.jpg",
    6811,
    651,
    "comida"
  );

  res.send({ actualizarProducto });
});

router.delete("/:pid", async (req, res) => {
  let productos = await manager.getProducts();
  const pid = parseInt(req.params.pid);

  let productoSolicitado = productos.find((produc) => produc.id === pid);

  await manager.deleteProduct(productoSolicitado.id);
  res.send(`El producto fue eliminado.`);
});

export default router;
