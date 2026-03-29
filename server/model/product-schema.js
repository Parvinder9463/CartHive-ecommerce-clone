import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
         type: String,
         required: true,
         unique: true
    },
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String,
    category: {
        type: String,
        required: true,
        index: true
    },
    tags: {
        type: [String],
        default: ["flipkart",""],
    },
    rating: {
        type: Number,
        default: 4.0,
        min: 0,
        max: 5
    },
    reviews: {
        type: Number,
        default: 0
    }
}
);

const Product = mongoose.model('product', productSchema);
export default Product;