import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
    {
        productName: {
            type: String,
            required: [true, "productName is require"],
        },
        productDetails: {
            type: String,
            required: [true, "productDetails is require"],
        },
        price: {
            type: Number,
            required: [true, "price is require"]
        },
        quantity: {
            type: Number,
            required: [true, "quantity is require"],
        },
        rating: {
            type: Number,
        },
        comments: [
            {
                coment: {
                    type: String,
                },
                clientId: {
                    type: Schema.Types.ObjectId,
                    ref: "Client"
                }
            }
        ],
        catagory: {
            type: Schema.Types.ObjectId,
            required: [true, "catagory id is require"],
            ref: "Catagory"
        },
    },
    { timestamps: true }
);


const Product = models.Product || model('Product', ProductSchema);
export default Product;