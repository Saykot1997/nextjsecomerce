import { NextApiRequest, NextApiResponse } from 'next';
import { register } from "../../../controllers/admin_controllers"


export default async function Register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        register(req, res)
    } else {
        res.status(404).json({
            success: false,
            message: "This route recieve post request."
        })
    }
}
