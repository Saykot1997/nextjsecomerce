import { Schema, model, models } from 'mongoose';

const Catagorychema = new Schema(
    {
        catagoryName: {
            type: String,
            required: [true, "catagoryName is required"],
            unique: true
        },
        parant: {
            type: Schema.Types.ObjectId,
            ref: "Catagory"
        },
        photo: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);


const Catagory = models.Catagory || model('Catagory', Catagorychema);
export default Catagory;