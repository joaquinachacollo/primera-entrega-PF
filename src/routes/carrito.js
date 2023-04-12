import { Router } from "express";
import CarritosManager from "../../manager/carritosManagar.js";

const router = Router();
const manager = new CarritosManager();

router.post("/", async (req, res) => {
  let carritoNuevo = await manager.addCarrito();
  res.send({ carritoNuevo });
});

router.get("/:cid", async (req, res) => {
  const id = parseInt(req.params.cid);
  let carrito = await manager.getCarrito(id);

  res.send({ carrito });
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const idProd = req.params.pid;

    const resultado = await manager.addProductInCart(idCart, idProd);

    res.send(resultado);
  } catch (error) {
    res.status(500).send({ error: "error interno" });
  }
});

export default router;
