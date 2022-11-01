import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"
import { env } from "../utils/env";

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.headers.authorization) {
        return res.status(403).json({
            success: false,
            message: 'Authorization token is required'
        })
    }
    if (!req.headers.authorization?.startsWith("Bearer")) {
        return res.status(403).json({
            success: false,
            message: 'Authorization token starts with Bearer'
        })
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    try {
        let currentEnvironment: string;
        currentEnvironment = env('TOKENSECRATE');
        const isvarified = await jwt.verify(token, currentEnvironment);
        if (!isvarified) {
            return res.status(403).json({
                success: false,
                message: 'Invalid token'
            })
        } else {
            // console.log(isvarified)
            return isvarified
        }
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}

export { auth }