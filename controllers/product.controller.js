const Product = require("../models/product.model");

// Create a new product record
exports.create = async (req, res) => {
    const { name, brand, price, specifications, category, stock, description,imageUrl } = req.body;
    const newProduct = {
        name,
        brand,
        price,
        specifications,
        category,
        stock,
        description,
        imageUrl
    };
    try {
        const product = await Product.create(newProduct);
        res.send(product);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while creating the Product.",
        });
    }
}

// Get all products
exports.getAll = async (req, res) => {
    const { category, brand } = req.query;
    const query = {};
  
    if (category && category !== "All") {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }
  
    try {
      const products = await Product.findAll({ where: query });
      res.send(products);
    } catch (error) {
      res.status(500).send({
        message: error.message || "An error occurred while retrieving the products.",
      });
    }
  };

// Get product by ID
exports.getById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).send({ message: "Product not found with id " + id });
        } else {
            res.send(product);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while retrieving the Product.",
        });
    }
};

// Update product
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Product.update(req.body, {
            where: { id: id },
        });
        if (updated) {
            res.send({ message: "Product updated successfully." });
        } else {
            res.send({ message: "Cannot update Product with id " + id + ". Maybe Product was not found or req.body is empty!" });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while updating the Product.",
        });
    }
};

// Delete product
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Product.destroy({
            where: { id: id },
        });
        if (deleted) {
            res.send({ message: "Product deleted successfully." });
        } else {
            res.send({ message: "Cannot delete Product with id=" + id + ". Maybe it was not found." });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error deleting Product with id=" + id,
            error: error.message,
        });
    }
};
