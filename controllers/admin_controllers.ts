import db_conection from '../utils/db_conection';
import { NextApiRequest, NextApiResponse } from "next";
import Admin from "../models/Admin_model"
import { serialize } from 'cookie';

// register controler
// {host}/api/admin/register
const register = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // data base conection
        await db_conection();
        if (!req.body.email) {
            return res.status(403).json({
                success: false,
                data: req.body,
                message: "fill all fieds"
            })
        }
        // check if the admin already exist
        const isExist = await Admin.findOne({ email: req.body.email })
        if (isExist) {
            return res.status(403).json({
                success: false,
                data: req.body,
                message: "email already exist."
            })
        }
        // create admin
        const admin = await Admin.create(req.body);
        const { password, ...rest } = admin._doc
        // send response
        return res.status(201).json({
            success: true,
            data: rest,
            message: "admin create success"
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}

// login controler
// {host}/api/admin/login
const login = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email } = req.body
    if (!req.body.email || !req.body.password) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: "fill all fieds email and password"
        })
    }
    try {
        await db_conection();
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(403).json({
                success: false,
                data: req.body,
                message: "admin not found in this email"
            })
        }
        const isPasswordCorrect = await admin.matchPassword(req.body.password)
        if (!isPasswordCorrect) {
            return res.status(403).json({
                success: false,
                data: req.body,
                message: "wrong credentials"
            })
        }
        const token = await admin.getSignedToken()
        // console.log({ tokenFromServerLogin: token })
        const { password, ...others } = admin._doc;
        return res.status(200).json({
            success: true,
            data: { ...others, token },
            message: "login success"
        })
    } catch (error: any) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}
// details controler
// {host}/api/admin
const details = async (req: NextApiRequest, res: NextApiResponse, Id: String) => {
    try {
        await db_conection();
        const admin = await Admin.findById(Id)
        if (!admin) {
            return res.status(403).json({
                success: false,
                data: req.body,
                message: "admin not found"
            })
        }
        const { password, ...others } = admin._doc;
        return res.status(200).json({
            success: true,
            data: others,
            message: "details fatch success"
        })
    } catch (error: any) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}
// update controler
// {host}/api/admin
const update = async (req: NextApiRequest, res: NextApiResponse, Id: String) => {
    try {
        await db_conection();
        const admin = await Admin.findByIdAndUpdate(Id, { ...req.body }, { new: true })
        if (!admin) {
            return res.status(403).json({
                success: false,
                data: req.body,
                message: "admin not update"
            })
        }
        const admindata = { ...admin._doc }
        delete admindata.password
        return res.status(200).json({
            success: true,
            data: admindata,
            message: "update success"
        })
    } catch (error: any) {
        return res.status(403).json({
            success: false,
            data: req.body,
            message: error.message
        })
    }
}



export { register, login, details, update }