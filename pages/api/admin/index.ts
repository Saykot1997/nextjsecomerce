import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../../auth/auth';
import { details, update } from '../../../controllers/admin_controllers';

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        // check authentication
        const isauthenticated: any = await auth(req, res)
        if (!isauthenticated) {
            return
        }
        details(req, res, isauthenticated.id)
    } else if (req.method === "PUT") {
        // check authentication
        const isauthenticated: any = await auth(req, res)
        if (!isauthenticated) {
            return
        }
        update(req, res, isauthenticated.id)

    } else {
        res.status(404).json({
            success: false,
            message: "This route recieve post request."
        })
    }
}