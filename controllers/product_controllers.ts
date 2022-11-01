import { NextApiRequest, NextApiResponse } from "next";
import Product from '../models/Porduct_model';

// create product controler 
// {host}/api/admin/products
// request = post
const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    const { productName } = req.body
    try {
        if (!productName) {
            return res.status(403).json({
                success: false,
                data: req.body,
                message: "productName is require"
            })
        }
        // checking exist product or not
        const isExist = await Product.findOne({ productName })
        if (isExist) {
            return res.status(403).json({
                success: false,
                data: req.body,
                message: "product already exist."
            })
        }
        const product = await Product.create(req.body)
        res.status(201).json({
            success: true,
            data: product,
            message: "product create success"
        })
    } catch (error: any) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}

// get products controler
// {host}/api/admin/products
// request = get
const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const products = await Product.find({})
        res.status(201).json({
            success: true,
            count: products.length,
            data: products,
            message: "Catagories fatch success",
        })
    } catch (error: any) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}

// get a single product controler
// {host}/api/admin/products/:id
// request = get
const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(403).json({
                success: false,
                message: "product not found"
            })
        }
        res.status(201).json({
            success: true,
            data: product,
            message: "Product fatch success"
        })
    } catch (error: any) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}

// update a product controler
// {host}/api/admin/products/:id
// request = put
const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    try {
        const isExist = await Product.findOne({ productName: req.body.productName })
        if (isExist && isExist._id.toString() !== id?.toString()) {
            return res.status(403).json({
                success: false,
                data: req.body,
                message: "product already exist."
            })
        }
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
        if (!product) {
            return res.status(403).json({
                success: false,
                message: "product not found"
            })
        }
        res.status(201).json({
            success: true,
            data: product,
            message: "Product update success"
        })
    } catch (error: any) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}
// delete a product controler
// {host}/api/admin/products/:id
// request = delete
const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(403).json({
                success: false,
                message: "product not found"
            })
        }
        await Product.deleteOne({ _id: id })
        res.status(201).json({
            success: true,
            data: product,
            message: "Product delete success"
        })
    } catch (error: any) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}




export { createProduct, getProducts, getProduct, updateProduct, deleteProduct }
