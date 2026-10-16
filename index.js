const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, "products.json");

app.use(express.json());

async function readProducts() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeProducts(products) {
  await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2));
}

// POST /products - create new product
app.post("/products", async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ message: "name and price are required" });
  }

  const products = await readProducts();
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price: Number(price),
    description: description || "",
  };
  products.push(newProduct);
  await writeProducts(products);

  res.status(201).json(newProduct);
});

// GET /products - get all products
app.get("/products", async (req, res) => {
  const products = await readProducts();
  res.json(products);
});

// GET /products/:id - get product by id
app.get("/products/:id", async (req, res) => {
  const products = await readProducts();
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// PUT /products/:id - update product
app.put("/products/:id", async (req, res) => {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, price, description } = req.body;
  products[index] = {
    ...products[index],
    ...(name !== undefined && { name }),
    ...(price !== undefined && { price: Number(price) }),
    ...(description !== undefined && { description }),
  };
  await writeProducts(products);

  res.json(products[index]);
});

// DELETE /products/:id - delete product
app.delete("/products/:id", async (req, res) => {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const [deleted] = products.splice(index, 1);
  await writeProducts(products);

  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
