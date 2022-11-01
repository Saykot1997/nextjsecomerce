import { Schema, model, models } from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { env } from "../utils/env"

const AdminSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        mobileNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "admin",
        },
    },
    { timestamps: true }
);


AdminSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

AdminSchema.methods.getSignedToken = function () {
    let currentEnvironment: string;
    currentEnvironment = env('TOKENSECRATE');
    return jwt.sign({ id: this._id, role: this.role }, currentEnvironment);
};

const Admin = models.Admin || model('Admin', AdminSchema);
export default Admin;




