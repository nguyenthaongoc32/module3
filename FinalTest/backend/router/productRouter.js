import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleFavorite
} from "../controller/productController.js";

const router = express.Router();
router.get("/", getProducts);


router.get("/:id", getProductById);


router.post("/", createProduct);


router.put("/:id", updateProduct);


router.delete("/:id", deleteProduct);

router.patch("/:id/favorite", toggleFavorite);
export default router;
