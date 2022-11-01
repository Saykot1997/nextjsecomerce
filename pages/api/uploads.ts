import nextConnect from "next-connect";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";


export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};

const upload = multer({
    storage: multer.diskStorage({
        destination: (req: NextApiRequest, file: any, cb: Function) => {
            if (
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/gif') {
                cb(null, './public/uploads');
            } else {
                cb("file does not match");
            }
        },
        filename: (req: NextApiRequest, file: any, cb: Function) => {
            cb(null, Date.now() + "-" + file.originalname)
        },
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res: NextApiResponse) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req: any, res) => {
    res.status(200).json({ fileName: req.file.filename });
});

export default apiRoute;