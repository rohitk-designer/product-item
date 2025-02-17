const express = require("express");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/Product");
const cors = require("cors");



const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  if (result) {
    result = result.toObject();
    delete result.password;
    res.status(201).send(result);
} else {
    res.send("data is not found");
  }
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
      res.send(user)
   
    } else {
      res.send("data is not found abc");
    }
  }
);

app.post("/add-product",async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products",  async (req, res) => {
  let result = await Product.find();
  if (result) {
    res.send(result);
  } else {
    res.send("products list empty ");
  }
});
app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});
app.get("/product/:id",async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send("data is not found");
  }
});

app.put("/product/:id",  async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});
app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        company: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
      {
        price: { $regex: req.params.key },
      },
    ],
  });

  res.send(result);
});




app.listen(5000);
