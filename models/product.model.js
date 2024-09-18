const { DataTypes } = require("sequelize");
const sequelize = require("./db");

// Define the Product model
const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    specifications: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING, // e.g., PC, Laptop, Phone, Tablet
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    imageUrl: { // Add this field
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Synchronize the model with the database
Product.sync({ alter: false }) // Use { alter: true } to update existing table structure
  .then(() => {
    console.log("Product table created or updated");
  })
  .catch((error) => {
    console.log("Error creating or updating Product table:", error);
  });

module.exports = Product;
