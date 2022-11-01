import { NextApiRequest, NextApiResponse } from 'next';
import { login } from "../../../controllers/admin_controllers"


export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        login(req, res)
    } else {
        res.status(404).json({
            success: false,
            message: "This route recieve post request."
        })
    }
}