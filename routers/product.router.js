const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { authJwt } = require("../middlewares");

router.post("/", [authJwt.verifyToken, authJwt.isModOrAdmin], productController.create);
router.get("/", productController.getAll);
router.get("/:id", [authJwt.verifyToken], productController.getById);
router.put("/:id", [authJwt.verifyToken, authJwt.isModOrAdmin], productController.update);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], productController.delete);

module.exports = router;