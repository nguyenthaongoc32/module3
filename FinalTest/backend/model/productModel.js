import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true, default: 0 },
  reviewCount: { type: Number, default: 0 },
  isFavorite: { type: Boolean, default: false }
},
  {
    timestamps: true,
  }
);
const ProductModel = mongoose.model("product", productSchema)


export default ProductModel