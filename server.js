const express = require("express");
const mongoose = require("mongoose");
const product = require("./models/productModel.js");
// const product = require("./models/productModel.js");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>api development</h1>");
});
app.get("/products", async (req, res) => {
  try {
    const products = await product.find({});
    res.send(products);
  } catch (err) {
    console.log(err);
  }
});
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await product.findById(id);
    res.send(products);
  } catch (err) {
    console.log(err);
  }
});
//update product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await product.findByIdAndUpdate(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "cannot find the product" });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
  }
});
//deleting product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await product.findByIdAndDelete(id, req.body);
    if (!deleted) {
      return res.status(404).json({ message: "cannot find the product" });
    }
    res.status(200).json(deleted);
  } catch (err) {
    console.log(err);
  }
});
app.post("/api", async (req, res) => {
  try {
    const newproduct = await product.create(req.body);
    res.send(newproduct);
  } catch (err) {
    console.log(err);
  }
});

mongoose
  .connect("mongodb+srv://marmik:jinal@test.008ok8z.mongodb.net/test")
  .then(() => {
    console.log("db ready");
    app.listen(3000, () => {
      console.log("running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
