import { NextApiRequest, NextApiResponse } from 'next';
import { createProduct, getProducts } from "../../../../controllers/product_controllers"
import db_conection from '../../../../utils/db_conection';
import { auth } from '../../../../auth/auth';

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    // database conection
    await db_conection();
    if (req.method === "POST") {
        // check authentication
        const isauthenticated = await auth(req, res)
        if (!isauthenticated) {
            return
        }
        createProduct(req, res)
    } else if (req.method === "GET") {
        getProducts(req, res)
    } else {
        res.status(404).json({
            success: false,
            message: "This route recieve only get or post request."
        })
    }
}