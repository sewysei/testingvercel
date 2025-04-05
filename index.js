import express from "express";

import { connectDB } from "./db.js";

const app = express();
app.use(express.json());

connectDB();

import { BookModel } from "./models/books.js";

app.get("/books", async (req, res) => {
  try {
    const data = await BookModel.find();
    res.status(200).json({
      msg: "Ok",
      data,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const data = await BookModel.findById(req.params.id);

    if (data) {
      return res.status(200).json({
        msg: "Ok",
        data,
      });
    }

    return res.status(404).json({
      msg: "Not Found",
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { name, author, price, description } = req.body;
    const { id } = req.params;
    const data = await BookModel.findByIdAndUpdate(
      id,
      {
        name,
        author,
        price,
        description,
      },
      { new: true }
    );
    res.status(200).json({
      msg: "Ok",
      data,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

app.post("/books", async (req, res) => {
  try {
    const { name, author, price, description } = req.body;
    const book = new BookModel({ name, author, price, description });
    const data = await book.save();
    res.status(200).json({
      msg: "Ok",
      data,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    await BookModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      msg: "Ok",
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
