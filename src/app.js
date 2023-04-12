import express from "express";
import productsRouter from "./routes/productos.js";
import carritoRouter from "./routes/carrito.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`servidor funcionando en el puerto ${PORT}`);
});

app.use("/api/products", productsRouter);
app.use("/api/carrito", carritoRouter);
