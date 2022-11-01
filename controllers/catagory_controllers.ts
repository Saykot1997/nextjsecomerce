import { NextApiRequest, NextApiResponse } from "next";
import Catagory from '../models/Catagory_model';

// create catagory controler 
// {host}/api/admin/catagories
const createCatagory = async (req: NextApiRequest, res: NextApiResponse) => {
    const { catagoryName } = req.body

    try {
        // checking exist catagory or not
        if (!catagoryName) {
            return res.status(403).json({
                success: false,
                data: req.body,
                message: "catagoryName is required"
            })
        }
        const isExist = await Catagory.findOne({ catagoryName: catagoryName })
        if (isExist) {
            return res.status(403).json({
                success: false,
                data: req.body,
                message: "catagory already exist."
            })
        }
        const catagory = await Catagory.create(req.body)
        res.status(201).json({
            success: true,
            data: catagory,
            message: "catagory create success"
        })
    } catch (error: any) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}

// get catagories controler
// {host}/api/admin/catagories

const getCatagories = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const catagories = await Catagory.find({}).populate("parant", "catagoryName")
        res.status(201).json({
            success: true,
            count: catagories.length,
            data: catagories,
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

// get catagories controler
// {host}/api/admin/catagories

const getNestedCatagories = async (req: NextApiRequest, res: NextApiResponse) => {
    type catagory = {
        _id: string
        catagoryName: string
        parant?: string | object
        children?: catagory[]
        createdAt?: Date
        updatedAt?: Date
        __v?: number
        _doc?: any
    }

    try {
        const createCategory = (categories: catagory[], parant: string | null = null) => {
            let category
            if (parant === null) {
                category = categories.filter((cat: catagory) => cat.parant === undefined);
            } else {
                category = categories.filter((cat: catagory) => cat.parant == parant)
            }
            const categoryList: catagory[] = category.map((cate: catagory) => ({
                ...cate._doc,
                children: createCategory(categories, cate._id.toString())
            }))
            return categoryList
        }

        const catagories: any = await Catagory.find({})

        res.status(201).json({
            success: true,
            count: catagories.length,
            data: createCategory(catagories),
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

// get a single catagory controler
// {host}/api/admin/catagories/:id

const getCatagory = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    try {
        const catagory = await Catagory.findById(id)
        if (!catagory) {
            return res.status(403).json({
                success: false,
                message: "catagory not found"
            })
        }
        res.status(201).json({
            success: true,
            data: catagory,
            message: "Catagory fatch success"
        })
    } catch (error: any) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}

// update a catagory controler
// {host}/api/admin/catagories/:id

const updateCatagory = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    try {
        const isExist = await Catagory.findOne({ catagoryName: req.body.catagoryName })
        if (isExist && isExist._id.toString() !== id?.toString()) {
            return res.status(403).json({
                success: false,
                data: req.body,
                message: "catagory already exist."
            })
        }
        const catagory = await Catagory.findByIdAndUpdate(id, req.body, { new: true })
        if (!catagory) {
            return res.status(403).json({
                success: false,
                message: "catagory not found"
            })
        }
        res.status(201).json({
            success: true,
            data: catagory,
            message: "Catagory update success"
        })
    } catch (error: any) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}
// delete a catagory controler
// {host}/api/admin/catagories/:id

const deleteCatagory = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    try {
        const catagory = await Catagory.findById(id)
        if (!catagory) {
            return res.status(403).json({
                success: false,
                message: "catagory not found"
            })
        }
        await Catagory.deleteOne({ _id: id })
        res.status(201).json({
            success: true,
            data: catagory,
            message: "Catagory delete success"
        })
    } catch (error: any) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}


export { createCatagory, getCatagories, getNestedCatagories, getCatagory, updateCatagory, deleteCatagory }
