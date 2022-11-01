import { NextApiRequest, NextApiResponse } from 'next';
import { getCatagory, updateCatagory, deleteCatagory } from "../../../../controllers/catagory_controllers"
import db_conection from '../../../../utils/db_conection';
import { auth } from "../../../../auth/auth"

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    // database conection
    await db_conection();
    // get single catagory
    if (req.method === "GET") {
        getCatagory(req, res)
    }
    // update catacory
    else if (req.method === "PUT") {
        // check authentication
        const isauthenticated = await auth(req, res)
        if (!isauthenticated) {
            return
        }
        updateCatagory(req, res)
    }
    // delete catagory
    else if (req.method === "DELETE") {
        // check authentication
        const isauthenticated = await auth(req, res)
        if (!isauthenticated) {
            return
        }
        deleteCatagory(req, res)
    }
    // if request in difrent route
    else {
        res.status(404).json({
            success: false,
            message: "This route recieve get, put and delete  request."
        })
    }
}