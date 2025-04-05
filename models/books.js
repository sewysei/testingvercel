import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Correct way to make title required
    },
    author: String,
    price: {
      type: Number,
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

export const BookModel = mongoose.model("Book", bookSchema);
